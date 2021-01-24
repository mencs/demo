---
title: vue-指令-v-if
date: 2021-1-11
categories:
- vue-基础
tags:
- vue-基础
isShowComments: false
subSidebar: true

---

::: tip v-if令：根据表达值的真假切换元素的显示与隐藏（操作dom元素），切换元素的显示与隐藏
:::
::: theorem v-if指令与v-show指令区别：

- v-show会在元素中加入<p style="display: none;"></p>>操作的是元素的样式。
- v-if操作的是元素本身dom;元素值为true元素存在与dom树中，为false从dom树中移除。
- v-if消耗内存会大些，v-show（操作大量元素推荐）

:::

![An images](/images/38.png) 

1、用法：

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
        <button value="v-on指令" v-on:click="login" >单击</button>
         <h4 v-if="text">显示与隐藏</h4>
    </div>

   <script>
       var app = new Vue ({
        el: '#app',
           data: {
               text: false
           },
           // 事件处理函数
           methods: {
            login () {
                this.text = !this.text/*  取反*/
            } 
        }
       })
   </script>
</body>
</html>
```

显示效果：

![An images](/images/39.png) 



2、例子2：

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
        <button value="v-on指令" v-on:click="login" >单击</button>
         <h4 v-if="text">显示与隐藏1</h4> <!-- 条件满足text=true则显示 -->
         <h4 v-show="age>18 || text">显示与隐藏2</h4><!-- 条件满足age>18或者text=true则显示 -->
         <h3 v-if="age>18 && text">成年了</h3><!-- 条件满足age>18并且text=true则显示 -->
    </div>

   <script>
       var app = new Vue ({
        el: '#app',
           data: {
               text: false,
               age: 18
           },
           // 事件处理函数
           methods: {
            login () {
                this.text = !this.text/*  取反*/
            } 
        }
        })
   </script>
</body>
</html>
```

效果图（默认为flase）：

![An images](/images/40.png) 

单击text= true

![An images](/images/41.png) 