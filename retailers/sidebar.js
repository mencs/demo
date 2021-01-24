module.exports = [
  { 
    title: '开发环境', 
    collapsable: true,
    children:[
    '/retailers/app',
    '/retailers/main',
    '/retailers/element-ui',
    '/retailers/router',
    '/retailers/api',
    ]
  },
  { 
    title: '登录界面', 
    collapsable: true,
    children:[
    '/retailers/login',
    '/retailers/home',
    '/retailers/hellow',
    ]
  },
  {
    title:'用户管理',
    collapsable: true,
    children:[
      '/retailers/user',
    ]
  },
  {
    title:'权限管理',
    collapsable: true,
    children:[
      '/retailers/roles',
      '/retailers/rights',
    ]
  },
  {
    title:'商品管理',
    collapsable: true,
    children:[
      '/retailers/goods',
      '/retailers/goodsadd',
      '/retailers/params',
      '/retailers/categories',
    ]
  },
  {
    title:'订单管理',
    collapsable: true,
    children:[
      '/retailers/orders',

    ]
  },
  {
    title:'报表管理',
    collapsable: true,
    children:[
      '/retailers/reports',
    ]
  }
]
