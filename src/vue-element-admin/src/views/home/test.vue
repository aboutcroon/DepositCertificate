<!-- 测试用页面 -->
<style lang="less">
  @import './test.less';
</style>
<template>
  <div class="right_cont">
    <div class="center">
      <div class="center_top file-detail">
        <Tabs :animated="false" :tab-position="right">
          <Tab-pane label="开发指南">
            <el-row>
              <el-col :span="5" class="divider-right">
                <Input v-model="keyword">
                <Button slot="append" style="color: #fff" @click="topquery">搜索</Button>
                </Input>
                <el-table :data="tableData" :show-header="false" style="width: 98%;clear:both;margin:auto;margin-top:20px" empty-text="暂无数据，请重新查询">
                  <el-table-column prop="name" label="文档名称" />
                </el-table>
              </el-col>
              <el-col :span="19">
                <div class="file-preview">
                  <div class="file-pre-title">{{formItem.file_name}}</div>
                  <div class="file-pre-time">{{time}}</div>
                  <el-divider></el-divider>
                  <markdown-editor ref="markdownEditor" v-model="formItem.file_detail" :options="{hideModeSwitch:true,previewStyle:'tab'}" height="calc(100vh - 320px)" />
                </div>
              </el-col>
            </el-row>
          </Tab-pane>
          <!--      多用户导数据-->
          <Tab-pane label="接口">
            <el-row>
              <el-col :span="5" class="divider-right">
                <Input v-model="keyword">
                <Button slot="append" style="color: #fff" @click="topquery">搜索</Button>
                </Input>
                <el-table :data="tableData" :show-header="false" style="width: 98%;clear:both;margin:auto;margin-top:20px" empty-text="暂无数据，请重新查询">
                  <el-table-column prop="name" label="文档名称" />
                </el-table>
              </el-col>
              <el-col :span="19">
                <div class="file-preview">
                  <div class="file-pre-title">{{formItem.file_name}}</div>
                  <div class="file-pre-time">{{time}}</div>
                  <el-divider></el-divider>
                  <markdown-editor ref="markdownEditor" v-model="formItem.file_detail" :options="{hideModeSwitch:true,previewStyle:'tab'}" height="calc(100vh - 320px)" />
                </div>
              </el-col>
            </el-row>
          </Tab-pane>
          <Tab-pane label="系统创建合约">
            <el-row>
              <el-col :span="5" class="divider-right">
                <Input v-model="keyword">
                <Button slot="append" style="color: #fff" @click="topquery">搜索</Button>
                </Input>
                <el-table :data="tableData" :show-header="false" style="width: 98%;clear:both;margin:auto;margin-top:20px" empty-text="暂无数据，请重新查询">
                  <el-table-column prop="name" label="文档名称"/>
                </el-table>
              </el-col>
              <el-col :span="19">
                <div class="file-preview">
                  <div class="file-pre-title">{{formItem.file_name}}</div>
                  <div class="file-pre-time">{{time}}</div>
                  <el-divider></el-divider>
                  <markdown-editor ref="markdownEditor" v-model="formItem.file_detail" :options="{hideModeSwitch:true,previewStyle:'tab'}" height="calc(100vh - 320px)" />
                </div>
              </el-col>
            </el-row>
          </Tab-pane>
          <Tab-pane label="自建智能合约">
            <el-row>
              <el-col :span="5" class="divider-right">
                <Input v-model="keyword">
                <Button slot="append" style="color: #fff" @click="topquery">搜索</Button>
                </Input>
                <el-table :data="tableData" :show-header="false" style="width: 98%;clear:both;margin:auto;margin-top:20px" empty-text="暂无数据，请重新查询">
                  <el-table-column prop="name" label="文档名称" />
                </el-table>
              </el-col>
              <el-col :span="19">
                <div class="file-preview">
                  <div class="file-pre-title">{{formItem.file_name}}</div>
                  <div class="file-pre-time">{{time}}</div>
                  <el-divider></el-divider>
                  <markdown-editor ref="markdownEditor" v-model="formItem.file_detail" :options="{hideModeSwitch:true,previewStyle:'tab'}" height="calc(100vh - 320px)" />
                </div>
              </el-col>
            </el-row>
          </Tab-pane>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import MarkdownEditor from '@/components/MarkdownEditor'
  //  import Data from './leading/data'
  import Transfer from '../../api/transfer.js';
  const content = `
**开发指南**

`
  export default{
    name: 'contract_newfile',
    components: {
      MarkdownEditor
//      Data
    },
    data () {
      return {
        time:'',
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
        keyword:'',
        formItem: {
          "file_name": "",
          "intro": "",
          "file_type": "",
          "file_detail": content,
        },
        ruleValidate: {
          file_name: [
            { required: true, message: '用户姓名不能为空', trigger: 'blur' }
          ],
          file_detail: [
            { required: true, message: '说明不能为空', trigger: 'blur' },
          ],
        }
      }
    },
    mounted() {
//      var that = this
//      Transfer.$on('dataindex', function (data) {
//        console.log(data)
//        that.userdata = data
//      })
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePreview(file) {
        console.log(file)
      },
      handleFile(file) {
        const fileExt = file.name.split('.').pop().toLocaleLowerCase() === 'txt'
        if (fileExt) {
          let _this = this;
          var reader = new FileReader();
          reader.onload = function(evt){
            console.log(evt.target.result);
            _this.formItem.file_detail = evt.target.result
          };
          reader.readAsText(file.raw);
        }
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`)
      },
      beforeAvatarUpload(file, fileList) {
        console.log(file)
        this.file = file
        //        const fileExt = file.name.split('.').pop().toLocaleLowerCase() === 'xlsx' || file.name.split('.').pop().toLocaleLowerCase() === 'xls'
        //        if (!fileExt) {
        //          this.$message.error('上传文件不是EXCEL 格式!');
        //          this.fileList = []
        //        }
        return true
      },
      handleAvatarSuccess(response, res, file) {
        console.log(response)
        if (response.code == '0') {
          this.$Message.success(response.msg)
          this.$router.push({
            name: 'contract_main', // 跳转的页面
            params: {
            }
          })
        } else if (response.code == '2021') {
          this.http.messageFun('error', response.msg)
        } else {
          this.http.messageFun('error', response.msg)
        }
      },
      onchange(index) {
//        if (index.target.value.length > 24) {
//          this.$Message.warning('标签长度不能超过24个字符')
//        }
      },
      cancel() {
        this.$Message.info('点击了取消')
      },
      // 搜索文档
      search() {

      }
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
      float: right;
    }
  }
  /* 预览和文件显示样式 */
  .file-preview {
    border-left: solid 1px #888;
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
      padding: 25px 10px;
      font-size: 20px;
      font-weight: bold;
    }
    .file-pre-name {
      padding: 25px 10px;
    }
  }

</style>
