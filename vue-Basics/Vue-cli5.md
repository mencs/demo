---
title: vue-router参数传递
date: 2021-1-14
categories:
- vue-实战
tags:
- vue-实战
isShowComments: false
subSidebar: true
---

::: tip  路由之间的参数传递

- 在vue中的路由，能够帮助我们在一个Vue组件中实现**其他组件的相互切换。**
- 也就是说，可以通过**路由模块**，将制定的组件显示在**路由视图**中。如何实现**路由跳转**？

:::

1、设参（index.js）

```js
import Home from '../views/Home.vue'  /*  静态路由表 */
import User from '../views/User.vue'

export const routes = [
    {
        path: '/',
        component:Home
    },
    {
        path: '/User/:id',//设参
        component:User
    }
]
```

2、传参(跳转的地方)：

通过router-link的to访问路径时携带参数

```HTML
  <span> <router-link to="/User/2">用户</router-link> </span>
```

3、接参（跳转的地方）

![An images](/images/152.png) 