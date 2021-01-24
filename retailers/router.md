---
title: 路由导航
date: 2020-10-26
categories:
 - 电商系统
tags:
 - 
isShowComments: false

---
```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/home.vue'
import Hellow from '../components/hellow.vue'
import Users from '../components/users/user.vue'
import Rights from '../components/power/rights.vue'
import Roles from '../components/power/roles.vue'
import Categories from '../components/goods/Cate.vue'
import Params from '../components/goods/pam.vue'
import Goods from '../components/goods/good.vue'
import Reports from '../components/report/Report.vue'
import Orders from '../components/order/order.vue'
import Add from '../components/goods/Add.vue'
// import Params from '../components/goods/Param.vue'
// 解决登录延迟多次登录报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    redirect: '/Login'
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/home',
    component: Home,
    // home的孩子页
    redirect: '/hellow',
    children: [{ path: '/hellow', component: Hellow, meta: { title: '首页' } },
      { path: '/users', component: Users, meta: { title: '用户列表' } },
      { path: '/rights', component: Rights, meta: { title: '权限列表' } },
      { path: '/roles', component: Roles, meta: { title: '角色列表' } },
      { path: '/reports', component: Reports, meta: { title: '报表' } },
      { path: '/categories', component: Categories, meta: { title: '商品分类' } },
      { path: '/Params', component: Params, meta: { title: '商品参数' } },
      { path: '/goods', component: Goods, meta: { title: '商品列表' } },
      { path: '/Orders', component: Orders, meta: { title: '订单列表' } },
      { path: '/goods/add', component: Add, meta: { title: '分类页面' } }
    ]
  }

]

const router = new VueRouter({
  base: '/dist2/',
  // 去除#
  mode: 'history',
  routes
})

// 拦截路由导航守卫
// to:将要访问的路径
// from代表从哪个路径跳转而来
// next是一个函数，代表放行
// next()放行;next('/login')代表强制跳转
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 获取登录成功的token值
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

// 修改title名称
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default router
```

