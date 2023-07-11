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
  list: SongStorageMeta[]
}