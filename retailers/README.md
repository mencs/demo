---
title: 电商-笔记
date: 2020-01-06
isShowComments: false
sidebarDepth: 0
categories:
 - Vue-note
tags:
 - 
---
::: tip   什么是闭包？

「函数」和「函数内部能访问到的变量」（也叫环境）的总和，就是一个闭包。

:::

## 把数组与字符串的转换

```
this.addForm.good_cat = this.addForm.good_cat.join(',')--数组转换为字符串
this.addForm.good_cat = this.addForm.good_cat.join(' ')--字符串转化为数组
attr_value: item.attr_vals.join(' ')
```

其中addForm表单，good_cat数组

## 运行依赖lodash

作用:深拷贝复制对象单独使用

引用 import _ from 'lodash'

```
eg:

​    const form = _.cloneDeep(this.addForm)

​    form.goods_cat = form.goods_cat.join(',')
     console.log(form)
```

深复制拷贝表单addfrom为from单独使用

##  计算属性举列

```
 computed: {

  cateId () {

   if (this.addForm.goods_cat.length === 3) {

​    return this.addForm.goods_cat[2]

   }

   return null
 }


```

##   表单预验证

```
   this.$refs.addFormref.validate(valid => {

​    if (!valid) {

​     return this.$message.error('请填写必填项！')

​    }
```



## 清除文本框上次打开数据

```
  // resetFields()为默认清空函数；修改按钮对表单初始化，清楚上次输入信息

<el-dialog title="修改地址" :visible.sync="editdialogVisible" width="50%" @close="editDialogClosed">-- 表单

  editDialogClosed () {

   this.$refs.resaddressForm.resetFields()

  }
```

## git相关用法

git branch     查看当前所处分支-

git status       查看当前未提交文件红色

git add .          --将所有未提交文件提交到暂存区--

git status       --查看当前未提交文件变绿色-

git commit -m "完成订单功能的开发"           -为文件添加注释并提交到本地分支

git push           --将本地文件推送到码云-

-------合并分支

git checkout master  --切换主分支master--

git branch     --查看当前所处分支master-

git merge login     --将分支login文件合并至master--

git push           --将本地文件推送到码云--

---



## echars使用

1. vue脚手架安装依赖echarts
   ![An images](/images/002.png)
2. vue局部导入echarts
3. 为Echarts准备一个Dom 

```
<div id="main1" style="width: 600px; height: 400px;"></div>
<div id="main1" style="width: 600px; height: 400px;position: relative; float: left "></div>
```

```
<script>
import echarts from 'echarts' // 1、vue局部使用echarts
export default {
  data () {},
```

4、生命周期函数此时页面dom已经被渲染

```
 mounted () {

<!--5、基于准备好的dom，初始化echarts实例-->

  var myChart = echarts.init(document.getElementById('main1'))

<!--指定图表的配置项和数据-->

  var option = {

   title: {text: 'ECharts 入门示例'  },

   tooltip: {}， legend: {data: ['销量'] },

   xAxis: {  data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'] },

   yAxis: {},

   series: [{ name: '销量',  type: 'bar', data: [5, 20, 36, 10, 10, 20]  }]}

   myChart.setOption(option)<!--使用刚指定的配置项和数据显示图表。-->

 },
```

![An images](/images/003.png)

---



## lodash的使用:深拷贝/数据合并



```
<script>
import _ from 'lodash' 导入依赖js文件
export default {
  data () {
    return {}
  }
```


**1、深拷贝**

```
    // _.cloneDeep深复制拷贝表单addfrom为from单独使用

​    const form = _.cloneDeep(this.addForm)

​    form.goods_cat = form.goods_cat.join(',')   // 将数组转化为字符串

​    console.log(form)
```

**2、数据合并**

```
 data () {

  return {

   addoptions: [], /* 后台数据 */

   options: { /* 前端数据 *}

}}

调用对象_.merge前端后端数据合并

   const result = _.merge(this.addoptions, this.options)
   myChart2.setOption(result) 图表显示合并后数据
```

---



## nprogresss添加进度条加载效果

安装依赖nprogresss

![An images](/images/005.png)



1、 main.js导入加载进度条效果包js和css

import NProgress from 'nprogresss'

import 'nprogresss/nprogresss.css'



2、基于拦截器来实现

request页面加载时调用；            展示进度条 NProgress.start();

 response页面加载完毕时事件     隐藏进度条NProgress.done();



3、具体实现

// 导入加载进度条效果包js和css

```
import NProgress from 'nprogress'

import 'nprogress/nprogress.css'

// 配置登录请求的根路径

import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

// 配置带有权限的访问并在request加载时展示进度条

axios.interceptors.request.use(config => {

 console.log(config)

 config.headers.Authorization = window.sessionStorage.getItem('token')

 /* 最后必须return config */

 NProgress.start()/* 加载进度条 */

 return config

})

// response加载完毕时事件

axios.interceptors.response.use(config => { NProgress.done()/* 隐藏进度条 */

 return config })

Vue.use(NProgress)
```

---



## 全局时间格式化

```
// 全局时间格式化main.js

Vue.filter('dateFormat', function (originVal) {

 const dt = new Date(originVal)

 // 年月日

 const y = dt.getFullYear()

 const m = (dt.getMonth() + 1 + '').padStart(2, '0')

 const d = (dt.getDate() + '').padStart(2, '0')

 // 时分秒

 const hh = (dt.getHours() + '').padStart(2, '0')

 const mm = (dt.getMinutes() + '').padStart(2, '0')

 const ss = (dt.getSeconds() + '').padStart(2, '0')

 return `${y}-${m}-${d} ${hh}:${mm}:${ss}`

})
```

**具体日期格式化**

```
 <el-table-column prop="create_time" label="下单时间">

​      <!-- 调用main.js中时间格式化函数 -->

​      <!-- slot-scope="scope"作用域插槽 -->

​      <template slot-scope="scope">

​       {{scope.row.create_time | dateFormat}}

​      </template>

   </el-table-column>
```

