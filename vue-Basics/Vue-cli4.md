---
title: vue-router路由
date: 2021-1-14
categories:
- vue-实战
tags:
- vue-实战
isShowComments: false
subSidebar: true

---

::: tip  什么是路由?

- 在vue中的路由，能够帮助我们在一个Vue组件中实现**其他组件的相互切换。**
- 也就是说，可以通过**路由模块**，将制定的组件显示在**路由视图**中。如何实现**路由跳转**？

:::

:::  theorem  路由跳转

:::



### 1、路由安装

npm install vue-router -s

### 2、设计路由界面

![An images](/images/151.png) 

### 3、创建路由表（router——>index.js）

```js
import Home from '../views/Home.vue'  /*  静态路由表 */
import User from '../views/User.vue'

export const routes = [
    {
        path: '/',
        component:Home //注册组件
    },
    {
        path: '/User',
        component:User
    }
]
```

### 4、在main.js中注册路由表及使用路由模块



![An images](/images/146.png) 

### 5、app.vue路由连接及路由视图

::: danger 作用：

用来显示全部.vue组件的视图区域
:::

```html
  <!-- 路由占位符 路由视图-->

<router-view></router-view>
```

> app.vue(路由连接及路由视图)

```vue
<template>
  <div id="app">
    <div>
      <span> <router-link to="/"> 首页</router-link> </span>   //路由连接
      <span> <router-link to="/User">用户</router-link> </span>
    </div>
  

      <router-view></router-view> //路由占位符
  </div>
</template>

<script>
export default {
  name: 'app.vue',
  
}
</script>
<style>
</style>
```

> Home.vue

```html
<template>
  <div>
    我是Home.vue
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
```

> 实现效果（进入页面）



![An images](/images/149.png) 

> 点击用户切换了路由，并改变了页面内容

![An images](/images/150.png)