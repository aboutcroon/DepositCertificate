<template>
  <div class="boya-view">
    <el-row style="width: 100%;padding-top: 20px">
      <el-col :span="24">
        <el-col class="main-filter-container">
          <span class="icon iconfont iconfilter filter-button " @click="showFilter = !showFilter"><span>筛选</span></span>
        </el-col>
        <el-col class="main-input-container">
          <el-col class="normal-input">
            <span class="icon iconfont iconIcon-search "></span>
            <Input v-model="formData.api_name" clearable placeholder="请输入合约名称" class="search-input"
                   @keyup.enter.native="selectGet(1)"/>
          </el-col>
          <el-col class="normal-input">
            <span class="icon iconfont iconIcon-search "></span>
            <Input v-model="formData.owner" clearable placeholder="请输入所属用户" class="search-input"
                   @keyup.enter.native="selectGet(1)"/>
          </el-col>
          <el-col class="normal-input">
            <span class="icon iconfont iconIcon-search "></span>
            <Input v-model="formData.operator" clearable placeholder="请输入实际操作用户" class="search-input"
                   @keyup.enter.native="selectGet(1)"/>
          </el-col>
          <el-col class="normal-input">
            <span class="icon iconfont iconIcon-search "></span>
            <Input v-model="formData.address" clearable placeholder="请输入合约地址" class="search-input"
                   @keyup.enter.native="selectGet(1)"/>
          </el-col>
          <el-col class="normal-input">
            <span class="icon iconfont iconIcon-search "></span>
            <Input v-model="formData.contract_function" clearable placeholder="请输入合约函数名" class="search-input"
                   @keyup.enter.native="selectGet(1)"/>
          </el-col>
          <el-col class="normal-input time-input">
            <span class="icon iconfont icondata1"></span>
            <Date-picker v-model="times" type="daterange" placement="bottom-end" placeholder="选择调用时间" style="width:100%"
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
      <el-table-column prop="api_name" label="合约/接口名称" show-overflow-tooltip/>
      <el-table-column prop="api_type" label="类型" show-overflow-tooltip/>
      <el-table-column prop="owner" label="所属用户" show-overflow-tooltip/>
      <el-table-column prop="operator" label="实际操作用户" show-overflow-tooltip/>
      <el-table-column prop="address" label="合约地址" width="240" show-overflow-tooltip/>
      <el-table-column prop="contract_function" label="合约函数名" show-overflow-tooltip/>
      <el-table-column prop="params" label="调用传的参数" width="240" show-overflow-tooltip/>
      <el-table-column prop="c_time" label="调用时间" width="240"/>
      <el-table-column prop="call_status" label="调用状态" width="120" show-overflow-tooltip/>
    </el-table>
    <div class="runoutData" v-if="checkData" style="top: 40%">
      <img src="../../assets/img/runoutData@2x.png" class="runoutPhoto">
      <div class="runoutText"><span>暂无数据</span></div>
    </div>
    <div class="float-btn" v-show="!checkData">
      <export-excel
        :count="total"
        :valueList="valueList"
        :tHeader="tHeader"
        :filterVal="filterVal"
        :filename="'合约调用详情'"
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
    name: 'report_call_contract',
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
          api_name: '',
          api_type: '',
          owner: '',
          operator: '',
          address: '',
          contract_function: '',
          s_time: '',
          e_time: '',
          api_or_contract: 'contract',
          pagination: 1,
          limit: 10
        },
        // 筛选
        showFilter: false,
        collapseData: [],
        //导出数据集
        tHeader: ['合约/接口名称', '类型', '所属用户', '实际操作用户', '合约地址', '合约函数名', '调用传的参数', 'APPID', '调用时间', '调用状态'],
        filterVal: ['api_name', 'api_type', 'owner', 'operator', 'address', 'contract_function', 'params', 'appid', 'c_time', 'call_status'],
        valueList: [],
        cellStyle: this.common.cellStyle('call_status', {
          '存证-新增': 1,
          '调用成功': 0,
          '调用失败': 2,
        }, 8),

        times: [],
        s_time: '',
        e_time: '',
      }
    },
    mounted() {
    },
    created() {
      this.init()
      this.selectGet()
      this.existing()
    },

    methods: {
      // 初始化
      init() {
        const source = this.$route.query.source
        if (source === '1') {
          console.log(this.$route.query.api_data)
          let data = this.$route.query.api_data
          this.formData.api_name = data.api_name
          this.formData.api_type = data.api_type
          this.formData.owner = data.username
        }
      },
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
            this.collapseData.push({
              list: typedata,
              name: "类型",
              key: 'api_type'
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
          api_name: '',
          api_type: '',
          owner: '',
          operator: '',
          address: '',
          contract_function: '',
          s_time: '',
          e_time: '',
          api_or_contract: 'contract',
          pagination: 1,
          limit: 10
        }
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
        this.formData.s_time = this.s_time
        this.formData.e_time = this.e_time
        const param = this.formData
        console.log(param)
        this.http.contractrecordlist(param).then(res => {
          if (res.status == '200') {
            console.log(res)
            var list = res.data.data.contract_record_list
            this.checkData = list === undefined || !list.length

            var newdata = []
            this.total = res.data.data.contract_record__count
            for (var i of list) {
              if (i != null) {

                var json = {
                  api_name: i.api_name,
                  api_type: i.api_type,
                  owner: i.owner,
                  operator: i.operator,
                  address: i.address,
                  call_status: i.call_status,
                  contract_function: i.contract_function,
                  params: i.params,
                  c_time: this.time.timestampToTime(i.c_time * 1000, 'DT1'),
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
          api_name: this.formData.api_name,
          api_type: this.formData.api_type,
          owner: this.formData.owner,
          operator: this.formData.operator,
          address: this.formData.address,
          contract_function: this.formData.contract_function,
          s_time: this.formData.s_time,
          e_time: this.formData.e_time,
          api_or_contract: 'contract',
          pagination: 1,
          limit: this.total,
        }
        this.http.contractrecordlist(exportData).then(res => {
          if (res.status == '200') {
            console.log(res)
            var list = res.data.data.contract_record_list
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
