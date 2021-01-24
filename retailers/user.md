---
title: 用户管理
date: 2020-10-26
categories:
 - 电商系统
tags:
 - 
isShowComments: false

---

---



::: tip 用户列表

:::

![An images](/images/009.png) 

::: tip  新增

:::

![An images](/images/011.png) 

::: tip  权限分配

:::

![An images](/images/010.png) 

::: warning 代码：

:::

```html
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
<!-- 卡片 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <!-- 搜素框 -->
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList"><!-- clearable可清空属性 -->
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <!-- 按钮 -->
        <el-col :span="6">
          <el-button type="primary" icon="el-icon-edit"
          @click="addDialogVisible = true">新增</el-button>
        </el-col>
        </el-row>
      <!-- 账号列表 -->
      <el-table :data="userlist" border stripe>
        <!-- index索引列 -->
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="role_name" label="角色"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="mg_state" label="是否启用">
        <template slot-scope="scope">
          <!-- 输出一行所有1信息 -->
          <!-- {{scope.row}} -->
          <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"> </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="" label="用户操作">
         <template slot-scope="scope">
           <!-- 修改按钮 -->
         <el-button type="primary" icon="el-icon-edit" size="mini"
          @click="showEditDialog(scope.row.id)"></el-button>
         <!-- 删除按钮 -->
         <el-button type="danger" icon="el-icon-delete" size="mini"
          @click="removeUserById(scope.row.id)"></el-button>
         <el-tooltip class="item" effect="dark" content="权限控制" placement="top-start">
         <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRole(scope.row)"></el-button>
         </el-tooltip>
        </template>
      </el-table-column>
      </el-table>
      <!-- 分页实现 -->
       <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
       :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 20, 30]" :page-size="queryInfo.pagesize"
       layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>

    <!-- 新增账号弹出框 -->
<el-dialog title="新增用户" :visible.sync="addDialogVisible"
width="50%"  @close="addDialogClosed">
<!-- 内容主题表单区域 -->
<el-form :model="addForm" status-icon :rules="addFormRules" ref="addFormRef" label-width="80px" >
  <el-form-item label="姓名" prop="username">
    <el-input v-model="addForm.username"></el-input>
  </el-form-item>
    <el-form-item label="密码" prop="password" >
    <el-input v-model="addForm.password" show-password></el-input>
  </el-form-item>
    <el-form-item label="邮箱" prop="email">
    <el-input v-model="addForm.email"></el-input>
  </el-form-item>
    <el-form-item label="电话" prop="mobile">
    <el-input v-model="addForm.mobile"></el-input>
  </el-form-item>
  </el-form >
  <!-- 底部按钮区域 -->
  <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
</el-dialog>
<!-- 修改行数据弹窗 -->
<el-dialog
  title="修改用户"
  :visible.sync="editDialogVisible"
  width="45%" @close="editDialogClosed">
<el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
  <el-form-item label="用户名称" prop="username">
    <el-input v-model="editForm.username" disabled></el-input>
  </el-form-item>
    <el-form-item label="手机" prop="mobile">
    <el-input v-model="editForm.mobile"></el-input>
  </el-form-item>
    <el-form-item label="邮箱" prop="email">
    <el-input v-model="editForm.email"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editUser">确 定</el-button>
  </span>
</el-dialog>
<!-- 分配角色弹窗 -->
<el-dialog
  title="分配角色"
  :visible.sync="setRoledialogVisible"
  width="50%" @close="cloreVisible">
  <p>当前用户：{{userinfo.username}}</p>
  <p>当前的角色：{{userinfo.role_name}}</p>
  <p>角色列表：
      <el-select v-model="selectedRoleId" placeholder="请选择">
    <el-option
      v-for="item in rolesList"
      :key="item.id"
      :label="item.roleName"
      :value="item.id">
    </el-option>
  </el-select>
  </p>
  <span slot="footer" class="dialog-footer">
    <el-button @click="setRoledialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    // 自定义邮箱规则
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^\w+@\w+(\.\w+)+$/
      if (regEmail.test(value)) {
        // 合法邮箱
        return callback()
      }
      callback(new Error('请输入合法邮箱'))
    }
    // 自定义手机号规则
    var checkMobile = (rule, value, callback) => {
      const regMobile = /^1[34578]\d{9}$/
      if (regMobile.test(value)) {
        return callback()
      }
      // 返回一个错误提示
      callback(new Error('请输入合法的手机号码'))
    }
    return {
      queryInfo: {
        // 用于搜索框
        query: '',
        // 分页的页数
        pagenum: 1,
        // 当前每页显示的数据
        pagesize: 5
      },
      // 获取用户列表
      userlist: [],
      // 分页一共显示n条
      total: 0,
      // 控制添加用户表单的显示与隐藏
      addDialogVisible: false,
      // 新增用户的表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加账号表单验证对象
      addFormRules: {
        username: [
          {
            required: true,
            message: '请输入账号名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 15,
            message: '请输入3~5个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 5,
            message: '请输入3~5个字符',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          },
          {
            validator: checkEmail,
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: '请输入手机号码',
            trigger: 'blur'
          },
          {
            validator: checkMobile,
            trigger: 'blur'
          }
        ]

      },
      // 控制修改对话框的显示与隐藏
      editDialogVisible: false,
      // 控制分配角色对话框的显示与隐藏
      setRoledialogVisible: false,
      // 定义一个需要被分配角色的用户信息
      userinfo: {},
      // 展示角色列表数据
      rolesList: [],
      // 已经选中的角色id值显示到文本框中
      selectedRoleId: '',
      // 查询修改用户信息的对象
      editForm: {},
      // 修改表单时的验证规则对象
      editFormRules: {
        username: [
          {
            required: true,
            message: '请输入账号名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 12,
            message: '请输入3~5个字符',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          },
          {
            validator: checkEmail,
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: '请输入手机号码',
            trigger: 'blur'
          },
          {
            validator: checkMobile,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    // 获取表单数据
    async getUserList () {
      const { data: res } = await this.$http.get('users', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败！')
      }
      this.userlist = res.data.users
      this.total = res.data.total /* 动态获取接口total值 */
      // console.log(res)
    },
    // 分页监听pageSize改变的时间当前每页显示的页数
    handleSizeChange (newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 分页监听 页码值 改变事件
    handleCurrentChange (newPage) {
      // console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    // 监听switch开关状态的改变，并跟新到数据库中
    async userStateChanged (userinfo) {
      // console.log(userinfo)
      const { data: res } = await this.$http.put(
        `users/${userinfo.id}/state/${userinfo.mg_state}`
      )
      if (res.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state
        return this.$message.error('更新用户状态失败！')
      }
      this.$message.success('状态更新成功！')
    },
    // 新增用户表单时先对表单重置
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 修改按钮对表单初始化，清楚输入信息
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    // 新增账号表单确定
    addUser () {
      // 提交请求前，表单预验证
      this.$refs.addFormRef.validate(async valid => {
        // console.log(valid)
        // 可以发起添加用户的网络请求
        if (!valid) return
        const { data: res } = await this.$http.post('users', this.addForm)
        if (res.meta.status !== 201) {
          this.$message.error('添加用户失败！')
        }
        this.$message.success('添加用户成功！')
        // 隐藏添加用户对话框
        this.addDialogVisible = false
        this.getUserList()
      })
    },
    // 修改用户信息
    // 点击修改账号按钮时获取返回值行数据
    async showEditDialog (id) {
      const { data: res } = await this.$http.get('users/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('查询用户信息失败！')
      }
      this.editForm = res.data
      // 修改窗口显示
      this.editDialogVisible = true
    },
    // 修改账号表单确定
    editUser () {
      // 提交请求前，表单预验证
      this.$refs.editFormRef.validate(async valid => {
        // console.log(valid)返回true/flase
        // 可以发起修改用户的网络请求
        if (!valid) return
        const { data: res } = await this.$http.put('users/' +
        this.editForm.id, {
          email: this.editForm.email,
          mobile: this.editForm.mobile
        })
        if (res.meta.status !== 200) {
          this.$message.error('修改用户失败！')
        }
        // 隐藏修改用户对话框
        this.editDialogVisible = false
        //  刷新数据列表
        this.getUserList()
        // 提示修改成功
        this.$message.success(res.meta.msg)
      })
    },
    // 根据ID删除相对应用户信息
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
      const { data: res } = await this.$http.delete('users/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('查询用户信息失败！')
      }
      //  刷新数据列表
      this.getUserList()
      this.$message.success(res.meta.msg)
    },
    // 展示分配角色对话框用userinfo是data定义的属性展示内容在setRole中scope.row
    async setRole (userinfo) {
      this.userinfo = userinfo
      // 在展开对话框之前，获取所有角色列表res
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.rolesList = res.data
      // 显示角色对话框
      this.setRoledialogVisible = true
    },
    // 角色确定按钮事件
    async saveRoleInfo () {
      if (!this.selectedRoleId) {
        return this.$message.error('请选择要分配的角色')
      }
      const { data: res } = await this.$http.put(`users/${this.userinfo.id}/role`, { rid: this.selectedRoleId })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      this.getUserList()
      this.setRoledialogVisible = false
    },
    // 监听分配角色对话框的关闭事件重置下拉框已选择状态
    cloreVisible () {
      this.selectedRoleId = ''
      this.userinfo = {}
    }
  }
}
</script>

<style lang="less" scoped>
</style>
```

