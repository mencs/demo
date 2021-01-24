---
title: 添加商品
date: 2020-10-26
categories:
 - 电商系统
tags:
 - 
isShowComments: false
---

```vue

<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods' }">商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区 -->
    <el-card class="box-card">
      <!-- 消息提示 -->
      <el-alert title="消息提示的文案" type="info" center show-icon :closable="false"></el-alert>
      <!-- 步骤条 -->
      <!-- -0让数值型变为字符型 -->
      <el-steps :space="200" :active="activeindex - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- 包裹大表单 -->
     <el-form :model="addForm" :rules="addFormrules" ref="addFormref" label-width="100px" label-position="top">
      <!-- Tab标签树形结构 -->
      <!-- 这里activeindex为字符型获取name值 -->
     <el-tabs  v-model="activeindex" :tab-position="'left'"
     :before-leave='beforeTableleave' @tab-click="onclickid">
      <el-tab-pane label="基本信息" name="0">
          <!-- prop为校验规则 -->
        <el-form-item label="商品分类" prop="goods_cat">
          <el-cascader v-model="addForm.goods_cat" :options="catelist" expandTrigger= 'hover'
            :props="cateprops"  @change="handleChange" :show-all-levels="false" clearable style="width:30%">
          </el-cascader>
        </el-form-item>
        <el-form-item label="商品名称" prop="goods_name" style="float:left;width:49%">
         <el-input v-model="addForm.goods_name" ></el-input>
        </el-form-item>
           <el-form-item label="商品价格" prop="goods_price" style="float: right;width:49%">
         <el-input v-model="addForm.goods_price" type="number"></el-input>
        </el-form-item>
           <el-form-item label="商品重量" prop="goods_weight" style="float:left;width:49%">
         <el-input v-model="addForm.goods_weight"  type="number"></el-input>
        </el-form-item>
           <el-form-item label="商品数量" prop="goods_number" style="float: right;width:49%">
         <el-input v-model="addForm.goods_number" type="number"></el-input>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="商品参数" name="1">
        <el-form-item :label="item.attr_name" v-for="item in manytabDate" :key="item.attr_id">
           <el-checkbox-group v-model="item.attr_vals">
            <el-checkbox :label="cb" v-for="(cb,i) in item.attr_vals" :key="i" border></el-checkbox>
         </el-checkbox-group>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="商品属性" name="2">
            <el-form-item :label="item.attr_name" v-for="item in onlytabDate" :key="item.attr_id">
             <el-input v-model="item.attr_vals"></el-input>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="商品图片" name="3">
        <!-- action图片上传服务器api地址 -->
        <!-- headers上传图片请求头携带token -->
        <!-- on-success监听服务器返回的路径 -->
        <el-upload class="upload-demo" :action="uploadURL" :headers="headersobj" :on-success="Successresponse"
         :on-preview="handlePreview" :on-remove="handleRemove" list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
       <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
       </el-upload>
      </el-tab-pane>
      <el-tab-pane label="商品内容" name="4">
        <!-- 富文本编辑器 -->
         <quill-editor v-model="addForm.goods_introduce">
        </quill-editor>
         <el-button type="primary" @click="addss" class="addcss">添加商品
        </el-button>
      </el-tab-pane>
    </el-tabs>
     </el-form>
    </el-card>
    <el-dialog title="图片预览" :visible.sync="imgdialogVisible" width="60%">
    <img :src="previewpath" alt="" class="previewimg">
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data () {
    return {
      // 当前开始步骤
      activeindex: '0',
      /* 表单参数 */
      addForm: {
        goods_name: '测试',
        goods_price: 1,
        goods_weight: 1,
        goods_number: 1,
        goods_cat: '',
        // 用来保存服务器返回上传图片路径信息
        pics: [],
        /*  商品详情字段内容--富文本编辑器 */
        goods_introduce: '',
        // 商品的参数（数组），包含 `动态参数` 和 `静态属性`
        attrs: []
      },
      addFormrules: {
        goods_name: [{ required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 1, max: 15, message: '请输入3~5个字符', trigger: 'blur' }
        ],
        goods_price: [{ required: true, message: '请输入价格', trigger: 'blur' },
          { min: 1, max: 15, message: '请输入3~5个字符', trigger: 'blur' }
        ],
        goods_weight: [{ required: true, message: '请输入价格', trigger: 'blur' }],
        goods_number: [{ required: true, message: '请输入价格', trigger: 'blur' }],
        goods_cat: [{ required: true, message: '请选择商品分类', trigger: 'blur' }]
      },
      /* 数组展示商品分类 */
      catelist: [],
      // 商品分类
      cateprops: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      // Tab动态商品参数
      manytabDate: [],
      // 静态商品参数
      onlytabDate: [],
      // 上传地址
      uploadURL: 'http://timemeetyou.com:8889/api/private/v1/upload',
      // headers上传图片请求头携带token否则上传不了
      headersobj: { Authorization: window.sessionStorage.getItem('token') },
      // 点击图片预览路径
      previewpath: '',
      // 图片预览窗口
      imgdialogVisible: false
    }
  },
  created () {
    this.categorieslist()
  },
  methods: {
    async categorieslist () {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败！')
      }
      this.$message.success(res.meta.msg)
      //  商品分类数据
      this.catelist = res.data
      console.log(this.catelist)
    },
    // 级联选择器变化会触动这个
    handleChange () {
      console.log(this.addForm.goods_cat)
      // 商品分类只允许选择三级分类
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = []
        return this.$message.error('请选择三级分类！')
      }
      this.$message.success('成功')
    },
    // Tab标签切换监听return=flase阻止切换
    beforeTableleave (oldActiveName, activeName) {
      // console.log('即将离开标签' + activeName)
      // console.log('即将进入标签' + oldActiveName)
      if (oldActiveName !== 0 && this.addForm.goods_cat.length !== 3) {
        this.$message.error('请选择商品分类！')
        return false
      }
    },
    async onclickid () {
      // 获取当前所处标签行当前为商品参数
      // console.log(this.activeindex)
      if (this.activeindex === '1') {
        const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`,
          { params: { sel: 'many' } })
        if (res.meta.status !== 200) {
          this.$message.error(res.meta.msg)
        }
        this.$message.success(res.meta.msg)
        // 动态参数字符串转换成数组
        res.data.forEach(item => {
          item.attr_vals = item.attr_vals.length === 0 ? []
            : item.attr_vals.split(' ')
        })
        this.manytabDate = res.data
        console.log(res.data)
      } else if (this.activeindex === '2') {
        const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`,
          { params: { sel: 'only' } })
        if (res.meta.status !== 200) {
          this.$message.error('获取静态参数失败！')
        }
        this.$message.success('获取静态参数成功！')
        this.onlytabDate = res.data
        console.log(res.data)
      }
    },
    // 上传图片点击预览事件
    handlePreview (file) {
      // console.log(file)
      this.previewpath = file.response.data.url
      console.log(this.previewpath) /* 点击图片路径 */
      this.imgdialogVisible = true /* 显示图片预览 */
    },
    // 处理移除图片的操作
    handleRemove (file) {
      // console.log(file)
      // 1、获取将要删除的临时路径
      const filepath = file.response.data.tmp_path
      // 2、从addForm表单pics数组中找到对应的索引值
      // 说明：X为未知数，当pics数组某列x中pics路径等于点击删除时的tmp_path路径
      const i = this.addForm.pics.findIndex(x => x.pic === filepath)
      // 3、调用数组的splice方法把图片信息对象从数组pics中删除i
      this.addForm.pics.splice(i, 1)
      console.log(this.addForm)
    },
    // 监听图片上传并把图片路径保存到表单数组中
    Successresponse (response) {
      console.log(response) /* 服务器返回图片路径信息 */
      /*  1、拼接得到服务器图片路径信息 */
      const picsinfo = {
        pic: response.data.tmp_path
      }
      // 2、将图片路径保存到pics数组中
      this.addForm.pics.push(picsinfo)
      console.log(this.addForm)
    },
    // 点击添加商品按钮
    addss () {
      // console.log(this.addForm)
      // 添加商品表单预验证
      this.$refs.addFormref.validate(async valid => {
        if (!valid) {
          return this.$message.error('请填写必填项！')
        }
        // this.$message.success('执行添加商品事件！')
        // 将数组转化为字符串
        // 深复制拷贝表单addfrom为from单独使用
        const form = _.cloneDeep(this.addForm)
        form.goods_cat = form.goods_cat.join(',')
        // console.log(form)
        // 处理动态参数数组循环
        this.manytabDate.forEach(item => {
          const newInfo1 = { attr_id: item.attr_id, attr_value: item.attr_vals.join(' ') }
          this.addForm.attrs.push(newInfo1)
        })
        // 处理静态参数
        this.onlytabDate.forEach(item => {
          const newInfo2 = { attr_id: item.attr_id, attr_value: item.attr_vals }
          this.addForm.attrs.push(newInfo2)
        })
        form.attrs = this.addForm.attrs
        console.log(form.attrs)
        // console.log(this.addForm)
        const { data: res } = await this.$http.post('goods', form)
        if (res.meta.status !== 201) {
          return this.$message.error(res.meta.msg)
        }
        this.$message.success(res.meta.msg)
        // 路由重定向
        this.$router.push('/goods')
      })
    }
  },
  // 计算属性id值供onclickid调用
  computed: {
    cateId () {
      if (this.addForm.goods_cat.length === 3) {
        return this.addForm.goods_cat[2]
      }
      return null
    }
  }
}
</script>
<style lang="less" scoped>
.el-checkbox{
  margin: 0 10px 0 0 !important;
}
.previewimg{width: 100%;}
.addcss {margin-top:10px;float: right;}
</style>

```

