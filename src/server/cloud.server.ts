// Server-only: calls the CloudBase cloud functions shared with the mini
// program. The environment's API key never reaches the browser.
import tcb from '@cloudbase/node-sdk'

import { callMockFunction } from './mock-cloud.server.ts'

export type FunctionName = 'auth' | 'preset'

type CloudResponse =
  | { ok: true; data: unknown }
  | { ok: false; error: { code: string; message: string } }

/** A cloud function refused the call; `code` comes from the function. */
export class CloudError extends Error {
  readonly code: string

  constructor(code: string, message: string) {
    super(message)
    this.name = 'CloudError'
    this.code = code
  }
}

export const isMock = (): boolean => process.env.CLOUDBASE_MOCK === '1'

let app: ReturnType<typeof tcb.init> | undefined

const getApp = (): ReturnType<typeof tcb.init> => {
  app ??= tcb.init({
    env: process.env.CLOUDBASE_ENV_ID ?? 'maytoday-tcb-d7gf65eef0aeea220',
    secretId: process.env.TENCENTCLOUD_SECRET_ID,
    secretKey: process.env.TENCENTCLOUD_SECRET_KEY,
  })
  return app
}

const isResponse = (value: unknown): value is CloudResponse =>
  typeof value === 'object' && value !== null && 'ok' in value

export const callFunction = async <T>(
  name: FunctionName,
  data: Record<string, unknown>
): Promise<T> => {
  const result: unknown = isMock()
    ? await callMockFunction(name, data)
    : (await getApp().callFunction({ data, name })).result
  if (!isResponse(result)) {
    throw new CloudError('NETWORK', '服务返回了无效结果')
  }
  if (!result.ok) {
    throw new CloudError(result.error.code, result.error.message)
  }
  return result.data as T
}
