import { z, defineCollection } from 'astro:content'

const lyricCollection = defineCollection({
  type: 'content',
  schema: z.object({
    year: z.optional(z.number()),
    banlam: z.optional(z.boolean()),
  }),
})

export const collections = {
  'lyrics': lyricCollection,
}