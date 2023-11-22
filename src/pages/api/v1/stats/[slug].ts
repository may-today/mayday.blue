import { getCollection } from 'astro:content'
import type { APIRoute } from 'astro'
import { slugify } from '@/utils'
import { songStatDict } from '@/content/_parse/setlist'

export const GET: APIRoute = ({ params, request }) => {
  const slug = params.slug || '';
  const stat = songStatDict[slug]
  if (!stat) {
    return {
      body: '{}'
    }
  }
  return new Response(JSON.stringify(stat))
};

export async function getStaticPaths() {
  const entries = await getCollection('lyrics')
  return entries.map(entry => ({
    params: { slug: slugify(entry.slug) },
  }))
}
