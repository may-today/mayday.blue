import type { APIRoute } from 'astro'
import { detailList } from '@/content/_parse'
import type { SongMeta } from '@/types';

export const GET: APIRoute = async({params, request}) => {
  return new Response(JSON.stringify(detailList.map(item => {
    const meta = { ...item } as (SongMeta & { detail?: any })
    delete meta.detail
    return meta
  })))
}
