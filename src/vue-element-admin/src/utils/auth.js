import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  checkStorage()
  return Cookies.get(TokenKey)
}

export function setToken(token,data) {
  return Cookies.set(TokenKey, token,data)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

function checkStorage() {
  let time = localStorage.getItem("login_time")
  if(time && Date.now() - time < 15 * 60 * 1000) {
    setToken('admin-token')
  }
}
