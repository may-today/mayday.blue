import { getCollection } from 'astro:content'
import { slugify } from '@/utils'
import type { SongMeta, SongGroup, LyricLine } from '@/types'

const entries = await getCollection('lyrics')

const rawSongsList = entries.map((entry) => ({
  title: entry.id.replace('.md', '') as string,
  slug: slugify(entry.slug),
  meta: entry.data,
  content: entry.body
} as SongMeta))

const parseContent = (content: string) => {
  const lyricLines = content.split('\n').map(line => {
    // [time](highlight)text [toneText(|toneText2)]
    // [00:11]!我的心内感觉 [Gua e sim-lai kam-kak|wa e xin nai gan ga]
    const timeLineRegex = /^\[\d{2}:\d{2}(\.\d+)?\]/
    const toneTextRegex = /\[([^\]]+)\]$/
    const time = line.match(timeLineRegex)?.[0]
    const timeSecond = Number(time?.match(/\d{2}:\d{2}(\.\d+)?/)?.[0].split(':').reduce((acc, cur, i) => acc + Number(cur) * Math.pow(60, 1 - i), 0))
    const rawText = line.replace(timeLineRegex, '').trim()
    const isHighlight = rawText.startsWith('!')
    const toneTextRaw = rawText.match(toneTextRegex)?.[1]
    const hasToneText2 = toneTextRaw?.includes('|')
    const toneText = hasToneText2 ? toneTextRaw?.split('|')[0] : toneTextRaw
    const toneText2 = hasToneText2 ? toneTextRaw?.split('|')[1] : undefined
    const text = toneText ? rawText.replace(toneTextRegex, '') : rawText
    return {
      time: timeSecond,
      text: text.replace(/^\!/, '').replaceAll('  ', '\u00a0\u00a0').trim(),
      isHighlight,
      toneText: toneText?.replaceAll('  ', '\u00a0\u00a0') || undefined,
      toneText2: toneText2?.replaceAll('  ', '\u00a0\u00a0') || undefined,
    } as LyricLine
  })
  return lyricLines
}

const generateGroupedList = (songsList: SongMeta[], generateDetail: boolean) => {
  const groupedDict = {} as Record<string, SongMeta[]>
  songsList.forEach((song) => {
    const currentSong = { ...song}
    const firstLetter = currentSong.slug[0].toUpperCase()
    if (generateDetail) {
      currentSong.detail = parseContent(currentSong.content)
    }
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

export const groupedList = generateGroupedList(rawSongsList, false)
export const groupedListWithDetail = generateGroupedList(rawSongsList, true)
