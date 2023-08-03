import type { APIRoute } from 'astro'
import { detailDict } from '@/content/_parse'

export const get: APIRoute = () => {
  const slug = 'mei-gui-shao-nian';
  const detail = detailDict[slug]
  if (!detail) {
    return {
      body: '{}'
    }
  }
  return {
    body: JSON.stringify(detail)
  }
}