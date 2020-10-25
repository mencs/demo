
module.exports = {
  theme: 'reco',
  title: '系统文档使用手册',
  description: '荷尽已无擎雨盖，菊残犹有傲霜枝',
  head: [
    ['link', { rel: 'icon', href: '/images/05.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  //   plugins: [
  //   ['@vuepress-reco/vuepress-plugin-back-to-top'],
  //   ['@vuepress/active-header-links',true],
  //   ["flowchart"], // 支持流程图
  //   ["vuepress-plugin-smooth-scroll"],  // 平滑滚动
  //   ["@vuepress/nprogress"],           //加载进度条
  //   ["reading-progress"],             //阅读进度条
  //   ["vuepress-plugin-code-copy", true],   //一键复制代码插件
  //   ["vuepress-plugin-boxx"],
  // ],

  themeConfig: {
    logo: '/images/05.png',
    authorAvatar: '/images/02.png',
    author: "系统帮助手册",
    subSidebar: 'auto',        //子菜单自动展开
    nav: require("./nav.js"),
    sidebar: require("./sidebar.js"),
    evergreen: true,            /* ie */
    startYear: '2020.10.20',         // 项目开始时间
    record: '京ICP备17067634号-1',   // 备案号
    recordLink: 'https://www.baidu.com',
    cyberSecurityRecord: '公安部备案文案',
    cyberSecurityLink: 'https://www.baidu.com',
    lastUpdated: true,
    lastUpdated: "最后更新时间",    // string | boolean
    type: 'blog',        /* 开启首页显示reco样式 */
    search: true,        // 搜索设置
    searchMaxSuggestions: 8,
    blogConfig: {
      category: {
        location: 6,     // 在导航栏菜单中所占的位置，默认2
        text: 'Category' // 默认文案 “分类”
      },
      tag: {
        location: 7,     // 在导航栏菜单中所占的位置，默认3
        text: 'Tag'      // 默认文案 “标签”
      }
    },
    // 评论
    //  valineConfig: {
    //   appId: 'Yd0gNu8dB7JzEYpPs4Y9o8ij-gzGzoHsz',
    //   appKey: 'T9uq2xKTT7sgfJHa4VECly0f',
    //   placeholder: '248868532@qq.com!🎈',
    //   notify: true, // 邮件提醒
    //   verify: true, // 验证码
    //   recordIP: true,
    //   showComment: false
    //  },
    // Github链接
    // repo: 'mencs/demo',
    // repoLabel: "Github",
    // docsBranch: "login",
    // editLinks: true,
    // editLinkText: "在 Github 上编辑此页",
    // docsDir: 'docs',

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