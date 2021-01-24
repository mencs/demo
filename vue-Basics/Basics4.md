---
title: vue-指令-v-html
date: 2021-1-10
categories:
- vue-基础
tags:
- vue-基础
isShowComments: false
subSidebar: true
---

::: tip vue-v-html指令

:::

:::  theorem v-html指令：设置标签的innerHtml

- 使用方法作用与v-text类似,只会解析文本。
- 会解析html特有的标签样式

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
<body>
   
    <div id="app">
    <h4 v-text="content">哈哈</h4>   <!-- 哈哈则不会显示 -->
    <h4 v-html="content">哈哈</h4> <!--  显示超链接 -->
    </div>

   <script>
       var app = new Vue ({
        el: '#app',
           data: {
            content:' <a href="">简单语句</a>',  /* 简单数据 */
           }
       })
   </script>
</body>
</html>
```

显示：

![An images](/images/31.png) 