---
title: vue-axios-网络应用随机语句
date: 2021-1-11
categories:
- vue-基础
tags:
- vue-基础
isShowComments: false
subSidebar: true


---

::: tip vue-axios-网络应用

:::

::: theorem vue-axios-网络应用（网络请求库）内部为ajx，就是发送请求功能。

- axios.get(地址).then(function(response){})回调.then函数会在请求完成后触发
- axios.get(地址).then(function(err){})回调.then函数会在请求失败后触发
- axios.get(地址?查询字符串)格式axios.get(地址?key=value&key2=value2......)
- axios.post(地址).then(function(err){})与get写法一致区别是根据对象查询
- axios.post(地址,{key:value,key2:value2......})
- [axios文档传送门](https://github.com/axios/axios)https://github.com/axios/axios
- [CDN库]( https://cdn.staticfile.org/axios/0.18.0/axios.min.js"): <script src="https://cdn.staticfile.org/axios/0.18.0/axios.min.js"></script>

:::

请求接口例子：

![An images](/images/70.png) 

### 1、axios实例get请求：

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
<style>
div{width:500px; height:400px;background:yellow;display: flex;align-items: center; /*垂直方向居中*/
justify-content: center;} /*水平方向居中*/
</style>
<body>
<div id="app">
    <input type="button" value="get请求" @click="add">
</div>
<script>
var app = new Vue ({
    el:"#app",
    data: {
    },
    methods: {
        add () {
         axios.get("https://autumnfish.cn/api/joke/list?num=3")
         .then(function (Response) {
             console.log(Response)//请求成功
         },function(err){
             console.log(err)//请求失败
         }) 
        }
    }
})
</script>
</body>
</html>
```

请求成功返回Response中data数据：

![An images](/images/71.png) 

请求失败返回服务器信息404

![An images](/images/72.png) 

### 2、axios中post请求

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
<style>
div{width:500px; height:400px;background:yellow;display: flex;align-items: center; /*垂直方向居中*/
justify-content: center;} /*水平方向居中*/
</style>
<body>
<div id="app">
    <input type="button" value="post请求" @click="postadd">
    <!-- <p v-text="message"></p> -->
</div>
<script>
var app = new Vue ({
    el:"#app",
    data: {
    },
    methods: {
        postadd () {
        axios.post("https://autumnfish.cn/api/user/reg",{username:'张三'})
         .then(function (Response) {
             console.log(Response)
         },function(err){
             console.log(err)
         })    
        }
    }
})
</script>
</body>
</html>
```

成功响应的数据：

![An images](/images/73.png) 

请求失败返回服务器信息404与get请求类似

### 4、get获取随机一条网络数据

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
<style>
div{width:500px; height:400px;background:yellow;display: flex;align-items: center; /*垂直方向居中*/
justify-content: center;} /*水平方向居中*/
</style>
<body>
<div id="app">
    <input type="button" value="get请求" @click="add">
    <br>
    <p v-text="message"></p>
</div>
<script>
var app = new Vue ({
    el:"#app",
    data: {
        message: ''
    },
    methods: {
        add () {
        var thant = this  //将获取后的this数据存进thant中否则会变
         axios.get("https://autumnfish.cn/api/joke")
         .then(function (Response) {
             thant.message = Response.data
         },function(err){
             console.log(err)
         }) 
        },
  
    }
})
</script>
</body>
</html>
```

效果图：

![An images](/images/74.png) 

::: danger 注意:this的值会变要存起来。

![An images](/images/75.png) 