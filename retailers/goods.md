---
title: 商品列表
date: 2020-10-26
categories:
 - 电商系统
tags:
 - 
isShowComments: false

---



::: tip  商品列表

:::

![An images](/images/014.png) 

::: warning  代码

:::

```vue
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getgoodlist">
            <el-button slot="append" icon="el-icon-search"  @click="getgoodlist"></el-button>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" icon="el-icon-edit" @click="addbox">新增</el-button>
        </el-col>
      </el-row>
        <el-table :data="goodlist" border stripe>
      <!-- index索引列 -->
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="goods_id" label="商品ID" width="80"> </el-table-column>
      <el-table-column prop="goods_name" label="商品名称"> </el-table-column>
      <el-table-column prop="goods_price" label="商品价格" width="100"> </el-table-column>
      <el-table-column prop="goods_number" label="商品数量"  width="80"> </el-table-column>
      <el-table-column prop="goods_weight" label="重量" width="80"> </el-table-column>
      <el-table-column prop="add_time" label="添加时间"  width="200">
        <!-- 调用main.js中时间格式化函数 -->
        <template slot-scope="scope">
          {{scope.row.add_time | dateFormat}}
        </template>
         </el-table-column>
         <!-- 用户操作 -->
       <el-table-column prop="" label="用户操作" width="200">
         <template slot-scope="scope">
           <!-- 修改按钮 -->
         <el-button type="primary" icon="el-icon-edit" round size="mini"
          @click="showEditDialog(scope.row.id)">修改</el-button>
         <!-- 删除按钮 -->
           <el-button type="danger" icon="el-icon-delete" round size="mini"
          @click="removeUserById(scope.row.goods_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
          <!-- 分页实现 -->
       <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
       :current-page="queryInfo.pagenum" :page-sizes="[5, 10,20, 30]" :page-size="queryInfo.pagesize"
       layout="total, sizes, prev, pager, next, jumper"
      :total="total" background>
    </el-pagination>
    </el-card>
    <!-- 修改对话框 -->
  <el-dialog title="提示未做处理" :visible.sync="editDialogVisible" width="30%" >
    <el-form label-width="100px">
      <el-form-item label="商品名称" prop="">
         <el-input ></el-input>
      </el-form-item>
    </el-form>
     <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
   </el-dialog>

  </div>
</template>

<script>
export default {
  data () {
    return {
      // 查询参数条件
      queryInfo: {
        query: '',
        // 当前页码值
        pagenum: 1,
        // 每页显示多少条数据
        pagesize: 5
      },
      // 商品列表
      goodlist: [],
      // 总数据条数
      total: 0,
      // 控制修改对话框的显示与隐藏
      editDialogVisible: false
    }
  },
  created () {
    this.getgoodlist()
  },
  methods: {
    async getgoodlist () {
      const { data: res } = await this.$http.get('goods', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg) /*  失败 */
      }
      this.$message.success(res.meta.msg) /* 请求成功 */
      console.log(res.data)
      this.goodlist = res.data.goods/* 商品列表赋值 */
      this.total = res.data.total
    },
    // 分页监听pageSize改变的时间当前每页显示的页数
    handleSizeChange (newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getgoodlist()
    },
    // 分页监听 页码值 改变事件
    handleCurrentChange (newPage) {
      // console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getgoodlist()
    },
    // 修改用户信息
    // 点击修改账号按钮时获取返回值行数据
    async showEditDialog () {
      // const { data: res } = await this.$http.get('goods/' + id)
      // if (res.meta.status !== 201) {
      //   return this.$message.error(res.meta.msg)
      // }
      // this.$message.success.success(res.meta.msg)
      // console.log(res.data)
      this.editDialogVisible = true
    },
    async removeUserById (id) {
      // 弹窗确定是否删除
      const deleteres = await this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 如果确认删除则返回字符串confirm
      // 如果取消删除则返回字符串cancel
      if (deleteres !== 'confirm') {
        return this.$message.info('已取消删除！')
      }
      const { data: res } = await this.$http.delete('goods/' + id)
      if (res.meta.status !== 200) {
        console.log(res.data)
        return this.$message.error('删除失败！')
      }
      //  刷新数据列表
      this.$message.success(res.meta.msg)
      this.getgoodlist()
      this.$router.push('/goods')
    },
    // 路由跳转
    addbox () {
      this.$router.push('/goods/add')
    }
  }
}
</script>

<style lang="less" scoped>
</style>

```

