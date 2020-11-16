<template>
  <div style="height: 100%">
    <div class="drawer-main" style="max-height: calc(100% - 90px);overflow-y: auto">
      <Form label-position="top" :rules="ruleValidate">
        <Form-item label="附件">
          <el-upload
            ref="upload"
            class="upload-demo"
            action="/beaas/api/upload_excel/"
            :on-preview="handlePreview"
            :on-success="handleAvatarSuccess"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :before-upload="beforeAvatarUpload"
            multiple
            :data="param"
            :file-list="fileList"
            :auto-upload="false"
            style="width: 100%"
          >
            <el-button style="text-align: center;width: 100%"><span class="icon iconfont iconexport" style="margin-right: 8px;"></span><span>点击上传</span></el-button>
          </el-upload>
          <span class="download-template" style="display: inline-block; position: absolute;right: 0;top: -40px"><a href="/czptweb/批量用户数据存证模板.xlsx" style="color:#8794AE">下载模板</a></span>
          <span style="margin-left:1rem" @click="$emit('showUserList', '')">查看有权限用户</span>
        </Form-item>
        <Form-item label="数据共享用户">
          <Input v-model="selectedUsers3" placeholder="请输入..." @on-blur="onchange"/>
        </Form-item>
        <Form-item label="是否加密" prop="is_need_encrypt">
          <div class="check">
            <el-radio v-model="param.is_need_encrypt" label="1">加密</el-radio>
            <el-radio v-model="param.is_need_encrypt" label="0">不加密</el-radio>
          </div>
        </Form-item>
      </Form>

    </div>
    <div class="drawer-bottom-btn" style="width: 100%">
      <div class="drawer-btn-container user-btn" style="width: 102px;">
        <Button class="btn-search" @click="showModal">存证</Button>
      </div>
    </div>
    <!--<el-dialog :visible.sync="dodele" style="z-index: 2003" width="520px"-->
               <!--title="博雅正链">-->
      <!--<p>确定是否存证</p>-->
      <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button @click="cancel">取 消</el-button>-->
        <!--<el-button type="primary" @click="upload" :loading="loading">-->
          <!--<span v-if="!loading">确 定</span>-->
          <!--<span v-else>存证中</span>-->
        <!--</el-button>-->
      <!--</span>-->
    <!--</el-dialog>-->
  </div>

</template>

<script>
import excel from '@/api/excel'
import { fetchArticle } from '../../../api/article'
export default {
  inject: ['reload'],
  name: 'Data',
  props: {
    submit: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      fileList: [],
      modal1: false,
      tableData: [],
      selectedUsers2: [],
      // 多选栏设置
      props: { multiple: true },
      // 多选栏数据
      options: [],
      paramsData: {
        file_type: 'muti_user',
        method: 'upload_evidence',
        owner: '',
        tag_list: '',
        user_list: '',
      },
      param: {
        file_type: 'muti_user',
        method: 'upload_evidence',
        owner: '',
        tag_list: '',
        is_need_encrypt: ''
      },
      selectedUsers3: '',
      ruleValidate: {
        is_need_encrypt: [
          { required: true, message: '请勾选是否加解密', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    submit(submit) {
      if(submit) {
        this.upload()
      }
    }
  },
  mounted() {
    this.getUserList()
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 存证数据
    beforeAvatarUpload(file, fileList) {
      const fileExt = file.name.split('.').pop().toLocaleLowerCase() === 'xlsx' || file.name.split('.').pop().toLocaleLowerCase() === 'xls'
      if (!fileExt) {
        this.$message.error('上传文件不是EXCEL 格式!')
      }
      console.log(this.selectedUsers2)
      let list1 = []
      if(this.selectedUsers3.length > 0) {
        list1 = this.selectedUsers3.split(',')
        this.param.user_list = list1
      } else {
        list1 = ''
      }
      this.paramsData.user_list = list1
      return fileExt
    },
    // 获取用户列表
    getUserList() {
      this.http.alluser().then(res => {
        console.log(res)
        if (res.data.code == '0') {
          var data = res.data.data.all_user
          var firstJson = {
            value: '计算机一级用户',
            label: '计算机一级用户',
            children: []
          }
          var firstData = data['计算机一级用户']
          for (var item of firstData) {
            var tmpJson = {
              value: item.username,
              label: item.username
            }
            firstJson.children.push(tmpJson)
          }
          var secondJson = {
            value: '计算机二级用户',
            label: '计算机二级用户',
            children: []
          }
          var secondData = data['计算机二级用户']
          for (var item of secondData) {
            tmpJson = {
              value: item.username,
              label: item.username
            }
            secondJson.children.push(tmpJson)
          }
          var thirdJson = {
            value: '计算机三级用户',
            label: '计算机三级用户',
            children: []
          }
          var thirdData = data['计算机三级用户']
          for (var item of thirdData) {
            var tmpJson = {
              value: item.username,
              label: item.username
            }
            thirdJson.children.push(tmpJson)
          }
          this.options.push(firstJson)
          this.options.push(secondJson)
          this.options.push(thirdJson)
        } else {
          this.http.messageFun('error', res.data.msg)
        }
      })
    },
    showModal() {
      if (this.param.is_need_encrypt === '') {
        this.$Message.warning('请勾选是否加解密')
      } else {
        console.log(this.param.is_need_encrypt)
        this.$emit('beforeSubmit', 2)
      }
    },
    // 存证响应
    handleAvatarSuccess(response, res, file) {
      this.$emit('afterSubmit', 0)
        console.log(response)
      if (response.code == '0') {
        this.$Message.success('存证成功!')
        this.reload()
      } else if (response.code == '2021') {
        this.http.messageFun('error', response.msg)
      } else if (response.code == '4000') {
        this.http.messageFun('error', response.msg)
      } else if (response.code == '2012') {
        this.http.messageFun('error', response.msg)
      }
      this.loading = false
    },
    upload() {
      this.$refs.upload.submit()
    }
  }
}
</script>

<style lang="css">

</style>
