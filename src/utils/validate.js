// 过滤特殊字符
export function stripscript(str) {
  var pattern = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]"
  )
  var rs = ''
  for (var i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(pattern, '')
  }
  return rs
}

//验证邮箱
export function CheckEmail(str) {
  // eslint-disable-next-line no-useless-escape
  let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  return reg.test(str)
}

//验证密码
export function CheckPass(str) {
  // eslint-disable-next-line no-useless-escape
  let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
  return reg.test(str)
}

//验证验证码
export function CheckCode(str) {
  // eslint-disable-next-line no-useless-escape
  let reg = /^[a-z0-9]{6}$/
  return reg.test(str)
}
