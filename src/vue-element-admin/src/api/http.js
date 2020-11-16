// /*引入axios*/
import axios from 'axios'
import {
  Message,
  MessageBox
} from 'element-ui' // element库的消息提示，可以不用
// import router from '../router'
// 创建axios实例
const CancelToken = axios.CancelToken
const source = CancelToken.source()
var service = axios.create({
  baseURL: '/',
  headers: {
    'content-type': 'application/json',
    'data-type': 'json'
  }
})

export default {
// 验证码
  getvercode(params) {
    return this.get('/beaas/api/get_ver_code/', params)
  },
  // 登录
  // logins(params) {
  //   return this.post('/api/login/',params)
  // },

  //  用户信息
  userinfo(params) {
    return this.get('/beaas/api/user_info/', params)
  },
  // 用户类型变更
  userchange(params) {
    return this.post('/beaas/api/user_change/', params)
  },
  //  概览页标签搜索排行
  tagrank(params) {
    return this.get('/beaas/api/tag_rank/', params)
  },
  //  存证数量
  userevidencescnt(params) {
    return this.get('/beaas/api/user_evidences_cnt/', params)
  },
  //  我的任务
  userblocks(params) {
    return this.get('/beaas/api/user_blocks/', params)
  },
  //  公共搜索
  search(params) {
    return this.post('/beaas/api/search/', params)
  },
  //  存证列表
  evidencelist(params) {
    return this.get('/beaas/api/evidence_list/', params)
  },
  //  存证数据查询
  evidencefilter(params) {
    return this.post('/beaas/api/evidence_filter/', params)
  },
  //  统计数据
  operaterdata(params) {
    return this.get('/beaas/api/operator_data/', params)
  },
  //  存证动态
  uploadevidences(params) {
    return this.get('/beaas/api/upload_evidences/', params)
  },
  // 查证状态
  downloadevidences(params) {
    return this.get('/beaas/api/download_evidences/', params)
  },
  //  节点数据流转
  nodedata(params) {
    return this.get('/beaas/api/node_data/', params)
  },
  //  用证搜索关键词
  cloudsearchkeys(params) {
    return this.get('/beaas/api/cloud_search_keys/', params)
  },
  //  节点存储概览图
  nodeechartsdata(params) {
    return this.post('/beaas/api/node_echarts_data/', params)
  },
  //  各单位存证数据排行
  subuserrank(params) {
    return this.get('/beaas/api/subuser_rank/', params)
  },
  // 用户数量统计
  usercount(params) {
    return this.get('/beaas/api/user_count/', params)
  },
  // 用户活跃趋势
  useractivity(params) {
    return this.get('/beaas/api/user_activity/', params)
  },
  //  区块详情
  blockinfo(params) {
    return this.post('/beaas/api/block_info/', params)
  },
  // 交易列表
  transactionlist(params) {
    return this.post('/beaas/api/transaction_list/', params)
  },
  // 交易详情
  transactioninfo(params) {
    return this.post('/beaas/api/transaction_info/', params)
  },
  // 节点信息列表
  nodes(params) {
    return this.get('/beaas/api/nodes/', params)
  },
  // 业务数据过滤
  allevidencefilter(params) {
    return this.post('/beaas/api/all_evidence_filter/', params)
  },
  // 账号信息展示
  accounteditget(params) {
    return this.get('/beaas/api/account_edit/', params)
  },
  // 账号修改
  accountedit(params) {
    return this.post('/beaas/api/account_edit/', params)
  },
  // 我的团队 团队列表以及搜索
  teamfilter(params) {
    return this.get('/beaas/api/team_filter/', params)
  },
  // 我的团队  新增团队
  teamadd(params) {
    return this.post('/beaas/api/team_add/', params)
  },
  // 编辑团队展示
  teamedit(params) {
    return this.get('/beaas/api/team_edit/', params)
  },
  // 存证用户列表
  permissionowners(params) {
    return this.get('/beaas/api/permission_owners/', params)
  },
  // 存证状态下拉单
  evidencestates(params) {
    return this.get('/beaas/api/evidence_states/', params)
  },
  // 用证上链
  checkevidenceupload(params) {
    return this.post('/beaas/api/check_evidence_upload/', params)
  },
  // 上传excel文件
  // 数据存证 存证
  upload(params) {
    return this.post('/beaas/api/upload/', params)
  },
  // 存证任务过滤
  taskfilter(params) {
    return this.post('/beaas/api/task_filter/', params)
  },
  // 存整类型下拉框
  evidencemethods(params) {
    return this.get('/beaas/api/evidence_methods/', params)
  },
  // 任务重传修改状态
  changetaskstate(params) {
    return this.post('/beaas/api/change_task_state/', params)
  },
  // 编辑团队信息
  teamedits(params) {
    return this.post('/beaas/api/team_edit/', params)
  },
  // 删除用户
  userdelete(params) {
    return this.post('/beaas/api/user_delete/', params)
  },
  // 我的小组 列表展示以及搜索
  stafffilter(params) {
    return this.post('/beaas/api/staff_filter/', params)
  },
  // 开启/关闭用户
  userclose(params) {
    return this.post('/beaas/api/user_close/', params)
  },
  // 角色人设置 新增
  staffadd(params) {
    return this.post('/beaas/api/staff_add/', params)
  },
  // 部门下拉框
  departmentshow(params) {
    return this.get('/beaas/api/department_show/', params)
  },
  // 小组下拉框
  groupshow(params) {
    return this.get('/beaas/api/group_show/', params)
  },
  // 角色人设置 编辑
  staffedit(params) {
    return this.post('/beaas/api/staff_edit/', params)
  },
  // 组织架构设置  查询
  groupadmin(params) {
    return this.post('/beaas/api/group_admin/', params)
  },
  // 编辑部门
  departedit(params) {
    return this.post('/beaas/api/depart_edit/', params)
  },
  // 组织架构 增加部门
  departmentadd(params) {
    return this.post('/beaas/api/department_add/', params)
  },
  // 组织架构 新增单位
  orgadd(params) {
    return this.post('/beaas/api/makeup_org/', params)
  },
  // 组织架构 新增小组
  groupadd(params) {
    return this.post('/beaas/api/group_add/', params)
  },
  // 组织架构 编辑小组
  groupedit(params) {
    return this.post('/beaas/api/group_edit/', params)
  },
  // 组织架构 删除小组
  groupdelete(params) {
    return this.post('/beaas/api/group_delete/', params)
  },
  // 组织架构 删除部门
  departdelete(params) {
    return this.post('/beaas/api/depart_delete/', params)
  },
  // 组织架构 开启关闭小组
  groupclose(params) {
    return this.post('/beaas/api/group_close/', params)
  },
  // 组织架构 开启关闭部门
  departclose(params) {
    return this.post('/beaas/api/depart_close/', params)
  },
  // 节点用户搜索
  nodeuserfilter(params) {
    return this.get('/beaas/api/node_user_filter/', params)
  },
  // 计算节点名称下拉框
  nodelist(params) {
    return this.get('/beaas/api/node_list/', params)
  },
  // 新增节点用户
  nodeuseradd(params) {
    return this.post('/beaas/api/node_user_add/', params)
  },
  // 节点用户编辑
  nodeuseredit(params) {
    return this.post('/beaas/api/node_user_edit/', params)
  },
  // 上传excel
  uploadexcel(params) {
    return this.post('/beaas/api/upload_excel/', params)
  },
  // 合约管理下拉框类型
  contractfilterparams(params) {
    return this.get('/beaas/api/contract_filter_params/', params)
  },
  // 用户合约列表
  usercontracts(params) {
    return this.post('/beaas/api/user_contracts/', params)
  },
  // 合约详情
  contract(params) {
    return this.get('/beaas/api/contract/', params)
  },
  // 合约删除
  contractdelete(params) {
    return this.get('/beaas/api/contract_delete/', params)
  },
  // 所有用户
  alluser(params) {
    return this.get('/beaas/api/all_user/', params)
  },
  // 合约权限控制
  contractassignpermissions(params) {
    return this.post('/beaas/api/contract_assign_permissions/', params)
  },
  // 合约部署
  contractInstall(params) {
    return this.post('/beaas/api/contract/install/', params)
  },
  // 合约调用
  contractCall(params) {
    return this.post('/beaas/api/contract/call/', params)
  },
  // 合约编译
  contractCompile(params) {
    return this.post('/beaas/api/contract/compile/', params)
  },
  // 合约调用详情
  contractrecordlist(params) {
    return this.get('/beaas/api/contract_record_list/', params)
    return this.get('/beaas/api/contract_record_list/', params)
  },
  // 共享数据列表
  shareevidences(params) {
    return this.post('/beaas/api/share_evidences/', params)
  },
  // 文件列表
  apifiles(params) {
    return this.get('/beaas/api/api_files/', params)
  },
  // 区块链功能信息统计(合约信息)
  contractstatistics(params) {
    return this.get('/beaas/api/contract_statistics/', params)
  },
  // echart折线图(合约调用趋势)
  echartbrokenline(params) {
    return this.post('/beaas/api/echart_broken_line/', params)
  },
  // echart饼状图(合约调用情况)
  piechart(params) {
    return this.get('/beaas/api/pie_chart/', params)
  },
  // 机构部门小组级联接口
  organizationlink(params) {
    return this.get('/beaas/api/organization_link/', params)
  },
  // 接口列表/接口库
  apilist(params) {
    return this.get('/beaas/api/api_list/', params)
  },
  // 合约库
  contractlist(params) {
    return this.get('/beaas/api/contract_list/', params)
  },
  // 接口权限分配
  apiassignpermissions(params) {
    return this.post('/beaas/api/api_assign_permissions/', params)
  },
  // 新增文件数据 文件上传请使用el-upload
  postapifiles(params) {
    return this.post('/beaas/api/api_files/', params)
  },
  // 读取文件信息 id
  apifiles2(params) {
    return this.get('/beaas/api/api_files/' + params + '/', '')
  },
  // 文件编辑
  fileedit(params) {
    return this.post('/beaas/api/file_edit/', params)
  },
  // 删除文档 id
  filedelete(params) {
    return this.get('/beaas/api/file_delete/' + params + '/', '')
  },

  // 文件类型d
  filetype(params) {
    return this.get('/beaas/api/file_type/', params)
  },
  // 绑定列表
  boundlist(params) {
    return this.get('/beaas/api/bound_list/', params)
  },

  // 首页hash值获取
  hashshow(params) {
    return this.get('/beaas/api/hash_show/', params)
  },

  // echart柱形图
  echartbrokentwoline(params) {
    return this.post('/beaas/api/echart_broken_two_line/', params)
  },

  // /*弹框*/
  messageFun(type, message) {
    return Message({
      showClose: true,
      message: message,
      type: type,
      duration: 2000
    })
  },
  // 下载文件 // 暂时没有实际应用
  getFile(url, filename) {
    this.get(url, '').then(res => {
      console.log(res)
      const blob = new Blob([res.data])
      const blobUrl = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.download = filename
      a.href = blobUrl
      a.click()
      document.body.removeChild(a)
    })
  },

  // get请求，其他类型请求复制粘贴，修改method
  get(url, param) {
    return new Promise((cback, reject) => {
      service({
        method: 'get',
        url,
        params: param,
        cancelToken: source.token
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
  post(url, data) {
    return new Promise((cback, reject) => {
      service({
        method: 'post',
        url,
        data,
        cancelToken: source.token
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
  }
}
