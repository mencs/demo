---
title: vue-指令-v-model
date: 2021-1-11
categories:
- vue-基础
tags:
- vue-基础
isShowComments: false
subSidebar: true






---

::: tip vue-v-model双向数据绑定

:::

::: theorem 获取和设置表单元素的值（双向数据绑定）

- v-model指令的作用是便捷的设置和获取表单元素的值
- 绑定的数据会和表单元素值相关联
- 绑定的数据<-->表单元素的值

:::

![An images](/images/60.png) 

1、实例：

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
div{width:500px; height:400px;background:yellow;display: flex;align-items: center; /*垂直方向居中*/
justify-content: center;} /*水平方向居中*/
</style>
<body>
<div id="app">
    <p>{{message}} </p>
    <input type="text" v-model="message" v-on:keyup.enter="add">
    <br>
    <ul><li v-for="(item,index) in listArr"><span>{{index + 1}} 要 {{item}}</span></li></ul>
</div>
<script>
var app = new Vue ({
    el:"#app",
    data: {
     listArr: ['疯狂学习','努力学习','好好吃饭'],
     message: "请输入"
    },
    methods: {
        add () {
         this.listArr.push(this.message)
         console.log(this.message)
         alert('确定更新数据吗？' + this.message)
        }
    }
})
</script>
</body>
</html>
```

①打开浏览器默认显示效果：

![An images](/images/61.png) 

②向文本框中添加数据回车：

![An images](/images/62.png) 

③确定弹出窗口：

![An images](/images/63.png) 