---
title: vue-指令-v-for
date: 2021-1-11
categories:
- vue-基础
tags:
- vue-基础
isShowComments: false
subSidebar: true




---

::: tip v-for：根据数据生成列表结构（比如动态路由）
:::

::: theorem  语法 v-for="(item,index) in textarr" 

- item为数组中的每一项数据
- index为数组的索引值
- texarr为数据对象
- 数组经常跟v-for结合使用
- item和index可以结合其他指令一起使用
- 数组的长度会同步到页面上，是响应式的。
:::

![An images](/images/51.png) 

### 1、数组实例：（item名称可以更改的）

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
    <ul>
    <li v-for="item in textarr">手机类别:{{item}} </li>
    </ul>
</div>
<script>
    var app = new Vue ({
        el: '#app',
        data:{
        textarr:['苹果','华为','oppop','vivo','小米']
        },
       methods: {

       }
    })
</script>

</body>
</html>
```

效果图:

![An images](/images/52.png) 



### 2、数组实例(为每一项加上索引值)

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
    <ul>
    <li v-for="(item,index) in textarr">{{index+1}} 手机类别:{{item}} </li>
    </ul>
</div>
<script>
    var app = new Vue ({
        el: '#app',
        data:{
        textarr:['苹果','华为','oppop','vivo','小米']
        },
       methods: {

       }
    })
</script>

</body>
</html>
```

![An images](/images/53.png) 



### 3、v-for对象实例（并绑定动态title）

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
    <ul>
    <li v-for="(item,index) in textarr" v-bind:title="item.name">{{index+1}} 手机类别:{{item.name}} </li>
    </ul>
</div>
<script>
    var app = new Vue ({
        el: '#app',
        data:{
        textarr: [{name:"苹果"} ,{name:"华为"},{name:"小米"}]
        },
    })
</script>

</body>
</html>
```

![An images](/images/54.png) 

### 4、动态添加数据和移除数据

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
    <input type="button" value="添加" v-on:click="add">
    <input type="button" value="删除" v-on:click="remove">
    <ul>
    <li v-for="(item,index) in textarr" v-bind:title="item.name">{{index+1}} 手机类别:{{item.name}} </li>
    </ul>
</div>
<script>
    var app = new Vue ({
        el: '#app',
        data:{
        textarr: [{name:"苹果"} ,{name:"华为"},{name:"小米"}]
        },
        methods: {
            add: function () {
                this.textarr.push({name:'vivo'}) /* 新增操作 */
            },
            remove () {
               this.textarr.shift()/* shift移除操作 */
            }
        }
    })
</script>

</body>
</html>
```

效果图：

![An images](/images/55.png) 