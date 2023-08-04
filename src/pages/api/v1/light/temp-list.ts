import type { APIRoute } from 'astro'

export const get: APIRoute = () => {
  return {
    body: JSON.stringify([
      {
        title: '如果我们不曾相遇',
        author: '娃娃机',
        path: 'ru-guo-wo-men-bu-ceng-xiang-yu',
        song: 'ru-guo-wo-men-bu-ceng-xiang-yu',
        origin: true,
      }, {
        title: '倔强 (Live fly to 2023)',
        author: 'Bean Li',
        path: 'jue-jiang-live2023',
      }, {
        title: '香水 (Live)',
        author: '临山吟风Rikae',
        path: 'xiang-shui-live',
      }, {
        title: '玫瑰少年',
        author: '可能？不存在的',
        path: 'mei-gui-shao-nian-ke-neng',
        song: 'mei-gui-shao-nian',
        origin: true,
      }, {
        title: '任意门',
        author: '阿俊Antonio',
        path: 'ren-yi-men',
        song: 'ren-yi-men',
        origin: true,
      }, {
        title: '圣诞夜惊魂',
        author: 'Diu',
        path: 'sheng-dan-ye-jing-hun',
        song: 'sheng-dan-ye-jing-hun',
        origin: true,
      }, {
        title: '玫瑰少年',
        author: '阿俊Antonio',
        path: 'mei-gui-shao-nian',
        song: 'mei-gui-shao-nian',
        origin: true,
      }, {
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