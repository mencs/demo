---
title: vue-axios-网络应用天气预报
date: 2021-1-12
categories:
- vue-基础
tags:
- vue-基础
isShowComments: false
subSidebar: true




---

::: tip vue-axios-网络应用天气预报查询

<a href="javascript:;"  @click="changecity('重庆')"></a>可防止网页刷新

:::

::: theorem vue-axios-网络应用（网络请求库）内部为ajx，就是发送请求功能。

- axios.get(地址).then(function(response){})回调.then函数会在请求完成后触发
- axios.get(地址).then(function(err){})回调.then函数会在请求失败后触发
- axios.get(地址?查询字符串)格式axios.get(地址?key=value&key2=value2......)
- axios.post(地址).then(function(err){})与get写法一致区别是根据对象查询
- axios.get(地址,{key:value,key2:value2......})
- [axios文档传送门](https://github.com/axios/axios)https://github.com/axios/axios
- [CDN库]( https://cdn.staticfile.org/axios/0.18.0/axios.min.js"): <script src="https://cdn.staticfile.org/axios/0.18.0/axios.min.js"></script>

:::