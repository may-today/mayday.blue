import type { APIRoute } from 'astro'
import { detailList } from '@/content/_parse'

export const get: APIRoute = async({params, request}) => {
  return {
    body: JSON.stringify(detailList),
  };
}
