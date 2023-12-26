import { getCollection } from 'astro:content'
import type { APIRoute } from 'astro'
import { slugify } from '@/utils'
import { detailDict } from '@/content/_parse/song'

export const GET: APIRoute = ({ params, request }) => {
  const slug = params.slug || '';
  const detail = detailDict[slug]
  if (!detail) {
    return new Response(JSON.stringify({
      body: '{}'
    }))
  }
  return new Response(JSON.stringify(detail))
};

export async function getStaticPaths() {
  const entries = await getCollection('lyrics')
  return entries.map(entry => ({
    params: { slug: slugify(entry.slug) },
  }))
}
