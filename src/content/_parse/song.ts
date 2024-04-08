import { getCollection } from 'astro:content'
import { slugify } from '@/utils'
import type { SongMeta, SongGroup, LyricLine, SongStorage, SongDetail } from '@/types'

const entries = await getCollection('lyrics')

const rawSongsList = entries.map((entry) => ({
  title: entry.id.replace('.md', '') as string,
  slug: slugify(entry.slug),
  meta: entry.data,
  content: entry.body
} as SongStorage))

function parseStorageToMeta(raw: SongStorage, showDetail: false): SongMeta
function parseStorageToMeta(raw: SongStorage, showDetail: true): SongDetail
function parseStorageToMeta(raw: SongStorage, showDetail: boolean): SongMeta | SongDetail {
  const firstLetter = raw.slug[0].toUpperCase()
  const index = Number.isInteger(Number(firstLetter)) ? '#' : firstLetter
  const songMeta = {
    title: raw.title,
    slug: raw.slug,
    index,
    meta: raw.meta,
  } as SongMeta
  if (showDetail) {
    return {
      ...songMeta,
      detail: parseContent(raw.content),
    } as SongDetail
  } else {
    return songMeta
  }
}

const parseContent = (content: string) => {
  const lyricLines = content.split('\n').map(line => {
    if (!line) return undefined
    // [time](highlight)text [toneText(|toneText2)]
    // [00:11]!我的心内感觉 [Gua e sim-lai kam-kak|wa e xin nai gan ga]
    const timeLineRegex = /^\[\d+:\d+(\.\d+)?\]/
    const toneTextRegex = /\[([^\]]+)\]$/
    const time = line.match(timeLineRegex)?.[0]
    const timeSecondRaw = Number(time?.match(/\d+:\d+(\.\d+)?/)?.[0].split(':').reduce((acc, cur, i) => acc + Math.floor(Number(cur)) * Math.pow(60, 1 - i), 0))
    const timeSecond = (isNaN(timeSecondRaw) || timeSecondRaw < 0) ? -1 : timeSecondRaw
    const rawText = line.replace(timeLineRegex, '').trim()
    const isHighlight = rawText.startsWith('!')
    const toneTextRaw = rawText.match(toneTextRegex)?.[1]
    const hasToneText2 = toneTextRaw?.includes('|')
    const toneText = hasToneText2 ? toneTextRaw?.split('|')[0] : toneTextRaw
    const toneText2 = hasToneText2 ? toneTextRaw?.split('|')[1] : undefined
    const text = toneText ? rawText.replace(toneTextRegex, '') : rawText
    return {
      time: timeSecond,
      text: timeSecond === 0 ? '' : text.replace(/^\!/, '').replaceAll('  ', '\u00a0\u00a0').trim(),
      isHighlight,
      toneText: toneText?.replaceAll('  ', '\u00a0\u00a0') || undefined,
      toneText2: toneText2?.replaceAll('  ', '\u00a0\u00a0') || undefined,
    } as LyricLine
  }).filter(line => line) as LyricLine[]
  return lyricLines
}

const generateGroupedList = (songsList: SongStorage[]) => {
  const groupedDict = {} as Record<string, SongStorage[]>
  songsList.forEach((song) => {
    const currentSong = { ...song }
    const firstLetter = currentSong.slug[0].toUpperCase()
    if (Number.isInteger(Number(firstLetter))) {
      if (!groupedDict['#']) {
        groupedDict['#'] = []
      }
      groupedDict['#'].push(currentSong)
      return
    }
    if (!groupedDict[firstLetter]) {
      groupedDict[firstLetter] = []
    }
    groupedDict[firstLetter].push(currentSong)
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

const generateDict = <T extends SongMeta | SongDetail>(detailList: T[]) => {
  const detailDict = {} as Record<string, T>
  detailList.forEach((song) => {
    detailDict[song.slug] = song
  })
  return detailDict
}

const generateNameSlugDict = (rawSongsList: SongStorage[]) => {
  const nameSlugDict = {} as Record<string, string>
  rawSongsList.forEach((song) => {
    nameSlugDict[song.title] = song.slug
  })
  return nameSlugDict
}

export const groupedList = generateGroupedList(rawSongsList)
export const metaList = rawSongsList.map(item => parseStorageToMeta(item, false)).sort((a, b) => a.slug.localeCompare(b.slug))
export const detailList = rawSongsList.map(item => parseStorageToMeta(item, true)).sort((a, b) => a.slug.localeCompare(b.slug))
export const metaDict = generateDict(metaList)
export const detailDict = generateDict(detailList)
export const nameSlugDict = generateNameSlugDict(rawSongsList)
