<template>
  <div class="boya-view">
    <el-row style="width: 100%; padding-top: 20px">
      <el-col :span="24">
        <el-col class="main-filter-container">
          <span class="icon iconfont iconfilter filter-button " @click="showFilter = !showFilter"><span>筛选</span></span>
        </el-col>
        <el-col class="main-input-container">
          <el-col class="normal-input">
            <span class="icon iconfont iconIcon-search "></span>
            <Input v-model="formData.file_name" clearable placeholder="请输入文件名称" class="search-input"
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
                         @collapseFun="collapseFun" style="width:100%;padding-top: 20px"/>
    <el-table
      class="boya-table"
      :data="tableData"
      style="width: 100%;clear:both;margin-bottom: 137px;"
      :row-style="common.rowStyle"
      empty-text="暂无数据，请重新查询">
      <el-table-column prop="file_type" width="100" label="文件属性"/>
      <el-table-column prop="file_name" label="文件名称"/>
      <el-table-column prop="is_delete" label="状态"/>
      <el-table-column prop="c_time" width="200" label="创建时间"/>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-tooltip v-if="scope.row.state1" class="item" effect="dark" content="查看" placement="top-start">
            <span class="icon iconfont iconrenwu" @click="checkDoc(scope.$index, scope.row)"></span>
          </el-tooltip>
          <span v-if="scope.row.state1&&scope.row.state2" style="margin:0 4px">|</span>
          <el-tooltip v-if="scope.row.state2" class="item" effect="dark" content="编辑" placement="top-start">
            <span class="icon iconfont iconedit " @click="edit(scope.$index, scope.row)"></span>
          </el-tooltip>
          <span v-if="scope.row.state2&&scope.row.state3" style="margin:0 4px">|</span>
          <el-tooltip v-if="scope.row.state3" class="item" effect="dark" content="删除" placement="top-start">
            <span class="icon iconfont icondelete" @click="showDeleteDialog(scope.$index, scope.row)"></span>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="float-btn-group">
      <button-group
        v-show="!checkData"
        :count="total"
        :valueList="valueList"
        :tHeader="tHeader"
        :filterVal="filterVal"
        :filename="'用户自建文档列表'"
        @exportfun="exportFun"
        @handelCreate="newFile">

      </button-group>
      <div class="create" @click="newFile" v-show="checkData"><span class="icon iconfont iconcreate "></span></div>
    </div>
    <div class="runoutData" v-if="checkData">
      <img src="../../assets/img/runoutData@2x.png" class="runoutPhoto">
      <div class="runoutText"><span>暂无数据</span></div>
    </div>
    <p class="boya-page">
      <el-pagination
        @size-change="onpage"
        @current-change="onchang"
        :current-page="formData.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </p>
    <delete-dialog
      ref="deleteDialog"
      :modal="d_modal"
      :textUp="textUp"
      :textUpLoading="textUpLoading"
      @deletefun="docDelete"></delete-dialog>
  </div>
</template>

<script>
  import collapseTransition from '@/components/collapse'// 筛选
  import ExportExcel from '@/components/ExportExcel'
  import ButtonGroup from '@/components/MutiButton'
  import DeleteDialog from '@/components/ButtonDialog/delete'
  export default {
    name: 'document_user_document',
    components: {
      collapseTransition,
      ExportExcel,
      ButtonGroup,
      DeleteDialog
    },
    data() {
      return {
        pageNum: 1,
        pageSize: 10,
        address: '',
        num: '',
        total: 0,
        showFilter: false,
        insideColumns: [],
        insideTableData: [],
        edittingCellId: '',
        edittingText: '',
        formData: {
          file_name: '',
          file_type: '',
          pagination: 1,
          limit: 10,
        },
        tableData: [],
        collapseData: [],
        tHeader: ['文件属性', '文件名称', '状态', '创建时间'],
        filterVal: ['file_type', 'file_name', 'is_delete', 'c_time'],
        valueList: [],

        tmpId: '',
        times: [],
        s_time: '',
        e_time: '',
        checkData: false,

        // 删除弹窗
        d_modal: false,
        textUp: '您确定要删除这个文档？',
        textUpLoading: '正在删除文档',
        rowData: '',
      }
    },
    mounted() {
      this.selectGet()
      this.existing()
    },
    methods: {
      // 下拉框
      existing() {
        this.http.contractfilterparams().then(res => {
          if (res.data.code == '0') {
//              console.log(res)
            var data = res.data.data.file_type
            var typedata = []
            for (var item of data) {
              // console.log(item)
              var json = {
                value: item,
                label: item
              }
              typedata.push(json)
            }
            this.collapseData.push({
              list: typedata,
              name: "文件属性",
              key: 'file_type'
            })
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      },
      timechange(time) {
        if (time[0]) {
          this.s_time = this.time.timestampToTime(time[0], 'DT5')
          this.e_time = this.time.timestampToTime(time[1], 'DT5')
        } else {
          this.s_time = ''
          this.e_time = ''
        }
      },

      // 重置
      handleReset(name) {
        this.formData = {
          file_name: '',
          file_type: '',
          pagination: 1,
          limit: 10,
        },
          this.selectGet()
      },
      onchang(pageNum) {
        this.formData.pagination = pageNum
        this.selectGet()
      },
      onpage(pageSize) {
        this.formData.limit = pageSize
        this.selectGet()
      },
      cancel() {
        this.$Message.info('点击了取消')
        this.modal1 = false
        this.modal2 = false
      },
      // 查询
      selectGet(index) {
        if (index) {
          this.formData.pagination = 1
        }
        const param = this.formData
        console.log(param)
        this.http.apifiles(param).then(res => {
          if (res.status == '200') {
            console.log(res)
            var list = res.data.data.api_file_list
            this.checkData = list === undefined || !list.length

            // 等接口上线后完成
            var newdata = []
            this.total = res.data.data.api_file_count
            for (var i of list) {
              var file_name = ''
              if (i != null) {
                if (i.file_name.length > 10) {
                  file_name = i.file_name.substring(0, 10) + '...'
                } else {
                  file_name = i.file_name
                }
                var json = {
                  file_type: i.file_type,
                  file_name: file_name,
                  request_node: i.request_node,
                  request_url: i.request_url,
                  method: '',
                  is_delete: i.is_delete,
                  c_time: this.time.timestampToTime(i.c_time * 1000, 'DT1'),
                  state1: true,
                  state2: true,
                  state3: true,
                  id: i.id

                  // 类型通过返回值判断
                }
                newdata.push(json)
              }
            }
            this.tableData = newdata
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
        // this.handleReset()
      },
      newFile() {
        this.$router.push({
          name: 'document_new_document', // 跳转的页面
          params: {}
        })
      },
      // 编辑文档
      edit(index, row) {
        this.$router.push({
          name: 'document_edit_document',
          query: {
            id: row.id
          }
        })
      },
      // 查看文档
      checkDoc(index, row) {
        this.$router.push({
          name: 'document_document_detail',
          query: {
            id: row.id
          }
        })
      },
      // 文档删除
      showDeleteDialog(index, row) {
        this.rowData = row
        this.$refs.deleteDialog.handleClick()
      },
      docDelete() {
        this.http.filedelete(this.rowData.id).then(res => {
          // console.log(res)
          // 显示是否成功
          if (res.data.code == '2002') {
            this.$Message.error(res.data.msg)
          } else if (res.data.code == '0') {
            this.$Message.success('删除成功!')
            this.selectGet()
//            this.modal1 = false
          }
        })
      },
      /** 筛选调用的方法 **/
      collapseFun(type, value) {
        this.formData[type] = value
        this.pageNum = 1
        this.selectGet()
      },
      /** 获取导出数据集 **/
      exportFun(data) {
        console.log("下载数据")
        let exportData = {
          file_name: this.formData.file_name,
          file_type: this.formData.file_type,
          pagination: 1,
          limit: this.total,
        }
        this.http.apifiles(exportData).then(res => {
          if (res.status == '200') {
            console.log(res)
            var list = res.data.data.api_file_list
            for (var i of list) {
              // 对导出数据进行部分处理
              i.c_time = this.time.timestampToTime(i.c_time * 1000, 'DT1')
            }
            this.valueList = list
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      }
    }
  }
</script>

<style lang="scss">

  .el-table tr {
    cursor: pointer
  }

</style>
