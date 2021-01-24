---
title: vue-指令-v-text
date: 2021-1-10
categories:
- vue-基础
tags:
- vue-基础
isShowComments: false
subSidebar: true
---
::: tip v-text指令：设置标签的文本值（textContent）
:::
:::  theorem 

  缺点：内容会被全部替换，也可以做字符串拼接;
 <!-- {{message}} -->使用差值表达式替换部分内容。也可以做字符串拼接

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
    <h4 v-text="message + '!'">哈哈</h4>   <!-- 哈哈则不会显示 -->
    <h4 >哈哈:{{message + "!"}}</h4>  <!-- 差值表达式 -->
    </div>

   <script>
       var app = new Vue ({
        el: '#app',
           data: {
            message:'简单语句',  /* 简单数据 */
           }
       })
   </script>
</body>
</html>
```

输出：

![An images](/images/30.png) 