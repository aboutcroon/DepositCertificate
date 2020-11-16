import axios from 'axios'

export default {
  // 表格通用样式 斑马纹 行
  loginWithToken(token, data) {
    console.log(token)
    const service = axios.create({
      baseURL: '/',
      headers: {
        'content-type': 'application/json',
        'data-type': 'json',
        'token': token
      }
    })
    return new Promise((cback, reject) => {
      service({
        method: 'post',
        url: '/beaas/api/login/',
        data,
      }).then(res => {
        // axios返回的是一个promise对象
        var res_code = res.status.toString()
        if (res_code.charAt(0) == 2) {
          cback(res) // cback在promise执行器内部
        }
      }).catch(err => {
        if (axios.isCancel(err)) {

        } else {

        }
      })
    })
  },
}
