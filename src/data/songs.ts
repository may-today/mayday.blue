import slug from 'limax'

const list = [
  '2012',
  '叫我第一名',
  '爱情万岁',
  '夜访吸血鬼',
]

export const songs = list.map((title) => ({
  title,
  slug: slug(title, {tone: false}),
}))