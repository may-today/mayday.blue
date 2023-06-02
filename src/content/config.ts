import { z, defineCollection } from 'astro:content'

const lyricCollection = defineCollection({
  type: 'content',
  schema: z.object({
    banlam: z.optional(z.boolean()),
  }),
})

export const collections = {
  'lyrics': lyricCollection,
}