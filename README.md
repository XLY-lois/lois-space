# lois-space

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



### 开发日志
#### 2021-10-29
- 回滚到上上次commit，将访客信息置于welcome页填写后记入store。加入进入首页前的权限控制（前置路由守卫），以防跳过录入信息通过输入地址直接跳转。
#### 2021-11-1
- 抽离留言框组件，内嵌进文章卡片组件中，获取store中的visitor信息去提交留言的请求
#### 2021-11-3
- 对单篇文章留言功能完成
#### 2021-11-11
- 修复 不填写邮箱也能进入
- 新增 welcome页记住用户功能
- 新增 天气组件 可通过当前的ip所在地查询天气
#### 2021-11-29
- 文章图片上传，回显功能  
#### 2021-12-27
- ui大改
- 背景每次进入动态变化
- 引入分类菜单
- 404页面
#### 2021-12-29
- 加入tag
### TODO LIST
- 文章新增编辑页面的标题文本框太短了 显示不完全
- AboutMe 做个组件放在首页算了