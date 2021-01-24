---

title: vue-vue组件的使用
date: 2021-1-14
categories:
- vue-实战
tags:
- vue-实战
isShowComments: false
subSidebar: true
---

::: tip 组件的使用

- Vue的一大特性：组件化，也就是可以将vue对象作为一个组件，被反复的使用。
- 要想实现组件化，需要在页面中注册组件两种方式：
- 1、全局注册：也就意味着在页面的任意一个被vue绑定过的div中，都可以使用全局注册的vue组件
- 2、本地注册：只有注册绑定的div元素能使用。

:::

---

:::  theorem  注意

- **1、注册组件:（全局注册） Vue.component( "组件名",{vue对象})**
- **2、使用组件：在被vue绑定的html元素中才能使用组件。如果一个div未绑定vue，那么这个div不能使用之前注册的组件**

:::

---

### 1、组件基础应用全局注册

```html
<div id="app">
    <model></model>                     //使用组件
</div>
</div>
<script>
   
   Vue.component( "model",{              //注册一个名字叫model的组件
    template: '<h1>你好，世界！</h1>'
   })
   
    new Vue({
     el: '#app',
  })
     //只有div被vue绑定，才能使用组件
</script>
```

![An images](/images/119.png) 

---

### 2、全局注册组件化复用

```html
<div id="app">
    <model></model>
    <model></model>
    <model></model>
</div>
</div>
<script>
   
   Vue.component( "model",{
    template: '<div> <p> {{title}}</p>  <button @click="add">点我</button> </div>',
    data () {
      return {
        title: 'Hellow ！！！！'
      }
    },
    methods: { 
      add () {
        alert(this.title)
      }
    }
   })

    new Vue({
     el: '#app',
  })
    //只有div被vue绑定，才能使用组件
```

![An images](/images/120.png) 

---

### 3、Vue作为组件的注意事项

 ::: danger 注意事项

 Vue.component( "组件名",{vue对象}),这个vue对象和之前的vue对象的data实例属性写法有区别

:::

①特点一

> 原始写法

```vue
  new Vue({
    el:"#app",
     data: {
      isvalue:"隐藏"
     },
```

> 组件化写法

```vue

    data () {
      return {
     isvalue:"隐藏"
     }}
```

---

②特点二：

:::  danger 组件中template的写法

- template是将内容展现到页面上的一个键。值是一个字符串。
- 一定要注意：template里必须且只能有一个根元素

:::

```vue
   Vue.component( "model",{
    template: '<div> <p> {{title}}</p>  <button @click="add">点我</button> </div>',  
    //div就是根元素
    data () {
      return {
        title: 'Hellow ！！！！'
      }
    },
```

### 3、vue本地（局部）注册

::: warning 局部注册

- vue的全局注册，也就意味着在页面的任意一个被vue绑定过的div中，都可以使用全局注册的vue组件。
- 但是，如果对vue组件进行本地注册，那么在其他被vue绑定的div中，不能使用该组件。

:::



```vue
<div id="app1">
  <model2></model2>      //组件为注册不能显示
</div>
<hr>
<div id="app2">          
  <model2></model2>
</div>
</div>
<script>
   
   var model = {
    template: '<div> <p> {{title}}</p>  <button @click="add">点我</button> </div>',
    data () {
      return {
        title: 'Hellow ！！！！'
      }
    },
    methods: { 
      add () {
        alert(this.title)
      }
    }
   }
    new Vue({
     el: '#app1',   //app1未注册不能使用组件
  })
  new Vue({
    el: '#app2',
    components:{      //app2注册了可以使用组件
      "model2":model
    }
  })

</script>
```

此时只显示app2注册的组件

![An images](/images/123.png) 