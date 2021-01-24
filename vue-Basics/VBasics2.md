---
title: vue-model
date: 2021-1-12
categories:
- vue-实战
tags:
- vue-实战
isShowComments: false
subSidebar: true
---

::: tip Vue中的关键字

这些关键字都是作为html页面的标签中的属性

:::

1、v-model

是将标签的value值与vue实例中的data属性值进行绑定

```html
<div id="app">
  <input type="text" v-model="name">
  <p>
    {{name}}
  </p>
</div>
<script>
  new Vue ({
      el: "#app",
      data: {
       name: "哈喽",
      }
```

![An images](/images/85.png) 