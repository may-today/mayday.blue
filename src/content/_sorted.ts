import { getCollection } from 'astro:content'
import { slugify } from '@/utils'
import type { SongMeta, SongGroup } from '@/types'

const entries = await getCollection('lyrics')

const rawSongsList = entries.map((entry) => ({
  title: entry.id.replace('.md', '') as string,
  slug: slugify(entry.slug),
  meta: entry.data,
  content: entry.body
} as SongMeta))

const generateGroupedList = (songsList: SongMeta[]) => {
  const groupedDict = {} as Record<string, SongMeta[]>
  songsList.forEach((song) => {
    const firstLetter = song.slug[0].toUpperCase()
    if (Number.isInteger(Number(firstLetter))) {
      if (!groupedDict['#']) {
        groupedDict['#'] = []
      }
      groupedDict['#'].push(song)
      return
    }
    if (!groupedDict[firstLetter]) {
      groupedDict[firstLetter] = []
    }
    groupedDict[firstLetter].push(song)
  })
  const grouped = [] as SongGroup[]
  Object.keys(groupedDict).forEach((key) => {
    grouped.push({
      key,
      list: groupedDict[key].sort((a, b) => a.slug.localeCompare(b.slug)),
    })
  })
  grouped.sort((a, b) => a.key.localeCompare(b.key))
  return grouped
}

export const groupedList = generateGroupedList(rawSongsList)
