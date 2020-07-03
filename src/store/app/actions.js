import * as types from './mutation-type'
import { _login } from '@/api/login.js'
import {
  setToken,
  setUserName,
  removeToken,
  removeUserName,
} from '../../utils/app'

export const setCollapse = ({ commit, state }, isCollapse) => {
  sessionStorage.setItem('isCollapse', JSON.stringify(isCollapse))
  commit(types.SET_COLLAPSE, isCollapse)
}

export const loginAction = ({ commit, state }, reauestData) => {
  return new Promise((resolve, reject) => {
    _login(reauestData)
      .then((res) => {
        let data = res.data.data

        commit(types.SET_TOKEN, data.token)
        commit(types.SET_USERNAME, data.username)
        setToken(data.token)
        setUserName(data.username)
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const exit = ({ commit, state }) => {
  return new Promise((resolve, reject) => {
    removeToken()
    removeUserName()
    commit(types.SET_TOKEN, '')
    commit(types.SET_USERNAME, '')
    resolve()
  })
}
