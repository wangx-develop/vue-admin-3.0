import * as types from './mutation-type'

const mutations = {
  [types.SET_COLLAPSE](state, isCollapse) {
    state.isCollapse = isCollapse
  },
  [types.SET_TOKEN](state, toKen) {
    state.toKen = toKen
  },
  [types.SET_USERNAME](state, userName) {
    state.userName = userName
  },
}

export default mutations
