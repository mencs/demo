---
title: vue-基础-简介
date: 2021-1-10
categories:
- vue-基础
tags:
- vue-基础
isShowComments: false
subSidebar: true
---

::: tip 什么是vue

用于构建用户界面的渐进式js框架,只注重视图层，结合了Html+css+js,非常的易用，并且有很好的生态系统，而且vue体积很小，速度很快，优化很到位。     SSM的整合，搞定了后端的一套：增删改查。

:::

---

![An images](/images/81.png) 

:::  theorem  MVVM  vue技术是MVVM开发模式的实现者。

- 什么是MVC :

- M——>model       V——>view       C——>controller

- 什么是MVVM(vue):

- M——>model       V——>view    VM——>viewmodel：链接视图和数据的中间件。

:::

![An images](/images/82.png) 

:::  theorem

在MVVM架构中，是不允许数据和视图直接通讯的，只能通过Viewmodel来通讯。而ViewMdel就定义了一个observer观察者

- ViewMdelel能够观察到数据的变化，并对视图对应的内容进行更新
- ViewMdelel能够监听到视图的变化，并能够通知数据发送变化
- DOM listeners为数据视图的监听者监听model
- Data bindings 数据绑定者

至此，我们就明白了，vue.js就是一个MVVM的实现者，他的核心就是实现DOM监听与数据绑定。

:::

---

::: theorem 1、cdn内容分发网络

这是一种加速策略，能够从离自己最近的服务器上加速获得外部资源。

:::

---

::: theorem 2、VM的实现原理

view model 中内置了一个观察者，这个观察者两个维度

- ①观察视图的变化：当时图变了，就通知数据进行变化
- ②观察数据的变化：当数据变了，就通知视图进行变化

———MVVM通过VM实现了双向数据绑定

:::

---

::: theorem 3、其他MVVM实现者

- angularjs
- Reactjs
- 微信小程序

:::

---

::: theorem 4、为什么要用Vue.js

- 轻量级，体积小是一个重要指标。Vue.js压缩后只有20KB（Angular压缩后56KB+,react压缩后44KB+）

- 移动优先。更适合移动端，比如移动端的Touch事件易上手。学习曲线平稳，文档齐全

- 吸取了Angular(模块化)和React(虚拟DOM)的长处，并拥有自己独特功能如：计算属性

- 开原，社区活跃度高

:::

---

::: theorem  5、组件化

- 页面上的每个独立可交互的区域视为一个组件

- 每个组件对应一个工厂目录，组件所需的各种资源在这个目录就近维护

- 页面不过是组件的容器，组件可以嵌套自由组合（复用）形成完整页面

:::

