---
title: vue-基础-data数据对象
date: 2021-1-10
categories:
- vue-基础
tags:
- vue-基础
isShowComments: false
subSidebar: true
---


:::  theorem data 数据对象

- Vue中应用的数据对象定义在data中
- data中可以写复杂类型的数据
- 渲染复杂类型数据时，遵循js语法即可。

:::

::: danger 下面列子：

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
     {{ message }}
    <h3>全部输出: {{phone}}</h3>
    <h4>只输出小米：{{phone.mi}}</h4>
    <h3>数组输出: {{brand}}</h3>
    <h4 style="color: red;">数组输出苹果:{{brand[4]}}</h4>
    </div>

   <script>
       var app = new Vue ({
        el: '#app',
           data: {
            message:'简单语句',  /* 简单数据 */
            phone: {
                huawei:"华为mate30",
                mi:"小米11"
            },
            brand: ['华为', '小米', 'vivo','oopo','苹果']
           }
       })
   </script>
</body>
</html>
```

效果：

![An images](/images/029.png) 