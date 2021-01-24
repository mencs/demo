---
title: 角色列表
date: 2020-10-26
categories:
 - 电商系统
tags:
 - 
isShowComments: false

---



::: tip  角色列表

:::

![An images](/images/012.png) 

```html
<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
        <el-row>
              <el-button type="primary" icon="el-icon-edit" @click="addUser">新增</el-button>
        </el-row>
         <!-- 账号列表 -->
      <el-table :data="rolelist" border stripe>
        <!-- 展开列折叠效果 -->s
      <el-table-column type="expand" label="折叠层" width="100px">
        <template slot-scope="scope">
            <!-- 获取展开层全部数据 -->
        <!-- <pre>{{scope.row}}</pre> -->
        <el-row :class="['rowbdbottom', i1 ===0 ? 'rowbdtop' : '', 'vcenter']" v-for="(item1, i1) in scope.row.children" :key="item1.id">
            <!-- 渲染一级权限 -->
       <el-col :span="5">
        <el-tag closable @close="removeRightById(scope.row, item1.id)">{{ item1.authName}}</el-tag>
       <i class="el-icon-caret-right"></i>
       </el-col>
       <!-- 渲染二级和三级 -->
       <el-col :span="19">
         <el-row :class="[i2 === 0 ? '' : 'rowbdtop', 'vcenter']" v-for="(item2, i2) in item1.children" :key="item2.id">
            <!-- 渲染一级权限 -->
       <el-col :span="6">
       <el-tag type="warning" closable @close="removeRightById(scope.row, item2.id)">{{item2.authName}}</el-tag>
       <i class="el-icon-caret-right"></i>
       </el-col>
       <!-- 三级权限列表  -->
       <el-col :span="18">
      <el-tag type="success" v-for="(item3) in item2.children" :key="item3.id" closable @close="removeRightById(scope.row, item3.id)">
        {{ item3.authName}}
        </el-tag>
       </el-col>
      </el-row>
       </el-col>
       </el-row>
        </template>
      </el-table-column>
        <!-- index索引列 -->
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
       <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="" label="角色操作" width="300px">
           <template slot-scope="scope">
           <!-- 修改按钮 -->
         <el-button type="primary" icon="el-icon-edit" size="small" @click="updaterolesDialog(scope.row.id)">编辑</el-button>
         <!-- 删除按钮 -->
         <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteroles(scope.row.id)">删除</el-button>
         <el-tooltip class="item" effect="dark" content="权限控制" placement="top-start">
         <el-button type="warning" icon="el-icon-setting" size="small" @click="showSetRightDialog(scope.row)">权限分配</el-button>
         </el-tooltip>
        </template>
      </el-table-column>
      </el-table>
 <!-- 新增角色弹出框 -->
<el-dialog title="新增角色" :visible.sync="addDialogVisible" width="50%"  @close="addFromDialogClosed">
<!-- 内容主题表单区域 -->
<el-form :model="addRoleForm" status-icon :rules="addRoleFormRules" ref="addRoleFormRef" label-width="100px" >
  <el-form-item label="角色名称:" prop="roleName">
    <el-input v-model="addRoleForm.roleName"></el-input>
  </el-form-item>
    <el-form-item label="角色描述:" prop="roleDesc">
    <el-input v-model="addRoleForm.roleDesc"></el-input>
  </el-form-item>
  </el-form >
  <!-- 底部按钮区域 -->
  <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addFrom">确 定</el-button>
  </span>
</el-dialog>
<!-- 修改角色 -->
<el-dialog title="修改角色11" :visible.sync="updateDialogVisible" width="50%" @close="editDialogClosed">
<!-- 内容主题表单区域 -->
<el-form :model="updateRoleForm" :rules="updateRoleFormRules" status-icon ref="updateRoleFormRef" label-width="100px" >
  <el-form-item label="角色名称:" prop="roleName">
    <el-input v-model="updateRoleForm.roleName"></el-input>
  </el-form-item>
    <el-form-item label="角色描述:" prop="roleDesc">
    <el-input v-model="updateRoleForm.roleDesc"></el-input>
  </el-form-item>
  </el-form >
  <!-- 底部按钮区域 -->
  <span slot="footer" class="dialog-footer">
    <el-button @click="updateDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editForm">确 定</el-button>
  </span>
</el-dialog>

      <!-- 权限弹出窗口 -->
      <el-dialog title="权限分配" :visible.sync="SetRightDialog" width="50%" @close="SetRightDialogClosed">
      <el-tree :data="rightslist" :props="treeProps" show-checkbox default-expand-all node-key="id" :default-checked-keys="defKeys" ref="treeRef"></el-tree>
      <span slot="footer" class="dialog-footer">
      <el-button @click="SetRightDialog = false">取 消</el-button>
      <el-button type="primary" @click="allotrights">确 定</el-button>
      </span>
      </el-dialog>
      </el-card>
    </div>
</template>
<script>
export default {
  data () {
    return {
    // 所有角色列表数据
      rolelist: [],
      // 控制新增角色显示与隐藏
      addDialogVisible: false,
      // 添加角色表单数据对象
      addRoleForm: {
      // 角色ID
        roleId: 0,
        // 角色名称
        roleName: '',
        // 角色分类
        roleDesc: ''
      },
      // 添加角色表单的验证规则对象
      addRoleFormRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, max: 12, message: '请输入3~5个字符', trigger: 'blur' }
        ]
      },
      // 修改角色弹窗默认隐藏
      updateDialogVisible: false,
      // 查询修改用户信息的对象保存接口返回的行值
      updateRoleForm: {},
      // 修改表单角色验证规则
      updateRoleFormRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, max: 12, message: '请输入3~5个字符', trigger: 'blur' }
        ]
      },
      // 权限弹出窗口默认隐藏
      SetRightDialog: false,
      // 获取所有权限数据
      rightslist: [],
      // 权限树表数据节点展示
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      // 数组树表ID
      defKeys: [],
      // 当前即将分配权限的角色id
      roleId: ''
    }
  },
  created () {
    this.getRoleList()
  },
  methods: {
    //   获取所有角色的列表
    async getRoleList () {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败')
      }
      this.rolelist = res.data
      // console.log(this.rolelist)
    },
    // 新增角色弹出框
    addUser () {
      this.addDialogVisible = true
    },
    // 新增角色确定时保存数据库
    addFrom () {
      this.$refs.addRoleFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('roles', this.addRoleForm)
        if (res.meta.status !== 201) {
          return this.$message.error('添加分类失败！')
        }

        this.$message.success(res.meta.msg)
        // 更新表单数据
        this.getRoleList()
        // 关闭窗口
        this.addDialogVisible = false
      })
    },
    // 打开表单前清除上次添加角色input内容
    addFromDialogClosed () {
      this.addRoleForm.roleName = ''
      this.addRoleForm.roleDesc = ''
    },
    // 根据权限id删除对应的权限标签
    async removeRightById (role, rightId) {
      const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
      ).catch(err => err)
      // 点击确定 返回值为：confirm
      // 点击取消 返回值为： cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消了删除')
      }
      // console.log('删除成功')
      const { data: res } = await this.$http.delete(
        `roles/${role.id}/rights/${rightId}`
      )
      if (res.meta.status !== 200) {
        return this.$message.error('删除权限失败！')
      }
      // 删除标签时不再关闭页面刷新
      role.children = res.data
      //   不建议使用
      // this.rolesList = res.data
      // this.getRoleList()
    },
    // 展示分配权限的对话框
    async showSetRightDialog (role) {
      // 存储数据库权限id最新roleId
      this.roleId = role.id
      // 显示树表
      const { data: res } = await this.$http.get('rights/tree')
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限数据失败')
      }
      //  把获取到的权限数据保存到data中
      this.rightslist = res.data
      // console.log(this.rightslist)
      // 递归获取三级节点ID
      this.getLeafkeys(role, this.defKeys)
      // 点击权限按钮弹出窗口
      this.SetRightDialog = true
    },
    // 通过递归 获取角色下三级权限的 id, 并保存到defKeys数组
    getLeafkeys (node, arr) {
      // 没有children属性，则是三级节点
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => this.getLeafkeys(item, arr))
    },
    // 打开权限弹框之前清除上次数组数据
    SetRightDialogClosed () {
      this.defKeys = []
    },
    // 更新分配的权限ID到数据库中
    async allotrights () {
      const keys = [
      // 展开选中节点ID
        ...this.$refs.treeRef.getCheckedKeys(),
        // 展开半节点ID
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      // console.log(keys)
      const idStr = keys.join(',')
      const { data: res } = await this.$http.post(`roles/${this.roleId}/rights`, { rids: idStr })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      // 刷新数据列表
      this.getRoleList()
      // 并关闭权限弹窗
      this.SetRightDialog = false
    },
    // 修改查询
    // 点击修改按钮时获取返回值行数据保存到 updateRoleForm
    async updaterolesDialog (id) {
      const { data: res } = await this.$http.get('roles/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('查询用户信息失败！')
      }
      this.updateRoleForm = res.data
      this.$message.success(res.meta.msg)
      // 修改窗口显示
      this.updateDialogVisible = true
    },
    // 修改按钮前对表单初始化，清除输入信息
    editDialogClosed () {
      this.$refs.updateRoleFormRef.resetFields()
    },
    // 修改确定按钮事件
    editForm () {
      // 提交请求前，表单预验证
      this.$refs.updateRoleFormRef.validate(async valid => {
        // console.log(valid)返回true/flase
        // 可以发起修改用户的网络请求
        if (!valid) return
        const { data: res } = await this.$http.put('roles/' +
        this.updateRoleForm.roleId, {
          roleName: this.updateRoleForm.roleName,
          roleDesc: this.updateRoleForm.roleDesc
        })
        if (res.meta.status !== 200) {
          this.$message.error('修改用户失败！')
        }
        // 隐藏修改用户对话框
        this.updateDialogVisible = false
        //  刷新数据列表
        this.getRoleList()
        // 提示修改成功
        this.$message.success('角色信息修改成功！')
      })
    },
    // 删除分类行
    // 根据ID删除相对应用户信息
    async deleteroles (id) {
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
      const { data: res } = await this.$http.delete('roles/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('查询用户信息失败！')
      }
      //  刷新数据列表
      this.getRoleList()
      this.$message.success(res.meta.msg)
    }
  }
}
</script>
<style lang="less" scoped>
.el-tag{margin: 7px;}/* 展开列标签 */
.rowbdtop{border-top: 1px solid #A9F5F2}/* 展开列标签上下边框线 */
.rowbdbottom{border-bottom: 1px solid #A9F5F2}
// 展开列一级、二级菜单垂直居中
.vcenter{
  display: flex;
  align-items: center;
}
</style>
```

