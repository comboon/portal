import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

const accessToken = 'AUTH_TOKEN'

const refreshToken = 'REFRESH_TOKEN'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


export function getAccessToken() {
  // return Cookies.get(accessToken)
  return window.localStorage.getItem(accessToken)
}

export function setAccessToken(token) {
  // return Cookies.set(accessToken, token)
  return window.localStorage.setItem(accessToken,token)
}

export function removeAccessToken() {
  // return Cookies.remove(accessToken)
  return window.localStorage.removeItem(accessToken)
}

export function getRefreshToken() {
  // return Cookies.get(refreshToken)
  return window.localStorage.getItem(refreshToken)
}

export function setRefreshToken(token) {
//   return Cookies.set(refreshToken, token)
  return window.localStorage.setItem(refreshToken,token)
}

export function removeRefreshToken() {
  // return Cookies.remove(refreshToken)
  return window.localStorage.removeItem(refreshToken)
}


