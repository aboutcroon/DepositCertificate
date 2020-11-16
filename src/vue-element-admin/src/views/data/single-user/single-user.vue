<template>
  <div style="height: 100%">
    <div class="drawer-main" style="max-height: calc(100% - 90px);overflow-y: auto">
      <Form :model="formItem" label-position="top" :rules="ruleValidate">
        <Form-item label="用户姓名" prop="itemname">
          <Select v-model="formItem.itemname" placeholder="请选择用户">
            <Option v-for="item in username" :value="item.label">{{ item.label }}</Option>
          </Select>
        </Form-item>
        <Form-item label="标签" prop="value4">
          <Input v-model="formItem.value4" placeholder="请输入..." />
        </Form-item>
        <Form-item label="数据共享用户" prop="value5">
          <Input v-model="formItem.selectedUsers3" placeholder="请输入..." @on-blur="onchange"/>
        </Form-item>
        <Form-item label="是否加密" prop="is_need_encrypt">
          <div class="check">
            <el-radio v-model="formItem.is_need_encrypt" label="1">加密</el-radio>
            <el-radio v-model="formItem.is_need_encrypt" label="0">不加密</el-radio>
          </div>
        </Form-item>
        <Form-item label="存证方式" prop="value1">
          <div v-model="formItem.vertical" class="drawer-radio-group" style="display: flex">
            <el-radio v-model="formItem.vertical" label="people" border>单条数据</el-radio>
            <el-radio v-model="formItem.vertical" label="peoples" border>批量导入</el-radio>
          </div>
        </Form-item>
        <Form-item v-show="formItem.vertical == 'people'" label="数据存证" prop="value1">
          <Form ref="formDynamic" :model="formDynamic">
            <Form-item
              v-for="(item, index) in formDynamic.items"
              :key="index"
              :prop="'items.' + index + '.value'"
              :rules="{required: true, message: '数据存证' + (index + 1) +'不能为空', trigger: 'blur'}"
              style="margin-bottom:1rem"
            >
              <el-row style="line-height: 42px;">
                <el-col :span="3">
                  <Input type="text" :placeholder="(index + 1) + ''" disabled/>
                </el-col>
                <el-col :span="3" style="text-align: center">
                  - -
                </el-col>
                <el-col :span="16">
                  <Input v-model="item.value" type="text" placeholder="请输入..." />
                </el-col>
                <el-col :span="1" :offset="1">
                  <span class="icon iconfont iconDisable1" @click="handleRemoves(index)" style="cursor: pointer"> </span>
                </el-col>
              </el-row>
            </Form-item>
            <Form-item>
              <el-row>
                <el-col :span="24">
                  <Button class="drawer-add-btn" long @click="handleAdd">添加</Button>
                </el-col>
              </el-row>
            </Form-item>
          </Form>
        </Form-item>
        <!--<Form-item v-show="formItem.vertical == 'peoples'" label="附件" prop="value1">-->
          <!--<el-upload-->
            <!--class="upload-demo"-->
            <!--action="/beaas/api/upload_excel/"-->
            <!--:on-remove="handleRemove"-->
            <!--:before-upload="beforeAvatarUpload"-->
            <!--:on-success="handleAvatarSuccess"-->
            <!--multiple-->
            <!--:data="paramsData"-->
            <!--:file-list="fileList"-->
            <!--style="width:25%;float: left"-->
          <!--&gt;-->
            <!--<el-button size="small" style="padding:9px 10px"><svg-icon icon-class="上传" style="margin-right:6px" />点击上传</el-button>-->
          <!--</el-upload>-->
          <!--<span style="display: inline-block"><a href="/czptweb/单用户数据存证模板.xlsx" style="color:#2d8cf0">下载模板</a></span>-->
        <!--</Form-item>-->

        <Form-item label="附件" prop="value1" v-show="formItem.vertical == 'peoples'">
          <el-upload
            ref="upload"
            class="upload-demo"
            action="/beaas/api/upload_excel/"
            :on-remove="handleRemove"
            :before-upload="beforeFileUpload"
            :on-success="handleFileSuccess"
            multiple
            :data="paramsData"
            :file-list="fileList"
            :auto-upload="false"
            style="width: 100%"
            >
            <el-button style="text-align: center;width: 100%"><span class="icon iconfont iconexport" style="margin-right: 8px;"></span><span>点击上传</span></el-button>
          </el-upload>
          <span class="download-template"><a href="/czptweb/单用户数据存证模板.xlsx" style="color:#8794AE">下载模板</a></span>
        </Form-item>
      </Form>

    </div>
    <div class="drawer-bottom-btn" style="width: 100%">
      <div class="drawer-btn-container user-btn" style="width: 102px;">
        <Button class="btn-search" @click="handleSubmit">存证</Button>
      </div>
    </div>
    <!--<el-dialog :visible.sync="dodele" style="z-index: 2003" width="520px"-->
      <!--title="博雅正链">-->
      <!--<p>确定是否存证</p>-->
      <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button @click="cancel">取 消</el-button>-->
        <!--<el-button type="primary" @click="dele" :loading="loading">-->
          <!--<span v-if="!loading">确 定</span>-->
          <!--<span v-else>存证中</span>-->
        <!--</el-button>-->
      <!--</span>-->
    <!--</el-dialog>-->
  </div>
</template>

<script>
import Upload from '../leading/upload'
import Transfer from '../../../api/transfer.js'
export default {
  inject: ['reload'],
  name: 'SingleUser',
  components: {
    'Upload': Upload,
  },
  props: {
    submit: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    submit(submit) {
      if(submit) {
        this.dele()
      }
    }
  },
  data() {
    const validatetag = (rule, value, callback) => {
      var data = value.split(',')
      var chinese = /^[\u4E00-\u9FA5]+$/
      var english = /^[a-zA-Z]*$/
      for (var index of data) {
        if (chinese.test(index)) {
          if (index.length > 4) {
            this.$Message.warning('每个中文标签不能超过4个字')
          } else {
            // console.log(1)
            callback()
          }
        } else if (english.test(index)) {
          if (index.length > 20) {
            this.$Message.warning('每个英文标签不能超过20个字符')
          } else {
            // console.log(2)
            callback()
          }
        } else {
          if (index.length > 20) {
            this.$Message.warning('每个标签不能超过20个字符')
          } else {
            // console.log(2)
            callback()
          }
//          this.$Message.warning('中英文结合的标签不符合标准，请重新输入')
        }
      }
      // console.log(typeof (value.split(",")))
    }
    return {
      // 存证数据
      datas: '',
      // 单用户导入的表格
      tableData: '',
      // 默认单条数据
      // vertical: 'people',
      // 默认输入条数显示
      cur: 0,
      alldata: [],
      fileList: [],
      dodele: false,
      username: [],
      // value4: '',
      file: '',
      // 多选栏设置
      props: { multiple: true },
      // 多选栏数据
      options: [],
      // 手动输入数据存证
      formDynamic: {
        items: [
          {
            value: '',
            value1: ''
          }
        ]
      },
      value1: 1,
      value5:'',
      paramsData: {
        file_type: 'one_user',
        method: 'upload_evidence',
        owner: '',
        tag_list: '',
        user_list: [],
        is_need_encrypt: ''
      },
      formItem: {
        itemname: '',
        value4: '',
        // 允许使用用户
        selectedUsers2: [],
        selectedUsers3:'',
        vertical: 'people',
        is_need_encrypt: ''
      },
      ruleValidate: {
        itemname: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' }
        ],
        value4: [
          { required: true, message: '标签不能为空', trigger: 'blur' },
          { validator: validatetag, trigger: 'blur' }
        ],
        is_need_encrypt: [
          { required: true, message: '请勾选是否加解密', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getdata()
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
    beforeFileUpload(file, fileList) {
      if (this.formItem.itemname == '' || this.formItem.value4 == '') {
        this.$Message.warning('用户姓名,标签不能为空')
        return false
      } else {
        console.log(this.formItem.selectedUsers2)
        let list1 = []
        if(this.formItem.selectedUsers3.length > 0) {
          list1 = this.formItem.selectedUsers3.split(',')
        }
        this.paramsData.user_list = list1
        this.paramsData.owner = this.formItem.itemname
        this.paramsData.is_need_encrypt = this.formItem.is_need_encrypt

        this.paramsData.tag_list = this.formItem.value4.split(',')
        console.log(this.paramsData)
        const fileExt = file.name.split('.').pop().toLocaleLowerCase() === 'xlsx' || file.name.split('.').pop().toLocaleLowerCase() === 'xls'
        if (!fileExt) {
          this.$message.error('上传文件不是EXCEL 格式!')
          this.fileList = []
        }
        return fileExt
      }
    },
    handleFileSuccess(response, res, file) {
      this.$emit('afterSubmit', 0)
      if (response.code == '0') {
        this.$Message.success('存证成功!')
        this.reload()
      } else if (response.code == '2021') {
        this.http.messageFun('error', response.msg)
      } else {
        this.http.messageFun('error', response.msg)
      }
    },
    // 获取用户列表
    getUserList() {
      this.http.alluser().then(res => {
        console.log(res)
        if (res.data.code == '0') {
          var data = res.data.data.all_user
          var typedata = []
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
    // 新增一行数据存证
    handleAdd() {
      this.formDynamic.items.push({
        value: ''
      })
    },
    // 存证提示
    handleSubmit() {
      if (this.formItem.itemname == '') {
        this.$Message.warning('用户姓名为空')
      } else if (this.formItem.value4 == '') {
        this.$Message.warning('标签为空')
      } else if (this.formItem.is_need_encrypt === '' && this.paramsData.is_need_encrypt === '') {
        this.$Message.warning('请勾选是否加解密')
      } else {
        var data = this.formDynamic.items
        var all = []
        for (var item in data) {
          all.push(data[item].value)
        }
        this.alldata = all
        this.$emit('beforeSubmit', 1)
      }
    },
    onchange(index) {
      if (index.target.value.length > 24) {
        this.$Message.warning('标签长度不能超过24个字符')
      }
    },
    dele() {
      if (this.formItem.vertical == 'peoples') {
        this.$refs.upload.submit();
      } else {
        console.log(this.formItem.selectedUsers2)
        const list = []
        let list1 = []
        for (const item of this.formItem.selectedUsers2) {
          list.push(item[1])
        }
        if(this.formItem.selectedUsers3.length > 0) {
          list1 = list.concat(this.formItem.selectedUsers3.split(','))
        }
        console.log(list1)
        var param = {
          method: 'upload_evidence',
          owner: this.formItem.itemname,
          data_list: this.alldata,
          user_list: list1,
          tag_list: this.formItem.value4.split(','),
          is_need_encrypt: this.formItem.is_need_encrypt
        }
        this.http.upload(param).then(res => {
          this.$emit('afterSubmit', 0)
          if (res.data.code == '0') {
            this.$Message.success('存证成功!')
            this.reload()
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      }
    },
    cancel() {

    },
    // 删除数据存证数量
    handleRemoves(index) {
      this.formDynamic.items.splice(index, 1)
    },
    getdata() {
      this.http.permissionowners().then(res => {
        if (res.status == '200') {
          var list = res.data.data.owners_list
           console.log(list)
          var newdata = []
          for (var index in list) {
            if (index != null) {
              var json = {
                value: index,
                label: list[index]
              }
              newdata.push(json)
            }
          }
          this.username = newdata
          Transfer.$emit('dataindex', newdata)
        } else {
          this.http.messageFun('error', res.data.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .cont p{
    margin-top: 1rem;
  }
  .boya-drawer .drawer-main .ivu-form-item {
    margin-bottom: 26px;
  }
</style>
