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