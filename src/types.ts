export interface SongMeta {
  title: string
  slug: string
  meta: {
    banlam?: boolean
  }
  content: string
}

export interface SongGroup {
  key: string
  list: SongMeta[]
}