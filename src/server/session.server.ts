// Server-only: the two HttpOnly cookies the browser holds. The pending login
// (ticket + poll secret) and, once confirmed, the session token issued by the
// `auth` cloud function.
import {
  deleteCookie,
  getCookie,
  setCookie,
} from '@tanstack/react-start/server'

const SESSION_COOKIE = 'mb_session'
const LOGIN_COOKIE = 'mb_login'
const SESSION_MAX_AGE_S = 30 * 24 * 60 * 60
const LOGIN_MAX_AGE_S = 5 * 60

const cookieOptions = (maxAge: number) => ({
  httpOnly: true,
  maxAge,
  path: '/',
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
})

export const readSessionToken = (): string | undefined =>
  getCookie(SESSION_COOKIE)

export const writeSessionToken = (token: string): void => {
  setCookie(SESSION_COOKIE, token, cookieOptions(SESSION_MAX_AGE_S))
}

export const clearSession = (): void => {
  deleteCookie(SESSION_COOKIE, { path: '/' })
}

export const readPendingLogin = ():
  | { ticket: string; pollSecret: string }
  | undefined => {
  const [ticket, pollSecret] = (getCookie(LOGIN_COOKIE) ?? '').split('.')
  return ticket && pollSecret ? { pollSecret, ticket } : undefined
}

export const writePendingLogin = (ticket: string, pollSecret: string): void => {
  setCookie(LOGIN_COOKIE, `${ticket}.${pollSecret}`, cookieOptions(LOGIN_MAX_AGE_S))
}

export const clearPendingLogin = (): void => {
  deleteCookie(LOGIN_COOKIE, { path: '/' })
}
