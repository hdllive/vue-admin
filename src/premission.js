import router from './router'
import store from '@/store'

router.beforeEach((to, form, next) => {
  const token = store.state.token
  if (token) {
    if (to.path === '/login') {
      next('/users')
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
