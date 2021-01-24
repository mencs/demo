---
title: vue-http请求ajax--axios
date: 2021-1-14
categories:
- vue-实战
tags:
- vue-实战
isShowComments: false
subSidebar: true

---

::: tip  http请求ajax--axios

- 安装cnpm install --save axios vue-axios
- npm install

:::

![An images](/images/146.png) 

> main.js --- vue-cli2

```js
import Vue from 'vue' /* 导入vue组件 */
import App from './App.vue' /* 导入项目app.vue组件 */
import axios from 'axios' /* 全局导入 */
import VueAxios from 'vue-axios' /* 全局导入 */
import Header from './components/Header.vue'
import Content from './components/Content.vue'
import Bottom from './components/Bottom.vue'

// 全局注册了三个组件=》可以把组件拿来当标签一样使用
Vue.component('MyHeader',Header,)
Vue.component('MyContent',Content,)
Vue.component('MyBottom', Bottom)

Vue.use(axios,VueAxios) /* 使用起来的意思 */

new Vue({
  el: '#app',
  render: h => h(App)  /* es6写法让app.vue的内容展现在该div中 */
})

```

> main.js---vue-cli4.5

```js
import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'


// createApp(App).use(VueAxios,axios).mount('#app')原始写法
const  app = createApp(App)
app.use(VueAxios,axios)
app.mount('#app')
```

1、get请求

![An images](/images/147.png) 

2、post请求

![An images](/images/148.png) 

> get实例

```js
 props:['myname'],
     methods: {
       add () {
        var thant = this  //将获取后的this数据存进thant中否则会变
         this.$emit('newName',this.istext),
         this.axios.get("https://autumnfish.cn/api/joke/list?num=3")
         .then(function (Response) {
           thant.istext = Response.data.jokes[0]
             console.log(Response.data.jokes[0])//请求成功
         },function(err){
             console.log(err)//请求失败
         }) 
        }
     }
```

3、解决跨域问题

::: danger 什么是跨域

**这是浏览器对js的一种安全限制**，也就是说浏览器的页面内去访问其他服务器上的资源，就会出现跨域同源策略明确了什么情况是属于跨域。所谓跨域的同源策略指：**协议、域名、端口**完全相同；才是安全的。

:::