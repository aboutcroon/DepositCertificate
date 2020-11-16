import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import iView from 'iview'  // 导入组件库
import 'iview/dist/styles/iview.css'  // 导入样式
import VueSuperSlide from 'vue-superslide'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import http from './api/http'
import time from './api/time'
import common from './api/common'
import Qs from 'qs'


import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import './assets/icon/iconfont.css'

import * as filters from './filters' // global filters

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// 引入模块
var VueCookie = require('vue-cookie');
Vue.use(VueCookie);

Vue.use(iView)
Vue.use(VueSuperSlide)
// 挂载到vue原型上  全局应用
Vue.prototype.http = http
Vue.prototype.time = time
Vue.prototype.common = common
Vue.prototype.Qs = Qs


// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
