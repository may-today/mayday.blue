import { Link, createFileRoute, redirect } from '@tanstack/react-router'

import { Strip } from '../../components/strip.tsx'
import { formatDate, formatDuration } from '../../lib/format.ts'
import { getPreset } from '../../lib/preset.functions.ts'

const PresetPage = () => {
  const preset = Route.useLoaderData()
  const facts = [
    ['Duration', formatDuration(preset.durationMs)],
    ['Colors', String(preset.colorCount)],
    ['Song', preset.song ?? '自制'],
    ['Visibility', preset.public ? '公开' : '仅自己'],
    ['Updated', formatDate(preset.updatedAt)],
  ] as const

  return (
    <main className="mx-auto w-full max-w-4xl px-5 pt-8 pb-24">
      <Link to="/presets" className="text-ink-tertiary hover:text-ink-strong label-mono">
        ← 我的预设
      </Link>
      <h1 className="text-ink-strong mt-4 text-[32px] leading-tight font-semibold tracking-tight">
        {preset.name}
      </h1>
      {preset.subName ? (
        <p className="text-ink-secondary mt-1 text-[15px]">{preset.subName}</p>
      ) : null}
      <Strip strip={preset.strip} className="mt-6 h-3" />

      <div className="mt-8 grid gap-8 md:grid-cols-[240px_1fr]">
        <dl className="border-ink border-t">
          {facts.map(([key, value]) => (
            <div key={key} className="border-separator flex items-baseline border-b py-3">
              <dt className="label-mono text-ink-tertiary w-24 shrink-0">{key}</dt>
              <dd className="text-ink-strong text-[14px]">{value}</dd>
            </div>
          ))}
          {preset.description ? (
            <p className="text-ink-secondary pt-4 text-[13px] leading-relaxed">{preset.description}</p>
          ) : null}
        </dl>
        <section>
          <p className="label-mono text-ink-tertiary">Timeline · MBP 1</p>
          <pre className="bg-card text-ink mt-3 max-h-[60vh] overflow-auto rounded-3xl p-5 font-mono text-[13px] leading-relaxed">
            {preset.content}
          </pre>
        </section>
      </div>
    </main>
  )
}

export const Route = createFileRoute('/presets/$id')({
  beforeLoad: ({ context }) => {
    if (!context.viewer) {
      throw redirect({ to: '/login' })
    }
  },
  component: PresetPage,
  loader: ({ params }) => getPreset({ data: params.id }),
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.name ?? '预设'} · Mayday Blue` }],
  }),
})
