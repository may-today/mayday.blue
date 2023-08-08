import type { APIRoute } from 'astro'

export const get: APIRoute = () => {
  return {
    body: JSON.stringify([
      {
        title: '五月天诺亚方舟绿色版',
        author: '懒咩咩&Ryan',
        path: 'wu-yue-tian-nuo-ya-fang-zhoulse-ban',
      }, {
        title: '人生海海',
        author: '临山吟风Rikae',
        path: 'ren-sheng-hai-hai',
        song: 'ren-sheng-hai-hai',
        origin: true,
      }, {
        title: 'OAOA（现在就是永远）',
        author: 'JZH',
        path: 'oaoa-xian-zai-jiu-shi-yong-yuan',
        song: 'oaoa-xian-zai-jiu-shi-yong-yuan',
        origin: true,
      }, {
        title: '少年他的奇幻漂流',
        author: '娃娃机',
        path: 'shao-nian-ta-de-qi-huan-piao-liu',
        song: 'shao-nian-ta-de-qi-huan-piao-liu',
        origin: true,
      }, {
        title: '转眼',
        author: '娃娃机',
        path: 'zhuan-yan',
        song: 'zhuan-yan',
        origin: true,
      }, {
        title: '第二人生',
        author: 'Mayei',
        path: 'di-er-ren-sheng',
        song: 'di-er-ren-sheng',
        origin: true,
      }, {
        title: '孙悟空 (Live)',
        author: 'wm阿洪&Diu',
        path: 'sun-wu-kong-live',
      }, {
        title: '笑忘歌',
        author: 'Mayei',
        path: 'xiao-wang-ge',
        song: 'xiao-wang-ge',
        origin: true,
      }, {
        title: '倔强',
        author: '可能？不存在的',
        path: 'jue-jiang',
        song: 'jue-jiang',
        origin: true,
      }, {
        title: '伤心的人别听慢歌',
        author: '临山吟风Rikae',
        path: 'shang-xin-de-ren-bie-ting-man-ge',
        song: 'shang-xin-de-ren-bie-ting-man-ge',
        origin: true,
      }, {
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