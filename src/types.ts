export interface SongMeta {
  title: string
  slug: string
  meta: {
    year?: number
    album?: string
    lyricist?: string
    composer?: string
    banlam: boolean
    length?: number
    light: boolean
  }
}

export type SongStorage = SongMeta & {
  content: string
}

export type SongDetail = SongMeta & {
  detail: LyricLine[]
}

export interface LyricLine {
  time: number
  text: string
  isHighlight: boolean
  toneText?: string
  toneText2?: string
}

export interface SongGroup {
  key: string
  list: SongStorage[]
}

export interface SetList {
  date: Date
  tour: string
  startTime?: string
  endTime?: string
  place: string
  guest: string | null
  endingSong?: string
  recorder?: string
  list: string[]
}

export type SetListSongItem = {
  type: 'song'
  index: number
  title: string
  slug?: string
  remark?: string
  requested: boolean
}

export type SetListTextItem = {
  type: 'text'
  text: string
  remark?: string
}

export type SetListSongMeta = SetListSongItem | SetListTextItem

export type SetListSongItemDetail = {
  title: string
  slug: string
  requested: boolean
  ending: boolean
  setId: string
  setIndex: number
  date: Date
  tour: string
  place: string
}

export interface SongStat {
  slug: string
  title: string
  allList: SetListSongItemDetail[]
  requestedList: SetListSongItemDetail[]
  endingList: SetListSongItemDetail[]
}