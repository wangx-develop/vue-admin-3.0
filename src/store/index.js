import Vue from 'vue'
import Vuex from 'vuex'
import app from './app'
import test from './test'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    test,
  },
})
