import type { APIRoute } from 'astro'
import { metaList } from '@/content/_parse/song'
import type { SongMeta } from '@/types';

export const GET: APIRoute = async() => {
  return new Response(JSON.stringify(metaList.map(item => {
    const meta = { ...item } as (SongMeta & { detail?: any })
    return meta
  })))
}
