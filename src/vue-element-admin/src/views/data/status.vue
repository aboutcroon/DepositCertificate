<template>
  <div class="right_cont">
    <div class="boya-view">
      <el-row style="width: 100%;padding-top: 20px">
        <el-col :span="24">
          <el-col class="main-filter-container">
            <span class="icon iconfont iconfilter filter-button "
                  @click="showFilter = !showFilter"><span>筛选</span></span>
          </el-col>
          <el-col class="main-input-container">
            <el-col class="normal-input">
              <span class="icon iconfont iconIcon-search "></span>
              <Input v-model="formData.transaction_hash" clearable placeholder="请输入交易哈希" class="search-input"
                     @keyup.enter.native="selectGet(1)"/>
            </el-col>
            <el-col class="normal-input">
              <span class="icon iconfont iconIcon-search "></span>
              <Input v-model="formData.block_number_int" clearable placeholder="请输入区块号" class="search-input"
                     @keyup.enter.native="selectGet(1)"/>
            </el-col>
            <el-col class="normal-input">
              <span class="icon iconfont iconIcon-search "></span>
              <Input v-model="formData.node_name" clearable placeholder="请输入计算节点" class="search-input"
                     @keyup.enter.native="selectGet(1)"/>
            </el-col>
            <el-col class="normal-input">
              <span class="icon iconfont iconIcon-search "></span>
              <Input v-model="formData.owner" clearable placeholder="请输入用户名称" class="search-input"
                     @keyup.enter.native="selectGet(1)"/>
            </el-col>
            <el-col class="normal-input">
              <Tooltip content="多个标签以英文的 , 隔开(精准搜索)" placement="top-start" style="width:100%">
                <span class="icon iconfont iconIcon-search "></span>
                <Input v-model="searchValue4" clearable placeholder="请输入标签" class="search-input"
                       @keyup.enter.native="selectGet(1)"/>
              </Tooltip>
            </el-col>
            <el-col class="normal-input time-input">
              <span class="icon iconfont icondata1"></span>
              <Date-picker v-model="times" type="daterange" placement="bottom-end" placeholder="选择调用时间"
                           style="width:100%" @on-change="timechange" @keyup.enter.native="selectGet(1)"/>
            </el-col>
          </el-col>
          <el-col class="main-btn-container">
            <Button class="btn-search" @click="selectGet(1)">查询</Button>
            <Button class="btn-reset" style="margin-left: 5px" @click="handleReset('formValidate')">重置</Button>
          </el-col>
        </el-col>
      </el-row>
      <collapse-transition :collapseData="collapseData" :showFilter="showFilter" :formData="formData"
                           @collapseFun="collapseFun" style="width:100%;padding-top: 20px"/>
      <el-table
        class="boya-table"
        :data="tableData"
        style="width: 100%;clear:both;margin-bottom: 137px;"
        :row-style="common.rowStyle"
        :cell-style="cellStyle"
        empty-text="暂无数据，请重新查询">
        <el-table-column prop="num" width="70" label="序号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="tx" label="交易哈希" show-overflow-tooltip>
          <template slot-scope="scope">
            <span @click="change(scope.$index, scope.row)">{{ scope.row.tx }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="block" label="区块号" show-overflow-tooltip>
          <template slot-scope="scope">
            <span @click="jump(scope.$index, scope.row)">{{ scope.row.block }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="node" label="计算节点" show-overflow-tooltip></el-table-column>
        <el-table-column prop="name" label="用户名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="tag" label="标签" show-overflow-tooltip></el-table-column>
        <el-table-column prop="numberlength" label="存证数据" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="fileName" label="文件名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="record" label="存证状态" width="80" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <!--<span style="color:#8a8a8a" v-show="scope.row.unblock" class="icon iconfont iconupload"></span>-->
            <span @click="upload(scope.$index, scope.row)" style="color:#8794ae" v-show="scope.row.onblock"
                  class="icon iconfont iconupload"></span>
            <span v-show="scope.row.onblock" style="margin:0 4px">|</span>
            <!--<span style="color:#8a8a8a" v-show="scope.row.unblock" class="icon iconfont icondelete"></span>-->
            <span @click="doDelete(scope.$index, scope.row)" style="color:#BF495A" v-show="scope.row.onblock"
                  class="icon iconfont icondelete"></span>
          </template>
        </el-table-column>
      </el-table>
      <div class="runoutData" v-if="checkData" style="top: 40%">
        <img src="../../assets/img/runoutData@2x.png" class="runoutPhoto">
        <div class="runoutText"><span>暂无数据</span></div>
      </div>
      <div class="float-btn">
        <div class="create" @click="drawer = true"><span class="icon iconfont iconcreate "></span></div>
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
    <el-drawer
      :visible.sync="drawer"
      custom-class="boya-drawer"
      direction="rtl"
      :with-header="false"
      size="28%"
      style="min-width: 392px"
      :before-close="handleClose"
    >
      <div class="drawer-title">
        <span class="icon iconfont iconadd1"></span>
        <span>新增存证</span>
        <!-- 文件存证暂不开启 -->
        <!--<el-radio-group v-model="file_data" style="float: right">-->
        <!--<el-radio-button label="数据存证" ></el-radio-button>-->
        <!--<el-radio-button label="文件存证"></el-radio-button>-->
        <!--</el-radio-group>-->
      </div>
      <Tabs :animated="false" class="drawer-tabs">
        <Tab-pane label="单用户数据存证">
          <SingleUser @beforeSubmit="beforeSubmit" @afterSubmit="afterSubmit" :submit="submit1"></SingleUser>
        </Tab-pane>
        <!--      多用户导数据-->
        <Tab-pane label="批量用户数据存证">
          <Data @showUserList="showUserList" @beforeSubmit="beforeSubmit" @afterSubmit="afterSubmit"
                :submit="submit2"></Data>
        </Tab-pane>
      </Tabs>
    </el-drawer>

    <el-dialog :visible.sync="modal2" style="z-index: 2003" width="520px">
      <p slot="header" style="">查看有权限用户</p>
      <div style="word-wrap:break-word; word-break:break-all;">
        <span v-for="item in userdata" :key="item.value"
              style="font-size: 14px;margin-bottom:5px">{{item.label}},</span>
      </div>
      <div slot="footer">
        <i-button size="large" @click="del">取消</i-button>
      </div>
    </el-dialog>
    <boya-dialog
      :modal="modal3"
      :image="1"
      :loading="loading"
      :textUp="textUp"
      :textDown="textDown"
      @cancelfun="cancelSubmit"
      @confirmfun="confirm">

    </boya-dialog>
  </div>
</template>
<script>
  import SingleUser from './single-user/single-user'
  import Data from './leading/data'
  import Transfer from '../../api/transfer.js';
  import collapseTransition from '@/components/collapse'// 筛选
  import BoyaDialog from '@/components/ButtonDialog/Dialog/dialog'
  export default {
    inject: ['reload'],
    name: 'data_status',
    components: {
      collapseTransition,
      SingleUser,
      Data,
      BoyaDialog
    },
    data() {
      return {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        // 表格
        self: this,
        tableData: [],
        unblock: false,
        onblock: false,
        checkData: false,

        formData: {
          tag_list: '',
          owner: '',
          file_name: "",
          node_name: '',
          block_number_int: '',
          transaction_hash: '',
          task_state: '',
          pagination: 1,
          limit: 10
        },
        // 筛选
        showFilter: false,
        collapseData: [],
        cellStyle: this.common.cellStyle('record', {
          '待存证': 1,
          '成功': 0,
          '已重传': 0,
          '失败': 2,
          '已删除': 2,
        }, 8),

        // 标签
        searchValue4: '',
        file_data: '',

        /** 存证相关数据 **/
        tableData: [{
          name: '',
          tag_1: '',
          tag_2: '',
          tag_3: '',
          tag_4: '',
          tag_5: '',
          record: ''
        }],
        username: '',
        userdata: [],
        tag_1: '',
        tag_2: '',
        tag_3: '',
        tag_4: '',
        tag_5: '',
        record: '',
        modal2: false,

        // 存证确认弹窗
        submit1: false,
        submit2: false,
        modal3: false,
        loading: false,
        textUp: '您确定要存证吗？',
        textDown: '如果需要修改，请取消。',
        dataType: 1,

        drawer: false,
        //调用时间
        times: [],
        s_time: '',
        e_time: ''
      }
    },
    created() {
      this.selectGet()
      this.existing()
      let that = this
      Transfer.$on('dataindex', function (data) {
        console.log(data)
        that.userdata = data
      })
    },
    methods: {
      handleReset (name) {
        this.formData = {
          tag_list: '',
          file_name: "",
          owner: '',
          node_name: '',
          block_number_int: '',
          transaction_hash: '',
          task_state: '',
          pagination: 1,
          limit: 10
        },
          this.searchValue4 = ''
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
      handleEdit(index, row) {
        // console.log(index, row);
      },
      onchang(pageNum){
        this.formData.pagination = pageNum
        this.selectGet()
      },
      onpage(pageSize){
        this.formData.limit = pageSize
        this.selectGet()
      },
      //  查询
      selectGet() {
        // console.log(typeof (this.value1))
        let tag = []
        if (this.searchValue4.length > 0) tag = this.searchValue4.toString().split(',')
        this.formData.tag_list = tag
        var param = this.formData
        // console.log(param)
        this.http.taskfilter(param).then(res => {
          console.log(res)
          if (res.data.code == '0') {
            var list = res.data.data.data_list;
            this.checkData = list === undefined || !list.length

            var newdata = [];
            var num = (this.pageNum - 1) * 10;
            var nums = 1;
            this.total = res.data.data.count
            for (var i of list) {
              if (i != null) {
                i.timestamp = Number(i.timestamp)
                i.timestamp = this.time.timestampToTime(i.timestamp, 'DT2')
                let tag = ''

                tag = i.tag_list.toString()

                let onblock = false
                if (i.task_state == '失败') {
                  onblock = true
                }
                var json = {
                  num: num + nums,
                  name: i.owner,
                  number: i.source_data,
                  numberlength: i.source_data,
                  tag: tag,
                  fileName: i.filename,
                  record: i.task_state,
                  tx: i.transaction_hash,
                  node: i.node_name,
                  block: i.block_number_int,
                  onblock: onblock,
                  unblock: !onblock,
                  id: i.task_id
                }
                nums++;
                newdata.push(json);
              }
            }
            this.tableData = newdata;
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      },
      // 交易
      change(index, row) {
        console.log(row)
        this.$router.push({
          name: 'details', // 跳转的页面
          query: {
            'detailsdata': row.tx // 我们要传递的参数
          }
        })
      },
      // 区块
      jump(index, row) {
        // console.log(row.num)
        this.$router.push({
          name: 'block', // 跳转的页面
          query: {
            'blockdata': row.block // 我们要传递的参数
          }
        })
      },
      // 下拉框
      existing() {
        this.http.evidencestates().then(res => {
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
              list: typedata,
              name: "存证状态",
              key: 'task_state'
            })
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      },
      //  重传
      upload(index, row) {
        // console.log(row)
        var param = {
          method: 'upload_evidence',
          owner: row.name,
          data_list: [row.number],
          tag_list: row.tag
        }
        // console.log(param)
        this.http.upload(param).then(res => {
          // console.log(res)
          this.reload()
        });
        this.http.changetaskstate({task_id: row.id, change_state: '3'}).then(res => {
          console.log(res)
        })
      },
      doDelete(index, row){
        this.http.changetaskstate({task_id: row.id, change_state: '4'}).then(res => {
          console.log(res)
          this.reload()
        })
      },
      doCreate(){
        this.$router.push({
          name: 'data_data', // 跳转的页面
          params: {}
        })
      },
      /** 筛选调用的方法 **/
      collapseFun(type, value) {
        this.formData[type] = value
        this.formData.pagination = 1
        this.selectGet()
      },
      /** 存证相关函数 **/
      // 抽屉关闭
      handleClose(done) {
        this.drawer = false
      },
      handleSubmit (name) {

        var tag = []
        tag.push(this.tag_1, this.tag_2, this.tag_3, this.tag_4, this.tag_5)
        console.log(tag)
        var params = {
          method: 'upload_evidence',
          owner: this.username,
          tag_list: tag,
          data_list: this.record
        }
        this.http.upload(params).then(res => {
          console.log(res)
          if (res.data.code == '0') {
            this.$Message.success('存证成功!');
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
        this.username = ''
        this.tag_1 = ''
        this.tag_2 = ''
        this.tag_3 = ''
        this.tag_4 = ''
        this.tag_5 = ''
        this.record = ''
      },
      del() {
        // this.$Message.info('点击了取消');
        this.modal2 = false
      },
      showUserList() {
        this.modal2 = true
      },
      // 存证确认弹窗逻辑重写
      beforeSubmit(type) {
        this.drawer = false
        this.modal3 = true
        this.dataType = type
      },
      cancelSubmit() {
        this.drawer = true
        this.modal3 = false
      },
      confirm() {
        this.textUp = '数据正在上链...'
        this.textDown = '请稍后查询。'
        this.loading = true
        if (this.dataType === 1) {
          this.submit1 = true
        } else {
          this.submit2 = true
        }
      },
      afterSubmit() {
        this.loading = false
        this.modal3 = false
        this.textUp = '您确定要存证吗？'
        this.textDown = '如果需要修改，请取消。'
        this.submit1 = false
        this.submit2 = false
      },
    }
  }
</script>

<style lang="less">
  .right_cont {
    padding: 0;
    .top {
      background: #fff;
      line-height: 3rem;
      padding-left: 2rem;
      height: 3rem;
      font-size: 14px;
    }
    .center {
      margin: 10px;
      background: #fff;
      // padding-top: 2rem;
    }
    .sensus_font {
      display: inline-block;
      margin-top: 7px;
      text-align: right;
    }
    .top_center {
      width: 31%;
      margin: 0 auto;
      p {
        margin-bottom: 1rem;
      }
    }
  }

  body .el-table th.gutter {
    display: table-cell !important;
  }

  .el-table tr {
    cursor: pointer
  }
</style>
