---
title: vue-实战-简书百科
date: 2021-1-12
categories:
- vue-实战
tags:
- vue-实战
isShowComments: false
subSidebar: true
---
:::  tip 页面构成

在一个页面上使用vue的基本内容，Vue对象的内容，vue的关键字，vue的分支、循环。

:::

---

:::  theorem  Vue改变内容

- 差值表达式的方式{{}}
- 计算属性computed:{}
-  watch用于**监控参数的变化**，并调用函数，newVal是能获取参数新值，oldVal是参数老的值。

:::

---

:::  theorem  css一些知识

- div{display: inline-block;}  行内使用块级部署，使得div横向排列。
- overflow:hidden 当元素超出div时自动隐藏超出部分，不会撑破div

:::

---

:::  theorem node.js

- 是一个让前端运行在node.js提供的服务器上的一个工具，换句话说就是提供一个服务器。
- npm:是指明使用node.js的命令

:::

1、css阴影错位效果（垂直居中）

```css
.contents{
  background: rgb(87, 79, 79);
  width: 500px;height: 300px;
  top:50%;left: 50%; position: absolute;  //垂直居中
  transform: translate(-50%, -50%);
  box-shadow:20px 20px #81f7f3;
  border-radius: 10px;
}
```

效果图

![An images](/images/167.png) 

2、css阴影效果

```css
  box-shadow:0 0 20px #81f7f3;
```

![An images](/images/168.png) 

3、css垂直居中方式并向上移动

> 方法一

```html
 position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
```

> 方法二：

```
 margin: auto ;
 transform: translate(0, 50%);调节高度
```

![An images](/images/169.png) 

4、justify-content属性对齐方式。

::: warning  flex 布局主轴从左到右

- flex-start（默认值）：左对齐
- flex-end：右对齐
- center： 居中
- space-between：两端对齐，项目之间的间隔都相等。
- space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

:::

5、input禁止字段自动填充

```css
  <el-input v-model="loginform.username" placeholder="请输入账号" autocomplete="off">
```

6、div内部阴影效果

```css
  box-shadow:inset 0px 0px 9px 13px red;
```

![An images](/images/170.png) 

7、阴影效果

```css
 box-shadow: 10px 8px 10px 3px #000;  /*Chrome 6+, Firefox 4+, IE 9+, iOS 5+, Opera 10.50+*/
-webkit-box-shadow: 10px 8px 10px 3px #000;
-moz-box-shadow: 10px 8px 10px 3px #000;
/*background-clip: padding-box;*/
opacity: 0.9; /*透明度*/
    /* 0px 2px 3px -1px red; */
    /* background-color: #B3C0D1; */
    /* color: #333; */
```

8、element-ui 快速使heard头部固定方法

```css
.el-container {
  overflow:auto;
  height: 100%;
}
```

![An images](/images/171.png) 

9、vue快速生成字段方式

```html
    <el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
  
  data(){
    const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }
    return{
      tableData: Array(20).fill(item),
      }
      }
```

![An images](/images/172.png) 

