---
title: 商品分类
date: 2020-10-26
categories:
 - 电商系统
tags:
 - 
isShowComments: false

---



::: tip  商品分类
:::

![An images](/images/018.png) 

::: warning  代码

:::

```vue


<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!-- 添加商品分类 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCateDialog()"
            >添加分类</el-button
          >
        </el-col>
      </el-row>
     <tree-table
        class="treeTable"
        :data="CateList"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        :show-row-hover="true"
        index-text="序号"
        show-index
        border
        stripe
      >
        <!-- 是否有效 -->
        <template slot="isOk" slot-scope="scope">
          <i
            class="el-icon-success"
            style="color: #58FA82;font-size:16px"
            v-if="scope.row.cat_deleted === false"
          ></i>
        </template>
        <!-- 排序 -->
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag size="mini" type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
          <el-tag size="mini" type="warning" v-else>三级</el-tag>
        </template>
        <!-- 操作 -->
        <template slot="opt" slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="showupdateCateDialog(scope.row.cat_id)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteCate(scope.row.cat_id)">删除</el-button>
        </template>
      </tree-table>
      <!-- 分页码 -->
 <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
       :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 20, 30]" :page-size="queryInfo.pagesize"
       layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 添加分类弹框 -->
    <!-- @close点击确定之前清除表单历史数据 -->
    <el-dialog
     title="添加分类" :visible.sync="addCateDialogVisible" width="50%" @close="addCateDialogClosed">
     <!-- 添加分类表单 -->
  <el-form ref="addCateFormRef" :model="addCateForm" :rules="addCateFormRules" label-width="100px">
  <el-form-item label="分类名称:" prop="cat_name">
    <el-input v-model="addCateForm.cat_name"></el-input>
  </el-form-item>
    <el-form-item label="父级分类:" >
      <!-- options：数据源 -->
          <!-- props：指定配置对象 -->
          <el-cascader
            v-model="selectedKeys"
            :options="parentCateList"
            :props="cascaderProps"
            @change="parentCateChanged"
            clearable
            filterable
            style="width: 100%;height200px;top:0px"
          ></el-cascader>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addCateDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addCate">确 定</el-button>
  </span>
</el-dialog>

<!-- 编辑分类 -->
<el-dialog
  title="编辑分类"
  :visible.sync="updatedialogVisible" @close="editDialogClosed"
  width="50%">
  <el-form :model="editForm" ref="editFormRef" label-width="100px">
  <el-form-item label="分类名称" prop="username">
    <el-input v-model="editForm.cat_name"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="updatedialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editCat">确 定</el-button>
  </span>
</el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
    // 商品分类数据列表默认为空
      CateList: [],
      // 查询条件
      queryInfo: {
        // 分别表示显示一层二层三层分类列表
        type: 3,
        // 当前页码值
        pagenum: 1,
        // 每页显示多少条数据
        pagesize: 5
      },
      total: 0,
      // 为table指定列的定义
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          // 当前列 自定义模板
          type: 'template',
          template: 'isOk'
        },
        {
          label: '排序',
          // 当前列 自定义模板
          type: 'template',
          template: 'order'
        },
        {
          label: '操作',
          // 当前列 自定义模板
          type: 'template',
          template: 'opt',
          minWidth: '190px'
        }
      ],
      // 添加分类窗口默认隐藏
      addCateDialogVisible: false,
      // 添加分类表单数据对象
      addCateForm: {
      // 将要添加的分类名称
        cat_name: '',
        // 分类父级id
        cat_pid: 0,
        // 分类等级：`0`表示一级分类；`1`表示二级分类；`2`表示三级分类
        cat_level: 0
      },
      // 添加分类表单的验证规则对象
      addCateFormRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      // 父级分类列表
      parentCateList: [],
      // 选中的父级Id数组
      selectedKeys: [],
      // 指定级联选择器的配置对象
      cascaderProps: {
        // 配置触发选项 hover/click
        /* 开启父级可选 */
        checkStrictly: true,
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 修改分类
      updatedialogVisible: false,
      // 查询修改用户信息的对象保存接返回的行值
      editForm: {}
    }
  },
  created () {
    this.getCateList()
  },
  methods: {
    // 获取商品分类数据
    async getCateList () {
      const { data: res } = await this.$http.get('categories', { params: this.queryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类失败！')
      }
      // 给数据列表赋值给cqteList
      this.CateList = res.data.result
      // 总数据条数total
      this.total = res.data.total
    },
    // 监听 pageSizeChange
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      console.log(newSize)
      this.getCateList()
    },
    // 监听 pagenum改变
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      console.log(newPage)
      this.getCateList()
    },
    // 添加分类弹出按钮
    showAddCateDialog () {
    // 弹出框之前获取表单父级分类
      this.getParentCateList()
      // 显示分类弹出框
      this.addCateDialogVisible = true
    },
    // 获取父级分类的数据
    async getParentCateList () {
      const { data: res } = await this.$http.get('categories', { params: { type: 2 } })
      if (res.meta.status !== 200) {
        return this.$message.error('获取父级分类失败！')
      }
      this.$message.success('获取父级分类成功')
      console.log(res.data)
      this.parentCateList = res.data
    },
    // 添加分类 选择项发生变化触发
    parentCateChanged () {
      // console.log(this.selectedKeys)
      // 如何selectKeys 数组的长度>0 说明选中父级分类
      if (this.selectedKeys.length > 0) {
        // 父级分类的Id
        this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
        // 当前分类的等级
        this.addCateForm.cat_level = this.selectedKeys.length
        return 0
      } else {
        // 父级分类的Id
        this.addCateForm.cat_pid = 0
        // 当前分类的等级
        this.addCateForm.cat_level = 0
      }
    },
    // 添加分类
    addCate () {
      this.$refs.addCateFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('categories', this.addCateForm)
        if (res.meta.status !== 201) {
          return this.$message.error('添加分类失败！')
        }

        this.$message.success(res.meta.msg)
        // 更新表单数据
        this.getCateList()
        // 关闭窗口
        this.addCateDialogVisible = false
      })
    },
    // @close点击确定之前清除表单历史数据
    addCateDialogClosed () {
      this.$refs.addCateFormRef.resetFields()
      this.selectedKeys = []
      this.addCateForm.cat_level = 0
      this.addCateForm.cat_pid = 0
    },
    // 修改分类
    // 点击修改按钮时获取返回值行数据
    async showupdateCateDialog (id) {
      const { data: res } = await this.$http.get('categories/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('查询用户信息失败！')
      }
      this.editForm = res.data
      this.$message.success(res.meta.msg)
      // 修改窗口显示
      this.updatedialogVisible = true
    },
    // 修改账号表单确定
    editCat () {
      // 提交请求前，表单预验证
      this.$refs.editFormRef.validate(async valid => {
        // console.log(valid)返回true/flase
        // 可以发起修改用户的网络请求
        if (!valid) return
        const { data: res } = await this.$http.put('categories/' +
        this.editForm.cat_id, {
          cat_name: this.editForm.cat_name
        })
        if (res.meta.status !== 200) {
          this.$message.error('修改用户失败！')
        }
        // 隐藏修改用户对话框
        this.updatedialogVisible = false
        //  刷新数据列表
        this.getCateList()
        // 提示修改成功
        this.$message.success(res.meta.msg)
      })
    },
    // 修改按钮前对表单初始化，清除输入信息
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    // 删除分类行
    // 根据ID删除相对应用户信息
    async deleteCate (id) {
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
      const { data: res } = await this.$http.delete('categories/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('查询用户信息失败！')
      }
      //  刷新数据列表
      this.getCateList()
      this.$message.success(res.meta.msg)
    }
  }
}
</script>
<style lang="less" scoped>
</style>

```


