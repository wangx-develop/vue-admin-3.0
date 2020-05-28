import Vue from 'vue'
import VueRouter from 'vue-router'

// import Login from '../views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
