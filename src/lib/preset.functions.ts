import { redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

import { callFunction, CloudError } from '../server/cloud.server.ts'
import { clearSession, readSessionToken } from '../server/session.server.ts'
import type { PresetDetail, PresetSummary } from './types.ts'

/** Calls `preset` as the logged-in user; sends the browser to /login otherwise. */
const callPreset = async <T>(data: Record<string, unknown>): Promise<T> => {
  const token = readSessionToken()
  if (!token) {
    throw redirect({ to: '/login' })
  }
  try {
    return await callFunction<T>('preset', { ...data, webSession: token })
  } catch (error) {
    if (error instanceof CloudError && error.code === 'UNAUTHENTICATED') {
      clearSession()
      throw redirect({ to: '/login' })
    }
    throw error
  }
}

export const listMyPresets = createServerFn({ method: 'GET' }).handler(() =>
  callPreset<PresetSummary[]>({ action: 'listMine' })
)

export const getPreset = createServerFn({ method: 'GET' })
  .validator((id: unknown) => {
    if (typeof id !== 'string' || !/^c[0-9a-z]{24}$/u.test(id)) {
      throw new Error('无效的预设 ID')
    }
    return id
  })
  .handler(
    ({ data: id }): Promise<PresetDetail> =>
      callPreset<PresetDetail>({ action: 'get', id })
  )
