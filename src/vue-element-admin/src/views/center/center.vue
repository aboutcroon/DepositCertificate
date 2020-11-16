<template>
  <div class="right_cont" style="margin:10px;background: #fff">
    <el-row style="width: 98%;margin: 0px auto;padding-top: 20px;">
      <el-col :span="24">
        <el-col :span="6">
          <el-col :span="7" class="sensus_font">区块号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-col>
          <el-col :span="17">
            <Input v-model="searchValue1" clearable placeholder="请输入" class="search-input" @on-change="handleClear1" />
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="7" class="sensus_font">交易哈希&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-col>
          <el-col :span="17">
            <Input v-model="searchValue" clearable placeholder="请输入" class="search-input" @on-change="handleClear" />
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="7" class="sensus_font">标签&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-col>
          <el-col :span="17">
            <Tooltip content="多个标签以英文的 , 隔开(精准搜索)" placement="top-start" style="width:100%"><Input v-model="searchValue2" clearable placeholder="请输入" class="search-input" @on-change="handleClear2" /></Tooltip>
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="7" class="sensus_font">操作类型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-col>
          <el-col :span="17">
            <Select v-model="searchKey">
              <Option v-for="item in data2" :value="item.value">{{ item.label }}</Option>
            </Select>
            <!--            <Select v-model="searchKey" class="search-col">-->
            <!--              <Option v-for="item in data2" :value="item.label"></Option>-->
            <!--            </Select>-->
          </el-col>
        </el-col>
      </el-col>
      <el-col :span="24" style="margin-top: 1rem;margin-bottom:20px">
        <el-col :span="6">
          <el-col :span="7" class="sensus_font">操作人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-col>
          <el-col :span="17">
            <Input v-model="searchKey1" clearable placeholder="请输入" class="search-input" />
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="7" class="sensus_font">操作时间&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-col>
          <el-col :span="17">
            <Date-picker v-model="times" type="daterange" placement="bottom-end" placeholder="选择日期" style="width:100%" @on-change="timechange" />
          </el-col>
        </el-col>
        <el-col :span="12">
          <Button type="dashed" style="float:right;margin-left: 5px;margin-right: 10px" @click="handleReset('formValidate')">重置</Button>
          <Button type="primary" style="float:right" @click="selectGet(1)">查询</Button>
        </el-col>
      </el-col>
      <!--      <el-col style="clear:both;padding:20px 0">-->

      <!--      </el-col>-->
    </el-row>
    <el-table :data="tableData" border style="width: 98%;clear:both;margin:auto" empty-text="暂无数据，请重新查询">
      <el-table-column prop="num" label="区块号" width="100" align="center">
        <template slot-scope="scope">
          <span @click="jump(scope.$index, scope.row)">{{ scope.row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="交易哈希" width="400" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>{{ scope.row.namelength }}</p>
            <div slot="reference" class="name-wrapper">
              <span @click="change(scope.$index, scope.row)">{{ scope.row.address }}</span>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="operator" label="操作人/用证人" align="center" />
      <el-table-column prop="label" label="标签" align="center" />
      <el-table-column prop="type" label="操作类型" align="center" />
      <el-table-column prop="ipAddress" label="IP地址" width="150" align="center" />
      <el-table-column prop="times" label="操作时间" width="150" align="center" />
    </el-table>
    <p style="background: #fff;text-align: right;padding: 1rem 1rem 1rem 0"><Page :total="count" :current="pageNum" :page-size="pageSize" :page-size-opts="[10,20,30,40,50]" show-elevator show-sizer show-total @on-change="onchang" @on-page-size-change="onpage" /></p>
  </div>
</template>

<script>
export default {
  name: 'Center',
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      count: 0,
      // 区块地址
      searchValue: '',
      // 区块
      searchValue1: '',
      // 标签
      searchValue2: '',
      // 操作类型
      searchKey: '',
      // 操作人
      searchKey1: '',
      times: '',
      s_time: '',
      e_time: '',
      data2: [],
      tableData: []
    }
  },
  mounted() {
    this.selectGet()
    this.operate()
  },
  methods: {
    // 重置
    handleReset(name) {
      this.searchValue = ''
      this.searchValue1 = ''
      this.searchValue2 = []
      this.searchKey = ''
      this.searchKey1 = ''
      this.times = ''
      this.selectGet()
    },
    handleClear(e) {
      if (e.target.value === '') this.data1 = this.value
    },
    handleClear1(e) {
      if (e.target.value === '') this.data1 = this.value
    },
    handleClear2(e) {
      if (e.target.value === '') this.data1 = this.value
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
      if (index) {
        this.pageNum = 1
      } else {
        this.pageNum = this.pageNum
      }
      var param = {
        'pagination': this.pageNum,
        'limit': this.pageSize,
        'transaction_hash': this.searchValue,
        'method': this.searchKey,
        'operator': this.searchKey1,
        'block_number_int': this.searchValue1,
        's_time': this.s_time,
        'e_time': this.e_time,
        'tag_list': this.searchValue2.toString().split(',')
      }
      console.log(param)
      this.http.allevidencefilter(param).then(res => {
        // console.log(res)
        if (res.status == '200') {
          var list = res.data.data.data_list
          this.count = res.data.data.count
          var newdata = []
          for (var i of list) {
            if (i != null) {
              i.timestamp = Number(i.timestamp)
              i.timestamp = this.time.timestampToTime(i.timestamp, 'DT2')
              var operator = ''
              if (i.operator.length > 8) {
                operator = i.operator.substring(0, 10) + '...'
              } else {
                operator = i.operator
              }
              var name = ''
              if (i.transaction_hash.length > 36) {
                name = i.transaction_hash.substring(0, 31) + '......' + i.transaction_hash.substring(i.transaction_hash.length - 4, i.transaction_hash.length)
              }
              var tag_list = ''
              if (i.tag_list.toString().length > 5) {
                tag_list = i.tag_list.toString().substring(0, 5) + '...'
              } else {
                tag_list = i.tag_list.toString()
              }
              var json = {
                num: i.block_number_int,
                namelength: i.transaction_hash,
                address: name,
                operator: operator,
                type: i.method,
                label: tag_list,
                ipAddress: i.from_ip,
                times: i.operated_time.substring(0, 10)
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
    operate() {
      this.http.evidencemethods().then(res => {
        // console.log(res)
        if (res.data.code == '0') {
          var data = res.data.data.evidence_states
          var typedata = []
          for (var item of data) {
            // console.log(item)
            var json = {
              value: item,
              label: item
            }
            typedata.push(json)
          }
          this.data2 = typedata
        } else {
          this.http.messageFun('error', res.data.msg)
        }
      })
    },
    change(index, row) {
      // console.log(row)
      this.$router.push({
        name: 'details', // 跳转的页面
        params: {
          'detailsdata': row.namelength // 我们要传递的参数
        }
      })
    },
    jump(index, row) {
      console.log(row.num)
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
  .sensus_font{
    display: inline-block;
    margin-top: 7px;
    text-align: right;
  }
  .census_left{
    margin-left: 3.8rem;
  }
  body .el-table th.gutter{
    display: table-cell!important;
  }
  .el-table tr{
    cursor:pointer
  }
</style>
