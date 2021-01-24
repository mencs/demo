---
title: vue-改变样式
date: 2021-1-12
categories:
- vue-实战
tags:
- vue-实战
isShowComments: false
subSidebar: true




---

::: tip  vue-改变样式

​       

:::

### 一、通过v-bind动态改变元素属性class

```html
<style>
div{width: 400px;height: 500px;background-color: black;}
.cc{width: 400px;height: 200px;background-color: red;}
</style>
<body>
<div id="app">
  <p v-bind:class="{cc:isshow}"></p>
  <input type="button" v-on:click="isshow = !isshow" value="点我">
</div>
<script>
  new Vue({
    el:"#app",
     data: {
      isshow: false
     }
  })
</script>
```

效果图

![An images](/images/97.png) ![An images](/images/98.png) 

### 二、通过计算属性computed改变vue属性样式

效果与上图一样。

:::  theorem  通过computed返回一个json对象

对象里面放着多个键值对

:::

```html
<style>
div{width: 400px;height: 500px;background-color: black;}
.cc{width: 400px;height: 200px;background-color: red;}
</style>
<body>
<div id="app">
  <p v-bind:class="isclass"></p>
  <input type="button" v-on:click="isshow = !isshow" value="点我">
</div>
<script>
  new Vue({
    el:"#app",
     data: {
      isshow: false
     },
     computed: {
       isclass:function(){
         return {
          cc:this.isshow
         }
       }
     }
  })
</script>
```

### 三、通过v-bind双向数据绑定修改vue属性样式



```html
<style>
div{width: 400px;height: 500px;background-color: black;}
.red{width: 400px;height: 200px;background-color: red;}
.blue{width: 400px;height: 200px;background-color: blue;}
.yellow{width: 400px;height: 200px;background-color: yellow;}
</style>
<body>
<div id="app">
  <p v-bind:class="iscolor" >背景颜色:{{iscolor}}</p>
  <input type="text" v-model="iscolor" >
</div>
<script>
  new Vue({
    el:"#app",
     data: {
      iscolor: "red"
     },
  })
</script>
```

效果图：

 ![An images](/images/99.png)  ![An images](/images/100.png)  

![An images](/images/101.png) 



### 四、多样式写法（使用数组）

:class="[iscolor,isborder]"

```html
<style>
div{width: 400px;height: 500px;background-color: black;}
.red{width: 400px;height: 200px;background-color: red;}
.blue{width: 400px;height: 200px;background-color: blue;}
.border1{border: 3px solid yellow;}
</style>
<body>
<div id="app">
  <p v-bind:class="[iscolor,isborder]" >背景颜色:{{iscolor}}</p>
  <input type="text" v-model="iscolor" >
</div>
<script>
  new Vue({
    el:"#app",
     data: {
      iscolor: "red",
      isborder:"border1"
     },
  })
</script>
```

::: danger 注意

多样式不能写成:class="iscolor" :class="isborder"要使用数组包裹。

:::

效果图：

![An images](/images/102.png) 



### 五、内嵌使用style值vue的写法

::: danger 注意：

内嵌style引用了vue中的内容，因此是一个键值对，所以需要大括号，（json）对象的键时不能出现"background-color",因改成"backgroundColor"

:::

```html 
<style>
div{width: 400px;height: 500px;background-color: black;}
</style>
<body>
<div id="app">
  <p v-bind:style="{backgroundColor:iscolor}">背景颜色:{{iscolor}}</p>
  <input type="text" v-model="iscolor" >
</div>
<script>
  new Vue({
    el:"#app",
     data: {
      iscolor: "red",
     },
  })
</script>
```

1、多样式计算属性中写法样式写在computed里：

```html
<style>
div{width: 400px;height: 500px;background-color: black;}
</style>
<body>
<div id="app">
  <p v-bind:style="myiscolor">背景颜色:{{iscolor}}</p>
  <input type="text" v-model="iscolor" >
</div>
<script>
  new Vue({
    el:"#app",
     data: {
      iscolor: "red",
     },
     computed: {
       myiscolor: function (){
        return {
          backgroundColor:this.iscolor,
          height:300 + 'px'
        } 
       }
     }
  })
</script>
```

图：

![An images](/images/103.png) 

2、多样式style从vue中取值写法(数组)

```html
<style>
div{width: 400px;height: 500px;background-color: black;}
</style>
<body>
<div id="app">
  <p v-bind:style="[myiscolor,{width:wh+'px'}]">背景颜色:{{iscolor}}</p>
  <input type="text" v-model="iscolor" >
</div>
<script>
  new Vue({
    el:"#app",
     data: {
      iscolor: "red",
      wh: 100
     },
     computed: {
       myiscolor: function (){
        return {
          backgroundColor:this.iscolor,
          height:300 + 'px'
        } 
       }
     }
  })
</script>
```

图片：

![An images](/images/104.png) 

实例：通过双向数据绑定随意切换样式

```html
<style>
div{width: 400px;height: 500px;background-color: black;}
</style>
<body>
<div id="app">
  <p v-bind:style="[myiscolor,{width:wh+'px'}]">背景颜色:{{iscolor}}</p>
  <input type="text" v-model="iscolor" >
  <input type="text" v-model="wh" >
</div>
<script>
  new Vue({
    el:"#app",
     data: {
      iscolor: "red",
      wh: 100
     },
     computed: {
       myiscolor: function (){
        return {
          backgroundColor:this.iscolor,
          height:300 + 'px'
        } 
       }
     }
  })
</script>
```

![An images](/images/105.png) 

![An images](/images/106.png) 