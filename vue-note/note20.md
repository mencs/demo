---
title: Vue-随笔
date: 2020-01-06
isShowComments: false
sidebarDepth: 0
categories:
 - Vue-note
tags:
 - 随笔
---



1、flex布局;div内元素垂直居中

```html
div{width:500px; height:400px;background:
display: flex;
align-items: center; /*垂直方向居中*/
justify-content: center;} /*水平方向居中*/
```

![An images](/images/49.png)

2、vue的export default和new vue（{}）

-    最近看了些vue，查了一些资料才明白export default 是什么意思。。。
-   对于export defalut 在是输出，在vue里面的用法是用来输出组件，相当于把接口暴露在外部，共所有文件用import来调用，
-  而new vue（{}）是创建一个vue实例化，对组件进行数据操作