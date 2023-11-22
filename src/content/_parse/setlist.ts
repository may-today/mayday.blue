import { getCollection } from 'astro:content'
import { nameSlugDict, metaDict } from '@/content/_parse/song'
import type { SetListSongItemDetail, SetList, SongStat } from '@/types'

const entries = await getCollection('setlists')

const generateSetListSongItemDetailList = (id: string, set: SetList) => {
  const detailList: SetListSongItemDetail[] = []
  set.list.forEach((item, index) => {
    const [title, remark] = item.split('|', 2).map(i => i.trim())
    const slug = nameSlugDict[title]
    if (!slug) {
      return
    }
    const meta = {
      slug,
      requested: !!remark?.includes('点歌'),
      ending: set.endingSong ? title === set.endingSong : index === set.list.length - 1,
      setId: id,
      setIndex: index,
      date: set.date,
      tour: set.tour,
      place: set.place,
    } as SetListSongItemDetail
    detailList.push(meta)
  })
  return detailList
}

const generateSongStat = (rawList: SetListSongItemDetail[]) => {
  // order by amount, group by slug
  const slugDict: { [slug: string]: SongStat } = {}
  rawList.forEach(item => {
    if (!slugDict[item.slug]) {
      slugDict[item.slug] = {
        title: metaDict[item.slug].title,
        slug: item.slug,
        allCount: 0,
        requestedCount: 0,
        endingCount: 0,
        allList: [],
      }
    }
    slugDict[item.slug].allList.push(item)
    slugDict[item.slug].allCount++
    if (item.requested) {
      slugDict[item.slug].requestedCount++
    }
    if (item.ending) {
      slugDict[item.slug].endingCount++
    }
  })
  return Object.values(slugDict).sort((a, b) => (b.allList.length - a.allList.length) || a.slug.localeCompare(b.slug))
}

const generateDict = <T extends { slug: string }>(detailList: T[]) => {
  const detailDict = {} as Record<string, T>
  detailList.forEach((song) => {
    detailDict[song.slug] = song
  })
  return detailDict
}

export const setListSongDetailList = entries.map(entry => generateSetListSongItemDetailList(entry.id, entry.data)).flat()
export const allSongStatList = generateSongStat(setListSongDetailList)
export const songStatDict = generateDict(allSongStatList)
export const allTourDateList = entries.map(entry => entry.data.date).sort((a, b) => a.getTime() - b.getTime())
