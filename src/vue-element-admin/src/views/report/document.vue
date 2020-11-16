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
          <!--<el-col class="normal-input">-->
          <!--<span class="icon iconfont iconIcon-search "></span>-->
          <!--<Input v-model="formData.owner" clearable placeholder="请输入创建用户" class="search-input" />-->
          <!--</el-col>-->
          <!--<el-col class="normal-input time-input">-->
          <!--<span class="icon iconfont icondata1"></span>-->
          <!--<Date-picker v-model="times" type="daterange" placement="bottom-end" placeholder="选择调用时间" style="width:100%" @on-change="timechange" />-->
          <!--</el-col>-->
        </el-col>
        <el-col class="main-btn-container">
          <Button class="btn-search" @click="selectGet(1)">查询</Button>
          <Button class="btn-reset" style="margin-left: 5px" @click="handleReset('formValidate')">重置</Button>
        </el-col>
      </el-col>
    </el-row>
    <collapse-transition :collapseData="collapseData" :showFilter="showFilter" :formData="formData"
                         @collapseFun="collapseFun" style="width:98%;margin:0 auto;;padding-top: 20px"/>
    <el-table
      class="boya-table"
      :data="tableData"
      style="width: 100%;clear:both;margin-bottom: 137px;"
      :row-style="common.rowStyle"
      :cell-style="cellStyle"
      empty-text="暂无数据，请重新查询">
      <el-table-column prop="file_type" width="100" label="文件属性" show-overflow-tooltip/>
      <el-table-column prop="file_name" label="文件名称" show-overflow-tooltip/>
      <el-table-column prop="create_type" label="创建形式" show-overflow-tooltip/>
      <el-table-column prop="owner" label="创建用户名称" show-overflow-tooltip/>
      <el-table-column prop="is_delete" label="状态" show-overflow-tooltip/>
      <el-table-column prop="c_time" width="200" label="创建时间" show-overflow-tooltip/>
    </el-table>
    <div class="runoutData" v-show="checkData">
      <img src="../../assets/img/runoutData@2x.png" class="runoutPhoto">
      <div class="runoutText"><span>暂无数据</span></div>
    </div>
    <div class="float-btn" v-show="!checkData">
      <export-excel
        :count="total"
        :valueList="valueList"
        :tHeader="tHeader"
        :filterVal="filterVal"
        :filename="'文件上传详情'"
        @exportfun="exportFun"></export-excel>
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
  </div>
</template>

<script>
  import collapseTransition from '@/components/collapse'// 筛选
  import ExportExcel from '@/components/ExportExcel'
  export default {
    name: 'report_document',
    components: {
      collapseTransition,
      ExportExcel
    },
    data() {
      return {
        pageNum: 1,
        pageSize: 10,
        total: 0,

        tableData: [],
        checkData: false,

        formData: {
          file_type: '',
          file_name: '',
          create_type: '',
          owner: '',
          is_delete: '',
          pagination: 1,
          limit: 10,
          s_time: '',
          e_time: '',
        },
        // 筛选
        showFilter: false,
        collapseData: [],
        //导出数据集
        tHeader: ['文件属性', '文件名称', '创建形式', '创建用户名称', '状态', '创建时间'],
        filterVal: ['file_type', 'file_name', 'create_type', 'owner', 'is_delete', 'c_time'],
        valueList: [],
        cellStyle: this.common.cellStyle('is_delete', {
          '开发中': 1,
          '在使用': 0,
          '已删除': 2,
        }, 4),

        // 文件类型
        state0: [{
          value: '开发指南',
          label: '开发指南',
        }, {
          value: '接口',
          label: '接口',
        }, {
          value: '智能合约',
          label: '智能合约',
        }],
        // 创建形式
        state1: [{
          value: '系统创建',
          label: '系统创建',
        }, {
          value: '用户自建',
          label: '用户自建',
        }],

        times: [],
        s_time: '',
        e_time: ''
      }
    },
    mounted() {
    },
    created() {
      this.selectGet()
      this.existing()
    },

    methods: {
      // 下拉框
      existing() {
        this.collapseData.push({
          list: this.state0,
          name: "文件属性",
          key: 'file_type'
        })
        this.collapseData.push({
          list: this.state1,
          name: "创建形式",
          key: 'create_type'
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
          file_type: '',
          file_name: '',
          create_type: '',
          owner: '',
          is_delete: '',
          pagination: 1,
          limit: 10,
          s_time: '',
          e_time: '',
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

      },
      // 查询
      selectGet(index) {
        if (index) {
          this.formData.pagination = 1
        }
        this.formData.s_time = this.s_time
        this.formData.e_time = this.e_time
        const param = this.formData
        console.log(param)
        this.http.apifiles(param).then(res => {
          if (res.status == '200') {
            console.log(res)
            var list = res.data.data.api_file_list
            this.checkData = list === undefined || !list.length

            var newdata = []
            this.total = res.data.data.api_file_count
            for (var i of list) {
              if (i != null) {
                var json = {
                  file_type: i.file_type,
                  file_name: i.file_name,
                  create_type: i.create_type,
                  is_delete: i.is_delete,
                  owner: i.owner,
                  c_time: this.time.timestampToTime(i.c_time * 1000, 'DT1'),
                  state1: true,
                  state2: true,
                  id: i.id
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
      /** 筛选调用的方法 **/
      collapseFun(type, value) {
        this.formData[type] = value
        this.formData.pagination = 1
        this.selectGet()
      },
      // 获取导出数据集
      exportFun(data) {
        console.log("下载数据")
        let exportData = {
          file_type: this.formData.file_type,
          file_name: this.formData.file_name,
          create_type: this.formData.create_type,
          owner: this.formData.owner,
          is_delete: this.formData.is_delete,
          s_time: this.formData.s_time,
          e_time: this.formData.e_time,
          api_or_contract: 'contract',
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

<style lang="css">
  .el-table tr {
    cursor: pointer
  }
</style>
