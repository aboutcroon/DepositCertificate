<template>
  <div class="boya-view">
    <el-row style="width: 100%;padding-top: 20px">
      <el-col :span="24">
        <el-col class="main-filter-container" >
          <span class="icon iconfont iconfilter filter-button " @click="showFilter = !showFilter"><span>筛选</span></span>
        </el-col>
        <el-col class="main-input-container" >
          <el-col class="normal-input">
            <span class="icon iconfont iconIcon-search "></span>
            <Input v-model="formData.transaction_hash" clearable placeholder="请输入交易哈希" class="search-input" @keyup.enter.native="selectGet(1)"/>
          </el-col>
          <el-col class="normal-input">
            <span class="icon iconfont iconIcon-search "></span>
            <Input v-model="formData.block_number_int" clearable placeholder="请输入区块号" class="search-input" @keyup.enter.native="selectGet(1)"/>
          </el-col>
          <el-col class="normal-input">
            <Tooltip content="多个标签以英文的 , 隔开(精准搜索)" placement="top-start" style="width:100%">
              <span class="icon iconfont iconIcon-search "></span>
              <Input v-model="searchValue2" clearable placeholder="请输入标签" class="search-input" @keyup.enter.native="selectGet(1)"/>
            </Tooltip>
          </el-col>
          <el-col class="normal-input">
            <span class="icon iconfont iconIcon-search "></span>
            <Input v-model="formData.organization" clearable placeholder="请输入机构名称" class="search-input" @keyup.enter.native="selectGet(1)"/>
          </el-col>
          <el-col class="normal-input">
            <span class="icon iconfont iconIcon-search "></span>
            <Input v-model="formData.owner" clearable placeholder="请输入用户名" class="search-input" @keyup.enter.native="selectGet(1)"/>
          </el-col>
          <el-col class="normal-input">
            <span class="icon iconfont iconIcon-search "></span>
            <Input v-model="formData.person_name" clearable placeholder="请输入真实姓名" class="search-input" @keyup.enter.native="selectGet(1)"/>
          </el-col>
          <el-col class="normal-input time-input">
            <span class="icon iconfont icondata1"></span>
            <Date-picker v-model="times" type="daterange" placement="bottom-end" placeholder="选择存证时间" style="width:100%" @on-change="timechange" @keyup.enter.native="selectGet(1)"/>
          </el-col>
        </el-col>
        <el-col class="main-btn-container" >
          <Button class="btn-search" @click="selectGet(1)">查询</Button>
          <Button class="btn-reset" style="margin-left: 5px" @click="handleReset('formValidate')">重置</Button>
        </el-col>
      </el-col>
    </el-row>
    <collapse-transition :collapseData="collapseData" :showFilter="showFilter" :formData="formData" @collapseFun="collapseFun" style="width:100%;padding-top: 20px"/>
    <el-table
      class="boya-table"
      :data="tableData"
      style="width: 100%;clear:both;margin-bottom: 137px;"
      :row-style="common.rowStyle"
      :cell-style="cellStyle"
      empty-text="暂无数据，请重新查询">
      <el-table-column prop="num" label="区块号" show-overflow-tooltip>
        <template slot-scope="scope">
          <span @click="jump(scope.$index, scope.row)">{{ scope.row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="交易哈希" show-overflow-tooltip>
        <template slot-scope="scope">
          <span @click="change(scope.$index, scope.row)">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="label" label="标签" show-overflow-tooltip/>
      <el-table-column prop="method" label="操作类型" show-overflow-tooltip />
      <el-table-column prop="from_ip" label="IP地址" show-overflow-tooltip/>
      <el-table-column prop="organization" label="机构名称" show-overflow-tooltip/>
      <el-table-column prop="owner" label="用户" show-overflow-tooltip />
      <el-table-column prop="person_name" label="真实姓名" show-overflow-tooltip/>
      <el-table-column prop="time" label="时间" show-overflow-tooltip />

    </el-table>
    <div class="runoutData" v-show="checkData" style="top: 50%">
      <img src="../../assets/img/runoutData@2x.png" class="runoutPhoto">
      <div class="runoutText"><span>暂无数据</span></div>
    </div>
    <div class="float-btn" v-show="!checkData">
      <export-excel
        :count="total"
        :valueList="valueList"
        :tHeader="tHeader"
        :filterVal="filterVal"
        :filename="'存查证数据管理'"
        @exportfun="exportFun"> </export-excel>
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
    name: 'data_census',
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
          block_number_int: '',
          transaction_hash: '',
          organization: '',
          tag: '',
          method: '',
          person_name:'',
          owner: '',
          node_name: '',
          pagination: 1,
          limit: 10,
          s_time: '',
          e_time: '',
        },
        // 标签
        searchValue2: '',

        // 筛选
        showFilter: false,
        collapseData:[],
        //导出数据集
        tHeader:['区块号', '交易哈希', '标签', '操作类型', 'IP地址', '机构名称', '用户名', '真实姓名', '时间'],
        filterVal:['block_number_int', 'transaction_hash', 'tag_list', 'method', 'from_ip', 'organization', 'owner', 'person_name', 'timestamp'],
        valueList:[],
        cellStyle: this.common.cellStyle('method',{
          '存证-新增': 1,
          '已上线': 0,
          '用证': 2,
        },3 ),

        times: [],
        s_time: '',
        e_time: ''
      }
    },
    mounted() {
    },
    created() {
      this.operate()
      this.selectGet()
    },
    methods: {
      // 重置
      handleReset(name) {
        this.formData = {
          block_number_int: '',
          transaction_hash: '',
          organization: '',
          tag: '',
          method: '',
          person_name:'',
          owner: '',
          node_name: '',
          pagination: 1,
          limit: 10,
          s_time: '',
          e_time: '',
        }
        this.searchValue2 = ''
        this.times = []
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
      timechange(time) {
        if (time[0]) {
          this.s_time = this.time.timestampToTime(time[0], 'DT5')
          this.e_time = this.time.timestampToTime(time[1], 'DT5')
        } else {
          this.s_time = ''
          this.e_time = ''
        }
      },
      //存证类型
      operate() {
        this.http.evidencemethods().then(res => {
          // console.log(res)
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
              list:typedata,
              name:"操作类型",
              key:'method'
            })
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      },
      // 查询
      selectGet(index) {
        var arr = this.$route.query.censusdata
        if (arr === undefined) {
          // console.log(this.searchKey1)
          if (index) {
            this.formData.pagination = 1
          }
          this.formData.s_time = this.s_time
          this.formData.e_time = this.e_time
          this.formData.tag = this.searchValue2.toString().split(',')
          var param = this.formData
        } else {
          if (index) {
            this.formData.pagination = 1
          }
          this.searchValue2 = arr
          this.formData.s_time = this.s_time
          this.formData.e_time = this.e_time
          this.formData.tag = this.searchValue2.toString().split(',')
          var param = this.formData
        }
        this.http.evidencefilter(param).then(res => {
          if (res.status == '200') {
            var list = res.data.data.data_list
            console.log(list)
            this.checkData = list === undefined || !list.length

            var newdata = []
            this.total = res.data.data.count
            for (var i of list) {
              let tag_list = ''
              if (i != null) {
                i.timestamp = Number(i.timestamp)

                if (i.tag_list.toString().length > 5) {
                  tag_list = i.tag_list.toString().substring(0, 5) + '...'
                } else {
                  tag_list = i.tag_list.toString()
                }

                i.timestamp = this.time.timestampToTime(i.timestamp * 1000, 'DT1')
                var json = {
                  name: i.transaction_hash,
                  namelength: i.transaction_hash,
                  num: i.block_number_int,
                  owner: i.owner,
                  username: i.owner,
                  method:i.method,
//                  panel: node_name,
                  label: tag_list,
                  from_ip: i.from_ip,
                  organization: i.organization,
                  person_name: i.person_name,
                  time: i.timestamp
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
      change(index, row) {
        console.log(row)
        this.$router.push({
          name: 'details', // 跳转的页面
          query: {
            'detailsdata': row.namelength // 我们要传递的参数
          }
        })
      },
      jump(index, row) {
        // console.log(row.num)
        this.$router.push({
          name: 'block', // 跳转的页面
          query: {
            'blockdata': row.num // 我们要传递的参数
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
          tag:this.formData.tag,
          method: this.formData.method,
          organization: this.formData.organization,
          person_name: this.formData.person_name,
          owner: this.formData.owner,
          node_name: this.formData.node_name,
          s_time: this.formData.s_time,
          e_time: this.formData.e_time,
          pagination: 1,
          limit: this.total,
        }
        this.http.evidencefilter(exportData).then(res => {
          if (res.status == '200') {
            console.log(res)
            var list = res.data.data.data_list
            for (var i of list) {
              i.timestamp = Number(i.timestamp)
            }
            this.valueList = list
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      },
    }
  }
</script>

<style lang="scss">
  .el-table tr{
    cursor:pointer
  }
</style>
