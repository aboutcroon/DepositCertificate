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
            <Input v-model="formData.block_number_int" clearable placeholder="请输入区块号" class="search-input"
                   @keyup.enter.native="selectGet(1)"/>
          </el-col>
          <el-col class="normal-input">
            <span class="icon iconfont iconIcon-search "></span>
            <Input v-model="formData.transaction_hash" clearable placeholder="请输入交易哈希" class="search-input"
                   @keyup.enter.native="selectGet(1)"/>
          </el-col>
          <el-col class="normal-input">
            <span class="icon iconfont iconIcon-search "></span>
            <Tooltip content="多个标签以英文的 , 隔开" placement="top-start" style="width:100%">
              <Input v-model="searchValue0" clearable placeholder="标签" class="search-input"
                     @keyup.enter.native="selectGet(1)"/>
            </Tooltip>
          </el-col>
          <el-col class="normal-input">
            <span class="icon iconfont iconIcon-search "></span>
            <Input v-model="formData.organization" clearable placeholder="请输入机构名称" class="search-input"
                   @keyup.enter.native="selectGet(1)"/>
          </el-col>
          <el-col class="normal-input">
            <span class="icon iconfont iconIcon-search "></span>
            <Tooltip content="多个标签以英文的 , 隔开" placement="top-start" style="width:100%">
              <Input v-model="searchValue1" clearable placeholder="请输入共享用户" class="search-input"
                     @keyup.enter.native="selectGet(1)"/>
            </Tooltip>
          </el-col>
          <el-col class="normal-input time-input">
            <span class="icon iconfont icondata1"></span>
            <Date-picker v-model="times" type="daterange" placement="bottom-end" placeholder="选择操作时间" style="width:100%"
                         @on-change="timechange" @keyup.enter.native="selectGet(1)"/>
          </el-col>
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
      <el-table-column prop="block_number_int" label="区块号" width="120" show-overflow-tooltip>
        <template slot-scope="scope">
          <span @click="jump(scope.$index, scope.row)">{{ scope.row.block_number_int }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="transaction_hash" label="交易哈希" width="350" show-overflow-tooltip>
        <template slot-scope="scope">
          <span @click="tx(scope.$index, scope.row)">{{ scope.row.transaction_hash }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="tag_list" label="标签" show-overflow-tooltip/>
      <el-table-column prop="method" label="操作类型" show-overflow-tooltip/>
      <el-table-column prop="from_ip" label="IP地址" show-overflow-tooltip/>
      <el-table-column prop="organization" label="机构名称" show-overflow-tooltip/>
      <el-table-column prop="operator" label="操作人" show-overflow-tooltip/>
      <el-table-column prop="authorized_users" label="共享用户" show-overflow-tooltip/>
      <el-table-column prop="operated_time" label="操作时间" show-overflow-tooltip/>
    </el-table>
    <div class="runoutData" v-show="checkData" style="top: 40%">
      <img src="../../assets/img/runoutData@2x.png" class="runoutPhoto">
      <div class="runoutText"><span>暂无数据</span></div>
    </div>
    <div class="float-btn" v-show="!checkData">
      <export-excel
        :count="total"
        :valueList="valueList"
        :tHeader="tHeader"
        :filterVal="filterVal"
        :filename="'存查证共享数据管理'"
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
    name: 'report_share_data',
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
          'block_number_int': '',
          'transaction_hash': '',
          'tag_list': '',
          'method': '',
          'organization': '',
          'share_user_list': '',
          'pagination': 1,
          'limit': 10,
          's_time': '',
          'e_time': '',
        },
        // 标签
        searchValue0: '',
        // 共享用户
        searchValue1: '',

        // 筛选
        showFilter: false,
        collapseData: [],
        //导出数据集
        tHeader: ['区块号', '交易哈希', '标签', '操作类型', 'IP地址', '机构名称', '操作人', '共享用户', '操作时间'],
        filterVal: ['block_number_int', 'transaction_hash', 'tag_list', 'method', 'from_ip', 'organization', 'operator', 'authorized_users', 'operated_time'],
        valueList: [],
        cellStyle: this.common.cellStyle('method', {
          '存证-新增': 1,
          '已上线': 0,
          '用证': 2,
        }, 3),

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
        this.http.evidencemethods().then(res => {
          console.log(res)
          if (res.data.code == '0') {
            var data = res.data.data.evidence_states
            var typedata = []
            for (var item of data) {
              var json = {
                value: item,
                label: item
              }
              typedata.push(json)
            }
            this.collapseData.push({
              list: typedata,
              name: "操作类型",
              key: 'method'
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
        this.searchValue0 = ''
        this.searchValue1 = ''
        this.formData = {
          'block_number_int': '',
          'transaction_hash': '',
          'tag_list': '',
          'method': '',
          'organization': '',
          'share_user_list': '',
          'pagination': 1,
          'limit': 10,
          's_time': '',
          'e_time': '',
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
        let searchKey0 = []
        let searchKey1 = []
        if (this.searchValue0.toString().length > 0) {
          searchKey0 = this.searchValue0.toString().split(',')
        }
        if (this.searchValue1.toString().length > 0) {
          searchKey1 = this.searchValue1.toString().split(',')
        }

        this.formData.tag_list = searchKey0
        this.formData.share_user_list = searchKey1
        this.formData.s_time = this.s_time
        this.formData.e_time = this.e_time

        const param = this.formData
        console.log(param)
        this.http.shareevidences(param).then(res => {
          if (res.status == '200') {
            console.log(res)
            var list = res.data.data.data_list
            this.checkData = list === undefined || !list.length

            var newdata = []
            this.total = res.data.data.count
            for (var i of list) {
              if (i != null) {
                var json = {
                  block_number_int: i.block_number_int,
                  transaction_hash: i.transaction_hash,
                  tag_list: i.tag_list,
                  method: i.method,
                  from_ip: i.from_ip,
                  organization: i.organization,
                  operator: i.operator,
                  authorized_users: i.authorized_users,
                  operated_time: i.operated_time

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
      collapseFun(type, value) {
        this.formData[type] = value
        this.formData.pagination = 1
        this.selectGet()
      },
      // 获取导出数据集
      exportFun(data) {
        console.log("下载数据")
        let exportData = {
          block_number_int: this.formData.block_number_int,
          transaction_hash: this.formData.transaction_hash,
          tag_list: this.formData.tag_list,
          method: this.formData.method,
          organization: this.formData.organization,
          share_user_list: this.formData.share_user_list,
          s_time: this.formData.s_time,
          e_time: this.formData.e_time,
          pagination: 1,
          limit: this.total,
        }
        this.http.shareevidences(exportData).then(res => {
          if (res.status == '200') {
            console.log(res)
            var list = res.data.data.data_list
//            for (var i of list) {
//              // 对导出数据进行部分处理
//            }
            this.valueList = list
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      },

      tx(index, row) {
        console.log(row)
        this.$router.push({
          name: 'details',
          query: {
            'detailsdata': row.transaction_hash
          }
        })
      },
      jump(index, row) {
        this.$router.push({
          name: 'block',
          query: {
            'blockdata': row.block_number_int
          }
        })
      }
    }
  }
</script>

<style lang="css">
  .level_top {
    background: #fff;
    margin: 10px;
  }

  .sensus_font {
    display: inline-block;
    margin-top: 7px;
    text-align: right;
  }

  .census_left {
    margin-left: 3.81rem;
  }

  body .el-table th.gutter {
    display: table-cell !important;
  }

  .el-table tr {
    cursor: pointer
  }
</style>
