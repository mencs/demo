---
title: vue-指令-v-on
date: 2021-1-10
categories:
- vue-基础
tags:
- vue-基础
isShowComments: false
subSidebar: true
---
::: tip v-on指令：为元素绑定事件

:::

:::  theorem v-on指令：为元素绑定事件

```html
<button value="v-on指令" v-on:click="login">登录</button>  //单击事件
<button value="v-on指令" v-on:dblclick="login">登录</button>  //双击事件
<button value="v-on指令" @click="login">登录</button>  //单击事件简写
<button value="v-on指令" @dblclick="login">登录</button>  //双击事件简写
```

:::

`我自己的原始写法(简写)`

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
<body>
   
    <div id="app">
        <button class="sub1" type="primary" size="small" @click="login">登录</button>
    </div>

   <script>
       var app = new Vue ({
        el: '#app',
           data: {
           },
           // 事件处理函数
           methods: {
            login () {
                alert('哈哈')
            }
           }
       })
   </script>
</body>
</html>
```

效果图：

![An images](/images/32.png) 

使用v-on指令：

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
<body>
   
    <div id="app">
        <button value="v-on指令" v-on:click="login">登录</button>
    </div>

   <script>
       var app = new Vue ({
        el: '#app',
           data: {
           },
           // 事件处理函数
           methods: {
            login () {
                alert('哈哈')
            }
           }
       })
   </script>
</body>
</html>
```

v-on逻辑处理举例：

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
<body>
   
    <div id="app">
        <button value="v-on指令" v-on:click="login">单击</button>
        <h2> {{ text }} </h2>
    </div>
   <script>
       var app = new Vue ({
        el: '#app',
           data: {
               text: "吃了吗？"
           },
           // 事件处理函数
           methods: {
            login () {
                this.text += "吃了！"
                // console.log(this.text)
            }
           }
       })
   </script>
</body>
</html>
```

效果图：

![An images](/images/33.png) 





## 计时器实现

1、本人实现方法：

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
        <button value="v-on指令" @click="login" >减-</button>
        <h4> {{ text }} </h4>
        <button value="v-on指令" @click="login1">加+</button>
    </div>
    
   <script>
       var app = new Vue ({
        el: '#app',
           data: {
               text: 0
           },
           // 事件处理函数
           methods: {
            login () {
                this.text -= 1
                if (this.text < 0){
                 this.text = 0
                 return alert('不能为负数！')
                }
            },
            login1 () {
                this.text += 1
                if (this.text > 10){
                    this.text = 10 
                 return alert('不能大于10!')
                }
            },
           }
       })
   </script>
</body>
</html>
```

效果图：

![An images](/images/34.png) 



---



2、官方实现：

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
        <button value="v-on指令" @click="login" >减-</button>
        <h4> {{ text }} </h4>
        <!-- <h4 v-text="text"></h4> 也可以使用v-text指令-->
        <button value="v-on指令" @click="login1">加+</button>
    </div>

   <script>
       var app = new Vue ({
        el: '#app',
           data: {
               text: 0
           },
           // 事件处理函数
           methods: {
            login1 () {
              if(this.text<10){
                  this.text ++
              }else{
                  alert('不能大于10！')
              }
            },
            login () {
               if(this.text>0){
                   this.text --
               }else{
                   alert('不能小于0！')
               }
            },
           }
       })
   </script>
</body>
</html>
```

