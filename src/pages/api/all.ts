import type { APIRoute } from 'astro'
import { groupedListWithDetail } from '@/content/_sorted'

export const get: APIRoute = async({params, request}) => {
  return {
    body: JSON.stringify(groupedListWithDetail),
  };
}
