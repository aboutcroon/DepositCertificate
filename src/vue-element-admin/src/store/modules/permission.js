import {asyncRoutes, constantRoutes} from '@/router'
// import Transfer from '../../api/transfer.js'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = {...route}
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = { // 声明
  routes: [],
  addRoutes: [] // 定义
}
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes) // 计算方法
    // 持久化登录，本地超时时间15分钟
    var value = sessionStorage.getItem('key')
    if (!value) {
      const key = localStorage.getItem('key')
      const time = localStorage.getItem('login_time')
      if (time && Date.now() - time < 15 * 60 * 1000) {
        console.log('持久化登录成功')
        value = key
        sessionStorage.setItem('key', key)
        sessionStorage.setItem('user_name', localStorage.getItem('user_name'))
      } else {
        onsole.log('登录超时')
        localStorage.removeItem('key')
        localStorage.setItem('login_time', 0)
      }
    } else {
      localStorage.setItem('login_time', Date.now())
    }
    console.log(typeof (value))
    var data = JSON.parse(value)

    // const data = obj.user_type
    console.log('SET_ROUTES')
    if (data == null) {
      console.log(112233)
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
    for (var item of state.routes) {
      if (item.permission !== undefined) {
        item.hidden = item.permission[data]
        if (item.children) {
          for (var one of item.children) {
            one.hidden = one.permission[data]
            // 5个身份跳三个主页的鬼才设计
            if (one.nav !== undefined) {
              // 因为超管页面，需要重置
              one.name = 'home'
              one.meta.icon = 'iconhome'
              if (one.nav[data] === 1) {
                one.component = () => import('@/views/home/manage')
                one.meta.title = '概览'
                item.alwaysShow = false
              } else if (one.nav[data] === 2) {
                one.component = () => import('@/views/home/node-user')
                one.meta.title = '节点用户管理'
                one.meta.icon = ''
                one.name = 'home-node-user'
                item.meta = {title: '节点管理中心', icon: 'iconuser-guanli'}
                item.alwaysShow = true
              } else if (one.nav[data] === 0) {
                one.component = () => import('@/views/home/home')
                one.meta.title = '概览'
                item.alwaysShow = false
              } else {
                one.component = () => import('@/views/home/home')
                one.meta.title = '概览'
                item.alwaysShow = false
              }
            }
          }
        }
      }
    }
    // })
    console.log(state)
  }
}

const actions = {
  generateRoutes({commit}, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
