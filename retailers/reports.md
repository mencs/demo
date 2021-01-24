---
title: 数据报表
date: 2020-10-26
categories:
 - 电商系统
tags:
 - 
isShowComments: false

---



::: tip 数据报表

:::

![An images](/images/024.png) 

::: warning 代码

:::

```js
<template>
  <div>
    <el-card>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>数据统计</el-breadcrumb-item>
        <el-breadcrumb-item>数据报表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 2.为Echarts准备一个Dom -->
      <div id="main1" style="width: 600px; height: 400px;position: relative; float: left "></div>
      <div id="main2" style="width: 600px; height: 400px; position: relative; float: left"></div>
    </el-card>
  </div>
</template>

<script>
// 外部使用的是v-charts
// 1、局部使用echarts
import echarts from 'echarts'
import _ from 'lodash'
export default {
  data () {
    return {
      addoptions: [], /* 后台数据 */
      options: { /* 前端数据 */
        title: {
          text: '后端数据'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  created () {},
  // 2.生命周期函数此时页面dom已经被渲染
  async mounted () {
    // 3.基于准备好的dom，初始化echarts实例
    var myChart1 = echarts.init(document.getElementById('main1'))
    var myChart2 = echarts.init(document.getElementById('main2'))
    const { data: res } = await this.$http.get('reports/type/1')
    if (res.meta.status !== 200) {
      return this.$message.error('数据获取失败！')
    }
    this.addoptions = res.data
    console.log(this.addoptions)
    this.$message.success('数据获取成功！')
    // 4.指定图表的配置项和数据
    var option1 = {
      title: {
        text: 'ECharts无获取数据库数据'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    }
    // 5.使用刚指定的配置项和数据显示图表。
    // 利用lodash合并前后端数据
    const result = _.merge(this.addoptions, this.options)
    myChart1.setOption(option1)
    myChart2.setOption(result)
  },
  methods: {}
}
</script>
```

