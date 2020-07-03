import Vue from 'vue' //等价于import Vue from "vue/dist/vue.runtime.common.js"
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import VueCompositionApi from '@vue/composition-api'

/**
 * 路由守卫
 */
import './router/premit'

// 自定义全局组件
import './icons/index'

Vue.use(VueCompositionApi)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
