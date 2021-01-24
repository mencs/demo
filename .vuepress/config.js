
module.exports = {
  theme: 'reco',
  title: '系统文档使用手册',
  description: '荷尽已无擎雨盖，菊残犹有傲霜枝',
  base: '/demo10/',
  head: [
    ['link', { rel: 'icon', href: '/images/05.ico' }],
    ['link', { rel: 'stylesheet', href: '/css/style.css' }],
    // ['script', {charset: 'utf-8', src:'/js/randomRibbon.js'}], /* 彩色彩带 */
    ["script", {
      "language": "javascript",
      "type": "text/javascript",
      "src": "https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js",
    }],  /* 引入jquery */
    ['script', { charset: 'utf-8', src: '/js/index.js' }], /* 鼠标点击样式 */
    ['script', { "type": "text/javascript","language": "javascript", src: "https://cdn.jsdelivr.net/npm/promise-polyfill@7/dist/polyfill.min.js" }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
    plugins: [
    ['@vuepress-reco/vuepress-plugin-back-to-top'],
    // ['@vuepress/medium-zoom'],
    ['@vuepress/active-header-links'],
    // ["flowchart"], // 支持流程图
    ["@vuepress/nprogress"],           //加载进度条
    ["reading-progress"],             //阅读进度条
    ["vuepress-plugin-boxx"],
    // 自动更新插件
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: {
          message: "发现新内容可用",
          buttonText: "刷新"
      }
  }],
    // 动态标题
    ["dynamic-title",
      {
        showIcon: "vuepress/smile.ico",
        showText: "(0.0)欢迎帅哥美女！",
        hideIcon: "vuepress/cry.ico",
        hideText: "(●—●)呜呜，不要走嘛！！",
        recoverTime: 2000
    }],
    // 代码复制弹窗插件
    ["vuepress-plugin-nuggets-style-copy", {
      copyText: "复制代码",
      tip: {
          content: "复制成功!"
      }
    }],
    /* 弹窗公告插件*/
    ["@vuepress-yard/vuepress-plugin-window"],
    // 音乐插件
    ['vuepress-plugin-meting', {
      meting: {
        // 网易
        server: "netease",
        // 读取歌单
        type: "playlist",
        mid: "3163124542",
      },          
      // 不配置该项的话不会出现全局播放器
      aplayer: {
        // 吸底模式
        fixed: true,
        mini: true,
        // 自动播放
        autoplay: true,
        // 歌曲栏折叠
        listFolded:true,
        // 颜色
        theme: '#67cc86',
        // 播放顺序为随机
        order: 'list',
        // 初始音量
        volume: 0.7,
        // 歌词显示
        lrcType: 3
      },
      mobile :{
        // 手机端去掉cover图
        cover:true,
      }
    }],
  //   [
  //     '@vuepress-reco/vuepress-plugin-bgm-player',  // BGM播放器
  //     {
  //       audios: [
  //          // 网络文件示例
  // {
  //   name: 'Old Chinese Song',
  //   artist: 'Kitti Kuremanee',
  //   url: '/music/Kitti.mp3',
  //   cover: '/music/Kitti.png'
  // },
  // {
  //   name: 'Far Away From Home',
  //   artist: 'Groove Coverage',
  //   url: '/music/Groove.mp3',
  //   cover: '/music/Groove.png'
  // }
  //       ],
  //     },
  //   ],
    ["vuepress-plugin-smooth-scroll"],  // 平滑滚动
  ],
  locales: {
    '/': {
      lang: 'zh-CN' /* 语言默认简体中文 */
    }
  },
  themeConfig: {
    logo: '/images/01.png',
    authorAvatar: '/images/01.png',
    author: "系统帮助手册",
    activeHeaderLinks: false, // 默认值：true，URL地址显示滚动标题
    subSidebar: 'auto',        //子菜单自动展开
    nav: require("./nav.js"),
    sidebar: require("./sidebar.js"),
    // displayAllHeaders: true ,    /* 显示所有页面的标题链接 */
    huawei: true, /* 华为文案 */
    sidebarDepth: 0,
    evergreen: true,            /* ie */
    startYear: '2020',         // 项目开始时间
    record: '京ICP备17067634号-1',   // 备案号
    recordLink: 'https://www.baidu.com',
    cyberSecurityRecord: '公安部备案文案',
    cyberSecurityLink: 'https://www.baidu.com',
    lastUpdated: true,
    lastUpdated: "最后更新时间",    // string | boolean
    type: 'blog',        /* 开启首页显示reco样式 */
    mode: 'light',  //默认显示白天模式
    search: true,        // 搜索设置
    searchMaxSuggestions: 8,
    locales: {         /*  blog主题首页英文改成中文 */
      '/': {
        recoLocales: {
          homeBlog: {
            article: '文章', // 默认 文章
            tag: '标识', // 默认 标签
            category: '类别', // 默认 分类
            friendLink: '友链' // 默认 友情链接
          },
          pagation: {
            prev: '上一页',
            next: '下一页',
            go: '前往',
            jump: '跳转至'
          }
        }
      }
    },
    blogConfig: {
      tag: {
        location: 4,     // 在导航栏菜单中所占的位置，默认3
        text: '标签'      // 默认文案 “标签”
      },
      category: {
        location: 4,     // 在导航栏菜单中所占的位置，默认2
        text: '分类' // 默认文案 “分类”
      }
    },
    friendLink: [
      {
        title: '梦华信息-demo',
        desc: '提供给用户一个平台+若干应用，个性化需求提供商。',
        logo: "https://mcyava.cn/Website/assets/img/5.ico",
        link: 'https://mcyava.cn/Website/'
      },
      {
        title: 'Vue-电子商务',
        desc: 'Enjoy when you can, and endure when you must.',
        logo: "https://mcyava.cn/demo10/images/02.png",
        link: 'http://mcyava.cn:8080'
      },
      // ..友链
    ],
    // 评论
     valineConfig: {
      appId: 'Yd0gNu8dB7JzEYpPs4Y9o8ij-gzGzoHsz',
      appKey: 'T9uq2xKTT7sgfJHa4VECly0f',
      placeholder: '填写邮箱可收到回复提醒哦🎈',
      notify: true, // 邮件提醒
      verify: true, // 验证码
      recordIP: true,
      showComment: false
     },
    // Github链接
    repo: 'mencs/demo',
    repoLabel: "Github",
    docsBranch: "login",
    editLinks: true,
    editLinkText: "在 Github 上编辑此页",
    docsDir: 'docs',

    // 密钥
    // keyPage: {
    //   keys: ['e10adc3949ba59abbe56e057f20f883e'], // 1.3.0 版本后需要设置为密文
    //   color: '#42b983', // 登录页动画球的颜色
    //   lineColor: '#42b983' // 登录页动画线的颜色
    // }
  },
  markdown: {
    lineNumbers: true //是否在每个代码块的左侧显示行号
  },

}