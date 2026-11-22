import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'

import { confirmMockLogin, pollLogin, startLogin } from '../lib/session.functions.ts'

const POLL_INTERVAL_MS = 2000
const POLL_TIMEOUT_MS = 2 * 60 * 1000

type Phase =
  | { kind: 'loading' }
  | { kind: 'scan'; code: string; deadline: number; mock: boolean }
  | { kind: 'stopped'; message: string }
  | { kind: 'failed'; message: string }

const STOPPED_MESSAGES = {
  cancelled: '已在手机上取消',
  expired: '登录码已过期，请刷新页面重新获取',
  used: '这个登录码已经用过了',
} as const

const resolveDeadline = (expiresAt: string): number => {
  const localDeadline = Date.now() + POLL_TIMEOUT_MS
  const serverDeadline = Date.parse(expiresAt)
  return Number.isFinite(serverDeadline)
    ? Math.min(serverDeadline, localDeadline)
    : localDeadline
}

const LoginPage = () => {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>({ kind: 'loading' })

  const begin = useCallback(async () => {
    setPhase({ kind: 'loading' })
    try {
      const login = await startLogin()
      setPhase({
        code: login.code,
        deadline: resolveDeadline(login.expiresAt),
        kind: 'scan',
        mock: login.mock,
      })
    } catch {
      setPhase({ kind: 'failed', message: '登录码生成失败，稍后再试' })
    }
  }, [])

  useEffect(() => {
    void begin()
  }, [begin])

  const deadline = phase.kind === 'scan' ? phase.deadline : null
  useEffect(() => {
    if (deadline === null) {
      return
    }
    let stopped = false
    let polling = false

    const stopWith = (message: string) => {
      if (stopped) {
        return
      }
      stopped = true
      clearInterval(timer)
      clearTimeout(timeout)
      setPhase({ kind: 'stopped', message })
    }

    const remaining = deadline - Date.now()
    if (remaining <= 0) {
      setPhase({ kind: 'stopped', message: STOPPED_MESSAGES.expired })
      return
    }

    const timeout = setTimeout(
      () => stopWith(STOPPED_MESSAGES.expired),
      remaining
    )
    const timer = setInterval(async () => {
      if (stopped || polling) {
        return
      }
      if (Date.now() >= deadline) {
        stopWith(STOPPED_MESSAGES.expired)
        return
      }
      polling = true
      try {
        const result = await pollLogin()
        if (stopped || result.status === 'pending') {
          return
        }
        stopped = true
        clearInterval(timer)
        clearTimeout(timeout)
        if (result.status === 'confirmed') {
          await router.invalidate()
          await router.navigate({ to: '/presets' })
          return
        }
        setPhase({ kind: 'stopped', message: STOPPED_MESSAGES[result.status] })
      } catch {
        // A dropped poll is retried on the next tick until the timeout expires.
      } finally {
        polling = false
      }
    }, POLL_INTERVAL_MS)
    return () => {
      stopped = true
      clearInterval(timer)
      clearTimeout(timeout)
    }
  }, [deadline, router])

  return (
    <main className="mx-auto flex w-full max-w-4xl justify-center px-5 pt-16 pb-24">
      <section className="bg-card w-full max-w-sm rounded-[28px] p-8">
        <p className="label-mono text-ink-tertiary">Login</p>
        <h1 className="text-ink-strong mt-2 text-[22px] font-semibold">微信扫码登录</h1>
        <p className="text-ink-secondary mt-1.5 text-[13px] leading-relaxed">
          用微信扫一扫，在小程序里确认登录
        </p>

        <div className="bg-page relative mx-auto mt-8 flex aspect-square w-56 items-center justify-center rounded-full">
          {phase.kind === 'scan' ? (
            <img src={phase.code} alt="Mayday Blue 小程序登录码" className="h-full w-full rounded-full" />
          ) : null}
          {phase.kind === 'loading' ? (
            <span className="label-mono text-ink-tertiary">Loading</span>
          ) : null}
          {phase.kind === 'stopped' || phase.kind === 'failed' ? (
            <div className="flex flex-col items-center gap-3 px-6 text-center">
              <span className="text-ink-secondary text-[13px]">{phase.message}</span>
              <button
                type="button"
                onClick={begin}
                className="bg-ink-strong text-page cursor-pointer rounded-full px-4 py-1.5 text-[13px] font-medium"
              >
                刷新
              </button>
            </div>
          ) : null}
        </div>

        {phase.kind === 'scan' && phase.mock ? (
          <button
            type="button"
            onClick={() => confirmMockLogin()}
            className="border-separator text-ink-secondary mt-8 w-full cursor-pointer rounded-full border py-2 text-[13px]"
          >
            模拟在小程序里确认（本地 mock）
          </button>
        ) : null}
      </section>
    </main>
  )
}

export const Route = createFileRoute('/login')({
  beforeLoad: ({ context }) => {
    if (context.viewer) {
      throw redirect({ to: '/presets' })
    }
  },
  component: LoginPage,
  head: () => ({ meta: [{ title: '登录 · Mayday Blue' }] }),
})
