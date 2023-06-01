export interface SongMeta {
  title: string
  slug: string
}

export interface SongGroup {
  key: string
  list: SongMeta[]
}