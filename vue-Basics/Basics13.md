---
title: vue-指令-记事本实例
date: 2021-1-11
categories:
- vue-基础
tags:
- vue-基础
isShowComments: false
subSidebar: true







---

::: tip vue-指令-结合以上指令本地应用实例
:::

实现功能：

![An images](/images/64.png) 

### 1、新增

主要实现思路：当回车确定事件触发立即执行 this.listArr.push(this.message);把v-mode输入框内容push到数组中，

再通过v-for遍历数组。

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

效果图：

![An images](/images/65.png) 

### 2、逐行删除功能（v-on  splice 索引）

实现思路：点击事件绑定形参index(索引行)，点击事件后调用splic方法删除数组中对应项。

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
    <ul><li v-for="(item,index) in listArr"><span>{{index + 1}} 要 {{item}}</span>
         <input type="button" value="清除" v-on:click="remove (index)">
        </li>
    </ul>
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
        },
        remove (index) {
            this.listArr.splice(index,1) //使用splice方法移除数组中对应1项
        }
    }
})
</script
</body>
</html>
```

效果图：

![An images](/images/66.png) 

### 3、统计功能

```html
           <span>共{{listArr.length}} 条</span>
```

显示效果图：

![An images](/images/67.png) 

4、全部清空

 实现思路：点击事件让数组为空数组。

```html
        cls () {
            this.listArr=[]  /* 清空数组 */
        }
```

效果图：

![An images](/images/68.png) 

### 5、隐藏统计、清空

当数据列表为空时，隐藏统计及全部清空按钮。

实现思路，使用v-shou/v-if指令，判断数组长度即可

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
    <ul><li v-for="(item,index) in listArr"><span>{{index + 1}} 要 {{item}}</span>
         <input type="button" value="清除" v-on:click="remove (index)">
        </li>
        <li> 
            <span >共{{listArr.length}} 条</span>
            <input type="button" value="empty" @click="cls" v-if="listArr.length>0">
        </li>
    </ul>
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
         this.listArr.push(this.message) /* 新增一项 */
        },
        remove (index) {
            this.listArr.splice(index,1) /* 移除一项 */
        },
        cls () {
            this.listArr=[]  /* 清空数组 */
        }
    }
})
</script>
</body>
</html>
```

效果图（无数据隐藏清空按钮）

![An images](/images/69.png) 