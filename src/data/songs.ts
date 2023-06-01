import slug from 'limax'
import allSongs from './all-songs.yml'

export const songs = allSongs.map((title: string) => ({
  title,
  slug: slug(title, {tone: false}),
}))