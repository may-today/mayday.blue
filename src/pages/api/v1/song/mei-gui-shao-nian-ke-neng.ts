import type { APIRoute } from 'astro'
import { detailDict } from '@/content/_parse/song'

export const GET: APIRoute = () => {
  const slug = 'mei-gui-shao-nian';
  const detail = detailDict[slug]
  if (!detail) {
    return {
      body: '{}'
    }
  }
  return new Response(JSON.stringify(detail))
}