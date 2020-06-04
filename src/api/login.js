import service from '@/utils/request'

/**
 * 获取验证码
 */
export function _getSms(data) {
  return service.request({
    method: 'post',
    url: '/getSms/',
    data: data,
  })
}

/**
 * 获取用户角色
 */

/**
 * 登入
 */
export function _login(data) {
  return service.request({
    method: 'post',
    url: '/login/',
    data: data,
  })
}

/**
 * 注册
 */
export function _register(data) {
  return service.request({
    method: 'post',
    url: '/register/',
    data: data,
  })
}
