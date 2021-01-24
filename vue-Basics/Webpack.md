---
title: Webpack-vue工程项目
date: 2021-1-14
categories:
- vue-实战
tags:
- vue-实战
isShowComments: false
subSidebar: true

---

::: tip  Webpack-vue工程项目

- Vue项目市场上都是基于Webpack骨架开发
- vue init webpack  demo1

:::

---

### 一、安装npm run webpack  demo1

![An images](/images/158.png) 

---

### 二、安装依赖：

vue-router 、vue-axios、element-ui、(和css加载器sass-loader、node-sass)五个插件

- cnpm install vue-router -s

- cnpm install --save axios vue-axios

- cnpm i element-ui -S
- npm install sass-loader@latest
- npm install node-sass@latest
- 如果版本core-js@<3安装cnpm install core-js@3.4.6即可
- 安装依赖cnpm install

![An images](/images/159.png) 

> 运行npm run dev启动项目

---

### 三、配置路由

1）创建路由表router——>index.js

![An images](/images/160.png) 

2)入口main.js全局导入路由表

![An images](/images/161.png) 

3）App.js挂载路由视图

![An images](/images/162.png) 

4）登录界面输入

![An images](/images/163.png) 

5）效果

![An images](/images/164.png) 

---

### 四、项目使用element-ui

1）main.js全局导入

![An images](/images/165.png) 

2）去.vue组件使用

![An images](/images/166.png) 

