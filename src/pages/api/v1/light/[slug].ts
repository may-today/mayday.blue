import { getCollection } from 'astro:content'
import type { APIRoute } from 'astro'
import { slugify } from '@/utils'

export const GET: APIRoute = ({ params, props, request }) => {
  const entry = props.entry || {};
  return new Response(JSON.stringify({
    meta: entry.data || null,
    raw: entry.body || null,
  }))
}

export async function getStaticPaths() {
  const entries = await getCollection('lights')
  return entries.map(entry => ({
    params: { slug: slugify(entry.slug) },
    props: { entry }
  }))
}
