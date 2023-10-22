export interface SongMeta {
  title: string
  slug: string
  meta: {
    year?: number
    album?: string
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
  recorder?: string
  list: string[]
}

export type SetListSongMeta = {
  type: 'song'
  index: number
  title: string
  slug?: string
  remark?: string
} | {
  type: 'text'
  text: string
  remark?: string
}

export interface RequestedSongMeta {
  title: string
  slug: string
  setId: string
  date: Date
  tour: string
  place: string
}

export interface SongStat {
  slug: string
  title: string
  amount: number
  metaList: RequestedSongMeta[]
}