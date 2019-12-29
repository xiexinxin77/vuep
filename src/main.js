import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入全局样式表
import './assets/css/global.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入字体图标样式
import './assets/fonts/iconfont.css'
import axios from 'axios'
import storage from './config/storageConfig'
import defineCfg from './config/defineConfig'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 请求拦截器,添加TOKEN到请求头中
axios.interceptors.request.use(config => {
  config.headers.Authorization = storage.$storage.getSession(defineCfg.$defineCfg.TOKEN)
  console.log(config)
  return config
})
Vue.use(ElementUI)
Vue.use(storage)
Vue.use(defineCfg)
Vue.config.productionTip = false
Vue.prototype.$http = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')