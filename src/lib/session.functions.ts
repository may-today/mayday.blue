// Website login by scanning the mini program code (cloudfunctions/auth in
// mayday.blue-mp). Everything here runs on the server; the browser only calls
// these through RPC and never sees the session token.
import { createServerFn } from '@tanstack/react-start'

import { callFunction, CloudError, isMock } from '../server/cloud.server.ts'
import { confirmNewestMockLogin } from '../server/mock-cloud.server.ts'
import {
  clearPendingLogin,
  clearSession,
  readPendingLogin,
  readSessionToken,
  writePendingLogin,
  writeSessionToken,
} from '../server/session.server.ts'
import type { LoginPoll, Viewer } from './types.ts'

export const getViewer = createServerFn({ method: 'GET' }).handler(
  async (): Promise<Viewer | null> => {
    const token = readSessionToken()
    if (!token) {
      return null
    }
    try {
      return await callFunction<Viewer>('auth', {
        action: 'me',
        webSession: token,
      })
    } catch (error) {
      if (error instanceof CloudError && error.code === 'UNAUTHENTICATED') {
        clearSession()
        return null
      }
      throw error
    }
  }
)

export const startLogin = createServerFn({ method: 'POST' }).handler(
  async (): Promise<{ code: string; expiresAt: string; mock: boolean }> => {
    const login = await callFunction<{
      code: string
      expiresAt: string
      pollSecret: string
      ticket: string
    }>('auth', {
      action: 'createLogin',
      envVersion: process.env.WXACODE_ENV_VERSION ?? 'release',
    })
    writePendingLogin(login.ticket, login.pollSecret)
    return { code: login.code, expiresAt: login.expiresAt, mock: isMock() }
  }
)

type PollResult =
  | { status: 'pending' | 'expired' | 'cancelled' | 'used' }
  | { status: 'confirmed'; token: string }

export const pollLogin = createServerFn({ method: 'POST' }).handler(
  async (): Promise<LoginPoll> => {
    const pending = readPendingLogin()
    if (!pending) {
      return { status: 'expired' }
    }
    const result = await callFunction<PollResult>('auth', {
      action: 'pollLogin',
      ...pending,
    })
    if (result.status === 'pending') {
      return result
    }
    clearPendingLogin()
    if (result.status === 'confirmed') {
      writeSessionToken(result.token)
      return { status: 'confirmed' }
    }
    return result
  }
)

export const logout = createServerFn({ method: 'POST' }).handler(
  async (): Promise<void> => {
    const token = readSessionToken()
    clearSession()
    if (token) {
      await callFunction('auth', { action: 'logout', webSession: token }).catch(
        () => null
      )
    }
  }
)

/** Local development only: pretends the code was scanned and confirmed. */
export const confirmMockLogin = createServerFn({ method: 'POST' }).handler(
  (): boolean => isMock() && confirmNewestMockLogin()
)
