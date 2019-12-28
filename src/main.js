import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入全局样式表
import './assets/css/global.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import storage from './config/storageConfig'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.use(ElementUI)
Vue.use(storage)
Vue.config.productionTip = false
Vue.prototype.$http = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
