---
title: vue-once
date: 2021-1-12
categories:
- vue-实战
tags:
- vue-实战
isShowComments: false
subSidebar: true



---

::: tip 一、v-once语法

​          **只获取一次数据。**

:::

p标签中只会显示哈哈哈

```html
<div id="app">
  <input type="text" v-model="name">
  <p v-once >{{name}}</p>
</div>
<script>
new Vue({
  el: "#app",
  data: {
    name: "哈哈哈",

```

