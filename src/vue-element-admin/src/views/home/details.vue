<style lang="less">
  @import './detail.less';
</style>
<template>
  <div class="boya-detail">
    <el-row style="margin:10px;" :gutter="20">
      <el-col :span="16">
        <div class="detail-title">交易详情</div>
        <div class="detail-container">
          <p class="test-title" style="margin-top: 5px;">交易哈希</p>
          <p style="margin-bottom: 12px"><input id="danhao" v-model="transaction_hash" type="text" style="width:64%"><svg-icon icon-class="复制_copy21" @click="copy" /></p>
          <p class="test-title">交易时间</p>
          <p><span>{{ timestamp }}</span> <span>{{ min }}</span></p>
          <el-divider> </el-divider>
          <div class="detail-info">
            <div class="detail-info-tag tag-yellow">区块哈希</div><Span>{{ block_hash }}</Span>
          </div>
          <div class="detail-info">
            <div class="detail-info-tag tag-green">发送地址</div><Span>{{ account_from }}</Span>
          </div>
          <div class="detail-info">
            <div class="detail-info-tag tag-red">接收地址</div><Span>{{ account_to }}</Span>
          </div>
          <div class="detail-info">
            <div class="detail-info-tag tag-grey">发送序号</div><Span>{{ nonce_int }}</Span>
          </div>
        </div>
      </el-col>
      <el-col :span="8" style="float: right;padding-right:0">
        <div class="detail-title">节点信息</div>
        <div class="detail-container" style="background: #fff;height:18.9rem;padding-top:0.8rem;">
          <el-table
            class="boya-table"
            :data="tableDatas"
            style="width: 100%;height: 300px;clear:both;"
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
          <!--<p style="text-align: right"><Page :total="num" :current="pageNum" :page-size="pageSize" show-elevator size="small" style="margin-top: 1rem" @on-change="onchang" /></p>-->
        </div>
      </el-col>
    </el-row>
    <div class="bottom-table">
      <div class="detail-title">交易数据</div>
      <div class="detail-container">
        <div class="detail-data-block" style="margin-bottom: 20px;">
          <div :class="unfoldClass? 'visible' : 'unVisible'">
            <div class="detail-data-title">上链数据(原始)</div>
            <span ref="unfold">{{ input }}</span>
            <div class="logo" @click="handleUnfold" v-if="unfoldShow">
              <span ref="unfoldText">展开全部</span><span class="iconfont iconxiala_icon" ref="unfoldIcon"></span>
            </div>
          </div>
        </div>
        <div class="detail-data-block"  style="margin-bottom: 20px;">
          <div :class="unfoldClass2? 'visible' : 'unVisible'">
            <div class="detail-data-title">上链数据(UTF-8)</div>
            <span ref="unfold2">{{ input_decode }}</span>
            <div class="logo" @click="handleUnfold2" v-if="unfoldShow2">
              <span ref="unfoldText2">展开全部</span><span class="iconfont iconxiala_icon" ref="unfoldIcon2"></span>
            </div>
          </div>
        </div>
        <div class="detail-data-block">
          <div class="detail-data-title">上链数据(格式化)</div>
          <div class="enter" style="display: flex">
            <el-table
              class="boya-table"
              :data="tableData"
              style="width: 100%;clear:both;"
              :row-style="common.rowStyleGrey"
              :header-cell-style="{background:'#EEF0F4'}"
              empty-text="暂无数据，请重新查询">
              <el-table-column prop="name1" label="一级字段名称" width="150" show-overflow-tooltip/>
              <el-table-column prop="name2" label="二级字段名称" width="150" v-if="numShow" show-overflow-tooltip/>
              <el-table-column prop="record" label="上链数据" show-overflow-tooltip/>
              <el-table-column width="100">
                <template slot-scope="scope" v-if="scope.row.name2 === 'data'">
                  <span class="iconfont key" @click="handleKey(scope.row)" ref="keyIcon" slot="reference">&#xe64f;<span ref="keyText">查看明文</span></span>
                </template>
              </el-table-column>
              <el-table-column width="70">
                <template slot-scope="scope" class="info" v-if="scope.row.name1 === 'info'">
                  <el-popover
                    ref="popover"
                    width="180"
                    placement="left"
                    offset="-15"
                    trigger="click"
                    popper-class="pop"
                    @show="handleIcon1"
                    @hide="handleIcon2"
                  >
                    <span class="iconfont more" v-if="iconShow" slot="reference">&#xe670;</span>
                    <span class="iconfont close" v-if="!iconShow" slot="reference">&#xe66f;</span>
                    <el-table
                      :data="gridData"
                      size="small"
                      :row-style="common.rowStyle"
                      @row-click="handleRow"
                    >
                      <el-table-column prop="content">
                        <template slot-scope="scope">
                          <span>{{ scope.row.content }}</span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Details',
  data() {
    return {
      num: 0,
      pageNum: 1,
      pageSize: 5,
      transaction_hash: '',
      block_hash: '',
      account_from: '',
      account_to: '',
      timestamp: '',
      min: '',
      nonce_int: '',
      input: '',
      input_decode: '',
      pagination: 1,
      tableDatas: [],
      tableData: [],
      decrypt_value: '',
      decrypt_value_temp: '',
      iconBorn: false,
      iconShow: true,
      numShow: false,
      unfoldClass: false,
      unfoldClass2: false,
      unfoldShow: false,
      unfoldShow2: false,
      gridData: [{
        content: '展开二级字段'
      }, {
        content: '查看明文'
      }]
    }
  },
  mounted() {
    this.getParams()
    this.node()
  },
  watch: {
    input: function() {
      this.$nextTick(() => {
        if(this.$refs.unfold.offsetHeight > 148) {
          this.unfoldClass = false
          this.unfoldShow = true
        } else {
          this.unfoldClass = true
          this.unfoldShow = false
        }
      })
    },
    input_decode: function() {
      this.$nextTick(() => {
        if(this.$refs.unfold2.offsetHeight > 148) {
          this.unfoldClass2 = false
          this.unfoldShow2 = true
        } else {
          this.unfoldClass2 = true
          this.unfoldShow2 = false
        }
      })
    }
  },
  methods: {
    handleIcon1() {
      this.iconShow = ! this.iconShow
      this.iconBorn = true
    },
    handleIcon2() {
      this.iconShow = ! this.iconShow
      this.iconBorn = false
    },
    handleRow(row, column, event) {
      if (row.content === '展开二级字段') {
        this.getEncryption()
        this.numShow = ! this.numShow
        this.iconShow = true
        row.content = '收起二级字段'
        this.gridData[1].content = '查看明文'
      } else if (row.content === '收起二级字段') {
        this.getParams()
        this.numShow = ! this.numShow
        this.iconShow = true
        row.content = '展开二级字段'
        this.gridData[1].content = '查看明文'
      }

      if (this.gridData[0].content === '收起二级字段') {
        var rowData = this.tableData.filter(function(item){
          return item.name2 === 'data'
        })
        if (row.content === '查看明文') {
          this.handleKey(rowData[0])
          this.$refs.popover.showPopper = false
          if (this.decrypt_value) {
            row.content = '隐藏明文'
          }
        } else if (row.content === '隐藏明文') {
          this.handleKey(rowData[0])
          this.$refs.popover.showPopper = false
          row.content = '查看明文'
        }
      } else if (this.gridData[0].content === '展开二级字段') {
        if (row.content === '查看明文') {
          this.getEncryptClosed()
        } else if (row.content === '隐藏明文') {
          this.getParams()
          row.content = '查看明文'
        }
      }
    },
    handleKey(row) {
      if (this.decrypt_value) {
        if (this.$refs.keyText.innerHTML === '查看明文') {
          this.decrypt_value_temp = row.record
          row.record = this.decrypt_value
          this.$refs.keyText.innerHTML = '隐藏明文'
          this.$refs.keyIcon.style.cssText = 'color: #8794AE !important'
          this.gridData[1].content = '隐藏明文'
        } else {
          row.record = this.decrypt_value_temp
          this.$refs.keyText.innerHTML = '查看明文'
          this.$refs.keyIcon.style.cssText = ''
          this.gridData[1].content = '查看明文'
        }
      } else {
        this.$Message.error('该字段为非加密字段')
      }
    },
    // 展开，叠起
    handleUnfold() {
      this.unfoldClass = !this.unfoldClass
      if(this.unfoldClass) {
        this.$refs.unfoldText.innerText = '收起数据'
        this.$refs.unfoldIcon.className = 'iconfont iconshouqi_icon'
      } else {
        this.$refs.unfoldText.innerText = '展开全部'
        this.$refs.unfoldIcon.className = 'iconfont iconxiala_icon'
      }
    },
    handleUnfold2() {
      this.unfoldClass2 = !this.unfoldClass2
      if(this.unfoldClass2) {
        this.$refs.unfoldText2.innerText = '收起数据'
        this.$refs.unfoldIcon2.className = 'iconfont iconshouqi_icon'
      } else {
        this.$refs.unfoldText2.innerText = '展开全部'
        this.$refs.unfoldIcon2.className = 'iconfont iconxiala_icon'
      }
    },

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
      var detail = this.$route.query.detailsdata
      // console.log(detail)
      // 交易详情
      this.http.transactioninfo({ transaction_hash: detail }).then(res => {
        // console.log(res)
        if (res.data.code == '0') {
          this.transaction_hash = res.data.data.transaction_hash
          this.block_hash = res.data.data.block_hash
          this.account_to = res.data.data.account_to
          this.account_from = res.data.data.account_from
          this.timestamp = this.time.timestampToTime(res.data.data.timestamp * 1000, 'DT2')
          this.min = this.time.timestampToTime(res.data.data.timestamp * 1000, 'DT1').substr(10, 16)
          this.nonce_int = res.data.data.nonce_int
          this.input = res.data.data.input
          // var obj = JSON.parse(this.input_decode);
          // var obj = .replace("\\","")
          // console.log(obj)
          this.input_decode = JSON.parse(res.data.data.input_decode)

          var data = []
          for (var key in this.input_decode) {
            // console.log(typeof(JSON.stringify(obj[key])))
            if (typeof (this.input_decode[key]) === 'object') {
              this.input_decode[key] = JSON.stringify(this.input_decode[key])
            }
            // console.log(JSON.stringify(obj[key]))
            var json = {
              name1: key,
              record: this.input_decode[key]
            }
            data.push(json)
          }
          this.tableData = data
          // console.log(obj)
        } else {
          this.http.messageFun('error', res.data.msg)
        }
      })
      // 上链
      this.http.checkevidenceupload({ transaction_hash: detail }).then(res => {
        // console.log(res)
      })
    },
    getEncryption() {
      // 获取二级字段名称，加解密数据
      var detail = this.$route.query.detailsdata

      this.http.transactioninfo({ transaction_hash: detail }).then(res => {
        if (res.data.code == '0') {
          this.decrypt_value = res.data.data.decrypt_value
          this.input_decode = JSON.parse(res.data.data.input_decode)

          var data = []
          for (var key in this.input_decode) {
            if (typeof (this.input_decode[key]) === 'object') {
              this.input_decode[key] = JSON.stringify(this.input_decode[key])
            }

            if (key === 'info') {
              var infoObj = JSON.parse(this.input_decode[key])

              for (var keys in infoObj) {
                if (keys === 'owner') {
                  var json = {
                    name1: 'info',
                    name2: keys,
                    record: infoObj[keys]
                  }
                } else if (keys === 'authorized_users') {
                  var json = {
                    name1: '',
                    name2: keys,
                    record: infoObj[keys]['user_list'].join(', ')
                  }
                } else {
                  var json = {
                    name1: '',
                    name2: keys,
                    record: infoObj[keys]
                  }
                }
                data.push(json)
              }
            } else {
              var json = {
                name1: key,
                name2: '-',
                record: this.input_decode[key]
              }
              data.push(json)
            }

          }
          this.tableData = data
        } else {
          this.http.messageFun('error', res.data.msg)
        }
      })
    },
    getEncryptClosed() {
      var detail = this.$route.query.detailsdata
      this.http.transactioninfo({ transaction_hash: detail }).then(res => {
        if (res.data.code == '0') {
          this.decrypt_value = res.data.data.decrypt_value

          if (this.decrypt_value) {
            this.input_decode = JSON.parse(res.data.data.input_decode)
            var data = []
            for (var key in this.input_decode) {

              if (typeof (this.input_decode[key]) === 'object') {
                this.input_decode[key] = JSON.stringify(this.input_decode[key])
              }

              if (key === 'info') {
                this.input_decode[key] = JSON.parse(this.input_decode[key])
                for (var keys in this.input_decode[key]) {
                  if (keys === 'data') {
                    this.input_decode[key][keys] = this.decrypt_value
                  }
                }
                this.input_decode[key] = JSON.stringify(this.input_decode[key])
              }

              var json = {
                name1: key,
                record: this.input_decode[key]
              }
              data.push(json)
            }
            this.tableData = data
            this.gridData[1].content = '隐藏明文'
          } else {
            this.$Message.error('该字段为非加密字段')
          }

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
          // console.log(list)
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
    }
  }
}
</script>

<style lang="less">
  #danhao{
    border: 0;
    margin-right:1rem;
  }
  .more, .close{
    cursor: pointer;
    font-size: 20px;
    color: #3B3783 !important;
    outline: none;
  }
  .key {
    cursor: pointer;
    color: #3B3783 !important;
    outline: none;
    span {
      padding-left: 5px;
      font-size: 12px;
      vertical-align: top;
    }
  }
  .pop {
    .el-table__header {
      display: none;
    }
    .el-table__row {
      height: 30px !important;
      color: #3B3783;
      font-weight: 500;
    }
    &:hover {
      cursor: pointer;
    }
    .el-table {
      td {
        border-bottom: 0;
      }
      &::before {
        height: 0;
      }
    }
  }
</style>
