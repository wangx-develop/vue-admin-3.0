import Vue from 'vue'
import Svgicon from './Svgicon'
// 自定义全局组件
Vue.component('svg-icon', Svgicon)

/**
 * require.context()
 *  第一个：目录
    第二个：是否遍历子级目录
    第三个：定义遍历文件规则

 */
const req = require.context('./svg', false, /\.svg$/)
const requireAll = (requireContext) => {
  return requireContext.keys().map(requireContext)
}
requireAll(req)
