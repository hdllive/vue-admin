import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/views/Login') },
  {
    path: '/home',
    component: () => import('@/views/Home'),
    children: [
      { path: '/users', component: () => import('@/views/Users') },
      { path: '/roles', component: () => import('@/views/Roles') },
      { path: '/rights', component: () => import('@/views/Rights') }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
