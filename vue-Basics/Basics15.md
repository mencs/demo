---
title: vue-axios-网络应用天气预报
date: 2021-1-12
categories:
- vue-基础
tags:
- vue-基础
isShowComments: false
subSidebar: true



---

::: tip vue-axios-网络应用天气预报查询

<a href="javascript:;"  @click="changecity('重庆')"></a>可防止网页刷新

:::

::: theorem vue-axios-网络应用（网络请求库）内部为ajx，就是发送请求功能。

- axios.get(地址).then(function(response){})回调.then函数会在请求完成后触发
- axios.get(地址).then(function(err){})回调.then函数会在请求失败后触发
- axios.get(地址?查询字符串)格式axios.get(地址?key=value&key2=value2......)
- axios.post(地址).then(function(err){})与get写法一致区别是根据对象查询
- axios.get(地址,{key:value,key2:value2......})
- [axios文档传送门](https://github.com/axios/axios)https://github.com/axios/axios
- [CDN库]( https://cdn.staticfile.org/axios/0.18.0/axios.min.js"): <script src="https://cdn.staticfile.org/axios/0.18.0/axios.min.js"></script>

:::

### 1、先axios请求获取网络数据

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
<input type="button" value="查询" v-on:click="select1">
<p></p>
</div>
<script>
    var app = new Vue ({
        el:"#app",
        data: {
            city:'武汉'
        },
        methods: {
        select1 () {
            axios.get("http://wthrcdn.etouch.cn/weather_mini?city=" +this.city)
            .then (function(response){
                console.log(response)
            },
            function (err))
        }
      }
    })
</script>
</body>
</html>
```

请求响应数据：

![An images](/images/80.png) 

### 2、响应数据保存数组并显示到dom上

注意：回调函数必须把this值赋给thant存起来 

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
<input type="text" v-model="city" value="" v-on:keyup.enter="select1">
<p>{{listtady}}</p>
</div>
<script>
    var app = new Vue ({
        el:"#app",
        data: {
            city:'武汉',
            listtady: []
        },
        methods: {
        select1 () {
            var thant = this /* 注意：回调函数必须把this值赋给thant存起来 */
            axios.get("http://wthrcdn.etouch.cn/weather_mini?city=" +this.city)
            .then (function(response){
                console.log(response.data.data.forecast);
                thant.listtady = response.data.data.forecast
                console.log(thant.listtady)
            },
            function (err){
                console.log(err)
            })
        }
      }
    })
</script>
</body>
</html>
```

model绑定城市后显示效果：

![An images](/images/76.png) 

修改样式显示：

![An images](/images/77.png) 

### 3、结合前边v-指令优化后

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
div{width:600px; height:400px;background:yellow;display: flex;align-items: center; /*垂直方向居中*/
justify-content: center;} /*水平方向居中*/
</style>
<body>
<div id="app">
    <ul>
        <li><input type="text" v-model="city" value="" v-on:keyup.enter="select1"> <button @click="select1">查询</button></li>
        <li>
            <a href="javascript:void(0)" v-on:click="changecity('北京')">北京</a>
            <a href="javascript:;"  @click="changecity('上海')">上海</a>
            <a href="javascript:;"  @click="changecity('重庆')">重庆</a>
        </li>
        <li v-for="(item,index) in listtady">
        <p>{{item.date}} {{item.type}} 最高温度: {{item.high}} 最低温度: {{item.low}} 风向:{{item.fengxiang}}</p>
        </li>
    </ul>
</div>
<script>
    var app = new Vue ({
        el:"#app",
        data: {
            city:'昆明',
            listtady: [],
            index: 0
        },
        methods: {
        select1 () {
            var thant = this /* 注意：回调函数必须把this值赋给thant存起来 */
            axios.get("http://wthrcdn.etouch.cn/weather_mini?city=" +this.city)
            .then (function(response){
                thant.listtady = response.data.data.forecast
                console.log(thant.listtady)
            },
            function (err){
                console.log(err)
            })
        },
        changecity (xincan) {/* 这里的xincan等于上边的北京、上海、重庆 */
               this.city = xincan
               this.select1() /* 这里直接调用上边select1()方法 */
        }
      }
    })
</script>
</body>
</html>
```

贴图：

![An images](/images/79.png) 

总结：

![An images](/images/78.png) 