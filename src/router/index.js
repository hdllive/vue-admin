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
      { path: '/users', component: () => import('@/views/Users'), name: 'users' },
      { path: '/roles', component: () => import('@/views/Roles'), name: 'roles' },
      { path: '/rights', component: () => import('@/views/Rights'), name: 'rights' },
      { path: '/goods', component: () => import('@/views/Goods'), name: 'goods' },
      { path: '/params', component: () => import('@/views/Params'), name: 'params' },
      { path: '/categories', component: () => import('@/views/Categories'), name: 'categories' },
      { path: '/orders', component: () => import('@/views/Orders'), name: 'orders' },
      { path: '/reports', component: () => import('@/views/Reports'), name: 'reports' }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
