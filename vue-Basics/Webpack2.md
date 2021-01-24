---
title: Webpack-嵌套路由/路由重定向
date: 2021-1-14
categories:
- vue-实战
tags:
- vue-实战
isShowComments: false
subSidebar: true

---

::: tip 嵌套路由（子路由）

- 在路由组件内部，再嵌套路由


:::

一、路由重定向

```js

export default new Router ({ /* 向外暴露Router对象 */
    routes: [                 /* 对象构造器 */
    {
        path: '/login',
        component: Login,  /*  跳转的组件 */
        meta: {title: '登录' }    
    },
    {
        path: '/',
        name: 'Login',
        redirect: '/Login' /* 路由重定向 */
    },  
    {
        path: '/Logout',
        redirect: '/Login' /*退出 路由重定向 */
    },
```

> 退出路由重定向

``` js
  methods:{
    signout() {
        this.$router.push('/Logout')
    },
```



二、嵌套路由（子路由）

> Home.vue设置布局

![An images](/images/178.png) 

> 路由表中设置子路由及重定向

![An images](/images/177.png) 