import { getCollection, getEntry } from 'astro:content'
import type { APIRoute } from 'astro'
import { slugify } from '@/utils'
import { detailDict } from '@/content/_sorted'

export const get: APIRoute = ({ params, request }) => {
  const slug = params.slug || '';
  const detail = detailDict[slug]
  if (!detail) {
    return {
      body: '{}'
    }
  }
  delete detail.content
  return {
    body: JSON.stringify(detail)
  }
};

export async function getStaticPaths() {
  const entries = await getCollection('lyrics')
  return entries.map(entry => ({
    params: { slug: slugify(entry.slug) },
  }))
}
