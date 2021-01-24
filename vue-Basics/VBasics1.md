---
title: vue-差值表达式用法
date: 2021-1-12
categories:
- vue-实战
tags:
- vue-实战
isShowComments: false
subSidebar: true
---

::: tip 什么是vue

用于构建用户界面的渐进式js框架,只注重视图层，结合了Html+css+js,非常的易用，并且有很好的生态系统，而且vue体积很小，速度很快，优化很到位

:::

vue改变内容差值表达式语法：{{}}

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- 开发环境版本，包含了有帮助的命令行警告 -->
   <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
   <script src="https://cdn.staticfile.org/axios/0.18.0/axios.min.js"></script>
</head>

<body>
<div id="app">
  <p>{{name}}</p>   // 差值表达式
</div>
<script>
  new Vue ({        //({})采用json格式使用大括号包裹，里面放了多个 键值对，多个键值用,号分割。
      el: "#app",   //element元素绑定的意思
      data: {
       name: "哈喽"  //后面是通过发送AJaX请求获取网络数据。
      }
      methods: {
      方法里面也是键值对
     }
  })
</script>
</body>
</html>
```

一、差值表达式{{name}}

作用：差值表达式的作用是在view中获得Model中的内容

- vue对象中的属性是data提供的
- vue对象中的方法是methods提供

::: tip 注意：

差值表达式不能写在html标签中，不能作为属性值的部分  `<a href="{{link}}"></a>`

:::

1、差值表达式写法

```html
<div id="app">
  <p>
    {{name}}  //文本
    {{[0,1,2,3][2]}}  //数组
    {{{name:'张三',age:'18'}.name}} //对象
    {{add()}}  //方法
  </p>
</div>
```

实例：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- 开发环境版本，包含了有帮助的命令行警告 -->
   <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
   <script src="https://cdn.staticfile.org/axios/0.18.0/axios.min.js"></script>
</head>

<body>
<div id="app">
  <p>
    {{name}}   <br>
    {{listARR[2]}}    <br>
    {{{name:'张三',age:'18'}.name}}
    {{add()}}
  </p>
</div>
<script>
  new Vue ({
      el: "#app",
      data: {
       name: "哈喽",
       listARR:['云南','昆明','曲靖','宣威']
      },
      methods: {
       add: function() {
         alert("我是一个VUE")
       }
      }
  })
</script>
</body>
</html>
```

效果图：

![An images](/images/83.png) 

![An images](/images/84.png) 



二、差值表达式三元运算

1、差值表达式中如果reslt>10则显示result大于10否则小于10

```html
<div id="app">
  <input type="button" value="点击" v-on:click="add(2)">
  <p v-text="num"></p>
  <p>{{result>10? 'result大于10':'result小于10'}}</p>
  </div>
<script>
new Vue({
  el: "#app",
  data: {
    num: 0,
    lis: 1,
    result:''
  },
  methods:{
   add: function(chuancan) {
     this.num += chuancan + this.lis
     this.result = this.num
   }
  }
})
</script>
```

![An images](/images/92.png) 

2、方法里面三元表达式写法：

```html
<div id="app">
  <input type="button" value="点击" v-on:click="add(2)">
  <p v-text="num"></p>
  <p>{{result}}</p>
  </div>
<script>
new Vue({
  el: "#app",
  data: {
    num: 0,
    lis: 1,
    result:''
  },
  methods:{
   add: function(chuancan) {
     this.num += chuancan + this.lis
     this.result = this.num>10? 'result大于10':'result小于10'
   }
  }
})
</script>
```

3、方法里面一般写法

```html
<div id="app">
  <input type="button" value="点击" v-on:click="add(2)">
  <p v-text="num"></p>
  <p>{{result}}</p>
  </div>
<script>
new Vue({
  el: "#app",
  data: {
    num: 0,
    lis: 1,
    result:''
  },
  methods:{
   add: function(chuancan) {
     this.num += chuancan + this.lis
     if(this.num>10) {
      this.result = '大于10'
     }else{
       this.result = '小于10'
     }
   }
  }
})
</script>
```

![An images](/images/93.png) 