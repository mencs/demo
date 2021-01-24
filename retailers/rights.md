---
title: 权限列表
date: 2020-10-26
categories:
 - 电商系统
tags:
 - 
isShowComments: false

---



::: tip  角色列表

:::

![An images](/images/013.png) 

::: tip  代码

:::

```html
<template>
<div>
        <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
         <!-- 账号列表 -->
      <el-table :data="rightsList" border stripe>
        <!-- index索引列 -->
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="authName" label="权限说明"></el-table-column>
       <el-table-column prop="path" label="路径"></el-table-column>
      <el-table-column prop="level" label="权限层级">
          <!-- 添加权限层级标签 -->
      <template slot-scope="scope">
          <!-- 输出一行所有1信息 -->
          <!-- {{scope.row}} -->
       <el-tag v-if="scope.row.level === '0'" effect="plain">级别一</el-tag>
       <el-tag v-else-if="scope.row.level === '1'" type="danger" effect="plain">级别二</el-tag>
       <el-tag v-else type="success" effect="plain">级别三</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="" label="操作按钮"></el-table-column> -->
      </el-table>
    </el-card>
    </div>
</template>
<script>
export default {
  data () {
    return {
    // 权限列表
      rightsList: []
    }
  },
  created () {
    this.getRightsList()
  },
  methods: {
    async getRightsList () {
      const { data: res } = await this.$http.get('rights/list')
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限失败')
      }
      this.rightsList = res.data
      console.log(this.rightsList)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
```