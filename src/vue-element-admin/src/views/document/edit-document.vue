<style lang="less">
  @import './document.less';
</style>
<template>
  <div class="boya-view">
    <div class="page-title" style="margin-top: 20px;margin-bottom: 35px;">文档新增</div>
    <div class="" v-show="type === '0'">
      <el-row>
        <el-col class="document-main" style="width: 400px;">
          <Form ref="formValidate" :model="formItem" :rules="ruleValidate" label-position="top">
            <Form-item label="类型">
              <Select v-model="formItem.file_type" disabled placeholder="请选择文档类型" style="width:60%">
                <Option v-for="item in typeList" :value="item.value">{{ item.label }}</Option>
              </Select>
            </Form-item>
            <Form-item label="文档名称" prop="file_name">
              <Input v-model="formItem.file_name" placeholder="请输入文档名称" @on-blur="onchange" style="width:60%"/>
            </Form-item>
            <Form-item label="绑定接口/合约">
              <Select v-model="formItem.api_or_contract_id" placeholder="请选择。。。" style="width:60%"  :disabled="contract_list.length === 0">
                <Option v-for="item in contract_list" :value="item.value">{{ item.label }}</Option>
              </Select>
            </Form-item>
            <Form-item label="说明">
              <Input v-model="formItem.intro" placeholder="请输入..." @on-blur="onchange" type="textarea" class="document-textarea"/>
            </Form-item>
            <Form-item label="文档文件">
              <el-upload
                ref="contract_newfile"
                class="upload-demo"
                action="/beaas/api/upload_excel/"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"
                :on-success="handleAvatarSuccess"
                :on-change="handleFile"
                multiple
                :data="formItem"
                :auto-upload="false"
                style="width: 100%"
              >
                <el-button style="text-align: center;width: 100%"><span class="icon iconfont iconexport" style="margin-right: 8px;"></span><span>点击上传</span></el-button>
              </el-upload>
              <span class="download-template">可以上传markdown格式的文本文件</span>

              <!--<span style="display: inline-block">可以上传markdown格式的文本文件</span>-->
            </Form-item>
          </Form>
        </el-col>
        <el-col style="width: calc(100% - 400px);padding-left: 30px;" class="document-main" >
          <Form ref="formValidate" :model="formItem" :rules="ruleValidate" label-position="top">
            <Form-item label="详情" prop="file_detail">
              <div class="editor-container" style="height: calc(100vh - 400px);min-height: 523px;">
                <markdown-editor ref="markdownEditor" v-model="formItem.file_detail" :options="{hideModeSwitch:true,previewStyle:'tab'}" height="100%" />
              </div>
            </Form-item>
          </Form>
        </el-col>
      </el-row>
    </div>
    <div class="" v-show="type === '1'">
      <div class="file-preview" style="margin-bottom: 20px;">
        <div class="detail-container">
          <p class="test-title" style="margin-top: 5px;">文档名称</p>
          <p style="margin-bottom: 12px"><span style="color: #BF495A" v-show="formItem.file_name === ''">未编辑文档名称</span><span>{{formItem.file_name}}</span></p>
          <p class="test-title">更新时间</p>
          <p><span>{{ times }}</span></p>
          <el-divider> </el-divider>
        </div>
        <markdown-editor ref="markdownEditor" v-model="formItem.file_detail" :options="{hideModeSwitch:true,previewStyle:'tab'}" height="calc(100vh - 490px)" style="min-height: 480px;" />
      </div>
    </div>
    <div class="main-btn-container" style="float: right;margin-top: 5px;margin-bottom: 40px;">
      <Button class="btn-search" @click="uploadFile">确定</Button>
      <Button class="btn-reset" style="margin-left: 5px" @click="cancel">取消</Button>
    </div>
    <div class="home-block-RT">
      <el-radio-group v-model="type" class="boya-switch-group" @change="preview">
        <el-radio-button label="0">文档编辑</el-radio-button>
        <el-radio-button label="1">预览</el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
  import MarkdownEditor from '@/components/MarkdownEditor'
  import Transfer from '../../api/transfer.js';
  export default{
    name: 'document_edit_document_nocache',
    components: {
      MarkdownEditor
    },
    data () {
      return {
        type: '0',
        times:'',
        disable: false,
        filename: '',
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
        // 接口/合约列表
        contract_list:[],
        file_type:"智能合约",
        formItem: {
          file_id: "",
          file_name: "",
          intro: "",
          file_type: "",
          api_or_contract_id: '',
          file_detail: '',
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
      this.getDocumentDetail()
      this.getTypeList()
    },
    methods: {
      // 文档上传相关函数
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePreview(file) {
        console.log(file)
      },
      handleFile(file) {
        const fileExt = ['txt','md'].includes(file.name.split('.').pop().toLocaleLowerCase())
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
      // 获取类型表
      getTypeList() {
        this.http.filetype().then(res => {
          if (res.data.code == '0') {
            let list = res.data.data.file_type;
            let tmpList = []
            for(let item of list){
              var json = {
                value: item,
                label: item
              }
              tmpList.push(json)
            }
            this.typeList = tmpList
          } else {
            this.$Message.error(res.data.msg)
          }
        })
      },

      // 获取智能合约列表
      getContractList() {
        let param = {
          'file_type': this.formItem.file_type
        }
        this.http.boundlist(param).then(res => {
          if (res.data.code == '0') {
            let list = res.data.data.file_list;
            if(list === undefined) {
              this.contract_list = []
              this.formItem.api_or_contract_id = ''
            } else {
              let tmpList = []
              for(let item of list){
                var json = {
                  value: item.id,
                  label: item.filename
                }
                tmpList.push(json)
              }
              this.contract_list = tmpList
            }
            if(this.filename.length > 0 && this.formItem.api_or_contract_id !== '') {
              //已获取文件详情
              this.contract_list.push({
                value: this.formItem.api_or_contract_id,
                label: this.filename
              })
            }
          } else {
            this.$Message.error(res.data.msg)
          }
        })
      },

      // 获取文件详情
      getDocumentDetail() {
        let id = this.$route.query.id
        this.formItem.file_id = id
        this.http.apifiles2(id).then(res => {
          console.log(res)
          if (res.data.code == '0') {
            let item = res.data.data.file_info
            this.formItem.file_name = item.file_name
            this.formItem.intro= item.intro
            this.formItem.file_type= item.file_type
            this.formItem.api_or_contract_id= item.api_or_contract_id
            this.formItem.file_detail= res.data.data.file_detail
            this.filename = item.filename
            this.getContractList()

            console.log(this.formItem)
          } else {
            this.$Message.error(res.data.msg)
          }
        })
      },
      uploadFile() {
        if(this.file_name === '') {
          this.$Message.info('文档名不能为空')
          return false
        }
        let param = this.formItem
        this.http.fileedit(param).then(res => {
          if(res.data.code === 0) {
            this.$Message.success('编辑成功!')
            this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
            this.$router.push(this.$store.state.tagsView.visitedViews[this.$store.state.tagsView.visitedViews.length-1].path)
          } else {
            this.$Message.error(res.data.msg)
          }

        })
      },
      onchange(index) {
//        if (index.target.value.length > 24) {
//          this.$Message.warning('标签长度不能超过24个字符')
//        }
      },
      cancel() {
        this.$Message.info('点击了取消')
        this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
        this.$router.push(this.$store.state.tagsView.visitedViews[this.$store.state.tagsView.visitedViews.length-1].path)
      },
      preview() {
        this.times = this.time.timestampToTime(new Date().getTime(), 'DT1')
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
    }
  }
</style>
