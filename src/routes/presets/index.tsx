import { Link, createFileRoute, redirect } from '@tanstack/react-router'

import { Strip } from '../../components/strip.tsx'
import { formatDate, formatDuration } from '../../lib/format.ts'
import { listMyPresets } from '../../lib/preset.functions.ts'

const PresetsPage = () => {
  const presets = Route.useLoaderData()
  return (
    <main className="mx-auto w-full max-w-4xl px-5 pt-10 pb-24">
      <div className="flex items-baseline justify-between">
        <h1 className="text-ink-strong text-[28px] font-semibold tracking-tight">我的预设</h1>
        <span className="label-mono text-ink-tertiary">{presets.length} Presets</span>
      </div>
      {presets.length === 0 ? (
        <p className="text-ink-secondary mt-16 text-center text-[14px]">
          还没有预设，先在小程序里做一个吧
        </p>
      ) : (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {presets.map((preset) => (
            <li key={preset.id}>
              <Link
                to="/presets/$id"
                params={{ id: preset.id }}
                className="bg-card hover:ring-separator block rounded-3xl p-5 ring-1 ring-transparent transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-ink-strong truncate text-[16px] font-semibold">{preset.name}</p>
                    <p className="text-ink-tertiary mt-0.5 truncate text-[13px]">
                      {preset.subName ?? (preset.song ? preset.song : '自制')}
                    </p>
                  </div>
                  {preset.public ? null : (
                    <span className="bg-fill text-ink-secondary label-mono shrink-0 rounded-full px-2 py-0.5">
                      Private
                    </span>
                  )}
                </div>
                <Strip strip={preset.strip} className="mt-5 h-2" />
                <div className="text-ink-tertiary label-mono mt-3 flex justify-between">
                  <span>{formatDuration(preset.durationMs)}</span>
                  <span>{formatDate(preset.updatedAt)}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export const Route = createFileRoute('/presets/')({
  beforeLoad: ({ context }) => {
    if (!context.viewer) {
      throw redirect({ to: '/login' })
    }
  },
  component: PresetsPage,
  head: () => ({ meta: [{ title: '我的预设 · Mayday Blue' }] }),
  loader: () => listMyPresets(),
})
