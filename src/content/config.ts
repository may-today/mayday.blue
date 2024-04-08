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

const setListCollection = defineCollection({
  type: 'data',
  schema: z.object({
    date: z.date(),
    tour: z.string(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    place: z.string(),
    guest: z.string().nullable(),
    endingSong: z.string().optional(),
    recorder: z.string().optional(),
    list: z.array(z.string()),
  }),
})

export const collections = {
  'lyrics': lyricCollection,
  'setlists': setListCollection,
}