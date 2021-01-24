---
title: vue-对象之间的操作
date: 2021-1-12
categories:
- vue-实战
tags:
- vue-实战
isShowComments: false
subSidebar: true





---

::: danger  vue-对象之间的操作（维度有两个：操作内容属性；操作方法）

- 可以通过一个vue对象改变另一个vue对象属性（见例子3.）
- 可以通过一个vue对象改变另一个vue对象方法（见例子4.）

:::

### 1、小写变大写

```html
<div id="app">
         {{title}} 
    <input type="button" value="大写" v-on:click="myadd"> 
</div>
</div>
<script>
   var v1 = new Vue({
     el:"#app",
     data: {
       title: "hellow vue"
     },
     methods: {
        myadd (){
         this.title = this.title.toUpperCase()  //小写字母变大写
        }
     }
   })
</script>
```

![An images](/images/109.png) 

### 2、computed计算属性大写变小写

```html
      data: {
         title: 'HELLOW  VUE'
      },
      computed: {
          xiaoxie:function () {
            return this.title.toLowerCase()
          }
        }
        
输出：{{xiaoxie}}=hellow vue
```

### 3、一个实例改变另外一个实例内容（更改属性）

```html
<div id="app1">
        小写变大写: {{title}}  <br>
        大写变小写: {{xiaoxie}} 
    <input type="button" value="V1" v-on:click="daxie"> 
</div>

<div id="app2">
   <input type="button" value="V2" v-on:click="change"> 
</div>
</div>
<script>
  var v1 = new Vue({
     el:"#app1",
     data: {
       title: "hellow vue"
     },
     methods: {
        daxie (){
          this.title = this.title.toUpperCase() //吧字母转换成大写
        }
      },
        computed: {
          xiaoxie:function () {
            return this.title.toLowerCase()  //把字母转换小写
          }
        }
   })

  var v2 = new Vue({
    el: "#app2",
    methods: {
      change: function(){
        v1.title = "HHHHHHHHH" //改变实例V1的title值
      }
    }
  })
</script>

```

![An images](/images/110.png) 

![An images](/images/111.png) 

![An images](/images/112.png) 

### 4、一个实例改变另外一个实例内容（更改方法）

```html
<div id="app1">
        小写变大写: {{title}}  <br>
        大写变小写: {{xiaoxie}} 
    <input type="button" value="V1" v-on:click="daxie"> 
</div>

<div id="app2">
   <input type="button" value="V2" v-on:click="change"> 
   <input type="button" value="m2" v-on:click="m2"> 
</div>
</div>
<script>
  var v1 = new Vue({
     el:"#app1",
     data: {
       title: "hellow vue"
     },
     methods: {
        daxie (){
          this.title = this.title.toUpperCase() //吧字母转换成大写
        }
      },
        computed: {
          xiaoxie:function () {
            return this.title.toLowerCase()  //把字母转换小写
          }
        }
   })

  var v2 = new Vue({
    el: "#app2",
    methods: {
      change: function(){
        v1.title = "HHHHHHHHH" //改变实例V1的title值
      },
      m2: function () {
       v1.daxie ()            //直接调用v1中将字母变大写的方法
      }
    }
  })
</script>
```

![An images](/images/113.png) 

![An images](/images/114.png) 

![An images](/images/115.png) 

![An images](/images/116.png) 

::: danger 总述所属

使用computed 计算属性他会把结果缓存其他,他的值一直是小写。

:::