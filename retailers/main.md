---
title: main.js
date: 2020-10-26
categories:
 - 电商系统
tags:
 - 
isShowComments: false
---

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/app.css'
import './assets/fonts/iconfont.css'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
// 导入table表格快捷输入
import TreeTable from 'vue-table-with-tree-grid'
// 全局导入图表v-charts
import VCharts from 'v-charts'
// 导入加载进度条效果包js和css
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 配置登录请求的根路径
import axios from 'axios'
axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/'
// 配置带有权限的访问
// 在request加载时展示进度条
axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  /* 最后必须return config */
  NProgress.start()/* 加载进度条 */
  return config
})
// response加载完毕时事件
axios.interceptors.response.use(config => {
  NProgress.done()/* 隐藏进度条 */
  return config
})
Vue.prototype.$http = axios
Vue.config.productionTip = false
// 导入table表格快捷输入
Vue.component('tree-table', TreeTable)
Vue.use(NProgress)
// 全局导入图表v-charts
Vue.use(VCharts)
// 将富文本编辑器注册为全局可用的组件
Vue.use(VueQuillEditor)
// 全局时间格式化
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  // 年月日
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  // 时分秒
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

