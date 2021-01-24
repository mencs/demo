---
title: 商品分类参数
date: 2020-10-26
categories:
 - 电商系统
tags:
 - 
isShowComments: false

---

::: tip  分类参数

:::

![An images](/images/017.png) 

::: warning  代码

:::

```vue
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
     <el-card class="box-card">
       <!-- 警告提示的文案 -->
       <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon :closable="false">
      </el-alert>
      <!-- 下拉框 -->
      <el-row class="cascad">
        <el-col>
          <span>选择商品分类:</span>
     <el-cascader :options="catelist" :props="cateProps" v-model="valuekeys" @change="handleChange">    </el-cascader>
        </el-col>
      </el-row>
        <!-- Tab标签页 -->
  <el-tabs v-model="activeName" @tab-click="TabhandleClick">
    <!-- 添加动态参数面板 -->
    <el-tab-pane label="动态属性" name="many">
      <el-button type="primary" size="mini"  :disabled="isBtnDisabled" @click="addUser">
        添加参数
      </el-button>
    <!-- 动态参数表格 -->
    <el-table :data="manyTableData" border stripe style="width: 100%">
      <!-- 表格展开行 -->
      <el-table-column type="expand" label="折叠层" width="100px">
           <template slot-scope="scope">
            <!-- 获取展开层全部数据 -->
            <!-- <pre>{{scope.row}}</pre> -->
            <!-- 循环显示参数下的子标签 -->
           <el-tag type="danger" v-for = "(item,i) in scope.row.attr_vals" :key="i"
            closable  @close="handleClose(i,scope.row)"> {{item}} </el-tag>
           <!-- 动态循环文本框 -->
           <el-input
             class="input-new-tag"
             v-if="scope.row.inputVisible"
             v-model="scope.row.inputValue"
             ref="saveTagInput"
             size="small"
             @keyup.enter.native="handleInputConfirm (scope.row)"
             @blur="handleInputConfirm (scope.row)"
           >
           </el-input>
           <!-- 动态循环添加按钮 -->
           <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
           </template>
      </el-table-column>
      <!-- 索引列 -->
     <el-table-column type="index" label="序号"></el-table-column>
    <el-table-column prop="attr_name" label="参数名称"></el-table-column>
    <el-table-column prop="attr_sel" label="状态"> </el-table-column>
    <el-table-column prop="" label="操作">
       <template slot-scope="scope">
           <!-- 修改按钮 -->
         <el-button type="primary" icon="el-icon-edit" size="small" @click="updatepamDialog(scope.row.attr_id)">编辑</el-button>
         <!-- 删除按钮 -->
         <el-button type="danger" icon="el-icon-delete" size="small" @click="removePamById(scope.row.attr_id)">删除</el-button>
        </template>
       </el-table-column>
  </el-table>
    </el-tab-pane>
    <!-- 添加静态参数面板 -->
    <el-tab-pane label="添加属性" name="only">
        <el-button type="primary" size="mini"  :disabled="isBtnDisabled"  @click="addUser">
        添加属性
      </el-button>
       <!-- 静态参数表格 -->
    <el-table :data="onlyTableData" border stripe style="width: 100%">
      <!-- 表格展开行 -->
      <el-table-column type="expand" label="折叠层" width="100px">
        <template slot-scope="scope">
            <!-- 获取展开层全部数据 -->
            <!-- <pre>{{scope.row}}</pre> -->
            <!-- 循环显示参数下的子标签 -->
           <el-tag type="danger" v-for = "(item,i) in scope.row.attr_vals" :key="i"
            closable  @close="handleClose(i,scope.row)"> {{item}} </el-tag>
           <!-- 动态循环文本框 -->
           <el-input
             class="input-new-tag"
             v-if="scope.row.inputVisible"
             v-model="scope.row.inputValue"
             ref="saveTagInput"
             size="small"
             @keyup.enter.native="handleInputConfirm (scope.row)"
             @blur="handleInputConfirm (scope.row)"
           >
           </el-input>
           <!-- 动态循环添加按钮 -->
           <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
           </template>
      </el-table-column>
      <!-- 索引列 -->
     <el-table-column type="index" label="序号"></el-table-column>
    <el-table-column prop="attr_name" label="参数名称"></el-table-column>
    <el-table-column prop="attr_sel" label="状态"> </el-table-column>
    <el-table-column prop="" label="操作">
       <template slot-scope="scope">
           <!-- 修改按钮 -->
         <el-button type="primary" icon="el-icon-edit" size="small" @click="updatepamDialog(scope.row.attr_id)">编辑</el-button>
         <!-- 删除按钮 -->
         <el-button type="danger" icon="el-icon-delete" size="small"  @click="removePamById(scope.row.attr_id)">删除</el-button>
        </template>
       </el-table-column>
  </el-table>
    </el-tab-pane>
  </el-tabs>
   <!-- 新增参数弹出框 -->
<el-dialog :title="'添加'+ titletex" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
<!-- 内容主题表单区域 -->
<el-form :model="addForm" status-icon :rules="addFormRules" ref="addFormRef" label-width="100px" >
  <el-form-item :label="titletex + ':'" prop="attr_name">
    <el-input v-model="addForm.attr_name"></el-input>
  </el-form-item>
  </el-form >
  <!-- 底部按钮区域 -->
  <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addpam">确 定</el-button>
  </span>
</el-dialog>
   <!-- 修改参数弹出框 -->
<el-dialog :title="'修改'+ titletex" :visible.sync="updateDialogVisible" width="50%" @close="updateDialogClosed">
<!-- 内容主题表单区域 -->
<el-form :model="updateForm" status-icon :rules="updateFormRules" ref="updateFormRef" label-width="100px" >
  <el-form-item :label="titletex + ':'" prop="attr_name">
    <el-input v-model="updateForm.attr_name"></el-input>
  </el-form-item>
  </el-form >
  <!-- 底部按钮区域 -->
  <span slot="footer" class="dialog-footer">
    <el-button @click="updateDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updatepam">确 定</el-button>
  </span>
</el-dialog>
     </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
    // 存放data商品列表
      catelist: [],
      // 级联选择框的配置对象
      cateProps: {
        // hover 触发子菜单
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 级联选择框双向绑定的数组
      valuekeys: [],
      // Tabs被激活的标签名称
      activeName: 'many',
      // 存储动态参数数据
      manyTableData: [],
      // 存储静态参数数据
      onlyTableData: [],
      // 控制新增对话框显示与隐藏
      addDialogVisible: false,
      // 控制修改对话框显示与隐藏
      updateDialogVisible: false,
      // 添加参数表单数据对象
      addForm: {
      // 角色ID
        roleId: 0,
        // 角色名称
        attr_name: '',
        // 角色分类
        roleDesc: ''
      },
      // 修改表单数据对象
      updateForm: {
      },
      // 添加添加表单参数的验证规则对象
      addFormRules: {
        attr_name: [
          { required: true, message: '请输入参数名称', trigger: 'blur' },
          { min: 3, max: 12, message: '请输入3~5个字符', trigger: 'blur' }
        ]
      },
      // 修改表单参数的验证规则对象
      updateFormRules: {
        attr_name: [
          { required: true, message: '请输入参数名称', trigger: 'blur' },
          { min: 3, max: 12, message: '请输入3~5个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getCateList()
  },
  methods: {
    // 级联选择器获取所有商品列表
    async getCateList () {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.catelist = res.data
      // console.log(this.catelist)
    },
    // 级联选择器变化会触发这个函数    // 调用下边封装好的参数列表数据
    handleChange () {
      this.getParamsDta()
    },
    // Tab标签点击切换事件触发函数
    TabhandleClick () {
      console.log(this.activeName)
      // 调用下边封装好的参数列表数据
      this.getParamsDta()
    },
    // 级联选择器和Tab切换调用函数封装
    async getParamsDta () {
      // 控制只能选择二级
      if (this.valuekeys.length !== 3) {
        // 赋空值
        this.valuekeys = []
        // 选择三级分类再切换二级分类时清空之前三级分类数据
        this.manyTableData = []
        this.onlyTableData = []
        return
      }
      // 显示选中的三级分类
      // console.log(this.valuekeys)
      // 根据选中的id，和当前所处的面板获取对应的参数
      const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, { params: { sel: this.activeName } })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      // 渲染参数下折叠层的可选项如果为空则不显示标签
      res.data.forEach(item => {
        item.attr_vals = item.attr_vals
          ? item.attr_vals.split(' ') : []
          // 控制文本框的显示与隐藏
        item.inputVisible = false
        // 文本框中的值
        item.inputValue = ''
      })
      // 存储对应参数到data中
      console.log(res.data)
      // 区分动态及静态
      if (this.activeName === 'many') {
        this.manyTableData = res.data
      } else {
        this.onlyTableData = res.data
      }
    },
    // 新增角色弹出框
    addUser () {
      this.addDialogVisible = true
    },
    // @close点击取消清除上次新增表单输入的内容
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // @close点击取消清除上次修改表单输入的内容
    updateDialogClosed () {
      this.$refs.updateFormRef.resetFields()
    },
    // 添加按钮确定事件
    // 发起请求添加参数到数据库中  /*添加表单验证失败return、成功发起请求*/
    addpam () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post(`categories/${this.cateId}/attributes`,
          { attr_name: this.addForm.attr_name, attr_sel: this.activeName })
        if (res.meta.status !== 201) {
          return this.$message.error(res.meta.msg)
        }
        this.$message.success(res.meta.msg) /* 添加参数成功 */
        this.addDialogVisible = false /*  关闭窗口 */
        this.getParamsDta() /* 刷新数据列表  */
      })
    },
    // 修改按钮弹出对话框
    async updatepamDialog (attrid) {
      // 查询当前参数的信息
      const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes/${attrid}`,
        { params: { attr_sel: this.activeName } })
      if (res.meta.status !== 200) {
        return this.$message.error('获取参数失败')
      }
      this.updateForm = res.data /* 查询数据保存至updateForm中 */
      this.updateDialogVisible = true /* 打开修改窗口 */
    },
    // 修改按钮确定事件
    updatepam (attrid) {
      this.$refs.updateFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put(`categories/${this.cateId}/attributes/${this.updateForm.attr_id}`,
          { attr_name: this.updateForm.attr_name, attr_sel: this.activeName })
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.msg) /* 修改参数失败 */
        }
        this.$message.success(res.meta.msg) /* 修改参数成功 */
        this.updateDialogVisible = false /*  关闭窗口 */
        this.getParamsDta() /* 刷新数据列表  */
      })
    },
    // 删除按钮删除操作
    async removePamById (attrid) {
      // 弹窗确定是否删除
      const confirmResult = await this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 如果确认删除则返回字符串confirm
      // 如果取消删除则返回字符串cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除！')
      }
      const { data: res } = await this.$http.delete(`categories/${this.cateId}/attributes/${attrid}`)
      if (res.meta.status !== 200) {
        return this.$message.error('查询用户信息失败！')
      }
      //  刷新数据列表
      this.getParamsDta() /* 刷新数据列表  */
      this.$message.success(res.meta.msg)
    },
    // 标签文本框失去焦点，或者按下enter都会触发
    // 文字内容为空格或者空时初始化文本框
    handleInputConfirm (row) {
      if (row.inputValue.trim().length === 0) {
        row.inputValue = ''
        row.inputVisible = false
      }
      // 如果输入数据则生成标签并上传数据库
      row.attr_vals.push(row.inputValue.trim())
      row.inputValue = ''
      row.inputVisible = false
      // 调用修改参数标签封装函数
      this.saveattrvals(row)
    },
    // 发起网络请求
    // 将修改参数标签封装
    async saveattrvals (row) {
      const { data: res } = await this.$http.put(`categories/${this.cateId}/attributes/${row.attr_id}`, {
        attr_name: row.attr_name,
        attr_sel: row.attr_sel,
        // 输入参数之间加空格
        attr_vals: row.attr_vals.join(' ')
      })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg) /* 修改参数失败 */
      }
      this.$message.success(res.meta.msg) /* 修改参数成功 */
    },
    // 点击动态标签，自动获取文本输入框焦点
    showInput (row) {
      row.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 删除标签
    handleClose (i, row) {
      row.attr_vals.splice(i, 1)
      this.saveattrvals(row)
    }
  },
  // 判断商品分类如果不是三级则禁用按钮
  computed: {
    isBtnDisabled () {
      if (this.valuekeys.length !== 3) {
        return true
      }
      return false
    },
    // 当前选中的三级分类id
    cateId () {
      if (this.valuekeys.length === 3) {
        return this.valuekeys[2]
      }
      return null
    },
    // 添加参数对话框文本动态区分
    titletex () {
      if (this.activeName === 'many') {
        return '动态参数'
      }
      return '静态参数'
    }
  }
}
</script>

<style lang="less" scoped>
.cascad{margin: 15px 0;}
.el-cascader{margin-left: 15px; width: 300px;}
.el-tag {margin:10px}
.input-new-tag {width:150px}
</style>
```

