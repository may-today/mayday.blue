import limax from 'limax'

export const slugify = (str: string) => {
  return limax(str, {
    tone: false,
  })
}
