---
title: Vue-项目优化
date: 2020-01-06
isShowComments: false 
sidebarDepth: 0
categories:
 - Vue-项目优化
tags:
 - 项目优化
---
::: tip 项目优化

:::

## 一、build编译中去除console.log()

当项目发布时console.log()是不允许存在的否则会编译警告,此时安装开发依赖：正在安装开发依赖 babel-plugin-transform-remove-console

![An images](/images/020.png)

方法一 : 在项目babel.config.js引入'transform-remove-console'

![An images](/images/022.png)

这样做虽然能解决问题，但在开发阶段 console 也会被删除，不方便开发调试。

---

这里介绍方法二：

使用依赖 babel-plugin-transform-remove-console

搜索安装依赖后在配置文件babel.config.js中引用

```js
// 这是项目发布阶段需要用到的 babel 插件
// 'development'产品调试阶段
// 'production'产品发布阶段
const prodPlugins = []
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
}

module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    // 发布产品时候的插件数组
    ...prodPlugins
  ]
}
```

这样就能只在发布阶段删除 `console` ，开发阶段不受影响

## 二、生成打包报告

打包时，为了直观地发现项目中存在的问题，可以打包时生成报告。生成报告的方式有两种：

1. 通过命令行参数的形式生成报告

   ```js
   通过vue-cli的命令选项可以生成打包报告
   
   --report选项可以生成report.html以帮助分析包内容
   
   vue-cli-service build --report
   ```

   2.通过vue ui面板直接查看（**推荐**）

   --控制台及分析面板---

## 三、修改webpack默认配置

1、通过vue.config.js修改webpack默认配置

通过vue-cli3.0工具生成的项目。默认隐藏了所有webpack的配置项，目的是为了屏蔽项目的配置过程，让程序员把工作重心放到具体功能和业务逻辑实现上。

在vue项目根目录创建vue.config.js文件，配置可百度。

```js
//向外暴露一个配置对象
module.exports = {

  //基本路径

  //baseUrl: './',//vue-cli3.3以下版本使用

​    publicPath:'./',//vue-cli3.3+新版本使用

​    publicPath: process.env.NODE_ENV === "production" ? "/dist2/" : "/", //dist2为打包根文件夹名称要和tomcat文件名称一致
    }
```

## 四、开发模式/发布模式指定不同打包入口

默认情况下，vue项目的开发/发布模式，共用一个打包入口文件（即src/main.js）

为了将项目的开发过程与发布过程分离，我们可以分为两种模式，各自指定打包入口文件：

1、开发模式入口文件为src/main-dev.js

2、发布模式入口文件为src/main-prod.js

在vue.config.js导出的配置对象中，新增configureWebpack或者chainWebpack节点，来自定义Webpack的打包配置。

configureWebpack和chainWebpack作用相同，唯一的区别修改Webpack配置的方式不同

1、chainWebpack通过链式编程的形式，来修改默认的Webpack配置

2、configureWebpack通过操作对象形式，来修改默认的Webpack配置

---

::: tip 具体实现参考

此时使用的chainWebpack通过链式编程的形式

:::

`vue.config.js`配置

```js
module.exports = {
  chainWebpack: config => {
    // 发布模式--production
    config.when(process.env.NODE_ENV === 'production',config => 
    {config.entry('app').clear().add('./src/main-prod.js')
    清楚默认发布模式app路径追加自己的main1.js发布路径/名称
    })
  }
      // 开发模式-development
     config.when(process.env.NODE_ENV === 'development', config =>
     {config.entry('app') .clear().add('./src/main-dev.js')
     清楚默认开发模式app路径追加自己的main2.js开发路径/名称
    })
    }
    }
```

## 五、通过externals加载外部资源CDN资源

默认情况下，通过import语法导入的第三方依赖包，最终会合并到同一个文件js中，导致单文件体积较大

![An images](/images/023.png)

为解决此项问题，可以通过Webpack的externals节点，来配置外部CDN资源，凡是声明在externals中的第三方依赖包，都不会被打包。

::: tip  1、具体配置代码如下`vue.config.js`配置

:::



```js

module.exports = {
	//基本路径
	//baseUrl: './',//vue-cli3.3以下版本使用
        publicPath:'./',//vue-cli3.3+新版本使用
		publicPath: process.env.NODE_ENV === "production" ? "/dist2/" : "/", //dist2为打包根文件夹名称要和tomcat文件名称一致
		chainWebpack: config => {
			// 发布模式
			config.when(process.env.NODE_ENV === 'production', config => {
			  config.entry('app').clear().add('./src/main.js')
                //打包名称如下的将不会打包js文件中，会自动查找pulic/index.html中的CDN
			  config.set('externals', {
				vue: 'Vue',
				'vue-router': 'VueRouter',
				axios: 'axios',
				lodash: '_',
				echarts: 'echarts',
				nprogress: 'NProgress',
				'vue-quill-editor': 'VueQuillEditor'
			  })
			})
			// 开发模式
			config.when(process.env.NODE_ENV === 'development', config => {
			  config
				.entry('app')
				.clear()
				.add('./src/main.js')
			})
		  }
}
```
::: tip 2、在public/index.html引用CDN资源

:::

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= htmlWebpackPlugin.options.title %></title>
        <!-- nprogress 的样式表文件 -->
        <link rel="stylesheet" href="https://cdn.staticfile.org/nprogress/0.2.0/nprogress.min.css" />
        <!-- 富文本编辑器 的样式表文件 -->
        <link rel="stylesheet" href="https://cdn.staticfile.org/quill/1.3.4/quill.core.min.css" />
        <link rel="stylesheet" href="https://cdn.staticfile.org/quill/1.3.4/quill.snow.min.css" />
        <link rel="stylesheet" href="https://cdn.staticfile.org/quill/1.3.4/quill.bubble.min.css" />
        <!-- element-ui 的样式表文件 -->
        <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
        
        <script src="https://cdn.staticfile.org/vue/2.5.22/vue.min.js"></script>
        <script src="https://cdn.staticfile.org/vue-router/3.0.1/vue-router.min.js"></script>
        <script src="https://cdn.staticfile.org/axios/0.18.0/axios.min.js"></script>
        <script src="https://cdn.staticfile.org/lodash.js/4.17.11/lodash.min.js"></script>
        <script src="https://cdn.staticfile.org/echarts/4.1.0/echarts.min.js"></script>
        <script src="https://cdn.staticfile.org/nprogress/0.2.0/nprogress.min.js"></script>
        <!-- 富文本编辑器的 js 文件 -->
        <script src="https://cdn.staticfile.org/quill/1.3.4/quill.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/vue-quill-editor@3.0.4/dist/vue-quill-editor.js"></script>
    
        <!-- element-ui 的 js 文件 -->
       <!-- 引入组件库 -->
       <script src="https://unpkg.com/element-ui/lib/index.js"></script>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>

```



3、像element-ui插件直接注释，在上方全局引入CDN的js及css即可。

![An images](/images/025.png)

4、此时运行npm run build  生成的打包文件会小很多。

![An images](/images/026.png)

---



## 六、自定义首页内容

1、在`vue.config.js`配置

```js
module.exports = {
  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main-prod.js')  
     config.set('externals', {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    axios: 'axios',
    lodash: '_',
    echarts: 'echarts',
    nprogress: 'NProgress',
    'vue-quill-editor': 'VueQuillEditor'
  })
   //1、发布模式给public下的html增加配置项isProd = true
  config.plugin('html').tap(args => {
    args[0].isProd = true
    return args
  })
})

//  
config.when(process.env.NODE_ENV === 'development', config => {
  config
    .entry('app')
    .clear()
    .add('./src/main-dev.js')
   //2、开发模式给public下的html增加配置项isProd = false
  config.plugin('html').tap(args => {
    args[0].isProd = false
    return args
  })
})
        }
}


```
2、在public下的index.html配置

   `<title><%= htmlWebpackPlugin.options.isProd ? '' : 'dev - ' %>电商后台管理系统</title>`

- 说明：三元判断 如果处于发布模式isProd=true则`<title>电商后台管理系统</title>` 
- 否则title中增加`<title> dev -电商后台管理系统</title>`

​    ` <% if(htmlWebpackPlugin.options.isProd){ %>`

​    <link rel="stylesheet" href="https://cdn.staticfile.org/nprogress/0.2.0/nprogress.min.css" 

`   <% } %>`

- 说明：三元判断 如果处于发布模式isProd=true则加载外部CDN文件；否则不加载



```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= htmlWebpackPlugin.options.isProd ? '' : 'dev - ' %>电商后台管理系统</title>
     <% if(htmlWebpackPlugin.options.isProd){ %>
<!-- nprogress 的样式表文件 -->
<link rel="stylesheet" href="https://cdn.staticfile.org/nprogress/0.2.0/nprogress.min.css" />
<!-- 富文本编辑器 的样式表文件 -->
<link rel="stylesheet" href="https://cdn.staticfile.org/quill/1.3.4/quill.core.min.css" />
<link rel="stylesheet" href="https://cdn.staticfile.org/quill/1.3.4/quill.snow.min.css" />
<link rel="stylesheet" href="https://cdn.staticfile.org/quill/1.3.4/quill.bubble.min.css" />
<!-- element-ui 的样式表文件 -->
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">

<script src="https://cdn.staticfile.org/vue/2.5.22/vue.min.js"></script>
<script src="https://cdn.staticfile.org/vue-router/3.0.1/vue-router.min.js"></script>
<script src="https://cdn.staticfile.org/axios/0.18.0/axios.min.js"></script>
<script src="https://cdn.staticfile.org/lodash.js/4.17.11/lodash.min.js"></script>
<script src="https://cdn.staticfile.org/echarts/4.1.0/echarts.min.js"></script>
<script src="https://cdn.staticfile.org/nprogress/0.2.0/nprogress.min.js"></script>
<!-- 富文本编辑器的 js 文件 -->
<script src="https://cdn.staticfile.org/quill/1.3.4/quill.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-quill-editor@3.0.4/dist/vue-quill-editor.js"></script>

<!-- element-ui 的 js 文件 -->
<script src="https://cdn.staticfile.org/element-ui/2.8.2/index.js"></script>
    <% } %>
      </head>
  <body>
    <noscript>
      <strong>We're sorry but vue_shop_admin doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>

​    <!-- built files will be auto injected -->
  </body>
</html>
```

---



## 七、路由懒加载

当打包构建项目时,Javascript包会非常大，影响页面加载，如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，有便提高访问效率。

具体实现三步骤：

1、安装@babel/plugin-syntax-dynamic-import包。

2、在babel.config.js配置文件中声明该插件。

3、将路由改为按需加载的形式。

示例：

①安装开发依赖插件

![An images](/images/026.png)

②babel.config.js配置文件中声明该插件。

```json
// 这是项目发布阶段需要用到的 babel 插件
// development产品调试阶段
// 'production'产品发布阶段
const prodPlugins = []
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    // 发布产品时候的插件数组/* 打包去除console.log() */
    ...prodPlugins,
    // 路由懒加载插件
    '@babel/plugin-syntax-dynamic-import'
  ]
}

```

③将路由改为按需加载的形式

```js 
// 原始路由导航
import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../components/Login.vue'
// import Home from '../components/home.vue'
// import Hellow from '../components/hellow.vue'
// import Users from '../components/users/user.vue'
// import Rights from '../components/power/rights.vue'
// import Roles from '../components/power/roles.vue'
// import Categories from '../components/goods/Cate.vue'
// import Params from '../components/goods/pam.vue'
// import Goods from '../components/goods/good.vue'
// import Reports from '../components/report/Report.vue'
// import Orders from '../components/order/order.vue'
// import Add from '../components/goods/Add.vue'

// 启用路由懒加载
const Login = () => import(/* webpackChunkName: "Login_Home_Hellow" */ '../components/Login.vue')
const Home = () => import(/* webpackChunkName: "Login_Home_Hellow" */ '../components/home.vue')
const Hellow = () => import(/* webpackChunkName: "Login_Home_Hellow" */ '../components/hellow.vue')
const Users = () => import(/* webpackChunkName: "user_rights_roles" */ '../components/users/user.vue')
const Rights = () => import(/* webpackChunkName: "user_rights_roles" */ '../components/power/rights.vue')
const Roles = () => import(/* webpackChunkName: "user_rights_roles" */ '../components/power/roles.vue')
const Goods = () => import(/* webpackChunkName: "goods_params_categories" */ '../components/goods/good.vue')
const Add = () => import(/* webpackChunkName: "goods_params_categories" */ '../components/goods/Add.vue')
const Params = () => import(/* webpackChunkName: "goods_params_categories" */ '../components/goods/pam.vue')
const Categories = () => import(/* webpackChunkName: "goods_params_categories" */ '../components/goods/Cate.vue')
const Orders = () => import(/* webpackChunkName: "orders_reports" */ '../components/order/order.vue')
const Reports = () => import(/* webpackChunkName: "orders_reports" */ '../components/report/Report.vue')


// 解决登录延迟多次登录报错
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push (location) {
//   return originalPush.call(this, location).catch(err => err)
// }
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

## 八、开启Gzip文件网络传输压缩

详细见下文项目上线相关配置