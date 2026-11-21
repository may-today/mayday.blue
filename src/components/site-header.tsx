import { Link, useRouteContext, useRouter } from '@tanstack/react-router'

import { logout } from '../lib/session.functions.ts'

export const SiteHeader = () => {
  const { viewer } = useRouteContext({ from: '__root__' })
  const router = useRouter()

  const signOut = async () => {
    await logout()
    await router.invalidate()
    await router.navigate({ to: '/' })
  }

  return (
    <header className="mx-auto flex h-16 w-full max-w-4xl items-center justify-between px-5">
      <Link to="/" className="text-ink-strong text-[15px] font-semibold tracking-tight">
        Mayday Blue
      </Link>
      <nav className="flex items-center gap-5 text-[14px]">
        {viewer ? (
          <>
            <Link
              to="/presets"
              className="text-ink-secondary hover:text-ink-strong"
              activeProps={{ className: 'text-ink-strong' }}
            >
              我的预设
            </Link>
            <span className="text-ink-tertiary label-mono">{viewer.name ?? '未命名'}</span>
            <button
              type="button"
              onClick={signOut}
              className="text-ink-secondary hover:text-ink-strong cursor-pointer"
            >
              退出
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-ink-strong text-page rounded-full px-4 py-1.5 font-medium"
          >
            登录
          </Link>
        )}
      </nav>
    </header>
  )
}
