import type { APIRoute } from 'astro'

export const GET: APIRoute = () => {
  return new Response(JSON.stringify([
    {
      title: '成名在望 (Life Live)',
      author: '一有',
      path: 'cheng-ming-zai-wang-lifelive',
    }, {
      title: '一颗苹果 (Life Live)',
      author: '一有',
      path: 'yi-ke-pin-guo-lifelive',
    }, {
      title: '终结孤单 (live fly to 2022)',
      author: 'Pre-Hello',
      path: 'zhong-jie-gu-dan-liveflyto2022',
    }, {
      title: '拥抱 (Live) (天空之城 复出演唱会)',
      author: 'Ichigo_',
      path: 'yong-bao-tian-kong-zhi-cheng-live',
    }, {
      title: '疯狂世界 #MaydayBlue20th',
      author: 'HL希望的活',
      path: 'feng-kuang-shi-jie-live20',
    }, {
      title: 'OAOA (现在就是永远) (Live)',
      author: '豆豆',
      path: 'oaoa-xian-zai-jiu-shi-yong-yuan-live-dou-dou',
    }, {
      title: '温柔 (Live)',
      author: '豆豆',
      path: 'wen-rou-live-dou-dou',
    }, {
      title: '孙悟空 (Live)',
      author: '豆豆',
      path: 'sun-wu-kong-live-dou-dou',
    }, {
      title: '派对动物 + 离开地球表面 (live in the sky)',
      author: '豆豆',
      path: 'pai-dui-dong-wu-li-kai-di-qiu-biao-mian-liveinthesky',
    }, {
      title: '诺亚方舟 (live in the sky)',
      author: '豆豆',
      path: 'nuo-ya-fang-zhou-liveinthesky',
    }, {
      title: '你的神曲',
      author: '豆豆',
      path: 'ni-de-shen-qu',
      song: 'ni-de-shen-qu',
      origin: true,
    }, {
      title: '玫瑰少年 (Live)',
      author: '豆豆',
      path: 'mei-gui-shao-nian-live-dou-dou',
    }, {
      title: '恋爱ing (Live)',
      author: '豆豆',
      path: 'lian-ai-inglive-dou-dou',
    }, {
      title: '爱情万岁 (Live)',
      author: '豆豆',
      path: 'ai-qing-wan-sui-live-dou-dou',
    }, {
      title: '盛夏光年 (Live)',
      author: '豆豆',
      path: 'sheng-xia-guang-nian-live',
    }, {
      title: '五月天诺亚方舟 (台版)',
      author: 'CheerXu',
      path: 'wu-yue-tian-nuo-ya-fang-zhou-tai-ban',
    }, {
      title: '五月天DNA创造演唱会',
      author: '叶智文',
      path: 'wu-yue-tian-dna-chuang-zao-yan-chang-hui',
    }, {
      title: '2012 (Live)',
      author: 'BGG',
      path: '2012live',
    }, {
      title: '温柔 (还你自由版)',
      author: '可能？不存在的',
      path: 'wen-rou-hai-ni-zi-you',
    }, {
      title: '永远的永远+勇敢+出头天',
      author: 'CheerXu',
      path: 'yong-yuan-de-yong-yuan-yong-gan-chu-tou-tian',
    }, {
      title: '透露',
      author: '北海道布丁奶',
      path: 'tou-lu',
      song: 'tou-lu',
      origin: true,
    }, {
      title: '夜访吸血鬼 (Live fly to 2023)',
      author: '蜂鸟',
      path: 'ye-fang-xi-xue-gui-live2023',
    }, {
      title: '五月天诺亚方舟 (内地版)',
      author: '懒咩咩&Ryan',
      path: 'wu-yue-tian-nuo-ya-fang-zhou-nei-di-ban',
    }, {
      title: '人生海海',
      author: '临山吟风Rikae',
      path: 'ren-sheng-hai-hai',
      song: 'ren-sheng-hai-hai',
      origin: true,
    }, {
      title: 'OAOA (现在就是永远)',
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
  ]))
}