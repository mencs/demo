---
title: 订单列表
date: 2020-10-26
categories:
 - 电商系统
tags:
 - 
isShowComments: false

---



::: tip  订单列表
:::

![An images](/images/019.png) 


::: warning  代码

:::



```html
<template>
  <div>
     <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
  <el-card class="box-card">
     <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getorderlist">
            <el-button slot="append" icon="el-icon-search"  @click="getorderlist"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="orderlist" border stripe >
          <!-- index索引列 -->
      <el-table-column type="index" label="序号" width="60px" align="center"></el-table-column>
      <el-table-column prop="order_number" label="订单编号"  align="center"> </el-table-column>
      <el-table-column prop="order_price" label="订单价格"  align="center"> </el-table-column>
      <el-table-column prop="pay_status" label="是否付款" align="center">
      <!-- slot-scope="scope"作用域插槽 -->
      <template slot-scope="scope">
      <el-tag type="success" v-if="scope.row.pay_status === '1' ">已付款</el-tag>
      <el-tag type="danger" v-else>未付款</el-tag>
      </template>
       </el-table-column>
      <el-table-column prop="is_send" label="是否发货" align="center">
         <!-- slot-scope="scope"作用域插槽 -->
         <template slot-scope="scope">
          <el-button type="success" icon="el-icon-check " size="mini" circle v-if="scope.row.is_send === '是'"></el-button>
          <el-button type="danger" icon="el-icon-close" size="mini" circle v-else></el-button>
         </template>
      </el-table-column>
      <el-table-column prop="create_time" label="下单时间">
           <!-- 调用main.js中时间格式化函数 -->
           <!-- slot-scope="scope"作用域插槽 -->
           <template slot-scope="scope">
             {{scope.row.create_time | dateFormat}}
           </template>
      </el-table-column>
      <el-table-column prop="" label="操作" class="caozuoleft">
         <template >
        <el-button type="primary" icon="el-icon-edit" size="small" @click="editorders"></el-button>
        <el-button type="success" icon="el-icon-location" size="small" @click="logistics"></el-button>
         </template>
     </el-table-column>
      </el-table>
      <!-- 分页实现 -->
       <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
       :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 15, 20]" :page-size="queryInfo.pagesize"
       layout="total, sizes, prev, pager, next, jumper"
      :total="total" background>
    </el-pagination>
  </el-card>
  <!-- @close="editDialogClosed"为关闭窗口清除上次文本框数据 -->
  <el-dialog title="修改地址" :visible.sync="editdialogVisible" width="50%" @close="editDialogClosed">
  <el-form :model="addressForm" ref="resaddressForm" :rules="rulesaddressForm" label-width="100px">
  <el-form-item label="省/市区县" prop="address1">
    <!-- options:citidata1数据源来源外部js文件并通过v-model双向绑定表单 -->
    <el-cascader v-model="addressForm.address1" :options="citydata1" expandTrigger= 'hover' class="cascadwid"></el-cascader>
  </el-form-item>
    <el-form-item label="详细地址" prop="address2">
    <el-input v-model="addressForm.address2"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editdialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
  <el-dialog title="物流信息" :visible.sync="logisticsdialogVisible" width="50%">
  <el-timeline>
    <el-timeline-item
      v-for="(activity, index) in logisticslist"
      :key="index"
      :icon="activity.icon"
      :type="activity.type"
      :color="activity.color"
      :size="activity.size"
      :timestamp="activity.time">
      {{activity.context}}
    </el-timeline-item>
  </el-timeline>
</el-dialog>
  </div>
</template>

<script>
// 导入区县js
import citydata from './citydata.js'
import _ from 'lodash'
export default {
  data () {
    return {
    // 商品列表
      orderlist: [],
      // 查询参数条件
      queryInfo: {
        query: '', // 查询参数条件
        pagenum: 1, // 当前页码值
        pagesize: 10 // 每页显示多少条数据
      },
      // 总数据条数
      total: 0,
      editdialogVisible: false,
      logisticsdialogVisible: false,
      // logisticslist: [], /* 物流信息data */
      // 引入区县js对象数据源
      citydata1: citydata,
      // 修改表单
      addressForm: {
        address1: [],
        address2: ''
      },
      rulesaddressForm: {
        address1: [
          {
            required: true,
            message: '请选择区县',
            trigger: 'blur'
          }
        ],
        address2: [
          {
            required: true,
            message: '请输入地址',
            trigger: 'blur'
          }
        ]
      },
      // 时间线data
      logisticslist: [],
      // 时间线添加样式
      activities: [{
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more'
      }, {
        color: 'yellow'
      }, {
        size: 'large',
        color: 'blue'
      }, {
        size: 'larg e',
        type: 'primary',
        icon: 'el-icon-more'
      },
      {
        type: 'success'
      }]
    }
  },
  created () {
    this.getorderlist()
  },
  methods: {
    async getorderlist () {
      const { data: res } = await this.$http.get('orders', { params: this.queryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      console.log(res.data)
      this.orderlist = res.data.goods
      this.total = res.data.total
      console.log(this.orderlist)
      this.$message.success('获取商品列表成功')
    },
    // 分页监听pageSize改变的时间当前每页显示的页数
    handleSizeChange (newsize) {
      this.queryInfo.pagesize = newsize
      this.getorderlist()
    },
    // 分页监听 页码值 改变事件
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getorderlist()
    },
    // 显示修改对话框
    editorders () {
      this.editdialogVisible = true
    },
    // 显示物流对话框
    async logistics () {
      // 供测试的物流单号：1106975712662
      const { data: res } = await this.$http.get('/kuaidi/1106975712662')
      if (res.meta.status !== 200) {
        return this.$message.error('获取物流进度失败!')
      }
      // 利用lodash合并时间线样式
      const result = _.merge(res.data, this.activities)
      this.logisticslist = result
      console.log(this.logisticslist)
      this.logisticsdialogVisible = true
    },
    // resetFields()修改按钮对表单初始化，清楚上次输入信息
    editDialogClosed () {
      this.$refs.resaddressForm.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.cascadwid{width:100%}
</style>
```

