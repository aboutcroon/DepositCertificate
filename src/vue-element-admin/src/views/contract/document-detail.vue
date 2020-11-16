<!-- 测试用页面 -->
<template>
  <div class="right_cont">
    <div class="center">
      <div class="center_top file-detail">
        <el-row>
          <el-col :span="15">
            <el-tabs @tab-click="onchange" v-model="tabName" style="max-width: 500px;">
              <el-tab-pane label="开发指南" name="0">
              </el-tab-pane>
              <el-tab-pane label="接口管理" name="1">
              </el-tab-pane>
              <el-tab-pane label="系统创建合约" name="2">
              </el-tab-pane>
              <el-tab-pane label="自建智能合约" name="3">
              </el-tab-pane>
            </el-tabs>
            <div class="file-preview">
              <div class="file-pre-title">{{docInfo.file_name}}</div>
              <div class="file-pre-time"><span>更新时间：</span><span>{{docInfo.u_time}}</span></div>
              <markdown-editor
                class="el-scrollbar"
                ref="markdownEditor"
                v-model="docInfo.file_detail"
                :options="{hideModeSwitch:true,previewStyle:'tab'}"
                height="calc(100vh - 380px)" />
            </div>
          </el-col>
          <el-col :span="9" class="divider-right">
            <div class="home-main-input" style="width: 100%">
              <Input v-model="keyword" >
                <Button slot="append" style="color: #fff" @click="getFileList">搜索</Button>
              </Input>
            </div>

            <el-table
              :data="tableData"
              :show-header="false"
              style="width: 98%;clear:both;margin:auto;margin-top:20px"
              stripe
              empty-text="暂无数据，请重新查询"
              @row-click="getDocDetail">
              <el-table-column prop="name" label="文档名称" />
            </el-table>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import MarkdownEditor from '@/components/MarkdownEditor'
  import Transfer from '../../api/transfer.js';
  export default{
    name: 'contract_document_detail_nocache',
    components: {
      MarkdownEditor
    },
    data () {
      return {
        typeList:[{
          value:'开发指南',
          label:'开发指南',
        }, {
          value:'接口',
          label:'接口',
        }, {
          value:'智能合约',
          label:'智能合约',
        }],
        //文件列表
        keyword:'',
        file_type: '开发指南',
        create_type: '系统创建',
        showFile: true,
        tableData: [],

        tabName: 0,

        docInfo: {
          file_name: '文件名称',
          u_time: '00：00',
          file_detail: '暂无此文件',
        },
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      // 初始化
      init() {
        const id = this.$route.query.id
        if(id === undefined) {
          this.getFileList()
        } else {
          this.getDoc(id)
        }
      },
      // 获取文件列表
      getFileList() {
        const param = {
          'file_name': this.keyword,
          'file_type': this.file_type,
          'create_type': this.create_type,
          'pagination': 1,
          'limit': 10,
        }
        console.log(param)
        this.http.apifiles(param).then(res => {
          if (res.status == '200') {
            console.log(res)
            var list = res.data.data.api_file_list
            var newdata = []
            this.total = res.data.data.api_file_count
            for (var i of list) {
              var file_name = ''
              if (i != null) {
                if (i.file_name.length > 20) {
                  file_name = i.file_name.substring(0, 20) + '...'
                } else {
                  file_name = i.file_name
                }
                var json = {
                  file_type:i.file_type,
                  name: file_name,
                  is_delete: i.is_delete,
                  id: i.id
                }
                newdata.push(json)
              }
            }
            if(this.showFile && newdata.length > 0) {
              this.getDocDetail(newdata[0],'','')
            }
            this.tableData = newdata
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      },
      // 加载指定文档
      getDoc(id) {
        this.http.apifiles2(id).then(res => {
          console.log(res)
          if (res.data.code == '0') {
            let item = res.data.data.file_info
            this.docInfo.file_name = item.file_name
            this.docInfo.u_time = this.time.timestampToTime(item.u_time * 1000, 'DT1')
            this.docInfo.file_detail= res.data.data.file_detail
            // 定位类型
            const typeMap = {
              "开发指南": '0',
              "接口": '1',
              "智能合约": '2',
            }
            if(item.create_type ===  "用户自建") {
              this.tabName = '3'
              this.onchange(this.tabName)
            } else {
              this.tabName = typeMap[item.file_type]
              this.onchange(this.tabName)
            }
          } else {
            this.$Message.error(res.data.msg)
          }
        })
      },
      // 点击文件列表，获取文档内容
      getDocDetail(row, column, event) {
        let id = row.id
        this.http.apifiles2(id).then(res => {
          console.log(res)
          if (res.data.code == '0') {
            let item = res.data.data.file_info
            this.docInfo.file_name = item.file_name
            this.docInfo.u_time = this.time.timestampToTime(item.u_time * 1000, 'DT1'),
            this.docInfo.file_detail= res.data.data.file_detail
          } else {
            this.$Message.error(res.data.msg)
          }
        })
      },
      //标签页被点击
      onchange(event) {
        let name = event.name
        const typeMap = {
          '0': "开发指南",
          '1': "接口",
          '2': "智能合约",
          '3': "智能合约",
        }
        const createMap = {
          '0': "系统创建",
          '1': "系统创建",
          '2': "系统创建",
          '3': "用户自建",
        }
        this.showFile = false
        this.file_type = typeMap[name]
        this.create_type = createMap[name]
        this.getFileList()
      },
      cancel() {
        this.$Message.info('点击了取消')
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
      min-height:31rem;
    }

    .center_top {
      padding: 1rem 1rem;
    }
  }

  .file-detail {
    .el-table__empty-text {
      width: 100%;
    }
    .ivu-tabs-nav {
    }

    .el-tabs__nav {
      transform: scaleX(0.8) !important;

      .el-tabs__item {
        transform: scaleX(1.25);
        padding: 0 40px 0 20px;
        color: #8794AE;
      }
      .is-active{
        color: #555466;
      }
      .el-tabs__active-bar {
        background-color: #555466;
      }
    }
  }
  /* 预览和文件显示样式 */
  .file-preview {
    .tui-editor-defaultUI {
      border: 1px solid #fff;
    }
    .CodeMirror {
      display: none!important;
    }
    .te-toolbar-section {
      display: none;
    }
    .te-md-splitter {
      border-color: #fff;
    }
    .file-pre-title {
      padding: 10px 25px;
      font-size: 20px;
      font-weight: bold;
    }
    .file-pre-name {
      padding: 10px 25px;
    }
    .file-pre-time {
      padding: 2px 25px;
      color: #8794AE;
    }

    .te-preview{
      overflow-x: hidden;
      &::-webkit-scrollbar {
        width: 4px;
        /*height: 4px;*/
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px #3B3783;
        background: #3B3783;
      }
      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px #F2F2F2;
        border-radius: 0;
        background: #F2F2F2;
      }
    }

  }



  .divider-right{
    height: 100%;
    background: #fff;
    padding: 2rem;

    .titles{
      position: relative;
      background: #fff;
      font-size: 16px;
      color: #333;
      padding: 1rem 1rem;
      margin-bottom: 0.2rem;
      p{
        position: absolute;
        right: 1rem;
        color:#1890ff;
        font-size:14px;
        top:1.1rem
      }
    }
    .ivu-input-group{
      height: 40px;
      line-height: 40px;
      margin:0 auto;
    }
    .ivu-input-group-prepend{
      border:0;
      border-left:1.5px solid rgba(16, 142, 233, 1);
      border-top: 1.5px solid rgba(16, 142, 233, 1);
      border-bottom: 1.5px solid rgba(16, 142, 233, 1);
      background: #fff;
      .ivu-select{
        color: #ccc;
      }
    }
    .ivu-input-group-append{
      border:0!important;
      border-right:1.5px solid rgba(16, 142, 233, 1)!important;
      border-top: 1.5px solid rgba(16, 142, 233, 1)!important;
      border-bottom: 1.5px solid rgba(16, 142, 233, 1)!important;
      background: rgba(16, 142, 233, 1)!important;
    }
    .ivu-input{
      border:0;
      height: 40px;
      line-height: 40px;
      border-top:1.5px solid rgba(16, 142, 233, 1);
      border-bottom:1.5px solid rgba(16, 142, 233, 1) ;
      border-left: 1.5px solid #108ee9;
    }
    button{
      font-size: 14px;
      color:#fff;
    }
  }
</style>
