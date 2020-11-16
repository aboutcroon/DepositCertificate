<template>
  <div>
    <div class="index_top">
      <p>超管信息维护</p>
      <el-button type="primary" @click="cur = 1">修改</el-button>
      <el-row v-show="cur == '1'" :gutter="20" style="width:80%;margin:0 auto">
        <el-col>
          <el-col :span="12"><el-col :span="4" style="text-align: right;margin-top:7px">账号</el-col><el-col :span="20" style="margin-top:7px">
            <Input v-model="value11" disabled />
          </el-col></el-col>
          <el-col :span="12">
            <el-col :span="4" style="text-align: right;margin-top:7px">联系方式</el-col>
            <el-col :span="20"><el-input v-model="input1" size="small" placeholder="请输入内容" /></el-col>
          </el-col>
        </el-col>
        <el-col style="margin-top: 1rem">
          <el-col :span="12">
            <el-col :span="4" style="text-align: right;margin-top:7px">原始密码</el-col>
            <el-col :span="20"><el-input v-model="input2" size="small" placeholder="请输入内容" /></el-col>
          </el-col>
          <el-col :span="12">
            <el-col :span="4" style="text-align: right;margin-top:7px">新密码</el-col>
            <el-col :span="20"><el-input v-model="input3" size="small" placeholder="请输入内容" /></el-col>
          </el-col>
          <el-col />
        </el-col>
        <p style="text-align: right;margin-top:20px;clear: both"><el-button type="primary" style="margin-right:20px" @click="sure">确定</el-button></p>
      </el-row>
    </div>
    <div class="index_bottom">
      <div style="padding-bottom: 10px">
        <p>节点用户管理</p>
        <Button type="primary" style="margin-left:12px;padding:4px 21px 4.03px 15px" @click="modal1 = true"><i class="el-icon-plus" style="margin-right:6px" />新增</Button>
        <Modal v-model="modal1" title="新增用户">
          <div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="115">
              <Form-item label="用户名称" prop="username">
                <Input v-model="formValidate.username" placeholder="请输入用户名称" style="width:96%" /></Input>
              </Form-item>
              <Form-item label="企业名称" prop="name">
                <Input v-model="formValidate.name" placeholder="请输入企业名称" style="width:96%" /></Input>
              </Form-item>
              <Form-item label="密码" prop="password">
                <Input v-model="formValidate.password" placeholder="请输入密码" style="width:96%" /></Input>
              </Form-item>
              <Form-item label="法人代表" prop="deputy">
                <Input v-model="formValidate.deputy" placeholder="请输入法人代表" style="width:96%" /></Input>
              </Form-item>
              <Form-item label="法人证件类型" prop="papers">
                <Select v-model="formValidate.papers" placeholder="请选择证件类型" style="width:96%">
                  <Option value="身份证">二代身份证</Option>
                </Select>
              </Form-item>
              <Form-item label="法人证件号码" prop="num">
                <Input v-model="formValidate.num" placeholder="请输入法人证件号码" style="width:96%" /></Input>
              </Form-item>
              <Form-item label="统一社会信用代码" prop="society">
                <Input v-model="formValidate.society" placeholder="请输入社会信用代码" style="width:96%" /></Input>
              </Form-item>
              <Form-item label="企业注册地址" prop="address">
                <Input v-model="formValidate.address" placeholder="请输入企业注册地址" style="width:96%" /></Input>
              </Form-item>
              <Form-item label="运营联系方式" prop="phone">
                <Input v-model="formValidate.phone" placeholder="请输入运营联系方式" style="width:96%" /></Input>
              </Form-item>
              <Form-item label="有效时间" prop="valid">
                <el-row>
                  <el-col :span="11" style="width:44%">
                    <Form-item prop="date">
                      <Date-picker v-model="formValidate.date" type="date" placeholder="开始时间" :options="pickerOptions" />
                    </Form-item>
                  </el-col>
                  <el-col :span="2" style="text-align: center">-</el-col>
                  <el-col :span="11" style="width:44%">
                    <Form-item prop="time">
                      <Date-picker v-model="formValidate.time" type="date" placeholder="结束时间" :options="pickerOptionsdata" placement="top-end" />
                    </Form-item>
                  </el-col>
                </el-row>
              </Form-item>
              <Form-item label="节点类型" prop="type">
                <Radio-group v-model="formValidate.vertical" vertical>
                  <Radio label="2" style="display: inline-block;margin-right:5px">
                    <span>计算节点</span>
                  </Radio>
                  <Radio label="1" style="display: inline-block;margin-right:5px">
                    <span>监管节点</span>
                  </Radio>
                  <Radio label="5" style="display: inline-block;margin-right:5px">
                    <span>监管节点+计算节点</span>
                  </Radio>
                </Radio-group>
              </Form-item>
              <!--              <Form-item label="计算节点选择" prop="computing" v-show="formValidate.vertical == '2' || formValidate.vertical == '5'">-->
              <!--                <Select v-model="formValidate.computing" style="width:96%">-->
              <!--                  <Option v-for="item in computingdata" :value="item.value">{{ item.label }}</Option>-->
              <!--                </Select>-->
              <!--              </Form-item>-->
              <!--              <Form-item label="监管节点选择" prop="regulatory" v-show="formValidate.vertical == '1' || formValidate.vertical == '5'">-->
              <!--                <Select v-model="formValidate.regulatory" style="width:96%">-->
              <!--                  <Option v-for="item in regulatorydata" :value="item.value">{{ item.label }}</Option>-->
              <!--                </Select>-->
              <!--              </Form-item>-->
              <Form-item label="状态" prop="status">
                <Radio-group v-model="formValidate.status">
                  <Radio label="0">开启</Radio>
                  <Radio label="1">关闭</Radio>
                </Radio-group>
              </Form-item>
            </Form>
          </div>
          <div slot="footer">
            <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
            <Button style="margin-left: 8px" @click="cancel">取消</Button>
          </div>
        </Modal>

        <Modal v-model="modal2" title="编辑用户">
          <div>
            <Form ref="formValidate" :model="forms" :rules="ruleValidate" :label-width="115">
              <Form-item label="用户名称" prop="username">
                <Input v-model="forms.username" placeholder="请输入用户名称" style="width:96%" /></Input>
              </Form-item>
              <Form-item label="企业名称" prop="name">
                <Input v-model="forms.name" placeholder="请输入企业名称" style="width:96%" /></Input>
              </Form-item>
              <Form-item label="密码" prop="password">
                <Input v-model="forms.password" placeholder="请输入密码" style="width:96%" /></Input>
              </Form-item>
              <Form-item label="法人代表" prop="deputy">
                <Input v-model="forms.deputy" placeholder="请输入法人代表" style="width:96%" /></Input>
              </Form-item>
              <Form-item label="法人证件类型" prop="papers">
                <Select v-model="forms.papers" placeholder="请选择证件类型" style="width:96%">
                  <Option value="身份证">二代身份证</Option>
                </Select>
              </Form-item>
              <Form-item label="法人证件号码" prop="num">
                <Input v-model="forms.num" placeholder="请输入法人证件号码" style="width:96%" /></Input>
              </Form-item>
              <Form-item label="统一社会信用代码" prop="society">
                <Input v-model="forms.society" placeholder="请输入社会信用代码" style="width:96%" /></Input>
              </Form-item>
              <Form-item label="企业注册地址" prop="address">
                <Input v-model="forms.address" placeholder="请输入社会信用代码" style="width:96%" /></Input>
              </Form-item>
              <Form-item label="运营联系方式" prop="phone">
                <Input v-model="forms.phone" placeholder="请输入运营联系方式" style="width:96%" /></Input>
              </Form-item>
              <Form-item label="有效时间" prop="valid">
                <Row>
                  <Col span="11" style="width:44%" />
                  <Form-item prop="date">
                    <Date-picker v-model="forms.date" type="date" placeholder="开始时间" :options="pickerOptions" />
                  </Form-item>
                  </Col>
                  <Col span="2" style="text-align: center" />-</Col>
                  <Col span="11" style="width:44%" />
                  <Form-item prop="time">
                    <Date-picker v-model="forms.time" type="date" placeholder="结束时间" :options="pickerOptionsdata" placement="top-end" />
                  </Form-item>
                  </Col>
                </Row>
              </Form-item>
              <Form-item label="节点类型" prop="type">
                <Radio-group v-model="forms.vertical" vertical>
                  <Radio label="2" style="display: inline-block;margin-right:5px">
                    <span>计算节点</span>
                  </Radio>
                  <Radio label="1" style="display: inline-block;margin-right:5px">
                    <span>监管节点</span>
                  </Radio>
                  <Radio label="5" style="display: inline-block;margin-right:5px">
                    <span>监管节点+计算节点</span>
                  </Radio>
                </Radio-group>
              </Form-item>
              <!--              <Form-item label="计算节点选择" prop="computing" v-show="forms.vertical == '2' || forms.vertical == '5'">-->
              <!--                <Select v-model="forms.computing" style="width:96%">-->
              <!--                  <Option v-for="item in computingdata" :value="item.value">{{ item.label }}</Option>-->
              <!--                </Select>-->
              <!--              </Form-item>-->
              <!--              <Form-item label="监管节点选择" prop="regulatory" v-show="forms.vertical == '1' || forms.vertical == '5'">-->
              <!--                <Select v-model="forms.regulatory" style="width:96%">-->
              <!--                  <Option v-for="item in regulatorydata" :value="item.value">{{ item.label }}</Option>-->
              <!--                </Select>-->
              <!--              </Form-item>-->
              <Form-item label="状态" prop="status">
                <Radio-group v-model="forms.status">
                  <Radio label="0">开启</Radio>
                  <Radio label="1">关闭</Radio>
                </Radio-group>
              </Form-item>
            </Form>
          </div>
          <div slot="footer">
            <Button type="primary" @click="handleSubmits('formValidate')">确定</Button>
            <Button style="margin-left: 8px" @click="cancel">取消</Button>
          </div>
        </Modal>
        <Button type="primary" style="float: right;margin-left:3px;margin-right:12px;padding:4px 21px 4.03px 20px" @click="created">查询</Button>
        <div class="team_cont">
          <Input v-model="value" placeholder="请输入用户名/节点名字/机构名字" size="small" /></Input>
        </div>

        <el-table :data="tableData" border style="width: 98%;clear:both;margin:0 auto;margin-top:20px;">
          <el-table-column prop="num" label="序号" align="center" />
          <el-table-column prop="username" label="用户名" align="center" />
          <!--          <el-table-column prop="type" label="密码" width="100" align="center"></el-table-column>-->
          <el-table-column prop="user_type" label="节点类型" align="center" />
          <el-table-column prop="c_time" label="创建时间" align="center" />
          <el-table-column prop="countdown" label="有效时间" align="center" />
          <el-table-column label="状态" width="100" align="center">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status" :disabled="scope.row.disabled" @change="statue(scope.$index, scope.row)" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope">
              <span style="color:#268af0" @click="doEdit(scope.$index, scope.row)"><svg-icon icon-class="编辑" style="margin-right:3px" />编辑</span>
              <span style="margin:0 4px">|</span>
              <span style="color:#268af0" @click="doDelete(scope.$index, scope.row)"><svg-icon icon-class="删除" style="margin-right:3px" />删除</span>
            </template>
          </el-table-column>
        </el-table>
        <p style="background: #fff;text-align: right;padding: 1rem 1rem 1rem 0"><Page :total="totals" :current="pageNum" :page-size="pageSize" :page-size-opts="[10,20,30,40,50]" show-total show-elevator show-sizer @on-change="onchang" @on-page-size-change="onpage" /></p>
      </div>
    </div>
    <div class="index_bottom">
      <div style="padding-bottom: 10px">
        <p>节点信息列表</p>

        <el-table :data="tableData2" border style="width: 98%;clear:both;margin:0 auto;margin-top:20px;">
          <el-table-column prop="num" label="序号" align="center" />
          <el-table-column prop="node_name" label="节点名" align="center" />
          <!--          <el-table-column prop="type" label="密码" width="100" align="center"></el-table-column>-->
          <el-table-column prop="node_type" label="节点类型" align="center" />
          <el-table-column prop="block_number" label="区块号" align="center" />
          <el-table-column prop="node_status" label="节点状态" align="center" />
          <el-table-column prop="c_time" label="加入时间" align="center" />

        </el-table>
        <p style="background: #fff;text-align: right;padding: 1rem 1rem 1rem 0"><Page :total="totals2" :current="pageNum2" :page-size="pageSize" :page-size-opts="[10,20,30,40,50]" show-total show-elevator show-sizer @on-change="onchang" @on-page-size-change="onpage" /></p>
      </div>
    </div>
    <!--    删除-->
    <Modal
      v-model="dodele"
      title="删除"
      @on-ok="dele"
      @on-cancel="cancel"
    >
      <p>是否要删除此用户</p>
    </Modal>
  </div>
</template>

<script>
// import Nature from './nature/nature'
import Transfer from '../../api/transfer'
export default {
  inject: ['reload'],
  name: 'Index',
  // components: {
  // Nature
  // },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length > 5) {
        callback()
      } else {
        return callback(new Error('密码长度不能小于6位'))
      }
    }
    const validateSociety = (rule, value, callback) => {
      if (value.length == 18) {
        callback()
      } else {
        return callback(new Error('社会信用代码长度只能为18位'))
      }
    }
    return {
      input1: '',
      input2: '',
      input3: '',
      cur: '0',
      modal1: false,
      modal2: false,
      value: '',
      value11: '',
      totals: 0,
      pageNum: 1,
      totals2: 0,
      pageNum2: 1,
      pageSize: 10,
      dodele: false,
      timedata: '',
      currentTime: new Date(),
      times: '',
      // 新增
      formValidate: {
        username: '',
        date: '',
        time: '',
        name: '',
        password: '',
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
      forms: {
        id: '',
        date: '',
        time: '',
        name: '',
        password: '',
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
      tableData: [],
      tableData2: [],
      ruleValidate: {
        name: [
          { required: true, message: '企业名称不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ],
        username: [
          { required: true, message: '用户不能为空', trigger: 'blur' }
        ],
        society: [
          { required: true, message: '社会信用代码不能为空', trigger: 'blur' },
          { validator: validateSociety, trigger: 'blur' }
        ],
        num: [
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: '证件号码格式有误！',
            trigger: 'blur'
          }
        ],
        valid: [
          { required: true, type: 'valid', message: '请选择日期', trigger: 'change' }
        ],
        phone: [
          {
            pattern: /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/,
            message: '手机格式有误！',
            trigger: 'blur'
          }
        ],
        computing: [
          { required: true, message: '计算节点选择没有选择', trigger: 'blur' }
        ],
        regulatory: [
          { required: true, message: '监管节点选择没有选择', trigger: 'blur' }
        ]
      },
      pickerOptions: {
        disabledDate: time => {
          var sDate = this.times
          var eDate = this.timedata
          // console.log(eDate)
          // console.log(sDate)
          var sArr = sDate.split('-')
          var eArr = eDate.split('-')
          var sRDate = new Date(sArr[0], sArr[1], sArr[2])
          var eRDate = new Date(eArr[0], eArr[1], eArr[2])
          var result = (eRDate - sRDate) / (24 * 60 * 60 * 1000)
          // console.log(result)
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
  created() {
    this.created()
    var date = {
      year: this.currentTime.getFullYear(),
      month: this.currentTime.getMonth() + 1,
      date: this.currentTime.getDate()
    }
    this.times = date.year + '-' + 0 + date.month + '-' + 0 + date.date
  },
  methods: {
    // 编辑
    doEdit(index, row) {
      this.modal2 = true
      console.log(row)
      this.forms.password = row.password
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
        password: this.forms.password,
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
    onchang(pageNum) {
      this.pageNum = pageNum
      this.created()
    },
    onpage(pageSize) {
      this.created()
    },
    // 查询
    created() {
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
    // 新增
    handleSubmit(name) {
      this.formValidate.date = this.time.timestampToTime(this.formValidate.date, 'DT1')
      this.formValidate.time = this.time.timestampToTime(this.formValidate.time, 'DT1')
      var param = {
        password: this.formValidate.password,
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
    // 取消
    cancel() {
      this.$Message.info('点击了取消')
      this.modal1 = false
      this.modal2 = false
      this.dodele = false
    },
    doDelete(index, row) {
      this.dodata = row.id
      this.dodele = true
    },
    //  启动
    statue(index, row) {
      // console.log(row)
      this.http.userclose({ target_id: row.id }).then(res => {
        if (res.data.code == '0') {
          // this.reload()
        } else {
          this.http.messageFun('error', res.data.msg)
        }
      })
    },
    // 删除确定
    dele() {
      this.http.userdelete({ target_id: this.dodata }).then(res => {
        if (res.data.code == '0') {
          this.dodele = false
          this.reload()
        } else {
          this.http.messageFun('error', res.data.msg)
        }
      })
      // location.reload();
    },
    sure() {
      //  修改密码
      if (this.input2 != '') {
        // console.log(this.input3)
        if (this.input3 == '') {
          this.$message.error('新密码不能为空')
        } else {
          // alert(2)
          var param = {
            old_password: this.input2,
            new_password: this.input3,
            new_phone: this.input1
          }
          console.log(param)
          this.http.accountedit(param).then(res => {
            console.log(res)
            if (res.status == '200') {
              if (res.data.msg == '旧密码不正确') {
                this.$message.error(res.data.msg)
              } else {
                this.$message({
                  message: '超管信息修改成功',
                  type: 'success'
                })
                this.reload()
              }
            } else {
              this.http.messageFun('error', res.data.msg)
            }
          })
        }
      } else {
        var param = {
          old_password: this.input2,
          new_password: this.input3,
          new_phone: this.input1
        }
        console.log(param)
        this.http.accountedit(param).then(res => {
          // console.log(res)
          if (res.status == '200') {
            if (res.data.msg == '旧密码不正确') {
              this.$message.error(res.data.msg)
            } else {
              this.$message({
                message: '超管信息修改成功',
                type: 'success'
              })
              this.reload()
            }
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      }
    },
    // 获取节点列表
    getNodeData() {
      var param = {
        'pagination': this.pageNum,
        'limit': this.pageSize
      }
      this.http.nodes(param).then(res => {
        console.log(res)
        if (res.data.code == '0') {
          this.totals2 = res.data.data.all_cnt
          var list = res.data.data.node_list
          var newdata = []
          var num = (this.pageNum - 1) * 10
          var nums = 1
          var user_type = ''
          for (var item of list) {
            if (item != null) {
              var json = {
                num: num + nums,
                node_name: item.node_name,
                node_type: item.node_type,
                block_number: item.block_number,
                node_status: item.node_status,
                c_time: item.c_time.substr(0, 10)
              }
              nums++
              newdata.push(json)
            }
          }
          this.tableData2 = newdata
        } else {
          this.http.messageFun('error', res.data.msg)
        }
      })
    }
  }
}
</script>

<style lang="less">
  .index_top{
    background: #fff;
    margin:10px;
    p{
      font-size: 16px;
      color: rgba(0, 0, 0, 0.847058);
      margin:10px;
      margin-bottom:15px;
      padding-top:20px;
    }
    button{
      margin-left: 10px;
      padding:7px 20px;
      margin-bottom:20px;
    }
  }
  .index_bottom{
    margin:10px;
    background:#fff;
    p{
      font-size: 16px;
      color: rgba(0, 0, 0, 0.847058);
      margin:10px;
      padding-top:20px;
      margin-bottom:15px;
    }
    .team_cont{
      float: right;
      border: 1px solid #ccc;
      border-radius: 5px;
      position: relative;
      /*margin-right:20px;*/
    }
    .team_cont input{
      border:0;
      font-size:14px;
      line-height: 30px;
      height:31px;
    }
  }
  /*.ivu-modal-body{*/
    /*width:85% !important;*/
    /*margin:0 auto;*/
  /*}*/
  .el-table tr{
    cursor:pointer
  }
  body .el-table th.gutter{
    display: table-cell!important;
  }
</style>
