/**
 * 拦截器
 */
import axios from 'axios'
import { Message } from 'element-ui'

// console.log(process.env.VUE_APP_ABC)
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi'

//手把手撸码前端api地址 http://www.web-jshtml.cn/productApi
const service = axios.create({
  baseURL: BASEURL,
  timeout: 15000,
})

// 添加请求拦截器
service.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么

    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
// 返回数据后进行拦截
service.interceptors.response.use(
  function(response) {
    let {
      data: { resCode, message },
    } = response

    if (resCode !== 0) {
      // 错误
      Message({
        showClose: true,
        message: message,
        type: 'error',
      })
      return Promise.reject(response.data)
    } else {
      //成功
      return response
    }
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default service
