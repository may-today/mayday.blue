import { getCollection } from 'astro:content'
import { nameSlugDict } from '@/content/_parse/song'
import type { SetListSongItemDetail, SetList, SongStat } from '@/types'

const entries = await getCollection('setlists')

const generateSetListSongItemDetailList = (id: string, set: SetList) => {
  const requestedSongList: SetListSongItemDetail[] = []
  set.list.forEach((item, index) => {
    const [title, remark] = item.split('|', 2).map(i => i.trim())
    const slug = nameSlugDict[title]
    if (!slug) {
      return
    }
    const meta = {
      title,
      slug,
      requested: remark?.includes('点歌'),
      ending: set.endingSong ? title === set.endingSong : index === set.list.length - 1,
      setId: id,
      setIndex: index,
      date: set.date,
      tour: set.tour,
      place: set.place,
    } as SetListSongItemDetail
    requestedSongList.push(meta)
  })
  return requestedSongList
}

const generateSongStat = (rawList: SetListSongItemDetail[]) => {
  // order by amount, group by slug
  const slugDict: { [slug: string]: SongStat } = {}
  rawList.forEach(item => {
    if (!slugDict[item.slug]) {
      slugDict[item.slug] = {
        slug: item.slug,
        title: item.title,
        allList: [],
        requestedList: [],
        endingList: [],
      }
    }
    slugDict[item.slug].allList.push(item)
    if (item.requested) {
      slugDict[item.slug].requestedList.push(item)
    }
    if (item.ending) {
      slugDict[item.slug].endingList.push(item)
    }
  })
  return Object.values(slugDict).sort((a, b) => (b.allList.length - a.allList.length) || a.slug.localeCompare(b.slug))
}

export const setListSongDetailList = entries.map(entry => generateSetListSongItemDetailList(entry.id, entry.data)).flat()
export const allSongStatList = generateSongStat(setListSongDetailList)
export const allTourDateList = entries.map(entry => entry.data.date).sort((a, b) => a.getTime() - b.getTime())
