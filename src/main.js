import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/reset.less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/premission'
import * as obj from '@/filters' // 过滤器

// 批量创建过滤器，代码变得简单，只需要在里面按需到处写一个普通的函数即可
Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
