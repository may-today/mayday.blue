export interface SongMeta {
  title: string
  slug: string
  meta: {
    banlam: string
  }
}

export interface SongGroup {
  key: string
  list: SongMeta[]
}