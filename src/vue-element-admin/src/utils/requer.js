import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import Transfer from '../api/transfer.js';

import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request ur l
  baseURL: '/beaas',
  // withCredentials: true, // 跨域请求时发送cookies
  // timeout: 5000 // request timeout
  headers: {
    'content-type': 'application/json',
    'data-type': 'json',
    // 此处添加token 作为跨平台登录用
    // 'token': '218149e93cff31e9234a3483098ecbbb9c2678'
  }
})
// request interceptor
// service.interceptors.request.use(
//   config => {
//     // do something before request is sent
//
//     if (store.getters.token) {
//       // let each request carry token
//       // ['X-Token'] is a custom headers key
//       // please modify it according to the actual situation
//       config.headers['X-Token'] = getToken()
//     }
//     return config
//   },
//   error => {
//     // do something with request error
//     console.log(error) // for debug
//     return Promise.reject(error)
//   }
// )

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // console.log(response)
    // console.log(user)
    // typeof(res.code)
    const res = response.data
    const code = response.status
    // console.log(code)
    // if the custom code is not 20000, it is judged as an error.
    if (code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (code === 500) {
        // to re-login
        MessageBox.confirm('您已注销，您可以取消以停留在此页，或重新登录', '确认注销', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
    //  console.log(response)
      // 判断是否有这个用户
      if (response.data.code === 2001) {
        console.log(response.data.msg)
          Message({
            message: response.data.msg || 'Error',
            type: 'error',
            duration: 5 * 1000
          })
          return Promise.reject(new Error(response.msg || 'Error'))
      }else if(response.data.code === 2024){
        Message({
          message: response.data.msg || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(new Error(response.msg || 'Error'))
      }else{
        if(JSON.stringify(response.data.data) !== "{}") {
          // 除了登录登出以外的任何接口都不要使用这种请求方法！！！
          const user = response.data.data.user_info.user_type
          Transfer.$emit( "login" ,user); //提交中转站
        }
        return res

      }
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
