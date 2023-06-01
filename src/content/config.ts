import { z, defineCollection } from 'astro:content'

const lyricCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
  }),
})

export const collections = {
  'lyrics': lyricCollection,
}