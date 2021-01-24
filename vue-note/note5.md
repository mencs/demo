---
title: Vue-项目上线
date: 2020-01-06
isShowComments: false 
sidebarDepth: 0
categories:
 - Vue-项目优化
tags:
 - 项目优化
---

::: tip 项目上线相关配置

:::

[[toc]]

---

## 一、通过node创建web服务器

创建node项目，并安装express,通过express快速创建web服务器，将vue打包生成的dist文件夹托管为静态资源即可，关键代码如下：

1、创建show文件夹，在文件下初始化一个包管理配置文件执行npm init -y

2、创建一个包执行npm i express -s

![An images](/images/026.png)

3、新建app.js入口文件代码：

```js 
const express = require('express')/* 导入express */
const app = express()/* 调用express函数*/
app.use(express.static('./dist'))/* 注册一个中间件指向静态资源文件 */
app.listen(8089,()=>{
    console.log('server runing at http://127.0.0.1:8089')
})
```

终端运行127.0.0.1:8089即可访问。



## 二、开启Gzip文件网络传输压缩

使用Gzip可以减小文件体积，使得网络传输更快。

1、可以通过服务器端使用experss做Gzip压缩，配置如下：

```js
npm install compression -D安装相关包

const compression = require('compression')导入包

app.use(compression());启用中间件

```

详细：

``` js
const express = require('express')/* 导入express */
const compression = require('compression')/* 导入包Gzip文件网络传输压缩包 */
const app = express()/* 调用express函数创建web服务器完成*/
app.use(compression())/* 启用中间件Gzip文件网络传输压缩 */
app.use(express.static('./dist'))/* 注册一个中间件指向静态资源文件 */
app.listen(8080, () => {
    console.log('server runing at http://127.0.0.1:8080')
})
```



## 三、配置https服务
略。。后端配置。
## 四、使用pm2管理应用

作用桌面窗口关闭，进程还未结束，网站还能访问。

1、在服务器中安装pm2：npm i pm2 -g

2、启动项目：pm2 start app.js --name 自定义名称

3、查看运行项目：pm2ls

4、重启项目：pm2 restart自定义名称或id

5、停止项目：pm2 stop 自定义名称或id

6、删除项目：pm2 delete 自定义名称或id