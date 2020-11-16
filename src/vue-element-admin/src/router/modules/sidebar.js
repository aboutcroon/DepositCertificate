/**
 * Created by butiantong on 2020/5/13.
 * 侧边栏动态路由数据，包括权限
 */
import Layout from '@/layout'

const sideBarRouter = {
  // 所有侧边栏数据在data中配置
  // 权限说明：0：超管
  data: [{
    path: '/',
    component: Layout,
    redirect: '/home',
    // hidden: true,
    permission: { '0': false, '1': false, '2': false, '3': false, '4': false, 'default': true },
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/home'),
        name: 'home',
        meta: { title: '概览', icon: 'iconhome' },
        permission: { '0': false, '1': false, '2': false, '3': false, '4': false, 'default': true },
        nav: { '0': 2, '1': 1, '2': 1, '3': 0, '4': 0, 'default': 0 }
      },
      {
        path: 'test',
        component: () => import('@/views/home/test'),
        name: 'test',
        meta: { title: '调试页' },
        permission: { '0': true, '1': true, '2': true, '3': true, '4': true, 'default': true }
        // permission: { '0': false, '1': false, '2': false, '3': false, '4': false, 'default': true },
      },
      {
        path: 'Block_details',
        component: () => import('@/views/home/block'),
        name: 'block',
        hidden: true,
        meta: { title: '区块详情' },
        permission: { '0': true, '1': true, '2': true, '3': true, '4': true, 'default': true }
      },
      {
        path: 'transaction_details',
        component: () => import('@/views/home/details'),
        name: 'details',
        hidden: true,
        meta: { title: '交易详情' },
        permission: { '0': true, '1': true, '2': true, '3': true, '4': true, 'default': true }
      },
      {
        path: 'home-node-info',
        component: () => import('@/views/home/node-info'),
        name: 'home_node_info',
        hidden: true,
        meta: { title: '节点信息管理' },
        permission: { '0': false, '1': true, '2': true, '3': true, '4': true, 'default': true }
      },
      {
        path: 'home-user',
        component: () => import('@/views/home/user'),
        name: 'home_user',
        hidden: true,
        meta: { title: '个人中心' },
        permission: { '0': false, '1': true, '2': true, '3': true, '4': true, 'default': true }
      }
    ]
  }, {
    path: '/datas',
    component: Layout,
    meta: { title: '信息存证', icon: 'iconsave' },
    hidden: true,
    permission: { '0': true, '1': true, '2': false, '3': false, '4': false, 'default': true }, // redirect: '/data',
    children: [
      {
        path: 'data',
        component: () => import('@/views/data/index'),
        name: 'data_data',
        meta: { title: '数据存证' },
        permission: { '0': true, '1': true, '2': true, '3': true, '4': true, 'default': true }
      },
      {
        path: 'file',
        component: () => import('@/views/data/file'),
        name: 'file',
        meta: { title: '文件存证' },
        permission: { '0': true, '1': true, '2': true, '3': true, '4': true, 'default': true }
      },
      {
        path: 'status',
        component: () => import('@/views/data/status'),
        name: 'data_status',
        meta: { title: '信息存证管理' },
        permission: { '0': true, '1': true, '2': false, '3': false, '4': false, 'default': true }
      },
      {
        path: 'census',
        component: () => import('@/views/data/census'),
        name: 'data_census',
        meta: { title: '存查证数据管理' },
        permission: { '0': true, '1': true, '2': false, '3': false, '4': false, 'default': true }
      },
      {
        path: 'share_report',
        component: () => import('@/views/data/share-report'),
        name: 'data_share_report',
        meta: { title: '存查证共享数据管理' },
        permission: { '0': true, '1': true, '2': false, '3': false, '4': false, 'default': true }
      }
    ]
  }, {
    path: '/nodes',
    component: Layout,
    // redirect: '/census',
    alwaysShow: true,
    permission: { '0': true, '1': true, '2': true, '3': true, '4': true, 'default': true },
    meta: { title: '节点管理中心', icon: 'iconjiedian' },
    children: [
      {
        path: 'node',
        component: () => import('@/views/node/index'),
        name: 'node_index',
        permission: { '0': false, '1': true, '2': true, '3': true, '4': true, 'default': true },
        meta: { title: '节点信息管理' }
      }
    ]
  }, {
    path: '/document',
    component: Layout,
    // redirect: '/census',
    // alwaysShow: true,
    permission: { '0': false, '1': true, '2': true, '3': true, '4': true, 'default': true },
    // meta: { title: '文件管理中心', icon: '管理中心白' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/document/index'),
        name: 'document_index',
        permission: { '0': false, '1': true, '2': true, '3': true, '4': true, 'default': true },
        meta: { title: '文档上传管理', icon: 'iconupload1' }
      }, {
        path: 'new-document',
        component: () => import('@/views/document/new-document'),
        name: 'document_new_document',
        permission: { '0': true, '1': true, '2': true, '3': true, '4': true, 'default': true },
        meta: { title: '文档新增' }
      }, {
        path: 'document-detail',
        component: () => import('@/views/document/document-detail'),
        name: 'document_document_detail',
        permission: { '0': true, '1': true, '2': true, '3': true, '4': true, 'default': true },
        meta: { title: '文档查看' }
      }, {
        path: 'edit-document',
        component: () => import('@/views/document/edit-document'),
        name: 'document_edit_document',
        hidden: true,
        permission: { '0': true, '1': true, '2': true, '3': true, '4': true, 'default': true },
        meta: { title: '文档编辑' }
      }
    ]
  }, {
    path: '/contract',
    component: Layout,
    // redirect: '/user',
    permission: { '0': false, '1': true, '2': false, '3': false, '4': false, 'default': true },
    hidden: true,
    meta: { title: '智能合约管理', icon: 'iconSmartcontract' },
    children: [
      {
        path: 'contract',
        component: () => import('@/views/contract/index'),
        name: 'contract_main',
        permission: { '0': false, '1': false, '2': false, '3': false, '4': false, 'default': true },
        meta: { title: '合约管理' }
      }, {
        path: 'func',
        component: () => import('@/views/contract/func'),
        name: 'contract_call',
        hidden: true,
        permission: { '0': true, '1': true, '2': true, '3': true, '4': true, 'default': true },
        meta: { title: '调用函数' }
      }, {
        path: 'check',
        component: () => import('@/views/contract/detail'),
        name: 'contract_check',
        hidden: true,
        permission: { '0': true, '1': true, '2': true, '3': true, '4': true, 'default': true },
        meta: { title: '合约查看' }
      }, {
        path: 'file',
        component: () => import('@/views/contract/file'),
        name: 'contract_file',
        hidden: true,
        permission: { '0': true, '1': true, '2': true, '3': true, '4': true, 'default': true },
        meta: { title: '查看合约文件' }
      }, {
        path: 'call-report',
        component: () => import('@/views/contract/call-report'),
        name: 'contract_call_report',
        hidden: true,
        permission: { '0': true, '1': true, '2': false, '3': false, '4': false, 'default': true },
        meta: { title: '合约调用详情' }
      }, {
        path: 'access',
        component: () => import('@/views/contract/access'),
        name: 'contract_access',
        hidden: true,
        permission: { '0': true, '1': true, '2': true, '3': true, '4': true, 'default': true },
        meta: { title: '权限控制' }
      }, {
        path: 'user-document',
        component: () => import('@/views/contract/user-document'),
        name: 'contract_user_document',
        hidden: true,
        permission: { '0': true, '1': true, '2': false, '3': false, '4': false, 'default': true },
        meta: { title: '用户自建文档管理' }
      }, {
        path: 'new-document',
        component: () => import('@/views/contract/new-document'),
        name: 'contract_new_document',
        hidden: true,
        permission: { '0': true, '1': true, '2': true, '3': true, '4': true, 'default': true },
        meta: { title: '文档新增' }
      }, {
        path: 'edit-document',
        component: () => import('@/views/contract/edit-document'),
        name: 'contract_edit_document',
        hidden: true,
        permission: { '0': true, '1': true, '2': true, '3': true, '4': true, 'default': true },
        meta: { title: '文档编辑' }
      }
    ]
  }, {
    path: '/api',
    component: Layout,
    // redirect: '/user',
    permission: { '0': false, '1': true, '2': true, '3': true, '4': true, 'default': true },
    hidden: true,
    meta: { title: '接口文档', icon: 'iconxingzhuangjiehe' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/api/index'),
        name: 'api_main',
        permission: { '0': false, '1': true, '2': true, '3': true, '4': true, 'default': true },
        meta: { title: '接口文档' }
      }, {
        path: 'compile',
        component: () => import('@/views/api/access'),
        name: 'api_access',
        hidden: true,
        permission: { '0': true, '1': true, '2': true, '3': true, '4': true, 'default': true },
        meta: { title: '权限管理' }
      }
    ]
  }, {
    path: '/res-lib',
    component: Layout,
    // redirect: '/user',
    permission: { '0': true, '1': true, '2': false, '3': false, '4': false, 'default': true },
    hidden: true,
    meta: { title: '信息资源库', icon: 'iconinformation' },
    children: [
      {
        path: 'contract',
        component: () => import('@/views/res-lib/contract'),
        name: 'res_contract',
        permission: { '0': false, '1': true, '2': false, '3': false, '4': false, 'default': true },
        meta: { title: '合约资源库' }
      }, {
        path: 'api',
        component: () => import('@/views/res-lib/api'),
        name: 'res_api',
        permission: { '0': true, '1': true, '2': false, '3': false, '4': false, 'default': true },
        meta: { title: '接口资源库' }
      }, {
        path: 'document-detail',
        component: () => import('@/views/res-lib/document-detail'),
        name: 'res_document_detail',
        hidden: true,
        permission: { '0': true, '1': true, '2': false, '3': false, '4': false, 'default': true },
        meta: { title: '文档查看' }
      }
    ]
  }, {
    path: '/censuss',
    component: Layout,
    // redirect: '/census',
    alwaysShow: true,
    // 调试保留
    permission: { '0': true, '1': true, '2': true, '3': true, '4': true, 'default': true },
    // permission: { '0': true, '1': true, '2': true, '3': true, '4': true, 'default': true },
    meta: { title: '统计查询', icon: 'iconPutaway' },
    children: [
      {
        path: 'census',
        component: () => import('@/views/census/index'),
        name: 'census',
        permission: { '0': true, '1': true, '2': true, '3': true, '4': true, 'default': true },
        meta: { title: '存证数据统计' }
      }
    ]
  }, {
    path: '/centers',
    component: Layout,
    // redirect: '/census',
    alwaysShow: true,
    // 调试保留
    permission: { '0': true, '1': true, '2': true, '3': true, '4': true, 'default': true },
    // permission: { '0': true, '1': true, '2': true, '3': true, '4': true, 'default': true },
    meta: { title: '日志中心', icon: 'iconPutaway' },
    children: [
      {
        path: 'center',
        component: () => import('@/views/center/center'),
        name: 'index',
        permission: { '0': true, '1': false, '2': false, '3': false, '4': false, 'default': true },
        meta: { title: '业务数据统计' }
      }
    ]
  }, {
    path: '/report',
    component: Layout,
    alwaysShow: true,
    permission: { '0': true, '1': false, '2': true, '3': true, '4': true, 'default': true },
    meta: { title: '报表管理', icon: 'icontask' },
    children: [
      {
        path: 'census',
        component: () => import('@/views/report/census'),
        name: 'report_census',
        meta: { title: '存查证数据管理' },
        permission: { '0': true, '1': false, '2': false, '3': false, '4': false, 'default': true }
      },
      {
        path: 'share-data',
        component: () => import('@/views/report/share-data'),
        name: 'report_share_data',
        permission: { '0': false, '1': false, '2': true, '3': true, '4': true, 'default': true },
        meta: { title: '存查证共享数据管理' }
      }, {
        path: 'call-api',
        component: () => import('@/views/report/call-api'),
        name: 'report_call_api',
        permission: { '0': false, '1': false, '2': true, '3': true, '4': true, 'default': true },
        meta: { title: '接口调用详情' }
      }, {
        path: 'call-contract',
        component: () => import('@/views/report/call-contract'),
        name: 'report_call_contract',
        permission: { '0': false, '1': false, '2': true, '3': true, '4': true, 'default': true },
        meta: { title: '合约调用详情' }
      },
      {
        path: 'document',
        component: () => import('@/views/report/document'),
        name: 'report_document',
        permission: { '0': false, '1': false, '2': true, '3': true, '4': true, 'default': true },
        meta: { title: '文件上传详情' }
      }
    ]
  }, {
    path: '/users',
    component: Layout,
    // redirect: '/user',
    permission: { '0': true, '1': false, '2': false, '3': false, '4': false, 'default': true },
    hidden: true,
    meta: { title: '用户管理中心', icon: 'iconuser-guanli' },
    children: [
      {
        path: 'user',
        component: () => import('@/views/user/index'),
        name: 'user',
        permission: { '0': true, '1': false, '2': false, '3': false, '4': false, 'default': true },
        meta: { title: '我的账号' }
      },
      {
        path: 'team',
        component: () => import('@/views/user/team'),
        name: 'team',
        permission: { '0': true, '1': true, '2': false, '3': true, '4': true, 'default': true },
        meta: { title: '我的团队' }
      },
      {
        path: 'group',
        component: () => import('@/views/user/group'),
        name: 'group',
        permission: { '0': true, '1': false, '2': false, '3': false, '4': true, 'default': true },
        meta: { title: '我的小组' }
      }
    ]
  }]
}

export default sideBarRouter
