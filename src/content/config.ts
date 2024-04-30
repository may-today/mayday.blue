import { z, defineCollection } from 'astro:content'

const lyricCollection = defineCollection({
  type: 'content',
  schema: z.object({
    year: z.number().optional(),
    album: z.string().optional(),
    banlam: z.boolean().default(false),
    lyricist: z.string().optional(),
    composer: z.string().optional(),
    length: z.number().optional(),
  }),
})

export const collections = {
  'lyrics': lyricCollection,
}