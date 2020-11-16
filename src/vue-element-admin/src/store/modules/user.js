import {login, logout, getInfo} from '@/api/user'
import TokenLogin from '@/api/token-login'
import {getToken, setToken, removeToken} from '@/utils/auth'
import router, {resetRouter} from '@/router'
import Transfer from '@/api/transfer'
import transfer from '@/api/transfer'
import {Message} from 'element-ui'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({commit}, userInfo) {
    const {username, password, yanzheng} = userInfo
    return new Promise((resolve, reject) => {
      login({user_name: username.trim(), password: password, verification_code: yanzheng}).then(response => {
        if (response.code === 0) {
          var user_type = response.data.user_info.user_type
          transfer.login = user_type
          var userimg = response.data.user_info.avatar
          transfer.img = userimg
          var logintime = response.data.user_info.countdown
          Transfer.Tips = logintime
          var loginphone = response.data.user_info.parent_user_phone
          Transfer.phone = loginphone
          const {data} = response
          sessionStorage.setItem('key', JSON.stringify(data.user_info.user_type))
          sessionStorage.setItem('user_name', response.data.user_info.username)
          localStorage.setItem('key', JSON.stringify(data.user_info.user_type))
          localStorage.setItem('user_name', response.data.user_info.username)
          localStorage.setItem('login_time', Date.now())
          commit('SET_TOKEN', 'admin-token')
          // commit('SET_TOKEN',data.token)
          setToken('admin-token')
        } else {
          // reject(response.msg)
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  loginWithToken({commit}, token) {
    return new Promise((resolve, reject) => {
      TokenLogin.loginWithToken(token, {}).then(response => {
        if (response.data.code === 0) {
          var user_type = response.data.data.user_info.user_type
          transfer.login = user_type
          var userimg = response.data.data.user_info.avatar
          transfer.img = userimg
          var logintime = response.data.data.user_info.countdown
          Transfer.Tips = logintime
          var loginphone = response.data.data.user_info.parent_user_phone
          Transfer.phone = loginphone
          const {data} = response.data
          sessionStorage.setItem('key', JSON.stringify(data.user_info.user_type))
          sessionStorage.setItem('user_name', response.data.data.user_info.username)
          localStorage.setItem('key', JSON.stringify(data.user_info.user_type))
          localStorage.setItem('user_name', response.data.data.user_info.username)
          localStorage.setItem('login_time', Date.now())
          commit('SET_TOKEN', 'admin-token')
          // commit('SET_TOKEN',data.token)
          setToken('admin-token')
        } else {
          Message.error(response.data.msg)
          // reject(response.msg)
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const {data} = response

        if (!data) {
          reject('验证失败，请重新登录.')
        }

        const {roles, name, avatar, introduction} = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo:角色必须是非空数组！')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({commit, state, dispatch}) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        // localStorage.removeItem('key')
        // localStorage.setItem("login_time", 0);
        localStorage.clear()
        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, {root: true})

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({commit}) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({commit, dispatch}, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const {roles} = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, {root: true})

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, {root: true})

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
