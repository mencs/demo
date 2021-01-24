---
title: Vue-8个钩子函数
date: 2020-01-06
sticky: 2
isShowComments: false
sidebarDepth: 0
categories:
 - Vue-note
tags:
 - 生命周期函数
---

::: tip   vue 生命钩子函数？

vue生命周期中有一定执行顺序的接口函数，用户可以根据这些暴露的函数处理自己的数据，渲染页面

:::



[[toc]]

**vue的生命周期, vue 的生命周期也叫钩子函数,是vue从创建到销毁所触发的函数**

![An images](/images/121.png) 

---

## **一、beforeCreate（初始化之前）**

1.初始化 inject

2.初始化 state

- 初始化 props
- 初始化 methods
- 初始化 data
- 初始化 computed
- 初始化 watch

3.初始化 provide

所以在 data 中可以使用 props 上的值，反过来则不行。

不能访问到data,computed,watch，methods上的方法和数据。这个钩子函数不能做业务逻辑，一般情况下这个钩子函数可以做的事情：在每个组建中增加一些特定的属性，例如混合。

::: details beforeCreate:(初始化之前)

**

```
---**

beforeCreate()

{console.log("创建之前");}

 beforeCreate()

这是第一个生命周期函数, 表示实例完全被创建出来之前, 会执行它,此时data和methods中的数据和方法都还没有被初始化,
在这里是获取不到data中的数据,console会报错,undefined。
```

:::

---

## **二、create（初始化）**

调用$mount方法，开始挂载组件到dom上。

这个实例已经实现了数据劫持，把方法、计算属性 也都挂载到了实例，不能获取到真实的dom元素。不能访问到el，ref属性内容未空数组。 **这个钩子函数可以发送axios请求把请求回来的数据保存到data中。**

::: details  created()

**---**

```
created()

{console.log("创建完成");},

 created()

这是第二个生命周期函数 在created 中, data和methods,都已经被初始好了,所以 如果要调用 methods
中的方法, 或者操作data中的数据, 最早只能在created 中操作
```

:::

---



## 三、beforeMount（挂载之前）

接下来就是渲染，但是在渲染之前会先判断“是否有制定的el选项”，正常的写法：el:'app',另一种用：vm.$mount('app')

::: details  beforeMount()

**---**

```
 beforeMount()

{console.log("挂载之前");},

 这是第三个生命周期函数,表示模板已经在内存中编译完成了,但是尚未把数据模板渲染到页
 如果这个时候想获取页面中的元素只能获取到未编译的值
 console.log(document.getElementById("h3").innerText);

console.log(this.$refs.myh3); //undefind 还没有获取到dom元素,
在 beforeMount执行的时候, 页面中的元素, 还没有被真正替换过来, 只是之前写的一些模板字符串
```

:::

---

## **四、mounted（挂载）**

组件的挂载就完成，此时可以通过DOM API获取到DOM节点在mounted中 请求数据，当前组件已经被挂载到真实的元素上了。

$ref属性可以访问。

::: details  mounted()

```
mounted()

{console.log("挂载完成");},

这是第四个生命周期函数,表示 内存中的模板,已经真实的挂载到了页面中, 用户已经可以看到渲染好的页面了

console.log(document.getElementById("h3").innerText);

console.log(this.$refs.hh3.innerText); //ok 这句话表明 要操作dom 元素至少在挂载完成后
```

:::

::: danger 

**注意 :**  mounted 是实例创建期间的最后一个生命周期, 当执行完mounted 就表示,
实例已经被完全创建好了, 此时, 如果没有其他操作的话, 这个实例, 就静静的躺在我们的内存中, 一动不动

:::

---

## **五、brforeUpdate（更新之前）**

vue 更新方式是组件级别的，比如我们项目会有许多组件，在根组件中引用3个组件，其中一个组件更新重新渲染了（异步渲染），另外两个不会重新渲染。

经历了一系列的patch、diff流程后，组件重新渲染完毕，调用updated钩子

接下来是运行中的两个事件

::: details  beforeUpdate()

```
beforeUpdate()

{ //这个时候表示 , 页面还没有被更新,数据更新了

console.log("页面上元素的内容:" + document.getElementById("h3").innerText);

console.log("data中的msg数据是:" + this.msg);}

结论: 当执行了beforeUpdate 的时候,页面中显示的数据还是旧的,此时data中的数据是最新的, 页面尚未和最新的数据保持同步
```

:::

---



## **六、updated（更新）**

渲染更新流程完毕

::: details  updated()

```
{console.log("更新完成"+this.message);},

 console.log("页面上元素的内容:" + document.getElementById("h3").innerText);

console.log("data中的msg数据是:" + this.msg);

updated 事件执行的时候, 页面和data 中的数据已经保持同步了, 都是最新的
```

:::

---



## 七、beforeDestroy（销毁之前）

实例销毁之前调用。这一步，实例仍然完全可用，this仍能获取到实例 这个钩子函数一般做事件的移除、清空定时器

```
beforeDestroy(){console.log("销毁之前");},
```



---

## 八、destroyed（销毁）

常见的销毁方式：手动（ vm.$destory()移除所有的观察者 ）、移除组件、路由切换 实例销毁后调用，调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。视图并不会刷新，

```
destroyed(){console.log("销毁了");}
```



::: warning  

这就是vue的八个钩子函数(也叫生命周期),vue 的生命周期很重要,学好了vue的生命周期学懂了一半vue

:::

