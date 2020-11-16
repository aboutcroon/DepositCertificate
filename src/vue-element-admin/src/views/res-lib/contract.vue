<template>
  <div class="boya-view">
    <el-row style="width: 100%;padding-top: 20px">
      <el-col :span="24">
        <el-col class="main-input-container">
          <el-col class="normal-input">
            <span class="icon iconfont iconIcon-search "></span>
            <Input v-model="searchValue0" clearable placeholder="请输入合约名称" class="search-input"
                   @keyup.enter.native="selectGet(1)"/>
          </el-col>
        </el-col>
        <el-col class="main-btn-container single-btn">
          <Button class="btn-search" @click="selectGet(1)">查询</Button>
        </el-col>
      </el-col>
    </el-row>
    <el-table
      class="boya-table"
      :data="tableData"
      style="width: 100%;clear:both;margin-bottom: 137px;"
      :row-style="common.rowStyle"
      empty-text="暂无数据，请重新查询">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="简介">
              <span>{{ props.row.intro }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="合约名称"/>
      <el-table-column prop="c_type" label="创建形式"/>
      <el-table-column prop="address" label="合约地址" width="500"/>
      <el-table-column label="操作" width="140" align="center">
        <template slot-scope="scope">
          <el-tooltip v-if="scope.row.state1" effect="dark" content="查看" placement="top-start">
            <span class="icon iconfont iconrenwu" style="cursor: pointer"
                  @click="checkDoc(scope.$index, scope.row)"></span>
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
  export default {
    name: 'contract_call_more',
    data() {
      return {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        tableData: [],
        // 关键字
        searchValue0: '',
        checkData: false
      }
    },
    mounted() {
    },
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
        this.pageSize = pageSize
        this.selectGet()
      },
      cancel() {
        this.$Message.info('点击了取消')
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
        this.http.contractlist(param).then(res => {
          if (res.data.code == '0') {
            console.log(res)
            var list = res.data.data.contract_list
            this.checkData = list === undefined || !list.length

            var newdata = []
            this.total = res.data.data.contract_count
            for (var i of list) {
              if (i != null) {
                let state = !(i.api_file_id === 0)
                var json = {
                  c_type: i.contract_type,
                  name: i.filename,
                  address: i.address,
                  intro: i.intro,
                  id: i.id,
                  api_file_id: i.api_file_id,
                  state1: state,
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
      // 查看文档 查看更多
      checkDoc(index, row) {
        this.$router.push({
          name: 'res_document_detail',
          query: {
            id: row.api_file_id
          }
        })
      },
    }
  }
</script>

<style lang="css">
  .el-table tr {
    cursor: pointer
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    margin-left: 50px;
    width: 50%;
  }
</style>
