import { z, defineCollection } from 'astro:content'

const lyricCollection = defineCollection({
  type: 'content',
  schema: z.object({}),
})

export const collections = {
  'lyrics': lyricCollection,
}