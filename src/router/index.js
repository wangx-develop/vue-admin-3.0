import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout/index.vue'

// import Login from '../views/Login'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const routes = [
  {
    path: '/',
    redirect: '/login',
    hidden: true,
    meta: {
      name: '主页',
    },
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    meta: {
      name: '登入',
    },
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/Login/index.vue'),
  },
  /**
   * 控制台
   */
  {
    path: '/console',
    name: 'console',
    redirect: '/index',
    meta: {
      name: '控制台',
      icon: 'console',
    },
    component: Layout,
    children: [
      {
        path: '/index',
        name: 'index',
        meta: {
          name: '首页',
        },
        component: () =>
          import(/* webpackChunkName: "login" */ '../views/Console/index.vue'),
      },
    ],
  },
  /**
   * 信息管理
   */
  {
    path: '/info',
    name: 'info',
    meta: {
      name: '信息管理',
      icon: 'info',
    },
    component: Layout,
    children: [
      {
        path: '/infoIndex',
        name: 'infoIndex',
        meta: {
          name: '信息列表',
        },
        component: () =>
          import(/* webpackChunkName: "login" */ '../views/Info/index.vue'),
      },
      {
        path: '/infoCategory',
        name: 'infoCategory',
        meta: {
          name: '信息分类',
        },
        component: () =>
          import(/* webpackChunkName: "login" */ '../views/Info/category'),
      },
    ],
  },
  /**
   * 用户管理
   */
  {
    path: '/user',
    name: 'user',
    meta: {
      name: '用户管理',
      icon: 'user',
    },
    component: Layout,
    children: [
      {
        path: '/userIndex',
        name: 'userIndex',
        meta: {
          name: '用户列表',
        },
        component: () =>
          import(/* webpackChunkName: "login" */ '../views/User/index.vue'),
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
