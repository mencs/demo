---
title: vue-基础-el挂载点
date: 2021-1-10
categories:
- vue-基础
tags:
- vue-基础
isShowComments: false
subSidebar: true

---

::: tip 第一个Vue程序,el挂载点

输出：哈哈

:::





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
<body id="body">
   <div id="app" class="app">
       {{message}}
   </div>
   <script>
       var app = new Vue ({
           el:'#app',
           el:'.app',
           el:'div',
           el:'#body',//vue不支持body,html做为挂载点
           data: {
            message:'哈哈' 
           }
       })

   </script>
</body>
</html>
```

`vue也支持其他选择器`

- `id选择器(推荐,因为id是唯一的)`
- `class选择器`
- `标签选择器：div、span......`