module.exports = {
  theme: 'reco',
  title: '系统文档使用手册',
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ['meta', { name: 'renderer', content: 'IE=edge' }],
  ],
  plugins: 
  [
  ['@vuepress-reco/vuepress-plugin-back-to-top'],/* 置顶 */
  ['@vuepress/active-header-links',true],
//    ["flowchart"], // 支持流程图
  ["vuepress-plugin-smooth-scroll"], // 平滑滚动
  ["@vuepress/nprogress"],/*  加载进度条 */
  ["reading-progress"],/*  阅读进度条 */
  ["vuepress-plugin-code-copy", true],/*  一键复制代码插件 */
  ["vuepress-plugin-boxx"],
],
markdown: {
   lineNumbers: true //是否在每个代码块的左侧显示行号
},
  themeConfig: {
    logo: '/images/05.png',
    subSidebar: 'auto',/* 子菜单自动展开 */
    // navbar: false
    nav: require("./nav.js"),
    sidebar: require("./sidebar.js"),
    lastUpdated: "最后更新时间", // string | boolean
    author: "M.EIP",
    blogConfig: {
      // 博客配置
      category: {
        location: 3,     // 在导航栏菜单中所占的位置，默认2
        text: '分类' // 默认文案 “分类”
      },
      tag: {
        location: 4,     // 在导航栏菜单中所占的位置，默认3
        text: '标签'      // 默认文案 “标签”
      }
    },
     //评论
    //  valineConfig: {
    //   appId: 'Yd0gNu8dB7JzEYpPs4Y9o8ij-gzGzoHsz',
    //   appKey: 'T9uq2xKTT7sgfJHa4VECly0f',
    //   placeholder: '248868532@qq.com!',
    //   notify: true, // 邮件提醒
    //   verify: true, // 验证码
    //   recordIP: true,
    //   showComment: false
    // },
     // 密钥
     keyPage: {
      keys: ['e10adc3949ba59abbe56e057f20f883e'], // 1.3.0 版本后需要设置为密文
      color: '#42b983', // 登录页动画球的颜色
      lineColor: '#42b983' // 登录页动画线的颜色
    }
  }
}