<template>
  <div class="boya-view">
    <el-row style="width: 100%; padding-top: 20px">
      <el-col :span="24">
        <el-col class="main-filter-container">
          <span class="icon iconfont iconfilter filter-button " @click="handleFilter"><span>筛选</span></span>
        </el-col>
        <el-col class="main-input-container">
          <el-col class="normal-input">
            <span class="icon iconfont iconIcon-search "></span>
            <Input v-model="formData.filename" clearable placeholder="请输入合约名称" class="search-input"
                   @keyup.enter.native="selectGet(1)"/>
          </el-col>
        </el-col>
        <el-col class="main-btn-container">
          <Button class="btn-search" @click="selectGet(1)">查询</Button>
          <Button class="btn-reset" style="margin-left: 5px" @click="handleReset('formValidate')">重置</Button>
        </el-col>
      </el-col>
    </el-row>
    <collapse-transition :collapseData="collapseData" :showFilter="showFilter" :formData="formData"
                         @collapseFun="collapseFun" ref="collapse" style="width:100%;padding-top: 20px"/>
    <el-table
      class="boya-table"
      :data="tableData"
      style="width: 100%;clear:both;margin-bottom: 137px;"
      :row-style="common.rowStyle"
      :cell-style="cellStyle"
      empty-text="暂无数据，请重新查询">
      <el-table-column prop="name" width="160" label="合约名称" show-overflow-tooltip/>
      <el-table-column prop="type" label="创建形式" width="120" show-overflow-tooltip/>
      <el-table-column prop="bincode_status" label="编译状况" show-overflow-tooltip/>
      <el-table-column prop="install" label="部署状况" show-overflow-tooltip/>
      <el-table-column prop="contract_num" width="150" label="合约编号" show-overflow-tooltip/>
      <el-table-column prop="intro" width="400" label="简介" show-overflow-tooltip/>
      <el-table-column prop="address" width="400" label="合约地址" show-overflow-tooltip/>
      <el-table-column prop="owner" width="180" label="所属用户" show-overflow-tooltip/>
      <el-table-column prop="status" label="状态"/>
      <el-table-column label="操作" width="200" fixed="right">
        <template slot-scope="scope">
          <el-tooltip v-if="scope.row.state1" class="item" effect="dark" content="调用" placement="top-start">
            <span class="icon iconfont iconFunctioncall" @click="callContract(scope.$index, scope.row)"></span>
          </el-tooltip>
          <el-tooltip v-if="scope.row.state2" class="item" effect="dark" content="部署" placement="top-start">
            <span class="icon iconfont icondeploy " style="font-size: 20px;"
                  @click="installContract(scope.$index, scope.row)"></span>
          </el-tooltip>
          <span v-if="scope.row.state1||scope.row.state2" style="margin:0 4px">|</span>
          <el-tooltip v-if="scope.row.state3" class="item" effect="dark" content="查看" placement="top-start">
            <span class="icon iconfont iconrenwu " @click="checkContract(scope.$index, scope.row)"></span>
          </el-tooltip>
          <span v-if="scope.row.state4||scope.row.state5" style="margin:0 4px">|</span>
          <el-tooltip v-if="scope.row.state4" class="item" effect="dark" content="删除" placement="top-start">
            <span class="icon iconfont icondelete" @click="showDeleteDialog(scope.$index, scope.row)"></span>
          </el-tooltip>
          <el-tooltip v-if="scope.row.state5" class="item" effect="dark" content="权限控制" placement="top-start">
            <span class="icon iconfont iconsettings" @click="showPermissionModel(scope.$index, scope.row)"></span>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="runoutData" v-if="checkData" style="top: 50%">
      <img src="../../assets/img/runoutData@2x.png" class="runoutPhoto">
      <div class="runoutText"><span>暂无数据</span></div>
    </div>

    <div class="float-btn" style="z-index: 4;">
      <div class="create" @click="compileContract"><span class="icon iconfont iconcreate "></span></div>
    </div>
    <p class="boya-page">
      <el-pagination
        @size-change="onpage"
        @current-change="onchang"
        :current-page="formData.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="formData.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </p>
    <el-drawer
      :visible.sync="drawer"
      custom-class="boya-drawer"
      direction="rtl"
      :with-header="false"
      size="28%"
      :before-close="handleClose"
    >
      <div class="drawer-title">
        <span class="icon iconfont iconadd1"></span>
        <span>新增编译</span>
      </div>
      <div class="drawer-main">
        <Form :model="paramsData" label-position="top" :rules="ruleValidate" ref="uploadForm">
          <Form-item label="合约名称" prop="file_name">
            <Input v-model="paramsData.file_name" placeholder="请输入..."/>
          </Form-item>
          <Form-item label="数据所属用户名" prop="owner">
            <Select v-model="paramsData.owner" placeholder="请选择用户">
              <Option v-for="item in ownerList" :value="item.label">{{ item.label }}</Option>
            </Select>
          </Form-item>
          <Form-item label="语言类型" prop="lang">
            <Select v-model="paramsData.lang" placeholder="请选择语言类型">
              <Option v-for="item in languageList" :value="item.label">{{ item.label }}</Option>
            </Select>
          </Form-item>
          <Form-item label="合约文件" prop="file">
            <el-upload
              ref="upload"
              class="upload-demo"
              action="/beaas/api/contract/compile/"
              :on-remove="handleRemove"
              :before-upload="beforeFileUpload"
              :on-success="handleFileSuccess"
              name="contract"
              multiple
              :data="paramsData"
              :file-list="fileList"
              :auto-upload="false"
              style="width: 100%"
            >
              <el-button style="text-align: center;width: 100%"><span class="icon iconfont iconexport"
                                                                      style="margin-right: 8px;"></span><span>点击上传</span>
              </el-button>
            </el-upload>
            <span style="display: inline-block; color: #8794AE">支持扩展名sol</span>
          </Form-item>
          <Form-item label="接口说明" prop="intro">
            <Input v-model="paramsData.intro" placeholder="请输入..."/>
          </Form-item>
        </Form>
      </div>
      <div class="drawer-bottom-btn">
        <div class="drawer-btn-container user-btn">
          <Button class="btn-search" @click="handleSubmit">确定</Button>
          <Button class="btn-reset" style="margin-left: 5px" @click="handleClose">删除</Button>
        </div>
      </div>

    </el-drawer>
    <delete-dialog
      ref="deleteDialog"
      :modal="d_modal"
      :textUp="textUp"
      :textUpLoading="textUpLoading"
      @deletefun="deleteContract"></delete-dialog>
    <el-dialog
      title=""
      class="boya-default-dialog"
      :visible.sync="loading"
      width="450px"
      :close-on-click-modal="false"
      center>
      <p class="image-container">
        <img class="data-upload" src="@/assets/img/loading.gif" style="width: 50px; height: 50px"/>
      </p>
      <div class="text-container">
        <p class="text-up" style="color: #3B3783">添加中</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import collapseTransition from '@/components/collapse'// 筛选
  import DeleteDialog from '@/components/ButtonDialog/delete'

  export default {
    inject: ['reload'],
    name: 'ContractMain',
    components: {
      collapseTransition,
      DeleteDialog
    },
    data() {
      return {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        address: '',
        showFilter: false,
        drawer: false,
        // 表格数据
        tableData: [],
        loading: false,
        formData: {
          // 合约名称
          filename: '',
          // 创建形式
          contract_type: '',
          // 编译状况
          bincode_status: '',
          // 部署状况
          install_status: '',
          // 状态
          contract_status: '',
          pagination: 1,
          limit: 10
        },
        collapseData: [],
        cellStyle: this.common.cellStyle('status', {
          '开发中': 1,
          '已上线': 0,
          '已删除': 2,
        }, 8),
        // 多选栏设置
        props: {multiple: true},
        // 多选栏数据
        options: [],

        // 合约编译部分
        paramsData: {
          id: 1,
          lang: 'solidity',
          appid: '001',
          owner: '',
          intro: '',
          file_name: ''
        },
        fileList: [],
        dodele: false,
        languageList: [{
          value: 'solidity',
          label: 'solidity'
        }],
        contract_intro: '',
        // 合约编译输入检查
        ruleValidate: {
          file_name: [
            {required: true, message: '合约名称不能为空', trigger: 'blur'}
          ],
          owner: [
            {required: true, message: '所属用户不能为空', trigger: 'blur'},
          ],
          lang: [
            {required: true, message: '合约语言类型不能为空', trigger: 'blur'},
          ],
        },

        times: [],
        ownerList: [],
        s_time: '',
        e_time: '',
        checkData: false,
        // 删除弹窗
        d_modal: false,
        textUp: '您确定要删除这个合约？',
        textUpLoading: '正在删除合约',
        rowData: '',
      }
    },
    mounted() {

    },
    created() {
      this.selectGet()
      this.existing()
      this.getOwner()
    },

    methods: {
      // 下拉框
      existing() {
        this.http.contractfilterparams().then(res => {
          if (res.data.code == '0') {
            var data = res.data.data.contract_type
            var typedata = []
            for (var item of data) {
              var json = {
                value: item,
                label: item
              }
              typedata.push(json)
            }
            if (typedata.length > 1) {
              this.collapseData.push({
                list: typedata,
                name: "创建形式",
                key: 'contract_type'
              })
            }
            data = res.data.data.bincode_status
            typedata = []
            for (item of data) {
              json = {
                value: item,
                label: item
              }
              typedata.push(json)
            }
            this.collapseData.push({
              list: typedata,
              name: "编译状况",
              key: 'bincode_status'
            })
            data = res.data.data.install_status
            typedata = []
            for (item of data) {
              json = {
                value: item,
                label: item
              }
              typedata.push(json)
            }
            this.collapseData.push({
              list: typedata,
              name: "部署状况",
              key: 'install_status'
            })
            data = res.data.data.contract_status
            typedata = []
            for (item of data) {
              json = {
                value: item,
                label: item
              }
              typedata.push(json)
            }
            this.collapseData.push({
              list: typedata,
              name: "状态",
              key: 'contract_status'
            })
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      },
      // 获取owner
      getOwner() {
        const param = {}
        this.http.permissionowners(param).then(res => {
          console.log(res)
          // 显示是否成功
          if (res.data.code == '2002') {
            this.$Message.error(res.data.msg)
          } else if (res.data.code == '0') {
            if (res.data.data.owners_list.length > 0) {
              for (var item of res.data.data.owners_list) {
                var json = {
                  value: item,
                  label: item
                }
                this.ownerList.push(json)
              }
            }
          }
        })
      },
      // 权限控制
      showPermissionModel(index, row) {
        console.log(row)
        this.$router.push({
          name: 'contract_access',
          query: {
            'address': row.address
          }
        })
      },
      // 重置
      handleReset(name) {
        this.formData = {
          // 合约名称
          filename: '',
          // 创建形式
          contract_type: '',
          // 编译状况
          bincode_status: '',
          // 部署状况
          install_status: '',
          // 状态
          contract_status: '',
          pagination: 1,
          limit: 10
        },
          this.selectGet()
      },
      // 分页函数
      onchang(pageNum) {
        this.formData.pagination = pageNum
        this.selectGet()
      },
      onpage(pageSize) {
        this.formData.limit = pageSize
        this.selectGet()
      },
      // 取消
      cancel() {
        this.$Message.info('点击了取消')
        this.modal2 = false
      },
      // 查询
      selectGet(index) {
        if (index) {
          this.formData.pageNum = 1
        }
        const param = this.formData
        console.log(param)
        this.http.usercontracts(param).then(res => {
          if (res.status == '200') {
            console.log(res)
            var list = res.data.data.contract_list
            this.checkData = list === undefined || !list.length

            var newdata = []
            this.total = res.data.data.contract_count
            for (var i of list) {
              let state1 = false
              let state2 = true
              let state3 = true
              let state4 = true
              let state5 = false

              if (i != null) {
                if (i.install_status == '已部署') {
                  state1 = true
                  state2 = false
                  state4 = false
                  state5 = true
                }
                if (i.contract_status == '已删除') {
                  state1 = false
                  state2 = false
                  state4 = false
                  state5 = false
                }
                let json = {
                  name: i.filename,
                  type: i.contract_type,
                  bincode_status: i.bincode_status,
                  install: i.install_status,
                  contract_num: i.contract_num,
                  intro: i.intro,
                  address: i.address,
                  status: i.contract_status,
                  contractId: i.id,
                  owner: i.owner,
                  bincode: i.bincode,

                  // 类型通过返回值判断
                  state1: state1,
                  state2: state2,
                  state3: state3,
                  state4: state4,
                  state5: state5
                }
                newdata.push(json)
              }
            }
            this.tableData = newdata
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      },
      // 查看合约
      checkContract(index, row) {
        console.log(row.contractId)
        this.$router.push({
          name: 'contract_check',
          query: {
            'contractId': row.contractId
          }
        })
      },
      // 合约调用
      callContract(index, row) {
        console.log(row)
        this.$router.push({
          name: 'contract_call',
          query: {
            'contractId': row.contractId
          }
        })
      },
      // 合约删除
      showDeleteDialog(index, row) {
        this.rowData = row
        this.$refs.deleteDialog.handleClick()
      },
      deleteContract() {
        const param = {
          'contract_id': this.rowData.contractId
        }
        this.http.contractdelete(param).then(res => {
          // console.log(res)
          if (res.data.code == '0') {
            this.$Message.success('删除成功!')
            this.reload()
          } else {
            this.$Message.error(res.data.msg)
          }
        })
      },
      // 部署合约
      installContract(index, row) {
        const param = {
          'id': '1',
          'contract_id': row.contractId,
          'appid': '001'
        }
        console.log(param)

        this.http.contractInstall(param).then(res => {
          // console.log(res)
          if (res.data.code == '0') {
            this.$Message.success('部署成功!')
            this.selectGet()
          } else {
            this.$Message.error(res.data.msg)
          }
        })
      },
      /** 筛选调用的方法 **/
      collapseFun(type, value) {
        this.formData[type] = value
        this.pageNum = 1
        this.selectGet()
      },
      // 新增编译
      compileContract() {
        this.drawer = true
      },
      // 抽屉关闭
      handleClose() {
        this.drawer = false
        this.$refs.uploadForm.resetFields()
        this.$refs.upload.clearFiles()
      },
      // 文件上传相关函数
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePreview(file) {
        console.log(file)
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`)
      },
      beforeFileUpload(file, fileList) {
        this.loading = true
        return true
      },
      // 文件上传成功
      handleFileSuccess(response, res, file) {
        console.log(response)
        if (response.code == '0') {
          this.$Message.success(response.msg)
          this.loading = false
          this.selectGet()
          this.handleClose()
        } else if (response.code == '2021') {
          this.http.messageFun('error', response.msg)
          this.loading = false
          this.handleClose()
        } else {
          this.http.messageFun('error', response.msg)
          this.loading = false
          this.handleClose()
        }
      },
      dele() {
      },
      cancel() {
        this.$Message.info('点击了取消')
        window.history.back()
      },
      // 文件上传
      handleSubmit() {
        this.$refs.uploadForm.validate(valid => {
          if(!valid) {
            return
          }
          this.$refs.upload.submit()
        })
      },
      handleFilter() {
        this.showFilter = !this.showFilter
        this.$refs.collapse.filterCol()
      }
    }
  }
</script>

<style lang="scss">
  .level_top {
    background: #fff;
    margin: 10px;
  }

  body .el-table th.gutter {
    display: table-cell !important;
  }

  .el-table tr {
    cursor: pointer;
  }

  .el-table--scrollable-x .el-table__body-wrapper {
    overflow-x: auto;
    &::-webkit-scrollbar {
       width: 4px;
       height: 4px;
     }
    &::-webkit-scrollbar-thumb {
       border-radius: 10px;
       -webkit-box-shadow: inset 0 0 5px #3B3783;
       background: #3B3783;
     }
    &::-webkit-scrollbar-track {
       -webkit-box-shadow: inset 0 0 5px #F2F2F2;
       border-radius: 0;
       background: #F2F2F2;
     }
  }

  .el-table__fixed-right {
    height: 100%!important;
  }
</style>
