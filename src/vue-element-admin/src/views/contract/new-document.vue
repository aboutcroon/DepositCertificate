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
              <Select v-model="formItem.file_type" placeholder="请选择文档类型" @on-change="onTypeChange" style="width:60%">
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
  const content = `### 文档模板
您可以按照此模板编辑您的智能合约文档
### 基础信息
**访问节点**：业务系统计算节点

**请求URL**：/API/upload

**请求方式**：POST
### 请求参数

| 参数 | 类型 | 是否必填 | 最大长度 | 说明 | 示例 |
| --- | --- | --- | --- | --- | --- |
| timestamp | String | 是 | 19 | 发送请求的时间，格式"yyyy-MM-dd HH:mm:ss" | 2014-07-24 03:07:50 |
|  |  |  |  |  |  |
### 请求示例
>curl -X POST 'hostname:port/api/contract/compile' --form
'contract=@test.sol' --form

\`\`\`
    <card_balance>98.23</card_balance>
    <store_name>证大五道口店</store_name>
    <buyer_user_id>2088101117955611</buyer_user_id>
\`\`\`
### 返回参数

| 参数 | 类型 | 是否必填 | 最大长度 | 说明 | 示例 |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |
|  |  |  |  |  |  |
`
  export default{
    name: 'contract_new_document_nocache',
    components: {
      MarkdownEditor
    },
    data () {
      return {
        type: '0',
        times:'',
        disable: false,
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
          file_name: "",
          intro: "",
          file_type: "",
          api_or_contract_id: '',
          file_detail: content,
        },
        ruleValidate: {
          file_name: [
            { required: true, message: '文档名称不能为空', trigger: 'blur' }
          ],
          file_detail: [
            { required: true, message: '说明不能为空', trigger: 'blur' },
          ],
        }
      }
    },
    mounted() {
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
            name: 'contract_main',
            params: {}
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
            if(tmpList.length > 0) {
              this.formItem.file_type = tmpList[0].value
              this.getContractList()
            }
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
            this.disable = false
            let list = res.data.data.file_list;
            let tmpList = []
            for(let item of list){
              var json = {
                value: item.id,
                label: item.filename
              }
              tmpList.push(json)
            }
            this.contract_list = tmpList
            if(tmpList.length > 0) {
              this.formItem.api_or_contract_id = tmpList[0].value
            }
          } else {
            this.disable = true
            this.$Message.error(res.data.msg)
          }
        })
      },
      uploadFile() {
        if(this.disable) {
          this.$Message.info('暂时不能上传文档，请先创建合约')
          return false
        }
        if(this.file_name === '') {
          this.$Message.info('文档名不能为空')
          return false
        }
        let param = this.formItem
        this.http.postapifiles(param).then(res => {
          if (res.data.code == '0') {
            this.$Message.success('文档上传成功!')
            // this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
            // this.$router.push(this.$store.state.tagsView.visitedViews[this.$store.state.tagsView.visitedViews.length-1].path)
            this.$router.push('user-document')
          } else {
            this.$Message.error(res.data.msg)
          }
        })
      },
      // 刷新绑定列表
      onTypeChange(value) {
        this.getContractList()
      },
      onchange(index) {

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


</style>
