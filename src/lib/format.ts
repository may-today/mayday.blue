const MS_PER_SECOND = 1000
const SECONDS_PER_MINUTE = 60

/** `m:ss`; presets run minutes, not hours. */
export const formatDuration = (ms: number): string => {
  const total = Math.round(ms / MS_PER_SECOND)
  const minutes = Math.floor(total / SECONDS_PER_MINUTE)
  const seconds = total % SECONDS_PER_MINUTE
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

export const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('zh-CN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
