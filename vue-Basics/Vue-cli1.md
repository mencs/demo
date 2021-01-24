---
title: webpack-simple项目结构
date: 2021-1-14
categories:
- vue-实战
tags:
- vue-实战
isShowComments: false
subSidebar: true

---

::: tip  webpack-simple模板项目

- 以“.vue”为扩展名的内容（文件），实际上就是一个Vue对象。也称为Vue组件
- 在vue组件中使用多个vue组件搭建一个页面

:::

![An images](/images/126.png) 

> 项目结构

### 一、index.html

无论前端页面有多复杂，index.html都只有11行

### 二、main.js整个Vue项目的入口

```js
import Vue from 'vue' /* 导入vue组件 */
import App from './App.vue' /* 导入项目app.vue组件 */

new Vue({
  el: '#app',
  render: h => h(App)  /* es6写法让app.vue的内容展现在该div中 */
})

```

---

### 三、.vue文件（vue组件）组成部分

> 万事万物皆组件

以“.vue”为扩展名的内容（文件），实际上就是一个Vue对象。也称为Vue组件

![An images](/images/127.png) 



### 四、vue全局注册组件



::: danger 全局注册组件

在main.js中，通过import和Vue.component配合，来将.vue文件注册成为一个标签。该标签可以在整个项目中使用。

:::

1、创建三个.vue组件

![An images](/images/128.png) 

2、导入组件并全局注册组件

![An images](/images/129.png)

3、App.vue中使用全局注册的组件

 ![An images](/images/130.png)

---

效果图：

 ![An images](/images/131.png)

---

### 五、vue 本地注册组件



::: warning 本地注册组件

   本地注册的组件，只能本页面内使用。

:::

1、本地注册

 ![An images](/images/131.png)

2、效果图

 ![An images](/images/132.png)