<template>
  <div>
    <el-table :data="tableData" border style="width: 98%;clear:both;margin:auto;" empty-text="暂无数据，请存证">
      <el-table-column prop="numdatas" label="排名" align="center" />
      <el-table-column prop="name" label="企业名称" align="left" header-align="center">
        <template slot-scope="scope" label="企业名称">
          <el-popover trigger="hover" placement="top">
            <p>{{ scope.row.username }}</p>
            <div slot="reference" class="name-wrapper">
              <span @click="change(scope.$index, scope.row)">{{ scope.row.name }}</span>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="num" label="存证数量" align="center" />
      <el-table-column prop="pk" label="周环比" align="center" />
    </el-table>
  </div>
</template>

<script>
import Transfer from '../../../api/transfer.js'
export default {
  name: 'Noun',
  data() {
    return {
      tableData: [],
      columns1: [
        {
          width: 85,
          type: 'index',
          title: '排名'
        },
        {
          width: 90,
          title: '企业名称',
          key: 'name'
        },
        {
          width: 90,
          title: '存证数量',
          key: 'num'
        },
        {
          width: 120,
          title: '存证数量周环比',
          key: 'pk'
        }
      ],
      data1: []
    }
  },
  mounted() {
    var that = this
    Transfer.$on('noun', function(data) {
      that.tableData = data
    })
  }
}
</script>

<style scoped>

</style>
