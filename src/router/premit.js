import router from './index'
import {
  getToken,
  getUserName,
  removeToken,
  removeUserName,
} from '../utils/app'
import store from '../store/index'

/**
 * 路由守卫
 */

const whiteRouter = ['/login']

router.beforeEach((to, from, next) => {
  console.log('token:' + getToken())
  console.log('username:' + getUserName())

  if (getToken()) {
    if (to.path === '/login') {
      store.dispatch('app/exit').then(() => {
        next()
      })
    } else {
      //获取用户角色
      //动态分配路由权限
      next()
    }
  } else if (whiteRouter.includes(to.path)) {
    next()
  } else {
    next('/login')
  }
})
