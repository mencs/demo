---
title: 登录页面
date: 2020-10-26
categories:
 - 电商系统
tags:
 - 
isShowComments: false

---

::: warning 左侧菜单

:::

![An images](/images/006.png) 

::: tip 源码

:::

```html
<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="img_box">
        <img src="../assets/imges/5.png" alt />
      </div>

      <!-- 登录框 -->
      <el-form ref="loginrel" :model="loginform" :rules="loginrules" label-width="0px" class="login_from">
        <!-- 账号 -->
        <el-form-item prop="username">
          <el-input v-model="loginform.username" placeholder="请输入账号">
            <i slot="prefix" class="el-icon-user-solid fa-lg"></i>
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginform.password" placeholder="请输入密码" type="password">
            <i slot="prefix" class="el-icon-lock el-icon-lock fa-lg"></i>
          </el-input>
        </el-form-item>
<el-checkbox v-model="checked">记住密码</el-checkbox>
<br>
        <!-- 登录按钮 -->
        <el-form-item class="btns">
          <el-button class="sub1" type="primary" size="small" @click="login">登录</el-button>
          <el-button class="sub2" type="success"  size="small" @click="loginref">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checked: true,
      /*  表单绑定对象 */
      loginform: {
        username: 'admin',
        password: '123456'
      },
      // rules 账号表单验证来自组件
      loginrules: {
        username: [
          {
            required: true,
            message: '请输入账号名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 5,
            message: '请输入3~5个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入账号密码',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 11,
            message: '请输入3~5个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  // 点击按钮重置表单
  methods: {
    loginref () {
      this.$refs.loginrel.resetFields()
      const h = this.$createElement
      this.$notify(
        {
          title: '友情提醒',
          message: h('i', { style: 'color:tral' }, '你已经重置秘密！'),
          position: 'top-left',
          type: 'success'
        })
      this.$notify(
        {
          title: '友情提醒',
          message: h('i', { style: 'color:tral' }, '你已经重置秘密！'),
          position: 'bottom-right',
          type: 'success'
        })
    },
    // 点击登录事件
    //  valid：bool类型
    login () {
      this.$refs.loginrel.validate(async (valid) => {
        // validate验证表单如果验证通过返回true则执行以下
        // if (!valid) return false
        // this.$http.post('login', this.loginForm): 返回值为promise
        // 返回值为promise，可加await简化操作 相应的也要加async
        const { data: res } = await this.$http.post('login', this.loginform)
        /* console.log(res)可以测试返回值promise */
        // this.$message.success('登录成功!')引用组件
        // res.meta.msg为data返回数据
        if (res.meta.status === 200) {
          this.$message.success(res.meta.msg)
          console.log(res)
          /* 开发测试信息 */
          // 1、将登陆成功之后的token, 保存到客户端的sessionStorage中; localStorage中是持久化的保存
          //   1.1 项目中出现了登录之外的其他API接口，必须在登陆之后才能访问
          //   1.2 token 只应在当前网站打开期间生效，所以将token保存在sessionStorage中
          window.sessionStorage.setItem('token', res.data.token)
          window.sessionStorage.setItem('username', res.data.username)
          // 2、通过编程式导航跳转到后台主页, 路由地址为：/home
          this.$router.push('/home')
        } else {
          this.$message.error(res.meta.msg)
          // console.log(res)/* 开发测试信息 */
        }
      })
    }
  },
  mounted () {
    this.$message.success('消息提醒内容')
    this.$refs.loginrel.resetFields()
    const h = this.$createElement
    this.$notify(
      {
        title: '温馨提醒',
        message: h('i', { style: 'color:tral' }, 'mm电商系统欢迎您！'),
        position: 'top-left',
        type: 'success'
      })
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-image: url(../assets/imges/86.jpg);
   background-size:cover;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #ffffff;
  border-radius: 3px;
  box-shadow: 0 0 20px #81f7f3;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.img_box {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  padding: 10px;
  border: 1px;
  box-shadow: 0 0 20px #81f7f3;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: yellow;
  }
}

.login_from {
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 0 20px;
  /* 减去超出 pading 超出部分 */
  box-sizing: border-box;
  i {
font-size: 18px;
  }
}

.btns {
  display: flex;
  justify-content:center;
}

.sub1 {
  padding: 12px 55px;
}

.sub2 {
  padding: 12px 55px;
}

.el-button + .el-button {
  margin-left: 30px;
}

@media only screen and (max-width: 768px) {
  .login_box {
    width: 98%;
  }
}
</style>
```