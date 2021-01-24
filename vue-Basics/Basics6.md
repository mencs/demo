---
title: vue-指令-v-show
date: 2021-1-10
categories:
- vue-基础
tags:
- vue-基础
isShowComments: false
subSidebar: true
---

::: tip v-show指令：根据元素真假，切换元素的显示与隐藏
:::
::: theorem v-show指令：根据元素真假，切换元素的显示与隐藏

- 原理：修改元素的display,实现显示隐藏，
- 指令后面的内容，最终都会解析为布尔值
- true元素显示，false元素隐藏

:::

---

![An images](/images/35.png) 

1、本人实现方法

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
        <button value="v-on指令" @click="login" >显示</button>
         <a href="www.baidu.com" v-show="text">百度一下</a>
        <button value="v-on指令" @click="login1">隐藏</button>
    </div>

   <script>
       var app = new Vue ({
        el: '#app',
           data: {
               text: true
           },
           // 事件处理函数
           methods: {
            login () {
              this.text=true
            },
            login1 () {
              this.text=false
               }
            }
       })
   </script>
</body>
</html>
```

2、官方实现方法：

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
        <button value="v-on指令" @click="login" >显示/隐藏</button>
         <a href="www.baidu.com" v-show="text">百度一下</a>
    </div>

   <script>
       var app = new Vue ({
        el: '#app',
           data: {
               text: true
           },
           // 事件处理函数
           methods: {
            login () {
              this.text= !this.text  /* 取反 */
            }
        }
       })
   </script>
</body>
</html>
```

实现效果图：

![An images](/images/36.png) 

4、小实列

``` html
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
         <a href="www.baidu.com" v-show="text>20">百度一下</a>
         <h4> {{text}}</h4>
         <button value="v-on指令" @click="login1" >大于20才会显示</button>
    </div>

   <script>
       var app = new Vue ({
        el: '#app',
           data: {
               text: 18
           },
           // 事件处理函数
           methods: {
            login1 () {
                this.text ++
            }
        }
       })
   </script>
</body>
</html>
```

实现效果图：当text大于20才会显示[百度一下](https://www.baidu.com)

![An images](/images/37.png) 