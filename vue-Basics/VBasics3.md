---
title: vue-on
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

一、v-on

通过具体的事件名，来绑定vue中定义的函数，传参数需要带括号

```html
<div id="app">
  <input type="text" v-model="name" v-on:input="add">
  <p>
    {{name}}
  </p>
</div>
<script>
  new Vue ({
      el: "#app",
      data: {
       name: "哈喽",
      },
      methods: {
       add: function() {
         alert("我是一个VUE")
       }
      }
  })
```

![An images](/images/86.png) 

二、v-on补充知识：

比如在响应函数里，可以指明使用event内置参数对象。该对象表示当前事件，可以通过event.target.value获取当前事件对象的value的值

```html
<div id="app">
  <input type="text" v-model="name" v-on:input="add">
  <p>
    {{name}}
  </p>
</div>
<script>
  new Vue ({
      el: "#app",
      data: {
       name: "哈喽",
      },
      methods: {
       add: function(event) {   //event内置函数
         console.log(event.target.value) //获取input输入内容
           this.name = event.target.value //与v-model一样效果
       }
      }
  })
</script>
```

![An images](/images/87.png) 

1、this的用法

this表示当前Vue对象“new Vue()”，可以通过“this”来调用vue对象的属性和方法。

2、v-on还可以简写

v-on:input="add"简写@input="add"