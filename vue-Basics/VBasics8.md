---
title: vue-watch的用法:监控
date: 2021-1-12
categories:
- vue-实战
tags:
- vue-实战
isShowComments: false
subSidebar: true



---

::: tip  watch的用法:监控

​       watch用于**监控参数的变化**，并调用函数，newVal是能获取参数新值，oldVal是参数老的值。

:::

1、watch方法当参数“name”改变时立即触发函数

```html
<div id="app">
  <input type="text" v-model="name">
</div>
<script>
  new Vue({
    el:"#app",
     data: {
       name: "张三"
     },
     watch: { //监控参数name的变化
       name () {
         console.log("我改变了")
       }
     }
  })
</script>
```

![An images](/images/95.png) 

2、newVal是能获取参数新值，oldVal是参数老的值

```html
<div id="app">
  <input type="text" v-model="name">
</div>
<script>
  new Vue({
    el:"#app",
     data: {
       name: "张三"
     },
     watch: {
       name (newVal,oldVal) {
         console.log('新值:'+newVal + '旧值:'+ oldVal)
       }
     }
  })
</script>
```

旧值：张三   新值：张三李四

![An images](/images/96.png) 