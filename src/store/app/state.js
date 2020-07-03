import { getUserName } from '../../utils/app'

const state = {
  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
  toKen: '',
  userName: getUserName() || '',
}

export default state
