import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'

const request = axios.create({
  baseURL: 'http://liufusong.top:8899/api/private/v1/'
  // timeout: 10000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  const token = store.state.token
  const loginTime = store.state.time // 刚刚登录的时间
  const actionTime = Date.now() - loginTime // 计算登录时长
  // 在发送请求之前做些什么
  if (token) {
    if (actionTime > 7200000) { // 判断登录时长是否有两小时
      store.dispatch('logout')
      router.push('/login')
      Message.error('身份过期，请重新登录')
    }
    config.headers = {
      Authorization: token
    }
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default request
