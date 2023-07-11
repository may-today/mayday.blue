import { getCollection } from 'astro:content'
import type { APIRoute } from 'astro'
import { slugify } from '@/utils'

export const get: APIRoute = ({ params, props, request }) => {
  const slug = params.slug || '';
  const entry = props.entry || {};
  return {
    body: JSON.stringify({
      raw: entry.body || null,
    })
  }
};

export async function getStaticPaths() {
  const entries = await getCollection('lights')
  return entries.map(entry => ({
    params: { slug: slugify(entry.slug) },
    props: { entry }
  }))
}
