import { Link, createFileRoute } from '@tanstack/react-router'

const Home = () => {
  const { viewer } = Route.useRouteContext()
  return (
    <main className="mx-auto w-full max-w-4xl px-5 pt-20 pb-24">
      <p className="label-mono text-ink-tertiary">Web · Preview</p>
      <h1 className="text-ink-strong mt-3 text-[44px] leading-[1.05] font-semibold tracking-tight">
        在电脑上
        <br />
        管理你的预设
      </h1>
      <p className="text-ink-secondary mt-5 max-w-md text-[15px] leading-relaxed">
        用微信扫码登录，就能看到你在小程序里做的荧光棒预设。
      </p>
      <div className="mt-10">
        <Link
          to={viewer ? '/presets' : '/login'}
          className="bg-ink-strong text-page inline-flex h-11 items-center rounded-full px-6 text-[15px] font-medium"
        >
          {viewer ? '查看我的预设' : '扫码登录'}
        </Link>
      </div>
    </main>
  )
}

export const Route = createFileRoute('/')({ component: Home })
