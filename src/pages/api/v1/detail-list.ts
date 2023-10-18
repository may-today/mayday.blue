import type { APIRoute } from 'astro'
import { detailList } from '@/content/_parse/song'

export const GET: APIRoute = async({params, request}) => {
  return new Response(JSON.stringify(detailList))
}
