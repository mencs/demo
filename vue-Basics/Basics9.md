---
title: vue-指令-实例图片切换
date: 2021-1-11
categories:
- vue-基础
tags:
- vue-基础
isShowComments: false
subSidebar: true



---

::: tip v-指令：结合上边指令设置图片切换程序
:::

1、设计思路：

![An images](/images/47.png) 

2、设计思路2：

![An images](/images/48.png) 

3、设计代码：

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
<style>
div{width:500px; height:400px;background: deeppink; display: flex;align-items: center; /*垂直方向居中*/
justify-content: center;  /*水平方向居中*/
background:yellow}
.left{background-color: red;}
.xiug { flex: 1; align-self: center; width: 40px;}
.right{background-color: red;}
</style>
<body>
    <div id="app">
        <div>
            <a href="javascript:void(0)" v-show="index > 0" class="left" @click="prev"><<</a>
            <img :src="imgArr[index]" alt="" class="xiug">
            <a href="javascript:void(0)" v-show="index < imgArr.length-1" class="right" @click="next">>></a>
        </div>
    </div>

   <script>
       var app = new Vue ({
        el: '#app',
           data: {
               imgArr: [
               "./imges/1.png",
               "./imges/2.png",
               "./imges/3.png",
               "./imges/4.png",
               "./imges/5.png",
               "./imges/6.png",
               "./imges/7.png",
               "./imges/8.png",
               "./imges/9.png" 
               ],
               index: 0
           },
           methods: {
            prev () {
                   this.index --
               },
            next:function () {
                this.index ++
            }
           }
       })
   </script>
</body>
</html>
```

显示效果图（左右切换图片并隐藏按钮）：

![An images](/images/50.png) 