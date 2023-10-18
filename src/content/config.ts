import { z, defineCollection } from 'astro:content'
import type { SetList } from '@/types'

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
  schema: z.object({
    author: z.string().optional(),
    song: z.string().optional(),
    origin: z.boolean().default(false),
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
    guest: z.string().nullable(),
    place: z.string(),
    list: z.array(z.string()),
  }),
})

export const collections = {
  'lyrics': lyricCollection,
  'lights': lightCollection,
  'setlists': setListCollection,
}