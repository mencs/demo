---
title: vue-computed计算属性
date: 2021-1-12
categories:
- vue-实战
tags:
- vue-实战
isShowComments: false
subSidebar: true


---

::: tip  什么是计算属性

​          计算属性的突出重点在**属性**两个字上，简单点说，他就是一个能够将计算结果缓存起来的属性（**将行为转化成了静态的属性**），仅此而已。

:::

:::  theorem 作用：

- 一些常用的函数，可以缓存起来，在调用时直接使用缓存中的过程（结果）以此来提高效率。

- 不用每次都去调用函数去重复执行这个函数,使用计算属性缓存起来结果就行。

:::

::: danger 注意：

computed里虽然是函数，但在调用时，computed里的东西时一个属性，所以我们调用时不能使用（）因为（）是在调用函数，而不是在调用属性。

:::

一、计算属性与方法的区别

```html
<div id="app">
<p>方法中获取:{{add()}}</p>  //函数内加（）
<p>计算属性：{{add1}}</p>    //计算属性中没有括号
</div>
<script>
  var app = new Vue({
    el: "#app",
    data: {
    },
    methods:{ /*方法函数内 */
     add() {
      return new Date()
     }
    },
    computed: { /* 计算属性 */
      add1() {
     return new Date()
    }
    }
  })
</script>
```

![An images](/images/94.png) 