import Vue from 'vue'
import VueRouter from 'vue-router'
import customerLogin from '../components/customerLogin.vue'
import home from '../components/home.vue'
Vue.use(VueRouter)

const routes = [{
  path: '/login',
  component: customerLogin
}, {
  path: '/',
  redirect: '/login'
}, {
  path: '/home',
  component: home
}]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    return next('/login')
  }
  return next()
})

export default router