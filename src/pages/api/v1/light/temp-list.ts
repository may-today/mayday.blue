import type { APIRoute } from 'astro'

export const get: APIRoute = () => {
  return {
    body: JSON.stringify([
      {
        title: '五月天人生无限公司',
        author: 'CheerXu',
        path: 'wu-yue-tian-ren-sheng-wu-xian-gong-si',
      }, {
        title: '恋爱ing',
        author: 'Diu',
        path: 'lian-ai-ing',
        song: 'lian-ai-ing',
        origin: true,
      }, {
        title: '终结孤单',
        author: 'Diu',
        path: 'zhong-jie-gu-dan',
        song: 'zhong-jie-gu-dan',
        origin: true,
      }, {
        title: '三个傻瓜',
        author: 'Diu',
        path: 'san-ge-sha-gua',
        song: 'san-ge-sha-gua',
        origin: true,
      },
    ])
  }
}