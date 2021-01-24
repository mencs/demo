---
title: vue-中的语句
date: 2021-1-12
categories:
- vue-实战
tags:
- vue-实战
isShowComments: false
subSidebar: true



---

::: danger  vue-分支语句

- v-if ：满足条件才会显示
- v-else-if
- v-else
- v-show:实际上是让元素的display属性为none。隐藏的效果，性能更好

:::

> v-if与v-show区别：v-if是直接让元素消失，而v-show是给元素添加style="display:none"
>

1、v-if

```html
  <input type="text" v-if="ishouw && age== 18 ">  //条件ishouw=true并且age=10
```

2、v-else-if

```html
  <p v-if="ishouw">哈哈哈哈V-IF</p>   为true显示
  <p v-else-if="age>8">哈哈哈哈v-else-if</p>  不为true且条件age>8显示
```

3、v-else

```html
  <p v-if="ishouw">哈哈哈哈V-IF</p>   //ture显示
  <p v-else="ishouw">哈哈哈哈v-else</p>  //fasle显示
```

:::  danger 注意：

当1、为true不走2、3、

当1、为fasle且age>8时只走2、不走1、3、

当1、为fasle且age<=8时只走3、不走1、2、

:::

4、v-show

```html
    <template v-if="ishouw">
        <p>哈哈哈</p>
    </template>
```

::: danger 注意：

`<template></template>`   vue常用模板标签，属性里面只有v-if生效；v-show不起作用。

:::