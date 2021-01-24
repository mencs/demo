---
title: vue-实例属性
date: 2021-1-14
categories:
- vue-实战
tags:
- vue-实战
isShowComments: false
subSidebar: true

---

::: tip 简介：

- 实例属性
- ref的使用：在vue中，往往使用ref属性来替代id属性的使用，快速获取页面元素。
- mount的使用

:::

---

::: danger  vue-实例属性

- 直接通过对象的方式调用**属性**，是来自于data或computed中的属性、
- 但el: ""、data:{}、methods:{}这种叫做**实例属性**

:::

---

:::  danger  mount的使用

- 实现了页面的元素和vue对象的动态绑定，之前都是通过el的方式绑定，也可以通过mount实例属性进行绑定。

:::

---



### 1、实例属性ref的用法：相当于id

```html
<div id="app">
  <button ref="mybtn" type="button" @click="add">点我</button>
</div>
</div>
<script>
new Vue({
     el:"#app",
     methods: {
       add () {
         this.$refs.mybtn.innerHTML= "我是id"  //获取id
        }
     }
  })
</script>
```

![An images](/images/117.png) 

![An images](/images/118.png) 



### 2、动态绑定vue实例到页面中

常规渲染页面

```html
<div id="app">
  
</div>
</div>
<script>
new Vue({
     el:"#app",
     template: '<h1>你好，世界！</h1>'
  })
</script>
```

![An images](/images/119.png) 

动态绑定实例

```html
<div id="app">
  
</div>
</div>
<script>
    var V1 = new Vue({
     template: '<h1>你好，世界！</h1>'
  })
     V1.$mount("#app")   //动态绑定实例到页面上
</script>
```

