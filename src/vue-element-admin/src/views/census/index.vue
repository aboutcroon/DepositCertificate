<template>
  <div class="level_top">
    <el-row style="width:98%;margin:0 auto;padding-top: 20px">
      <el-col :span="24">
        <el-col :span="6">
          <el-col :span="7" class="sensus_font">交易哈希&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-col>
          <el-col :span="17">
            <Input v-model="searchValue" clearable placeholder="请输入" class="search-input" />
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="7" class="sensus_font">区块号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-col>
          <el-col :span="17">
            <Input v-model="searchValue1" clearable placeholder="请输入" class="search-input" />
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="7" class="sensus_font">计算节点&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-col>
          <el-col :span="17">
            <Input v-model="searchValue2" clearable placeholder="请输入" class="search-input" />
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="7" class="sensus_font">用户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-col>
          <el-col :span="17">
            <Input v-model="searchKey" clearable placeholder="请输入" class="search-input" />
          </el-col>
        </el-col>
      </el-col>
      <el-col :span="24" style="margin-top: 1rem">
        <el-col :span="6">
          <el-col :span="7" class="sensus_font">标签&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-col>
          <el-col :span="17">
            <Tooltip content="多个标签以英文的 , 隔开" placement="top-start" style="width:100%"><Input v-model="searchKey1" clearable placeholder="请输入" class="search-input" /></Tooltip>
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="7" class="sensus_font">时间&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-col>
          <el-col :span="17">
            <Date-picker v-model="times" type="daterange" placement="bottom-end" placeholder="选择日期" style="width:100%" @on-change="timechange" />
          </el-col>
        </el-col>
        <el-col :span="12">
          <!--          <router-link to="/datas/data" style="float:right"><Button type="primary" style="float:left;">新建</Button></router-link>-->
          <Button type="dashed" style="float:right;margin-left: 5px" @click="handleReset('formValidate')">重置</Button>
          <Button type="primary" style="float:right" @click="selectGet(1)">查询</Button>
        </el-col>
      </el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 98%;clear:both;margin:auto;margin-top:20px" empty-text="暂无数据，请重新查询">
      <el-table-column prop="num" label="区块号" align="center">
        <template slot-scope="scope">
          <span @click="jump(scope.$index, scope.row)">{{ scope.row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="交易哈希" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>{{ scope.row.namelength }}</p>
            <div slot="reference" class="name-wrapper">
              <span @click="change(scope.$index, scope.row)">{{ scope.row.name }}</span>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="panel" label="计算节点" align="center" />
      <el-table-column prop="label" label="标签" align="center" />
      <el-table-column prop="owner" label="用户" align="center" />
      <el-table-column prop="time" label="时间" align="center" />
    </el-table>
    <p style="background: #fff;text-align: right;padding: 1rem 1rem 1rem 0"><Page :total="total" :current="pageNum" :page-size="pageSize" :page-size-opts="[10,20,30,40,50]" show-total show-elevator show-sizer @on-change="onchang" @on-page-size-change="onpage" /></p>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      num: '',
      total: 0,
      insideColumns: [],
      insideTableData: [],
      edittingCellId: '',
      edittingText: '',
      tableData: [],
      // 交易嘻哈
      searchValue: '',
      // 区块
      searchValue1: '',
      // 计算节点
      searchValue2: '',
      // 用户
      searchKey: '',
      // 标签
      searchKey1: '',
      times: [],
      s_time: '',
      e_time: ''
    }
  },
  // mounted() {
  //   this.selectGet()
  // },
  created() {
    this.selectGet()
  },
  methods: {
    // 重置
    handleReset(name) {
      this.searchValue = ''
      this.searchValue1 = ''
      this.searchValue2 = ''
      this.searchKey = ''
      this.searchKey1 = []
      this.times = []
      this.pageNum = 1
      this.selectGet()
    },
    onchang(pageNum) {
      this.pageNum = pageNum
      this.selectGet()
    },
    onpage(pageSize) {
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
    // 查询
    selectGet(index) {
      var arr = this.$route.params.censusdata
      // console.log(arr)
      if (arr === undefined) {
        // console.log(this.searchKey1)
        if (index) {
          this.pageNum = 1
        } else {
          this.pageNum = this.pageNum
        }
        var param = {
          'pagination': this.pageNum,
          'limit': this.pageSize,
          'transaction_hash': this.searchValue,
          'block_number_int': this.searchValue1,
          'owner': this.searchKey,
          'tag': this.searchKey1.toString().split(','),
          's_time': this.s_time,
          'e_time': this.e_time,
          'node_name': this.searchValue2
        }
      } else {
        if (index) {
          this.pageNum = 1
        } else {
          this.pageNum = this.pageNum
        }
        // console.log(arr)
        var param = {
          'pagination': this.pageNum,
          'limit': this.pageSize,
          'transaction_hash': this.searchValue,
          'block_number_int': this.searchValue1,
          'owner': this.searchKey,
          'tag': arr.toString().split(','),
          's_time': this.s_time,
          'e_time': this.e_time,
          'node_name': this.searchValue2
        }
      }
      // console.log(param)
      this.http.evidencefilter(param).then(res => {
        if (res.status == '200') {
          var list = res.data.data.data_list
          // console.log(list)
          var newdata = []
          this.total = res.data.data.count
          for (var i of list) {
            var node_name = ''
            var tag_list = ''
            if (i != null) {
              i.timestamp = Number(i.timestamp)
              var name = ''
              if (i.transaction_hash.length > 16) {
                name = i.transaction_hash.substring(0, 11) + '......' + i.transaction_hash.substring(i.transaction_hash.length - 4, i.transaction_hash.length)
              }
              if (i.node_name.length > 10) {
                node_name = i.node_name.substring(0, 20) + '...'
              } else {
                node_name = i.node_name
              }
              if (i.tag_list.toString().length > 5) {
                tag_list = i.tag_list.toString().substring(0, 5) + '...'
              } else {
                tag_list = i.tag_list.toString()
              }
              i.timestamp = this.time.timestampToTime(i.timestamp * 1000, 'DT1')
              var json = {
                name: name,
                namelength: i.transaction_hash,
                num: i.block_number_int,
                owner: i.owner,
                username: i.owner,
                panel: node_name,
                label: tag_list,
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
      // this.handleReset()
    },
    change(index, row) {
      console.log(row)
      this.$router.push({
        name: 'details', // 跳转的页面
        params: {
          'detailsdata': row.namelength // 我们要传递的参数
        }
      })
    },
    jump(index, row) {
      // console.log(row.num)
      this.$router.push({
        name: 'block', // 跳转的页面
        params: {
          'blockdata': row.num // 我们要传递的参数
        }
      })
    }
  }
}
</script>

<style lang="css">
  .level_top{
    background: #fff;
    margin:10px;
  }
  .sensus_font{
    display: inline-block;
    margin-top: 7px;
    text-align: right;
  }
  .census_left{
    margin-left: 3.81rem;
  }
  body .el-table th.gutter{
    display: table-cell!important;
  }
  .el-table tr{
    cursor:pointer
  }
</style>
