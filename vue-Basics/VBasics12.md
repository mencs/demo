---


title: vue-for中的循环语句
date: 2021-1-12
categories:
- vue-实战
tags:
- vue-实战
isShowComments: false
subSidebar: true




---

::: warning  vue-for是vue中循环的关键字

我们需要定义数据源，然后通过v-for来遍历数据源，在使用差值表达式输出数据
:::
---

::: danger 注意！！！！

使用v-for遍历图片时路径要写出打包文件路径

::: 

![An images](/images/156.png) 

![An images](/images/157.png) 

1、普通v-for循环遍历数组

```html
<div id="app">
    <ul>
    <li v-for="item in textarr">手机类别:{{item}} </li>
    </ul>
</div>
<script>
    var app = new Vue ({
        el: '#app',
        data:{
        textarr:['苹果','华为','oppop','vivo','小米']
        },
    })
</script>
```

```
    .手机类别:苹果
    .手机类别:华为
    .手机类别:oppop
    .手机类别:vivo
    .手机类别:小米 
```

2、带下标（索引）v-for

```html
<div id="app">
    <ul>
    <li v-for="(item,i) in textarr" :key="i"> {{i}}手机类别:{{item}} </li>
    </ul>
</div>
<script>
    var app = new Vue ({
        el: '#app',
        data:{
        textarr:['苹果','华为','oppop','vivo','小米']
        },
    })
</script>
```

```
    0手机类别:苹果
    1手机类别:华为
    2手机类别:oppop
    3手机类别:vivo
    4手机类别:小米 
```

3、v-for遍历一个对象

```html
<div id="app">
    <ul>
    <li v-for="(item,i) in textarr" :key="i"> {{i}}:{{item}} </li>
    </ul>
</div>
<script>
    var app = new Vue ({
        el: '#app',
        data:{
        textarr:{
            name:'小明',
            年龄: '18'
        }
        },
    })
</script>
```

```
    .name:小明
    .年龄:18 
```

![An images](/images/108.png) 

4、v-for嵌套循环遍历一个对象数组

```html
<div id="app">
    <ul>
    <li v-for="item in textarr">
     <span v-for="(item1,item2,i) in item" :key="i">{{i}} {{item2}} {{item1}}</span>
    </li>
    </ul>
</div>
<script>
    var app = new Vue ({
        el: '#app',
        data:{
        textarr: [
            {
            name:'小明',
            年龄: '18'
          },
          {
            name:'小张',
            年龄: '20'
          },
        ]
        },
    })
</script>
```

```
    .0 name 小明 1 年龄 18
    .0 name 小张 1 年龄 20
```

5、案例

```html
<div id="app">
 <table>
     <tr>
     <th>序号</th><th>姓名</th><th>年龄</th><th>电话</th>
     </tr>
     <tr  v-for="(item,i) in textarr" :key="i">
         <td > {{i}}</td>
         <td v-for="item1 in item"> {{item1}}</td>
    </tr>
 </table>
</div>
<script>
    var app = new Vue ({
        el: '#app',
        data:{
        textarr: [
            {
            name:'小明',
            年龄: '18',
            phone: '1772511111'
          },
          {
            name:'小张',
            年龄: '20',
            phone: '1886322222'
          },
        ]
        },
    })
</script>

```

| 序号 | 姓名 | 年龄 | 电话       |
| :--- | :--- | :--- | ---------- |
| 0    | 小明 | 18   | 1772511111 |
| 1    | 小张 | 20   | 188632222  |

