// Server-only: an in-memory stand-in for the `auth` and `preset` cloud
// functions, used when CLOUDBASE_MOCK=1 so the site runs without CloudBase.
import { randomBytes } from 'node:crypto'

const LOGIN_TTL_MS = 5 * 60 * 1000

interface MockLogin {
  pollSecret: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'used'
  expiresAt: number
}

const logins = new Map<string, MockLogin>()
const sessions = new Set<string>()

const STRIP = [
  'sky4', 'sky4', 'sky4', 'blu4', 'blu4', 'blu3', 'whi4', 'whi4',
  'blu4', 'blu4', 'sky3', 'sky3', 'pur4', 'pur4', 'pur3', 'pin4',
  'pin4', 'whi4', 'blu4', 'blu4', 'blu4', 'sky4', 'sky4', 'rai4',
  'rai4', 'blu4', 'blu4', 'whi4', 'whi4', 'sky4', 'sky4', 'blu4',
  'blu4', 'pur4', 'pur4', 'pin4', 'pin2', 'whi4', 'whiT', 'whiT',
  'blu4', 'blu4', 'sky4', 'sky4', 'blu4', 'blu4', 'off4', 'off4',
]

const presets = [
  {
    author: { name: 'Diu' },
    colorCount: 64,
    content:
      '@mbp 1\n@song juejiang\n\n00:01.0 sky4\n> 主歌\n00:32.5 blu4\n> 副歌\n01:05.0 whi4\n03:58.0 off4\n',
    createdAt: '2026-11-01T08:00:00.000Z',
    description: '副歌全场白光，最后一段渐暗。',
    durationMs: 238_000,
    favorite: false,
    id: 'cmock00000000000000000001',
    mine: true,
    name: '倔强',
    public: true,
    song: 'juejiang',
    strip: STRIP,
    subName: '演唱会版',
    updatedAt: '2026-11-08T12:00:00.000Z',
  },
  {
    author: { name: 'Diu' },
    colorCount: 31,
    content: '@mbp 1\n\n00:00.5 pur4\n00:20.0 pin4\n02:40.0 off4\n',
    createdAt: '2026-11-03T08:00:00.000Z',
    description: null,
    durationMs: 160_000,
    favorite: false,
    id: 'cmock00000000000000000002',
    mine: true,
    name: '自制开场',
    public: false,
    song: null,
    strip: [...STRIP].reverse(),
    subName: null,
    updatedAt: '2026-11-05T12:00:00.000Z',
  },
]

const ok = (data: unknown) => ({ data, ok: true })
const fail = (code: string, message: string) => ({
  error: { code, message },
  ok: false,
})

const mockCode = (ticket: string): string => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" rx="100" fill="#f0f0f0"/><text x="100" y="96" font-family="monospace" font-size="16" text-anchor="middle" fill="#999">MOCK CODE</text><text x="100" y="120" font-family="monospace" font-size="10" text-anchor="middle" fill="#bbb">${ticket.slice(0, 12)}</text></svg>`
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

const handleAuth = (data: Record<string, unknown>) => {
  const ticket = String(data.ticket ?? '')
  switch (data.action) {
    case 'createLogin': {
      const newTicket = randomBytes(12).toString('hex')
      const pollSecret = randomBytes(32).toString('base64url')
      const expiresAt = Date.now() + LOGIN_TTL_MS
      logins.set(newTicket, { expiresAt, pollSecret, status: 'pending' })
      return ok({
        code: mockCode(newTicket),
        expiresAt: new Date(expiresAt).toISOString(),
        pollSecret,
        ticket: newTicket,
      })
    }
    case 'confirmLogin': {
      const login = logins.get(ticket)
      if (!login || login.status !== 'pending') {
        return fail('NOT_FOUND', '登录码无效')
      }
      login.status = 'confirmed'
      return ok({ confirmed: true })
    }
    case 'pollLogin': {
      const login = logins.get(ticket)
      if (!login || login.pollSecret !== data.pollSecret) {
        return fail('NOT_FOUND', '登录不存在')
      }
      if (login.status === 'pending') {
        return ok({ status: login.expiresAt <= Date.now() ? 'expired' : 'pending' })
      }
      if (login.status !== 'confirmed') {
        return ok({ status: login.status })
      }
      login.status = 'used'
      const token = randomBytes(32).toString('base64url')
      sessions.add(token)
      return ok({ status: 'confirmed', token, user: { name: 'Diu' } })
    }
    case 'me':
      return sessions.has(String(data.webSession))
        ? ok({ name: 'Diu' })
        : fail('UNAUTHENTICATED', '登录已过期，请重新登录')
    case 'logout':
      sessions.delete(String(data.webSession))
      return ok({ loggedOut: true })
    default:
      return fail('UNKNOWN_ACTION', `不支持的操作 ${String(data.action)}`)
  }
}

const summary = ({ content: _c, createdAt: _a, description: _d, favorite: _f, ...rest }: (typeof presets)[number]) => rest

const handlePreset = (data: Record<string, unknown>) => {
  if (!sessions.has(String(data.webSession))) {
    return fail('UNAUTHENTICATED', '请在微信里打开')
  }
  switch (data.action) {
    case 'listMine':
      return ok(presets.map(summary))
    case 'get': {
      const preset = presets.find(({ id }) => id === data.id)
      return preset ? ok(preset) : fail('NOT_FOUND', '预设不存在')
    }
    default:
      return fail('UNKNOWN_ACTION', `不支持的操作 ${String(data.action)}`)
  }
}

/** Confirms the newest pending login, as scanning in the mini program would. */
export const confirmNewestMockLogin = (): boolean => {
  const pending = [...logins.values()].filter(({ status }) => status === 'pending')
  const newest = pending.at(-1)
  if (!newest) {
    return false
  }
  newest.status = 'confirmed'
  return true
}

export const callMockFunction = (
  name: 'auth' | 'preset',
  data: Record<string, unknown>
): Promise<unknown> =>
  Promise.resolve(name === 'auth' ? handleAuth(data) : handlePreset(data))

