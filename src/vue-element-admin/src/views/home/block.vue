<style lang="less">
  @import './detail.less';
</style>
<template>
  <div class="boya-detail">
    <el-row style="margin:10px;" :gutter="20">
      <el-col :span="16">
        <div class="detail-title">区块高度:<span>{{ size }}</span></div>
        <div class="detail-container">
          <p class="test-title" style="margin-top: 5px;">区块哈希</p>
          <p style="margin-bottom: 12px"><input id="danhao" v-model="block_hash" type="text" style="width:64%"><svg-icon icon-class="复制_copy21" @click="copy" /></p>
          <p class="test-title">区块信息</p>
          <p><span>{{ timestamp }}</span> <span>{{ min }}</span><span>{{ transactions_count }}交易</span> <span>582字节</span></p>
          <el-divider> </el-divider>
          <div class="detail-info">
            <div class="detail-info-tag tag-yellow">前块哈希</div><Span>{{ parent_hash }}</Span>
          </div>
          <div class="detail-info">
            <div class="detail-info-tag tag-green">状态树根</div><Span>{{ state_root }}</Span>
          </div>
          <div class="detail-info">
            <div class="detail-info-tag tag-red">交易树根</div><Span>{{ transactions_root }}</Span>
          </div>
          <div class="detail-info">
            <div class="detail-info-tag tag-grey">收银树根</div><Span>{{ receipts_root }}</Span>
          </div>
        </div>
      </el-col>
      <el-col :span="8" style="float: right;padding-right:0">
        <div class="detail-title">节点信息</div>
        <div class="detail-container" style="background: #fff;height:18.9rem;padding-top:0.8rem;">
          <el-table
            class="boya-table"
            :data="tableDatas"
            style="width: 100%;clear:both;"
            :row-style="common.rowStyle"
            empty-text="暂无数据，请重新查询">
            <el-table-column prop="type" width="100" label="节点类型"  show-overflow-tooltip/>
            <el-table-column prop="workname" label="节点名称" show-overflow-tooltip/>
          </el-table>
          <p class="boya-page" style="position: relative; bottom: 0; margin-top: 15px;">
            <el-pagination
              @current-change="onchang"
              :current-page="pageNum"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="prev, pager, next, jumper"
              :total="num">
            </el-pagination>
          </p>
        </div>
      </el-col>
    </el-row>
    <div class="bottom-table">
      <div class="detail-title">交易</div>
      <div class="detail-container">
        <div v-for="item in tasks" :key="item.label">
          <div class="detail-data-block" style="margin-bottom: 20px;" @click="jump(item.id)">
            <p style="float: left;text-align: center;line-height: 5.8rem;width:14.2%;">交易</p>
            <div style="display: inline-block;width:74%;padding-left:10px">
              <p ref="numname" style="margin-top:10px;margin-bottom:4px">{{ item.name }}</p>
              <p style="margin-bottom:4px;color: rgba(0,0,0,.42)">{{ item.account_to }}</p>
              <p style="color: rgba(0,0,0,.42);"><span>{{ item.time }}</span> <span>{{ item.min }}</span></p>
            </div>
            <p style="float: right;margin:10px 28px 0 0">区块 #{{ item.block_number_int }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'home_block',
  components: {
    // 'Table': Table,
    // 'Deal': Deal
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 5,
      block_hash: '',
      state_root: '',
      transactions_root: '',
      receipts_root: '',
      parent_hash: '',
      size: '',
      timestamp: '',
      min: '',
      transactions_count: '',
      tableDatas: [],
      num: 0,
      tasks: []
    }
  },
  computed: {

  },
  mounted() {
    this.getParams()
    this.node()
  },
  methods: {
    // 分页
    onchang(pageNum) {
      this.pageNum = pageNum
      this.node()
    },
    // 复制
    copy() {
      document.getElementById('danhao').select() // 选择对象
      document.execCommand('Copy') // 执行浏览器复制命令
      alert('复制成功')
    },
    getParams() {
      // 跳转页面传值
      let routerParams = this.$route.query.blockdata
      let type = this.$route.query.datatype
      let param = {}
      if(type === undefined) {
        param = {
          block_number_int: routerParams
        }
      } else if(type === "hash") {
        param = {
          block_hash: routerParams
        }
      } else {
        param = {
          block_number_int: routerParams
        }
      }
      // 区块详情
      this.http.blockinfo(param).then(res => {
        if (res.status == '200') {
          this.block_hash = res.data.data.block_hash
          this.state_root = res.data.data.state_root
          this.transactions_root = res.data.data.transactions_root
          this.receipts_root = res.data.data.receipts_root
          this.parent_hash = res.data.data.parent_hash
          this.size = res.data.data.size
          this.timestamp = this.time.timestampToTime(res.data.data.timestamp * 1000, 'DT2')
          this.min = this.time.timestampToTime(res.data.data.timestamp * 1000, 'DT1').substr(10, 16)
          this.transactions_count = res.data.data.transactions_count
          var transactiondata = res.data.data.transaction_list
          var transactiontable = []
          var id = '0'
          for (var item of transactiondata) {
            // console.log(item.timestamp)
            var json = {
              id: id,
              name: item.transaction_hash,
              account_to: item.account_to,
              block_number_int: item.block_number_int,
              time: this.time.timestampToTime(item.timestamp * 1000, 'DT2'),
              min: this.time.timestampToTime(item.timestamp * 1000, 'DT1').substr(10, 16)
            }
            id++
            transactiontable.push(json)
          }
          this.tasks = transactiontable
        } else {
          this.http.messageFun('error', res.data.msg)
        }
      })
    },
    node() {
      // 节点信息
      this.http.nodes({ pagination: this.pageNum, limit: this.pageSize }).then(res => {
        // console.log(res)
        if (res.status == '200') {
          var list = res.data.data.node_list
          this.num = res.data.data.all_cnt
          var newdata = []
          for (var index of list) {
            if (index != null) {
              var json = {
                type: index.node_type,
                workname: index.node_name
              }
              newdata.push(json)
            }
          }
          this.tableDatas = newdata
        } else {
          this.http.messageFun('error', res.data.msg)
        }
      })
    },
    jump(event) {
      // console.log(this.$refs.numname[event].innerHTML)
      this.$router.push({
        name: 'details',
        query: {
          'detailsdata': this.$refs.numname[event].innerHTML
        }
      })
    },
    change(data, row) {
      // console.log(data)
      this.$router.push({
        name: 'details',
        query: {
          'detailsdata': row.name
        }
      })
    }
  }
}
</script>

<style lang="less">

  #danhao{
    border: 0;
    width: 57%;
  }

</style>
