---
title: vue-css中scoped属性
date: 2021-1-14
categories:
- vue-实战
tags:
- vue-实战
isShowComments: false
subSidebar: true
---

::: tip  vue组件样式表的作用范围

- 在vue组件css中不加scoped属性，该样式作用在全部组件上
- 在vue组件css中加scoped属性，作用于单页面

:::

> 写法

```css
<style scoped>  //单页面必须加scoped
div{border:2px solid red} 
</style>
```

