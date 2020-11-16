<template>
  <div class="boya-view"
       style="min-height: calc(100vh - 116px); margin-top: 0; background-color: #ffffff; padding-bottom: 60px">
    <el-row style="width:100%;padding-top: 20px">
      <el-col :span="24">
        <div class="home-main-input" style="width: 386px">
          <Input v-model="value" placeholder="请输入用户名/机构名称" @keyup.enter.native="created(1)">
          <Button slot="append" style="color: #fff" @click="created(1)">搜索</Button>
          </Input>
        </div>
      </el-col>
    </el-row>
    <el-table
      class="boya-table"
      :data="tableData"
      style="width: 100%;clear:both;margin-bottom: 20px;"
      :row-style="common.rowStyle"
      empty-text="暂无数据，请重新查询">
      <el-table-column prop="num" width="70" label="序号" show-overflow-tooltip/>
      <el-table-column prop="username" label="用户名" show-overflow-tooltip/>
      <el-table-column prop="new_organization" label="机构" show-overflow-tooltip/>
      <el-table-column prop="user_type" label="节点类型" show-overflow-tooltip/>
      <el-table-column prop="c_time" label="创建时间" width="100" show-overflow-tooltip/>
      <el-table-column prop="countdown" label="有效时间" width="100" show-overflow-tooltip/>
      <el-table-column label="状态" width="100" show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="icon iconfont "
                :class="scope.row.status?'iconactivated':'iconDisable1'"
                @click="statue(scope.$index, scope.row)"
                style="font-size: 21px;"
                :disabled="scope.row.disabled">
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
            <span class="icon iconfont iconedit " @click="doEdit(scope.$index, scope.row)"></span>
          </el-tooltip>
          <span style="margin:0 4px">|</span>
          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <span class="icon iconfont icondelete" @click="doDelete(scope.$index, scope.row)"></span>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="float-btn">
      <div class="create" @click="modal1 = true"><span class="icon iconfont iconcreate "></span></div>
    </div>
    <p class="boya-page">
      <el-pagination
        @size-change="onpage"
        @current-change="onchang"
        :current-page="pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totals">
      </el-pagination>
    </p>
    <el-drawer
      :visible.sync="modal1"
      custom-class="boya-drawer"
      direction="rtl"
      :with-header="false"
      size="28%"
      :before-close="handleClose"
    >
      <div class="drawer-title">
        <span class="icon iconfont iconadd1"></span>
        <span>新增用户</span>
      </div>
      <div class="drawer-main boya-scrollbar">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="top">
          <Form-item label="用户名称" prop="username">
            <Input v-model="formValidate.username" placeholder="请输入用户名称"/>
          </Form-item>
          <Form-item label="机构名称" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入机构名称"/>
          </Form-item>
          <Form-item label="密码" prop="password">
            <Input v-model="formValidate.password" placeholder="请输入密码" type="password" autocomplete="new-password"/>
          </Form-item>
          <Form-item label="确认密码" prop="confirm_password">
            <Input v-model="formValidate.confirm_password" placeholder="请输入密码" type="password"
                   autocomplete="new-password"/>
          </Form-item>
          <Form-item label="法人代表" prop="deputy">
            <Input v-model="formValidate.deputy" placeholder="请输入法人代表"/>
          </Form-item>
          <Form-item label="法人证件类型" prop="papers">
            <Select v-model="formValidate.papers" placeholder="请选择证件类型">
              <Option value="身份证">二代身份证</Option>
            </Select>
          </Form-item>
          <Form-item label="法人证件号码" prop="num">
            <Input v-model="formValidate.num" placeholder="请输入法人证件号码"/>
          </Form-item>
          <Form-item label="统一社会信用代码" prop="society">
            <Input v-model="formValidate.society" placeholder="请输入社会信用代码"/>
          </Form-item>
          <Form-item label="机构注册地址" prop="address">
            <Input v-model="formValidate.address" placeholder="请输入机构注册地址"/>
          </Form-item>
          <Form-item label="运营联系方式" prop="phone">
            <Input v-model="formValidate.phone" placeholder="请输入运营联系方式"/>
          </Form-item>
          <Form-item label="有效时间" prop="valid">
            <el-row>
              <el-col :span="11" style="width:44%">
                <Form-item prop="date">
                  <Date-picker v-model="formValidate.date" type="date" placeholder="开始时间" :options="pickerOptions"/>
                </Form-item>
              </el-col>
              <el-col :span="2" style="text-align: center">-</el-col>
              <el-col :span="11" style="width:44%">
                <Form-item prop="time">
                  <Date-picker v-model="formValidate.time" type="date" placeholder="结束时间" :options="pickerOptionsdata"
                               placement="top-end"/>
                </Form-item>
              </el-col>
            </el-row>
          </Form-item>
          <Form-item label="节点类型" prop="type">
            <Radio-group v-model="formValidate.vertical" vertical class="boya-radio-group">
              <Radio label="2" style="margin-right:5px">
                <span>计算节点</span>
              </Radio>
              <Radio label="1" style="margin-right:5px">
                <span>监管节点</span>
              </Radio>
              <Radio label="5" style="margin-right:5px">
                <span>监管节点+计算节点</span>
              </Radio>
            </Radio-group>
          </Form-item>
          <Form-item label="状态" prop="status">
            <Radio-group v-model="formValidate.status" vertical class="boya-radio-group">
              <Radio label="0">开启</Radio>
              <Radio label="1">关闭</Radio>
            </Radio-group>
          </Form-item>
        </Form>
      </div>
      <div class="drawer-bottom-btn">
        <div class="drawer-btn-container user-btn">
          <Button class="btn-search" @click="handleSubmit('formValidate')">确定</Button>
          <Button class="btn-reset" style="margin-left: 5px" @click="cancel">取消</Button>
        </div>
      </div>
    </el-drawer>
    <!--    编辑  -->
    <el-drawer
      :visible.sync="modal2"
      custom-class="boya-drawer"
      direction="rtl"
      :with-header="false"
      size="28%"
      :before-close="handleClose"
    >
      <div class="drawer-title">
        <span class="icon iconfont iconadd1"></span>
        <span>编辑用户</span>
      </div>
      <div class="drawer-main boya-scrollbar">
        <Form ref="formValidate" :model="forms" :rules="ruleValidate" label-position="top">
          <Form-item label="用户名称" prop="username">
            <Input v-model="forms.username" placeholder="请输入用户名称"/>
          </Form-item>
          <Form-item label="机构名称" prop="name">
            <Input v-model="forms.name" placeholder="请输入机构名称"/>
          </Form-item>
          <!--<Form-item label="密码" prop="password">-->
          <!--<Input v-model="forms.password" placeholder="请输入密码" type="password" autocomplete="new-password" />-->
          <!--</Form-item>-->
          <!--<Form-item label="确认密码" prop="confirm_password">-->
          <!--<Input v-model="forms.confirm_password" placeholder="请输入密码" type="password" autocomplete="new-password" />-->
          <!--</Form-item>-->
          <Form-item label="法人代表" prop="deputy">
            <Input v-model="forms.deputy" placeholder="请输入法人代表"/>
          </Form-item>
          <Form-item label="法人证件类型" prop="papers">
            <Select v-model="forms.papers" placeholder="请选择证件类型">
              <Option value="身份证">二代身份证</Option>
            </Select>
          </Form-item>
          <Form-item label="法人证件号码" prop="num">
            <Input v-model="forms.num" placeholder="请输入法人证件号码"/>
          </Form-item>
          <Form-item label="统一社会信用代码" prop="society">
            <Input v-model="forms.society" placeholder="请输入社会信用代码"/>
          </Form-item>
          <Form-item label="机构注册地址" prop="address">
            <Input v-model="forms.address" placeholder="请输入社会信用代码"/>
          </Form-item>
          <Form-item label="运营联系方式" prop="phone">
            <Input v-model="forms.phone" placeholder="请输入运营联系方式"/>
          </Form-item>
          <Form-item label="有效时间" prop="valid">
            <el-row>
              <el-col span="11" style="width:44%"/>
              <Form-item prop="date">
                <Date-picker v-model="forms.date" type="date" placeholder="开始时间" :options="pickerOptions"/>
              </Form-item>
              </el-col>
              <el-col span="2" style="text-align: center"/>
              -</el-col>
              <el-col span="11" style="width:44%"/>
              <Form-item prop="time">
                <Date-picker v-model="forms.time" type="date" placeholder="结束时间" :options="pickerOptionsdata"
                             placement="top-end"/>
              </Form-item>
              </el-col>
            </el-row>
          </Form-item>
          <Form-item label="节点类型" prop="type">
            <Radio-group v-model="forms.vertical" vertical class="boya-radio-group">
              <Radio label="2" style="margin-right:5px">
                <span>计算节点</span>
              </Radio>
              <Radio label="1" style="margin-right:5px">
                <span>监管节点</span>
              </Radio>
              <Radio label="5" style="margin-right:5px">
                <span>监管节点+计算节点</span>
              </Radio>
            </Radio-group>
          </Form-item>
          <Form-item label="状态" prop="status" vertical class="boya-radio-group">
            <Radio-group v-model="forms.status">
              <Radio label="0">开启</Radio>
              <Radio label="1">关闭</Radio>
            </Radio-group>
          </Form-item>
        </Form>
      </div>
      <div class="drawer-bottom-btn">
        <div class="drawer-btn-container user-btn">
          <Button class="btn-search" @click="handleSubmits('formValidate')">确定</Button>
          <Button class="btn-reset" style="margin-left: 5px" @click="cancel">取消</Button>
        </div>
      </div>
    </el-drawer>
    <!--    删除-->
    <delete-dialog
      ref="deleteDialog"
      :modal="d_modal"
      :textUp="textUp"
      :textUpLoading="textUpLoading"
      @deletefun="dele()"></delete-dialog>
    <!--<Modal-->
    <!--v-model="dodele"-->
    <!--title="删除"-->
    <!--@on-ok="dele"-->
    <!--@on-cancel="cancel">-->
    <!--<p>是否要删除此用户</p>-->
    <!--</Modal>-->
  </div>
</template>

<script>
  import DeleteDialog from '@/components/ButtonDialog/delete'

  export default {
    inject: ['reload'],
    name: 'team',
    components: {
      DeleteDialog
    },
    data() {
      const validatePassword = (rule, value, callback) => {
        if (value.length > 5) {
          callback()
        } else {
          return callback(new Error('密码长度不能小于6位'));
        }
      }
      const validateSociety = (rule, value, callback) => {
        if (value.length == 18) {
          callback()
        } else {
          return callback(new Error('社会信用代码长度只能为18位'));
        }
      }
      return {
        value1: true,
        pass: false,
        self: this,
        totals: 0,
        pageNum: 1,
        pageSize: 10,
        value: '',
        modal1: false,
        modal2: false,
        names: '0',
        dodele: false,
        dodata: '',
        // 删除弹窗相关
        d_modal: false,
        textUp: '您确定要删除这个用户？',
        textUpLoading: '正在删除用户',

        tableData: [],
        timedata: '',
        currentTime: new Date(),
        times: '',
        // 新增
        formValidate: {
          date: '',
          time: '',
          name: '',
          password: '',
          confirm_password: '',
          username: '',
          society: '',
          address: '',
          deputy: '',
          papers: '',
          num: '',
          phone: '',
          status: '0',
          vertical: '2',
          computing: '',
          regulatory: ''
        },
        computingdata: [],
        regulatorydata: [
          {
            label: 'aa',
            value: 'aa'
          }
        ],
        // 编辑
        forms: {
          id: '',
          date: '',
          time: '',
          name: '',
          password: '',
          confirm_password: '',
          username: '',
          society: '',
          address: '',
          deputy: '',
          papers: '',
          num: '',
          phone: '',
          status: '0',
          vertical: '2',
          computing: '',
          regulatory: ''
        },
        ruleValidate: {
          name: [
            {required: true, message: '机构名称不能为空', trigger: 'blur'},
            {pattern: /(^[A-Za-z0-9_()（）\-\u4e00-\u9fa5]*$)/, message: '机构名称不能使用特殊字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {validator: validatePassword, trigger: 'blur'}
          ],
          confirm_password: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {validator: validatePassword, trigger: 'blur'}
          ],
          username: [
            {required: true, message: '用户不能为空', trigger: 'blur'},
            {pattern: /(^[A-Za-z0-9_()（）\-\u4e00-\u9fa5]*$)/, message: '用户名不能使用特殊字符', trigger: 'blur'}
          ],
          society: [
            {required: true, message: '社会信用代码不能为空', trigger: 'blur'},
            {validator: validateSociety, trigger: 'blur'}
          ],
          num: [
            {
              pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
              message: '证件号码格式有误！',
              trigger: 'blur'
            }
          ],
          valid: [
            {required: true, type: 'valid', message: '请选择日期', trigger: 'change'}
          ],
          phone: [
            {
              pattern: /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/,
              message: '手机格式有误！',
              trigger: 'blur'
            }
          ],
          computing: [
            {required: true, message: '计算节点选择没有选择', trigger: 'blur'}
          ],
          regulatory: [
            {required: true, message: '监管节点选择没有选择', trigger: 'blur'}
          ]
        },
        pickerOptions: {
          disabledDate: time => {
            var sDate = this.times
            var eDate = this.timedata
            var sArr = sDate.split('-')
            var eArr = eDate.split('-')
            var sRDate = new Date(sArr[0], sArr[1], sArr[2])
            var eRDate = new Date(eArr[0], eArr[1], eArr[2])
            var result = (eRDate - sRDate) / (24 * 60 * 60 * 1000)
            return time && (time.valueOf() < Date.now() - 86400000 || time.valueOf() > Date.now() + (86400000 * result))
          }
        },
        pickerOptionsdata: {
          disabledDate: time => {
            var sDate = this.times
            var eDate = this.timedata
            var sArr = sDate.split('-')
            var eArr = eDate.split('-')
            var sRDate = new Date(sArr[0], sArr[1], sArr[2])
            var eRDate = new Date(eArr[0], eArr[1], eArr[2])
            var result = (eRDate - sRDate) / (24 * 60 * 60 * 1000)
            return time && (time.valueOf() < Date.now() - 86400000 || time.valueOf() > Date.now() + (86400000 * result))
          }
        }
      }
    },
    mounted() {
    },
    created() {
      this.created();
      var date = {
        year: this.currentTime.getFullYear(),
        month: this.currentTime.getMonth() + 1,
        date: this.currentTime.getDate(),
      }
      this.times = date.year + '-' + 0 + date.month + '-' + 0 + date.date;
    },
    methods: {
      onchang(pageNum) {
        this.pageNum = pageNum
        this.created()
      },
      onpage(pageSize) {
        this.pageSize = pageSize
        this.created()
      },

      // 查询
      created(index) {
        if (index) {
          this.pageNum = 1;
        }
        var param = {
          'pagination': this.pageNum,
          'limit': this.pageSize,
          'keyword': this.value
        }
        this.http.nodeuserfilter(param).then(res => {
          // console.log(res)
          if (res.data.code == '0') {
            this.totals = res.data.data.node_user_count
            var list = res.data.data.node_user_list_info
            var newdata = []
            var num = (this.pageNum - 1) * 10
            var nums = 1
            var user_type = ''
            for (var item of list) {
              if (item.user_type == '1') {
                user_type = '监管节点'
              } else if (item.user_type == '2') {
                user_type = '计算节点'
              } else if (item.user_type == '5') {
                user_type = '监管节点+计算节点'
              }
              if (item != null) {
                var json = {
                  num: num + nums,
                  user_type: user_type,
                  username: item.username,
                  countdown: item.countdown,
                  c_time: item.c_time.substr(0, 10),
                  status: item.status_type == 0,

                  password: item.password,
                  disabled: item.countdown == '已经过期',
                  new_organization: item.organization,
                  supervise_node_name: item.supervise_node_name,
                  uscc: item.uscc,
                  phone: item.phone,
                  count_node_name: item.count_node_name,
                  cert_number: item.cert_number,
                  cert_type: item.cert_type,
                  address: item.address,
                  id: item.id,
                  s_time: item.s_time,
                  e_time: item.e_time,
                  person_name: item.person_name
                }
                nums++
                newdata.push(json)
              }
            }
            this.tableData = newdata
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
        this.http.nodelist().then(res => {
          // console.log(res)
          if (res.data.code = '0') {
            var lists = res.data.data.count_node_list
            var listdata = []
            for (var index of lists) {
              var json = {
                label: index.node_name,
                value: index.node_name
              }
              listdata.push(json)
            }
            this.computingdata = listdata
            this.regulatorydata = listdata
          }
        })
        this.http.userinfo().then(res => {
          this.timedata = res.data.data.e_time.substr(0, 10)
          this.value11 = res.data.data.user_name
          // countdown
        })
        this.value11 = Transfer.pipe
        this.getNodeData()
      },
      checkData(data) {
        let check1 = data.name === '' ||
//          data.password === '' ||
          data.username === '' ||
          data.date === '' ||
          data.time === ''
       // let check2 = data.password !== data.confirm_password
        if (check1) {
          this.http.messageFun('error', "请填写必填信息")
        }
        return !(check1)
      },
      // 新增
      handleSubmit(name) {
        if (!this.checkData(this.formValidate)) {
          return false
        }
        this.formValidate.date = this.time.timestampToTime(this.formValidate.date, 'DT1')
        this.formValidate.time = this.time.timestampToTime(this.formValidate.time, 'DT1')
        var param = {
          password: this.formValidate.password,
          confirm_password: this.formValidate.confirm_password,
          new_organization: this.formValidate.name,
          uscc: this.formValidate.society,
          address: this.formValidate.address,
          phone: this.formValidate.phone,
          user_type: this.formValidate.vertical,
          // count_node_name: this.formValidate.computing,
          cert_number: this.formValidate.num,
          cert_type: this.formValidate.papers,
          status_type: this.formValidate.status,
          person_name: this.formValidate.deputy,
          s_time: this.formValidate.date,
          e_time: this.formValidate.time,
          username: this.formValidate.username,
          // supervise_node_name: this.formValidate.regulatory,
          email: '',
          normal_type: ''
        }
        // console.log(param)
        this.http.nodeuseradd(param).then(res => {
          console.log(res)
          if (res.data.code == '0') {
            this.$Message.success('提交成功!')
            this.reload()
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      },
      // 新增取消
      cancel () {
        this.$Message.info('点击了取消')
        this.modal1 = false
        this.modal2 = false
        this.modal3 = false
      },

      // 编辑
      doEdit(index, row) {
        this.modal2 = true
        console.log(row)
//        this.forms.password = row.password
//        this.forms.confirm_password = row.password
        this.forms.papers = row.cert_type
        this.forms.society = row.uscc
        this.forms.phone = row.phone
        this.forms.computing = row.count_node_name
        this.forms.num = row.cert_number
        this.forms.address = row.address
        this.forms.deputy = row.person_name
        this.forms.name = row.new_organization
        this.forms.username = row.username
        this.forms.date = row.s_time
        this.forms.time = row.e_time
        this.forms.id = row.id
        this.forms.regulatory = row.supervise_node_name
        // console.log(this.forms.regulatory)
        if (row.status) {
          this.forms.status = '0'
        } else {
          this.forms.status = '1'
        }
        if (row.user_type == '计算节点') {
          this.forms.vertical = '2'
        } else if (row.user_type == '监管节点') {
          this.forms.vertical = '1'
        } else if (row.user_type == '监管节点+计算节点') {
          this.forms.vertical = '5'
        }
      },

      // 编辑提交
      handleSubmits(name) {
        if (!this.checkData(this.forms)) {
          return false
        }
        this.forms.date = this.time.timestampToTime(this.forms.date, 'DT1')
        this.forms.time = this.time.timestampToTime(this.forms.time, 'DT1')
        // console.log(this.forms.computing)
        // if(typeof(this.forms.computing)=="undefined"){
        //   this.forms.computing = ''
        // }else{
        //   this.forms.computing = this.forms.computing
        // }
        // if()
        var param = {
          username: this.forms.username,
//          password: this.forms.password,
          organization: this.forms.name,
          uscc: this.forms.society,
          address: this.forms.address,
          person_name: this.forms.deputy,
          cert_type: this.forms.papers,
          cert_number: this.forms.num,
          phone: this.forms.phone,
          s_time: this.forms.date,
          e_time: this.forms.time,
          status_type: this.forms.status,
          new_user_type: this.forms.vertical,
          // count_node_name: this.forms.computing,
          target_node_user_id: this.forms.id,
          // supervise_node_name: this.forms.regulatory,
          email: '',
          normal_type: ''
        }
        console.log(param)
        this.http.nodeuseredit(param).then(res => {
          console.log(res)
          if (res.data.code == '0') {
            this.$Message.success('编辑成功!')
            this.reload()
          } else {
            this.$Message.error(res.data.msg)
          }
        })
      },
      //  删除用户
      doDelete(index, row) {
        this.dodata = row
        this.$refs.deleteDialog.handleClick()
      },
      dele() {
        this.http.userdelete({target_id: this.dodata.id}).then(res => {
          if (res.data.code == '0') {
            this.dodele = false
            this.reload()
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
        // location.reload();
      },
      //  启动
      statue(index, row) {
        // console.log(row)
        this.http.userclose({target_id: row.id}).then(res => {
          if (res.data.code == '0') {
            this.reload()
          } else {
            this.http.messageFun('error', res.data.msg)
            this.reload()
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .team_cont input {
    border: 0;
    font-size: 14px;
    line-height: 30px;
    height: 31px;
  }

  .home-main-input {
    display: inline-block;
    width: 380px;

    .ivu-input {
      height: 40px;
      border-radius: 8px 0 0 8px;
      border-color: #3B3783;
      font-size: 14px;
    }
    .ivu-input-group-append {
      border: 0 !important;
      background: #3B3783 !important;
    }

    .ivu-btn {
      width: 86px;
      height: 40px;
      background: #3B3783;
      border-radius: 0 8px 8px 0;
    }
  }
</style>
