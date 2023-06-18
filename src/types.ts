export interface SongMeta {
  title: string
  slug: string
  meta: {
    banlam?: boolean
  }
  content: string
  detail?: LyricLine[]
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
  list: SongMeta[]
}