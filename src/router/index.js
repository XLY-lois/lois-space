import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/homepage',
    name: 'HomePage',
    component: () => import('../views/HomePage.vue'),
    beforeEnter: (to, from, next) => { //路由权限控制 记得解除注释
      let info = store.state.visitorInfo
      console.log(info)
      if (info.name && info.email) {
        next()
      } else {
        next({ name: 'Home' })
      }
    }
  },
  {
    path: '/loisAddPage',
    name: 'LoisAddPage',
    component: () => import('../views/loisAddPage.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/admin/index.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('../views/notFound.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router