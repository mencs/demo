---
title: Webpack工程项目-Mock数据
date: 2021-1-14
categories:
- vue-实战
tags:
- vue-实战
isShowComments: false
subSidebar: true
---

::: tip Webpack工程项目-Mock数据

- 假数据，可以让前端不用等待后端接口，而进行下一步开发

- 常用工具 easy mock和https://www.fastmock.site/#/

  

:::

1、在发送axios请求时，如何调用vue对象的内容

::: danger 注意

**因为axios内部then内的this是当前axios对象。而不是当前vue对象，因此vue对象用vm来指明。这样this不会冲突。**

:::

```js

     methods: {
       add () {
        var vm = this  //将获取后的this数据存进thant中否则会变
         this.axios.get("https://autumnfish.cn/api/joke/list?num=3")
         .then(function (Response) {
           vm.istext = Response.data.jokes[0]
         },function(err){
             console.log(err)//请求失败
         }) 
        }
     }
```

2、利用async于await简化异步请求操作

> 原始写法

```js
  methods: {
       var thant = this
       login (refname) {
        this.$refs[refname].validate((valid) => {
            if (valid) {
              this.$http.post('login', this.loginform)
               .then(function(Response){
               if (Response.data.meta.status !== 200){
                  console.log(Response) //请求失败
                thant.$message.error('这是一条错误消息');
               }else{
                 thant.$message.success('验证通过');
               window.sessionStorage.setItem('token', Response.data.data.token)
               // 2、通过编程式导航跳转到后台主页, 路由地址为：/home
                 thant.$router.push('/Home/4')
               }
```

> 利用async于await简化异步请求操作

```js
   methods: {
       login (refname) {
        this.$refs[refname].validate(async (valid) => {
          const { data:res} = await this.$http.post('login',this.loginform)
            if (res.meta.status !== 200 || res.data.username !== this.loginform.username) {
             this.$message.error('账号或密码错误！')
             console.log(res)
             }
             else {
            this.$message.success(res.meta.msg)
             console.log(res)
             window.sessionStorage.setItem('token', res.data.token)
             this.$router.push('/Home/4')
           }
        })
       },
```

