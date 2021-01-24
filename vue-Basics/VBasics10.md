---
title: vue的核心:虚拟dom和diff算法
date: 2021-1-12
categories:
- vue-实战
tags:
- vue-实战
isShowComments: false
subSidebar: true


---

::: danger  vue的高效核心:虚拟dom和diff算法
vue不通过修改dom树来达到修改的效果，而是直接在页面上改那个元素，此时这个元素就是一个虚拟的dom，那么vue怎么去改呢？通过diff算法，计算出虚拟的dom修改后和修改前的区别，然后在虚拟dom的原基础上进行修改，这样的效率就大大提升了。

:::

![An images](/images/107.png) 