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
    beforeEnter: (to, from, next) => {
      let info = store.state.visitorInfo
      if(!info.name) {
        next({ name: 'Home' })
      }else{
        next()
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
    path: '/notFound',
    name: 'NotFound',
    component: () => import('../views/notFound.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router