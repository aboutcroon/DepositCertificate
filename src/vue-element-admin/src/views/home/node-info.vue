<template>
  <div class=" boya-view">
    <el-table
      class="boya-table"
      :data="tableData"
      style="width: 100%;clear:both;margin-top:20px;margin-bottom: 137px;"
      :row-style="common.rowStyle"
      empty-text="暂无数据，请重新查询">
      <el-table-column prop="num" label="序号" show-overflow-tooltip/>
      <el-table-column prop="node_name" label="节点名" show-overflow-tooltip/>
      <el-table-column prop="node_type" label="节点类型" show-overflow-tooltip/>
      <el-table-column prop="block_number" label="区块号" show-overflow-tooltip/>
      <el-table-column prop="node_status" label="节点状态" show-overflow-tooltip/>
      <el-table-column prop="c_time" label="加入时间" show-overflow-tooltip/>
    </el-table>
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
    name: 'home_node_info',
    data() {
      return {
        pageNum: 1,
        pageSize: 10,
        total: 0,

        tableData: [],
      }
    },
    mounted() {
    },
    created() {
      this.selectGet(1)
    },
    methods: {
      onchang(pageNum) {
        this.pageNum = pageNum
        this.selectGet()
      },
      onpage(pageSize) {
        this.pageSize = pageSize
        this.selectGet()
      },
      // 查询
      selectGet(index) {
        if (index) {
          this.pageNum = 1
        }
        let param = {
          'pagination': this.pageNum,
          'limit': this.pageSize
        }
        this.http.nodes(param).then(res => {
          console.log(res)
          if (res.data.code == '0') {
            this.total = res.data.data.all_cnt
            var list = res.data.data.node_list
            var newdata = []
            var num = (this.pageNum - 1) * 10
            var nums = 1
            for (var item of list) {
              if (item != null) {
                var json = {
                  num: num + nums,
                  node_name: item.node_name,
                  node_type: item.node_type,
                  block_number: item.block_number,
                  node_status: item.node_status,
                  c_time: item.c_time.substr(0, 10)
                }
                nums++
                newdata.push(json)
              }
            }
            this.tableData = newdata
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      },
    }
  }
</script>

<style lang="css">
  .el-table tr{
    cursor:pointer
  }
</style>
