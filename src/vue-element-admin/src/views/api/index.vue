<template>
  <div class="boya-view">
    <el-row style="width:100%;padding-top: 20px">
      <el-col :span="24">
        <el-col class="main-input-container">
          <el-col class="normal-input">
            <span class="icon iconfont iconIcon-search"></span>
            <Input v-model="searchValue0" clearable placeholder="请输入接口名称" class="search-input"
                   @keyup.enter.native="selectGet(1)"/>
          </el-col>
        </el-col>
        <el-col class="main-btn-container " style="float: right">
          <Button class="btn-search" @click="selectGet(1)">查询</Button>
          <Button class="btn-reset" style="margin-left: 5px" @click="handleReset('formValidate')">重置</Button>
        </el-col>
      </el-col>
    </el-row>
    <el-table
      class="boya-table"
      :data="tableData"
      style="width: 100%;clear:both;margin-top:20px;margin-bottom: 137px;"
      :row-style="common.rowStyle"
      empty-text="暂无数据，请重新查询">
      <el-table-column prop="api_name" label="接口名称" width="400" show-overflow-tooltip/>
      <el-table-column prop="intro" label="说明" show-overflow-tooltip/>
      <el-table-column label="操作" width="140" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tooltip v-if="scope.row.state1" class="item" effect="dark" content="查看" placement="top-start">
            <span class="icon iconfont iconrenwu" @click="checkMore(scope.$index, scope.row)"></span>
          </el-tooltip>
          <span v-if="scope.row.state1&&scope.row.state2" style="margin:0 4px">|</span>
          <el-tooltip v-if="scope.row.state2" class="item" effect="dark" content="权限控制" placement="top-start">
            <span class="icon iconfont iconsettings" @click="setPermission(scope.$index, scope.row)"></span>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="runoutData" v-if="checkData">
      <img src="../../assets/img/runoutData@2x.png" class="runoutPhoto">
      <div class="runoutText"><span>暂无数据</span></div>
    </div>
    <p class="boya-page">
      <el-pagination
        @size-change="onpage"
        @current-change="onchang"
        :current-page="pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </p>
  </div>
</template>

<script>
  import ExportExcel from '@/components/ExportExcel'
  export default {
    name: 'contract_call_more',
    components: {
      ExportExcel
    },
    data() {
      return {
        pageNum: 1,
        pageSize: 10,
        total: 0,

        tableData: [],
        // 关键字
        searchValue0: '',

        //导出数据集
        tHeader: ['接口名称', '说明'],
        filterVal: ['api_name', 'intro'],
        valueList: [],
        checkData: false
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
        this.searchValue0 = ''
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
      cancel() {
        this.$Message.info('点击了取消')
        this.modal1 = false
        this.modal2 = false
      },
      // 查询
      selectGet(index) {
        if (index) {
          this.pageNum = 1
        }
        const param = {
          'keyword': this.searchValue0,
          'pagination': this.pageNum,
          'limit': this.pageSize,
        }
        this.http.apilist(param).then(res => {
          if (res.data.code == '0') {
            console.log(res)
            var list = res.data.data.api_list
            this.checkData = list === undefined || !list.length

            var newdata = []
            this.total = res.data.data.api_count
            for (var i of list) {
              if (i != null) {
                let state = !(i.api_file_id === 0)
                var json = {
                  api_type: i.api_type,
                  api_name: i.api_name,
                  intro: i.intro,
                  id: i.id,
                  request_url: i.request_url,
                  request_method: i.request_method,
                  api_num: i.api_num,
                  api_file_id: i.api_file_id,
                  state1: state,
                  state2: true,
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
      // 权限控制
      setPermission(index, row) {
        console.log(row)
        this.$router.push({
          name: 'api_access',
          query: {
            'request_url': row.request_url,
            'request_method': row.request_method
          }
        })
      },
      // 查看更多
      checkMore(index, row) {
        console.log(row)
        this.$router.push({
          name: 'document_document_detail',
          query: {
            id: row.api_file_id
          }
        })
      },
      // 获取导出数据集
      exportFun(data) {
        console.log("下载数据")
        const param = {
          'keyword': this.searchValue0,
          'pagination': 1,
          'limit': this.total,
        }
        this.http.shareevidences(param).then(res => {
          if (res.data.code == '0') {
            console.log(res)
            this.valueList = res.data.data.api_list
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      },
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
