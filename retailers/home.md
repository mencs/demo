---
title: 登录后页面布局
date: 2020-10-26
categories:
 - 电商系统
tags:
 - 
isShowComments: false

---

::: tip 登录后UI

:::

---

![An images](/images/007.png) 

::: warning 代码：

:::

```vue
<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="../assets/imges/5.png" style="width:50px;height:50px;">
        <span>Vue后台管理系统</span>
      </div>
       <!-- <el-button type="primary" icon="iconfont iconpoweroff" circle @click="logout"></el-button> -->
  <el-popover
    placement="top-start"
    title="标题"
    width="200"
    trigger="hover"
    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
        <li><i :class="icon['1']"></i>  姓名: {{headersobj}}</li>
        <li><i :class="icon['2']"></i>  <el-link type="primary"  @click="logout">退出系统</el-link></li>
      <el-button slot="reference">hover 激活</el-button>
       <!-- <el-avatar slot="reference" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="50"></el-avatar> -->
     </el-popover>
    </el-header>
    <!-- 主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '220px'">
        <div class="toggle-button" @click="togleCollapse"><i class="iconfont iconfullscreen-shrink"></i></div>
        <el-menu unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath" background-color="#01DFD7" text-color="#fff" active-text-color="yellow">
           <!-- :unique-opened="true"->只允许展开一个菜单 -->
           <!-- :collapse-transition="false" -> 左侧拉升关闭动画 -->
           <!-- router -> 导航开启路由模式 -->
          <!-- 一级菜单  -->
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id" >
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <i :class="iconObj[item.id]"></i>
              <span>{{ item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)">
              <!-- 导航开启路由模式：
                将index值作为导航路由 -->
              <!-- 二级菜单的模板区域 -->
              <template slot="title">
               <i class="el-icon-loading"></i>
                <span>{{ subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 左侧菜单数据
      menuList: [],
      iconObj: {
        125: 'el-icon-s-custom',
        103: 'el-icon-menu',
        101: 'el-icon-platform-eleme',
        102: 'el-icon-s-goods',
        145: 'el-icon-s-data'
      },
      // 默认不折叠
      isCollapse: false,
      // 被激活导航地址
      activePath: '',
      headersobj: window.sessionStorage.getItem('username'),
      icon: {
        1: 'el-icon-s-custom',
        2: 'el-icon-error'
      }
    }
  },
  created () {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      // 清空token
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取请求菜单
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
      // console.log(res)
    },
    // 菜单的折叠与展开
    togleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 保存连接的激活地址
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  overflow:auto;
  height: 100%;
}
.el-header {
  height: 70px !important;
  background-color:#81F7D8;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: black;
  font-size: 20px;
  font-weight: bold;
  // .el-button{font-size: 24px;}
  .el-button.is-circle{padding:5px}
  > div {
    display: flex;
    align-items: center;
    img {
      margin-left: 10px;
      cursor: pointer;
    }
    span {
      margin-left: 10px;
    }
    small {font-size: 12px;}
  }
}
.el-aside {
 background-color: #01DFD7;

  .el-menu {
    border-right: none;
  }
}
.el-main {
  overflow:auto;
  background-color: #3ac26133;
}
.iconfont{
  margin-left: 3px;
}
.el-submenu__title i{color: #fff;}
.toggle-button {
  width: inherit;
  background-color:black;
  font-size: 16px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  // 鼠标放上去变成小手
  cursor: pointer;
}
</style>
```