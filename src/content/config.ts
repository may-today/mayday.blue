import { z, defineCollection } from 'astro:content'

const lyricCollection = defineCollection({
  type: 'content',
  schema: z.object({
    year: z.number().optional(),
    album: z.string().optional(),
    banlam: z.boolean().default(false),
    length: z.number().optional(),
    light: z.boolean().default(false),
  }),
})

const lightCollection = defineCollection({
  type: 'content',
})

export const collections = {
  'lyrics': lyricCollection,
  'lights': lightCollection,
}