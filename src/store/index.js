import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: {},
    time: ''
  },
  getters: {
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    },
    setTime (state) { // 纪录登录的时间戳
      state.time = Date.now()
    },
    removeToken (state) {
      state.token = ''
    }
  },
  actions: {
    logout (context) {
      context.commit('removeToken')
    }
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
