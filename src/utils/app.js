import cookie from 'cookie_js'

const adminToken = 'admin-token'
const adminUserName = 'user-name'

export function getToken() {
  return cookie.get(adminToken)
}

export function setToken(token) {
  cookie.set(adminToken, token)
}

export function removeToken() {
  cookie.remove(adminToken)
}

export function setUserName(userName) {
  cookie.set(adminUserName, userName)
}

export function getUserName() {
  return cookie.get(adminUserName)
}

export function removeUserName() {
  cookie.remove(adminUserName)
}
