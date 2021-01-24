---
title: vue-组件之间的参数传递
date: 2021-1-14
categories:
- vue-实战
tags:
- vue-实战
isShowComments: false
subSidebar: true

---

::: tip  vue-组件之间的参数传递

- props表示组件的参数部分，那么props的写法有两种：
- 1、props:[参数列表]  比如props:['myprops1',myprops2',....]
- 2、props:{ myprops1：{ type:String,required:true,default:'XX'}}  对象的形式

:::

### 一、父组件参数传递子组件(父传子)

:::   warning (概要)

- 通过子组件的props部分，来指明可以接收的参数，父组件通过在标签中写明参数的键值对来传递参数

:::

![An images](/images/134.png) 

> props的写法第一种数组形式

1、子组件设置参数(两种写法都行)

 ![An images](/images/135.png)

> props的写法第二种对象形式

 ![An images](/images/139.png)

2、父组件传值

 ![An images](/images/137.png)

效果图：

 ![An images](/images/138.png)

---

### 二、子组件向父组件传值（子传父）

:::  tip  复杂过程使用（了解）

:::

![An images](/images/140.png)

---

::: warning 简单使用（常用）

**以事件发射的方式来实现子传父的效果**

- 在子组件中，使用this.$ement("键"，"值")
- 在父组件中，子组件的标签中  使用@键="msg=$event"
- 其中$event就能得到子组件值
- msg是父组件vue的属性

:::

---

![An images](/images/141.png)

1、子组件设置参数值

![An images](/images/142.png)

2、父组件接收

![An images](/images/143.png)

> 显示效果

![An images](/images/144.png)

> 点击显示值子传父

![An images](/images/145.png)



### 三、子传父《——》父传子

> 父组件app.vue

```vue
<template>

  <div id="app">
<MyHeader :myname ="msg"  @newName="msg=$event"></MyHeader> 
      //::myname向外传递值msg//@newName接收子组件值
  </div>

</template>
<script>
import Header from './components/Header.vue'  //本地导入子组件
export default {
  data () {
    return {
      msg: '我是app.vue组件的值'
    }
  },
  components: {
    'MyHeader':Header   //本地注册本地使用
  }
}
</script>

<style lang="scss">

</style>

```

> 子组件Header.vue

```vue
<template>
  <div>
       <h1>默认显示{{myname}}</h1>
      <button @click="add">点我发射</button>
  </div>
</template>

<script>
export default {
     props:['myname'],  //设参数接收父值
     methods: {
       add () {
         this.
         this.$emit('newName',"我是子组件的值")  //发射值到父组件
       }
     }
    
}
</script>
```

