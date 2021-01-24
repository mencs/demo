---
title: vue-指令-v-on补充
date: 2021-1-11
categories:
- vue-基础
tags:
- vue-基础
isShowComments: false
subSidebar: true





---

::: tip v-on：为元素绑定事件
:::

::: theorem v-on补充：为元素绑定事件（修饰符）

- 事件绑定的方法写成函数调用的形式，可以传入自定义参数
- 定义方法时需要定义形参来接收传入的实参
- 事件的后面跟上.修饰符可以对事件进行限制
- .enter可以限制触发的按键为回车
- 事件修饰符有多种
- [修饰符传送门](https://cn.vuejs.org/v2/api/#v-on)
:::

![An images](/images/56.png) 

### 1、实例定义形参接收实参

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- 开发环境版本，包含了有帮助的命令行警告 -->
   <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>
<style>
</style>
<body>
<div id="app">
    <input type="button" value="点击"  v-on:click="add(666,'你好')">
</div>
<script>
var app = new Vue ({
    el:"#app",
    methods: {
        add (a,b) {
            console.log(a)
            console.log(b)
        }
    }
})
</script>
</body>
</html>
```

效果图：

![An images](/images/57.png) 



### 2、修饰符.enter可以限制触发的按键为回车

@keyup.enter需结合才能生效

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- 开发环境版本，包含了有帮助的命令行警告 -->
   <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>
<style>
</style>
<body>
<div id="app">
    <input type="text"  v-on:keyup.enter="add">
</div>
<script>
var app = new Vue ({
    el:"#app",
    methods: {
        add () {
       alert('吃了吗')
        }
    }
})
</script>
</body>
</html>
```

效果图(此时需要回车才会弹出)：

![An images](/images/58.png) 