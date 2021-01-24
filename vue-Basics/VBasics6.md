---
title: vue-事件
date: 2021-1-12
categories:
- vue-实战
tags:
- vue-实战
isShowComments: false
subSidebar: true

---

:::  tip 一、vue-事件

:::

[[toc]]

### 一、vue中的事件

1、点击数值+1

```html
<div id="app">
  <input type="button" value="点击" v-on:click="add">
  <p v-text="num"></p>
</div>
<script>
new Vue({
  el: "#app",
  data: {
    num: 0
  },
  methods:{
   add: function() {
     this.num ++
   }
  }
})
</script>

```



![An images](/images/88.png) 



2、鼠标悬停事件

```
<p v-on:mousemove="addd"></p>
```

![An images](/images/89.png) 



### 二、事件的参数传递分成三部分

```html
<div id="app">
  <input type="button" value="点击" v-on:click="add(8)">  //设参数8
  <p v-text="num"></p>
</div>
<script>
new Vue({
  el: "#app",
  data: {
    num: 0
  },
  methods:{
   add: function(chuancan) {          //传参：chuancan
     this.num += chuancan             //用参
   }
  }
})
</script>
```

![An images](/images/90.png) 

设参：

   <input type="button" value="点击" v-on:click="add(8)">

传参：

 add: function(chuancan) {  )}

用参：

  this.num += chuancan 

### 三、事件修饰符

- @click.stop 阻止点击事件的传播
- @mousemove.stop阻值鼠标移动事件
- @keyup.space  空格键触发
- @keyup.enter    回车键触发
- @ ...............

回车键触发：

```html
 <input type="text"  v-on:keyup.enter="add">
```

空格修饰符：

比如用户姓名不能有空格

```html
<div id="app">
  <input type="text" v-on:keyup.space="add()"> //输入框出现空格时触发
</div>
<script>
new Vue({
  el: "#app",
  data: {
  },
  methods:{
   add: function() {
     alert("不能有空格")
   }
  }
})
</script>
```

![An images](/images/91.png) 