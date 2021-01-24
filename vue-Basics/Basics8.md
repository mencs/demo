---
title: vue-指令-v-bind
date: 2021-1-11
categories:
- vue-基础
tags:
- vue-基础
isShowComments: false
subSidebar: true


---

::: tip v-bind指令：设置元素的属性（比如：src;title;class）
:::
::: theorem v-bind:属性名=表达式

![An images](/images/42.png) 

:::

1、简写直接:属性名=表达式

![An images](/images/43.png) 

2、例子：

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
<style>div,button,h4{ display:inline}</style>
<body>
    <div id="app">
        <img v-bind:src="imgsrc" alt=""> <!-- 全写 -->
        <img :src="imgsrc" alt=""><!-- 简写 -->
    </div>

   <script>
       var app = new Vue ({
        el: '#app',
           data: {
               imgsrc: './img/1.png'
           },
       })
   </script>
</body>
</html>
```

效果图：

![An images](/images/44.png) 



3、例子：（建议使用简写方式）

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
<style>.active{border:2px solid red;}</style>
<body>
    <div id="app">
        <button v-on:click="login">单击</button>
        <!-- 全写三元表达式如果isactive=true则为图片添加样式-->
        <img :src="imgsrc" alt="" v-bind:class="isactive? 'active':'' ">
        <!--简写使用对象的形式实现;active类名是否生效取决于isactive的值-->
        <img :src="imgsrc" alt="" :class="{active:isactive}">
    </div>

   <script>
       var app = new Vue ({
        el: '#app',
           data: {
               imgsrc: './img/1.png',
               isactive: false
           },
           methods: {
               login () {
                   this.isactive = !this.isactive
               }
           }
       })
   </script>
</body>
</html>
```

效果展示

![An images](/images/45.png) 

当点击按钮时显示class属性

![An images](/images/46.png) 