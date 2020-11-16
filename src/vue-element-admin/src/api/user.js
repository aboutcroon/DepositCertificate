import request from '@/utils/request'
import requer from '@/utils/requer'
export function login(data) {
  return requer({
    // url: '/vue-element-admin/user/login',
    url: '/api/login/',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return requer({
    url: '/api/logout/',
    method: 'get'
  })
}

export function operaterdata(data) {
  return requer({
    url: '/api/operater_data/',
    method: 'get',
    data
  })
}
