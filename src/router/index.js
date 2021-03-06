import Vue from 'vue'
import VueRouter from 'vue-router'
import customerLogin from '../components/customerLogin.vue'
import home from '../components/home.vue'
import welcome from '../components/welcome.vue'
import user from '../components/user.vue'
import test from '../components/test.vue'
Vue.use(VueRouter)

const routes = [{
  path: '/login',
  component: customerLogin
}, {
  path: '/',
  redirect: '/login'
}, {
  path: '/home',
  component: home,
  redirect: '/home/welcome',
  children: [{
    path: 'welcome',
    component: welcome
  }, {
    path: '/users',
    component: user
  }]
}, {
  path: '/test',
  component: test
}]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     return next()
//   }
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) {
//     return next('/login')
//   }
//   return next()
// })

export default router