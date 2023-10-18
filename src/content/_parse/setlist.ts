import { getCollection } from 'astro:content'
import { nameSlugDict } from '@/content/_parse/song'
import type { RequestedSongMeta, SetList, SongStat } from '@/types'

const entries = await getCollection('setlists')

const generateRequestedSongRawList = (id: string, set: SetList) => {
  const requestedSongList: RequestedSongMeta[] = []
  set.list.forEach(item => {
    const [title, remark] = item.split('|', 2).map(i => i.trim())
    if (!remark?.includes('点歌')) {
      return
    }
    const slug = nameSlugDict[title]
    if (!slug) {
      return
    }
    const meta = {
      title,
      slug,
      setId: id,
      date: set.date,
      tour: set.tour,
      place: set.place,
    } as RequestedSongMeta
    requestedSongList.push(meta)
  })
  return requestedSongList
}

const generateRequestedSongStat = (rawList: RequestedSongMeta[]) => {
  // order by amount, group by slug
  const slugDict: { [slug: string]: SongStat } = {}
  rawList.forEach(item => {
    if (!slugDict[item.slug]) {
      slugDict[item.slug] = {
        slug: item.slug,
        title: item.title,
        amount: 0,
        metaList: [],
      }
    }
    slugDict[item.slug].amount++
    slugDict[item.slug].metaList.push(item)
  })
  return Object.values(slugDict).sort((a, b) => (b.amount - a.amount) || a.slug.localeCompare(b.slug))
}

export const requestedSongRawList = entries.map(entry => generateRequestedSongRawList(entry.id, entry.data)).flat()
export const songStatList = generateRequestedSongStat(requestedSongRawList)