---
title: vue-bind
date: 2021-1-12
categories:
- vue-实战
tags:
- vue-实战
isShowComments: false
subSidebar: true


---

:::  tip 一、v-bind语法

​             **v-bind:href="link"简写:href="link"**

:::

不能用{{link}}作为属性值

```html
<div id="app">
   <a v-bind:href="link"> 百度</a>
</div>
<script>
new Vue({
  el: "#app",
  data: {
    link:"http://www.baidu.com"
  }
})
</script>

```

