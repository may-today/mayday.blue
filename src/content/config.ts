import { z, defineCollection } from 'astro:content'

const lyricCollection = defineCollection({
  type: 'content',
  schema: z.object({
    year: z.optional(z.number()),
    album: z.optional(z.string()),
    banlam: z.optional(z.boolean()),
    length: z.optional(z.number()),
  }),
})

export const collections = {
  'lyrics': lyricCollection,
}