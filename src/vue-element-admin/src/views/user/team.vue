<template>
  <div class="boya-view">
    <el-row style="width:100%;padding-top: 20px">
      <el-col :span="24">
        <div class="home-main-input" style="width: 386px">
          <Input v-model="value" placeholder="请输入用户名/机构名称/真实姓名" @keyup.enter.native="created(1)">
          <Button slot="append" style="color: #fff; height: 100%" @click="created(1)">搜索</Button>
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
      <el-table-column prop="num" width="70" label="序号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="username" label="用户名" width="170" show-overflow-tooltip></el-table-column>
      <el-table-column prop="cert_type" label="证件类型" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="机构名称/真实姓名" show-overflow-tooltip></el-table-column>
      <el-table-column prop="s_time" label="开始时间" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="countdown" label="有效时间" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="parent_name" label="创建人" width="100" show-overflow-tooltip></el-table-column>
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
    <div class="runoutData" v-if="dataCheck">
      <img src="../../assets/img/runoutData@2x.png" class="runoutPhoto">
      <div class="runoutText"><span>暂无数据</span></div>
    </div>
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
    >
      <div class="drawer-title">
        <span class="icon iconfont iconadd1"></span>
        <span>新增用户</span>
      </div>
      <div class="drawer-main boya-scrollbar" v-show="names === '0'">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="top">
          <Form-item label="用户名称" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入用户名称"></Input>
          </Form-item>
          <Form-item label="密码" prop="password">
            <Input v-model="formValidate.password" placeholder="请输入密码" type="password"
                   autocomplete="new-password"></Input>
          </Form-item>
          <Form-item label="确认密码" prop="confirm_password">
            <Input v-model="formValidate.confirm_password" placeholder="请输入密码" type="password"
                   autocomplete="new-password"/>
          </Form-item>
          <Form-item label="机构名称" prop="organization">
            <Input v-model="formValidate.organization" placeholder="请输入机构名称"></Input>
          </Form-item>
          <Form-item label="社会信用代码" prop="society">
            <Input v-model="formValidate.society" placeholder="请输入社会信用代码"></Input>
          </Form-item>
          <Form-item label="单位注册地址" prop="address">
            <Input v-model="formValidate.address" placeholder="请输入单位注册地址"></Input>
          </Form-item>
          <Form-item label="法人代表" prop="deputy">
            <Input v-model="formValidate.deputy" placeholder="请输入法人代表"></Input>
          </Form-item>
          <Form-item label="法人证件类型" prop="papers">
            <Select v-model="formValidate.papers" placeholder="请选择证件类型">
              <Option value="身份证">身份证</Option>
              <Option value="港澳通行证">港澳通行证</Option>
              <Option value="台胞证">台胞证</Option>
              <Option value="护照">护照</Option>
            </Select>
          </Form-item>
          <Form-item label="法人证件号码" prop="num" v-show="formValidate.papers == '身份证' || formValidate.papers == ''">
            <Input v-model="formValidate.num" placeholder="请输入法人证件号码"></Input>
          </Form-item>
          <Form-item label="法人证件号码" prop="frnum" v-show="formValidate.papers == '护照'">
            <Input v-model="formValidate.frnum" placeholder="请输入法人证件号码"></Input>
          </Form-item>
          <Form-item label="法人证件号码" prop="pass" v-show="formValidate.papers == '港澳通行证'">
            <Input v-model="formValidate.pass" placeholder="请输入法人证件号码"></Input>
          </Form-item>
          <Form-item label="法人证件号码" prop="compatriots" v-show="formValidate.papers == '台胞证'">
            <Input v-model="formValidate.compatriots" placeholder="请输入法人证件号码"></Input>
          </Form-item>

          <Form-item label="运营联系方式" prop="phone">
            <Input v-model="formValidate.phone" placeholder="请输入运营联系方式"></Input>
          </Form-item>
          <Form-item label="有效时间" prop="valid">
            <el-row>
              <el-col :span="11">
                <Form-item prop="date">
                  <Date-picker type="date" placeholder="开始时间" :options="pickerOptionsStart" placement="top-start"
                               v-model="formValidate.date" @on-change="startTimeChange"></Date-picker>
                </Form-item>
              </el-col>
              <el-col :span="2" style="text-align: center;line-height: 42px;">-</el-col>
              <el-col :span="11">
                <Form-item prop="time">
                  <Date-picker type="date" placeholder="结束时间" :options="pickerOptionsEnd" placement="top-end"
                               v-model="formValidate.time" @on-change="endTimeChange"></Date-picker>
                </Form-item>
              </el-col>
            </el-row>
          </Form-item>
          <Form-item label="状态" prop="status">
            <Radio-group v-model="formValidate.status" vertical class="boya-radio-group">
              <Radio label="0">开启</Radio>
              <Radio label="1">关闭</Radio>
            </Radio-group>
          </Form-item>
        </Form>
      </div>
      <div class="drawer-main boya-scrollbar" v-show="names === '1'">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="top">
          <Form-item label="用户名称" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入用户名称"></Input>
          </Form-item>
          <Form-item label="密码" prop="password">
            <Input v-model="formValidate.password" placeholder="请输入密码" type="password"
                   autocomplete="new-password"></Input>
          </Form-item>
          <Form-item label="确认密码" prop="confirm_password">
            <Input v-model="formValidate.confirm_password" placeholder="请输入密码" type="password"
                   autocomplete="new-password"/>
          </Form-item>
          <Form-item label="真实姓名" prop="username">
            <Input v-model="formValidate.username" placeholder="请输入真实姓名"></Input>
          </Form-item>
          <Form-item label="证件类型" prop="papers">
            <Select v-model="formValidate.papers" placeholder="请选择证件类型">
              <Option value="身份证">身份证</Option>
              <Option value="港澳通行证">港澳通行证</Option>
              <Option value="台胞证">台胞证</Option>
              <Option value="护照">护照</Option>
            </Select>
          </Form-item>
          <Form-item label="证件号码" prop="num" v-show="formValidate.papers == '身份证' || formValidate.papers == ''">
            <Input v-model="formValidate.num" placeholder="请输入法人证件号码"></Input>
          </Form-item>
          <Form-item label="证件号码" prop="frnum" v-show="formValidate.papers == '护照'">
            <Input v-model="formValidate.frnum" placeholder="请输入法人证件号码"></Input>
          </Form-item>
          <Form-item label="证件号码" prop="pass" v-show="formValidate.papers == '港澳通行证'">
            <Input v-model="formValidate.pass" placeholder="请输入法人证件号码"></Input>
          </Form-item>
          <Form-item label="证件号码" prop="compatriots" v-show="formValidate.papers == '台胞证'">
            <Input v-model="formValidate.compatriots" placeholder="请输入法人证件号码"></Input>
          </Form-item>

          <Form-item label="运营联系方式" prop="phone">
            <Input v-model="formValidate.phone" placeholder="请输入运营联系方式"></Input>
          </Form-item>
          <Form-item label="邮箱" prop="email">
            <Input v-model="formValidate.email" placeholder="请输入邮箱"></Input>
          </Form-item>
          <Form-item label="有效时间" prop="valid">
            <el-row>
              <el-col :span="11">
                <Form-item prop="date">
                  <Date-picker type="date" placeholder="开始时间" :options="pickerOptions" placement="top-start"
                               v-model="formValidate.date"></Date-picker>
                </Form-item>
              </el-col>
              <el-col :span="2" style="text-align: center;line-height: 42px;">-</el-col>
              <el-col :span="11">
                <Form-item prop="time">
                  <Date-picker type="date" placeholder="结束时间" :options="pickerOptionsdata" placement="top-end"
                               v-model="formValidate.time"></Date-picker>
                </Form-item>
              </el-col>
            </el-row>
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
      <div class="home-block-RT">
        <el-radio-group v-model="names" class="boya-switch-group">
          <el-radio-button label="0">法人用户</el-radio-button>
          <el-radio-button label="1">自然人</el-radio-button>
        </el-radio-group>
      </div>
    </el-drawer>
    <!--    编辑  -->
    <el-drawer
      :visible.sync="modal2"
      custom-class="boya-drawer"
      direction="rtl"
      :with-header="false"
      size="28%"
    >
      <div class="drawer-title">
        <span class="icon iconfont iconadd1"></span>
        <span>编辑法人用户</span>
      </div>
      <div class="drawer-main boya-scrollbar">
        <Form ref="formValidate" :model="forms" :rules="ruleValidate" label-position="top">
          <Form-item label="用户名称" prop="name">
            <Input v-model="forms.name" placeholder="请输入用户名称"/>
          </Form-item>
          <!--<Form-item label="密码" prop="password">-->
          <!--<Input v-model="forms.password" placeholder="请输入密码" type="password" autocomplete="new-password" />-->
          <!--</Form-item>-->
          <!--<Form-item label="确认密码" prop="confirm_password">-->
          <!--<Input v-model="forms.confirm_password" placeholder="请输入密码" type="password" autocomplete="new-password" />-->
          <!--</Form-item>-->
          <Form-item label="机构名称" prop="organization">
            <Input v-model="forms.organization" placeholder="请输入机构名称"/>
          </Form-item>
          <Form-item label="社会信用代码" prop="society">
            <Input v-model="forms.society" placeholder="请输入社会信用代码"></Input>
          </Form-item>
          <Form-item label="单位注册地址" prop="address">
            <Input v-model="forms.address" placeholder="请输入单位注册地址"></Input>
          </Form-item>
          <Form-item label="法人代表" prop="deputy">
            <Input v-model="forms.deputy" placeholder="请输入法人代表"></Input>
          </Form-item>
          <Form-item label="法人证件类型" prop="papers">
            <Select v-model="forms.papers" placeholder="请选择证件类型">
              <Option value="身份证">身份证</Option>
              <Option value="港澳通行证">港澳通行证</Option>
              <Option value="台胞证">台胞证</Option>
              <Option value="护照">护照</Option>
            </Select>
          </Form-item>
          <Form-item label="法人证件号码" prop="num" v-show="forms.papers == '身份证'">
            <Input v-model="forms.num" placeholder="请输入法人证件号码"></Input>
          </Form-item>
          <Form-item label="法人证件号码" prop="frnum" v-show="forms.papers == '护照'">
            <Input v-model="forms.frnum" placeholder="请输入法人证件号码"></Input>
          </Form-item>
          <Form-item label="法人证件号码" prop="pass" v-show="forms.papers == '港澳通行证'">
            <Input v-model="forms.pass" placeholder="请输入法人证件号码"></Input>
          </Form-item>
          <Form-item label="法人证件号码" prop="compatriots" v-show="forms.papers == '台胞证'">
            <Input v-model="forms.compatriots" placeholder="请输入法人证件号码"></Input>
          </Form-item>
          <Form-item label="运营联系方式" prop="lianxi">
            <Input v-model="forms.lianxi" placeholder="请输入运营联系方式"></Input>
          </Form-item>

          <Form-item label="有效时间" prop="valid">
            <el-row>
              <el-col :span="11">
                <Form-item prop="date">
                  <Date-picker type="date" placeholder="开始时间" :options="pickerOptions" placement="top-start"
                               v-model="forms.starttime"></Date-picker>
                </Form-item>
              </el-col>
              <el-col :span="2" style="text-align: center;line-height: 42px;">-</el-col>
              <el-col :span="11">
                <Form-item prop="time">
                  <Date-picker type="date" placeholder="结束时间" :options="pickerOptionsdata" placement="top-end"
                               v-model="forms.endtime"></Date-picker>
                </Form-item>
              </el-col>
            </el-row>
          </Form-item>
          <Form-item label="状态" prop="status">
            <Radio-group v-model="forms.status" vertical class="boya-radio-group">
              <Radio label="0">开启</Radio>
              <Radio label="1">关闭</Radio>
            </Radio-group>
          </Form-item>
        </Form>
      </div>
      <div class="drawer-bottom-btn">
        <div class="drawer-btn-container user-btn">
          <Button class="btn-search" @click="handleSubmits('forms')">确定</Button>
          <Button class="btn-reset" style="margin-left: 5px" @click="cancel">取消</Button>
        </div>
      </div>
    </el-drawer>
    <el-drawer
      :visible.sync="modal3"
      custom-class="boya-drawer"
      direction="rtl"
      :with-header="false"
      size="28%"
    >
      <div class="drawer-title">
        <span class="icon iconfont iconadd1"></span>
        <span>编辑自然人用户</span>
      </div>
      <div class="drawer-main boya-scrollbar">
        <Form ref="formValidate" :model="forms" :rules="ruleValidate" label-position="top">
          <Form-item label="用户名称" prop="name">
            <Input v-model="forms.username" placeholder="请输入用户名称"></Input>
          </Form-item>
          <!--<Form-item label="密码" prop="password">-->
          <!--<Input v-model="forms.password" placeholder="请输入密码" type="password"></Input>-->
          <!--</Form-item>-->
          <!--<Form-item label="确认密码" prop="confirm_password">-->
          <!--<Input v-model="forms.confirm_password" placeholder="请输入密码" type="password" autocomplete="new-password" />-->
          <!--</Form-item>-->
          <Form-item label="真实姓名" prop="username">
            <Input v-model="forms.person_name" placeholder="请输入真实姓名"></Input>
          </Form-item>
          <Form-item label="证件类型" prop="papers">
            <Select v-model="forms.papers" placeholder="请选择证件类型">
              <Option value="身份证">身份证</Option>
              <Option value="港澳通行证">港澳通行证</Option>
              <Option value="台胞证">台胞证</Option>
              <Option value="护照">护照</Option>
            </Select>
          </Form-item>
          <Form-item label="证件号码" prop="num">
            <Input v-model="forms.num" placeholder="请输入证件号码"></Input>
          </Form-item>
          <Form-item label="运营联系方式" prop="lianxi">
            <Input v-model="forms.lianxi" placeholder="请输入运营联系方式"></Input>
          </Form-item>
          <Form-item label="邮箱" prop="email">
            <Input v-model="forms.email" placeholder="请输入邮箱"></Input>
          </Form-item>
          <Form-item label="有效时间" prop="valid">
            <el-row>
              <el-col :span="11">
                <Form-item prop="date">
                  <Date-picker type="date" placeholder="开始时间" :options="pickerOptions" placement="top-start"
                               v-model="forms.starttime"></Date-picker>
                </Form-item>
              </el-col>
              <el-col :span="2" style="text-align: center;line-height: 42px;">-</el-col>
              <el-col :span="11">
                <Form-item prop="time">
                  <Date-picker type="date" placeholder="结束时间" :options="pickerOptionsdata" placement="top-end"
                               v-model="forms.endtime"></Date-picker>
                </Form-item>
              </el-col>
            </el-row>
          </Form-item>
          <Form-item label="状态" prop="status">
            <Radio-group v-model="forms.status" vertical class="boya-radio-group">
              <Radio label="0">开启</Radio>
              <Radio label="1">关闭</Radio>
            </Radio-group>
          </Form-item>
        </Form>
      </div>
      <div class="drawer-bottom-btn">
        <div class="drawer-btn-container user-btn">
          <Button class="btn-search" @click="handleSubmits('forms')">确定</Button>
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
        modal3: false,
        names: '0',
        dodata: '',
        tableData: [],
        timedata: '',
        currentTime: new Date(),
        times: '',
        dataCheck: false,

        // 删除弹窗相关
        d_modal: false,
        textUp: '您确定要删除这个用户？',
        textUpLoading: '正在删除用户',

        // 开始和结束时间 时间戳格式
        s_time: '',
        _time: '',
        // 新增
        formValidate: {
          email: '',
          name: '',
          password: '',
          confirm_password: '',
          username: '',
          society: '',
          address: '',
          deputy: '',
          papers: '',
          num: '',
          // qu: '',
          phone: '',
          status: '0',
          date: '',
          time: '',
          valid: '',
          organization: '',
          frnum: '',
          pass: '',
          compatriots: '',
          normal_type: '',
        },
        // 编辑
        forms: {
          id: '',
          email: '',
          name: '',
          username: '',
          password: '',
          confirm_password: '',
          society: '',
          address: '',
          deputy: '',
          papers: '',
          num: '',
          qh: '',
          lianxi: '',
          status: '',
          starttime: '',
          endtime: '',
          valid: '',
          organization: '',
          frnum: '',
          pass: '',
          compatriots: '',
          normal_type: '',
        },
        ruleValidate: {
          name: [
            {required: true, message: '用户名不能为空', trigger: 'blur'},
            {pattern: /(^[A-Za-z0-9_()（）\-\u4e00-\u9fa5]*$)/, message: '用户名不能使用特殊字符', trigger: 'blur'}
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
            {required: true, message: '真实名称不能为空', trigger: 'blur'}
          ],
          person_name: [
            {required: true, message: '真实名称不能为空', trigger: 'blur'}
          ],
          organization: [
            {required: true, message: '机构名称不能为空', trigger: 'blur'},
            {pattern: /(^[A-Za-z0-9_()（）\-\u4e00-\u9fa5]*$)/, message: '机构名称不能使用特殊字符', trigger: 'blur'}
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
          frnum: [
            {
              pattern: /(^[A-Z]\d{8}$)/,
              message: '证件号码格式有误！',
              trigger: 'blur'
            }
          ],
          pass: [
            {
              pattern: /(^C\d{8}$)/,
              message: '证件号码格式有误！',
              trigger: 'blur'
            }
          ],
          compatriots: [
            {
              pattern: /(^[A-Z]\d{8}$)/,
              message: '证件号码格式有误！',
              trigger: 'blur'
            }
          ],
          valid: [
            {required: true, type: 'valid', message: '请选择日期', trigger: 'change'}
          ],
          desc: [
            {required: true, message: '请输入个人介绍', trigger: 'blur'},
            {type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur'}
          ],
          phone: [
            {
              pattern: /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/,
              message: '手机格式有误！',
              trigger: 'blur'
            }
          ]
        },
        pickerOptions: {
          disabledDate: time => {
            var sDate = this.times;
            var eDate = this.timedata;
            var sArr = sDate.split("-");
            var eArr = eDate.split("-");
            var sRDate = new Date(sArr[0], sArr[1], sArr[2]);
            var eRDate = new Date(eArr[0], eArr[1], eArr[2]);
            var result = (eRDate - sRDate) / (24 * 60 * 60 * 1000);
            return time && (time.valueOf() < Date.now() - 86400000 || time.valueOf() > Date.now() + (86400000 * result));
          }
        },
        pickerOptionsdata: {
          disabledDate: time => {
            var sDate = this.times;
            var eDate = this.timedata;
            var sArr = sDate.split("-");
            var eArr = eDate.split("-");
            var sRDate = new Date(sArr[0], sArr[1], sArr[2]);
            var eRDate = new Date(eArr[0], eArr[1], eArr[2]);
            var result = (eRDate - sRDate) / (24 * 60 * 60 * 1000);
            return time && (time.valueOf() < Date.now() - 86400000 || time.valueOf() > Date.now() + (86400000 * result));
          }
        },
        pickerOptionsStart: {
          disabledDate: time => {
            var sDate = this.times;
            var eDate = this.timedata;
            var sArr = sDate.split("-");
            var eArr = eDate.split("-");
            var sRDate = new Date(sArr[0], sArr[1], sArr[2]);
            var eRDate = new Date(eArr[0], eArr[1], eArr[2]);
            var result = (eRDate - sRDate) / (24 * 60 * 60 * 1000);
            return time && (time.valueOf() < Date.now() - 86400000 || time.valueOf() > Date.now() + (86400000 * result) || time.valueOf() > this.e_time);
          }
        },
        pickerOptionsEnd: {
          disabledDate: time => {
            var sDate = this.times;
            var eDate = this.timedata;
            var sArr = sDate.split("-");
            var eArr = eDate.split("-");
            var sRDate = new Date(sArr[0], sArr[1], sArr[2]);
            var eRDate = new Date(eArr[0], eArr[1], eArr[2]);
            var result = (eRDate - sRDate) / (24 * 60 * 60 * 1000);
            return time && (time.valueOf() < Date.now() - 86400000 || time.valueOf() > Date.now() + (86400000 * result) || time.valueOf() < this.s_time);
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
      onchang(pageNum){
        this.pageNum = pageNum
        this.created()
      },
      onpage(pageSize){
        this.pageSize = pageSize
        this.created()
      },

      // 搜索
      created(index) {
        if (index) {
          this.pageNum = 1;
        } else {
          this.pageNum = this.pageNum;
        }
        var param = {
          "pagination": this.pageNum,
          "limit": this.pageSize,
          "keyword": this.value
        }
        this.http.teamfilter(param).then(res => {
          console.log(res)
          if (res.data.code === 0) {
            this.totals = res.data.data.team_count;
            var list = res.data.data.team_list_info;
            this.dataCheck = list === undefined || !list.length

            // if()
            var newdata = [];
            var num = (this.pageNum - 1) * 10;
            var nums = 1;
            for (var item of list) {
              var name = ''
              if (item.normal_type == '0') {
                name = item.organization
                // console.log(item.organization)
              } else {
                name = item.person_name
                // console.log(item.person_name)
              }

              if (item != null) {
                var json = {
                  num: num + nums,
                  name: name,
                  address: item.address,
                  c_time: item.c_time,
                  cert_number: item.cert_number,
                  cert_type: item.cert_type,
                  count_node_name: item.count_node_name,
                  countdown: item.countdown,
                  e_time: item.e_time,
                  email: item.email,
                  id: item.id,
                  normal_type: item.normal_type,
                  organization: item.organization,
                  parent_name: item.parent_name,
                  password: item.password,
                  person_name: item.person_name,
                  phone: item.phone,
                  s_time: item.s_time.substring(0, 10),
                  status_type: item.status_type,
                  supervise_node_name: item.supervise_node_name,
                  uscc: item.uscc,
                  user_type: item.user_type,
                  username: item.username,

                  disabled: item.countdown == '已经过期' ? true : false,
                  status: item.status_type == 0 ? true : false,
                  deputy: item.person_name,

                  type: item.cert_type,
                  time: item.countdown,

//                  parent_name: data,
                }
                nums++;
                newdata.push(json);
              }
            }
            this.tableData = newdata;
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        });
        //
        this.http.userinfo().then(res => {
          this.timedata = res.data.data.e_time.substr(0, 10)
          // countdown
        })
      },
      // 切换tab
      changeTab(name) {
        this.names = name
        // console.log(this.names)
      },
      // 法人用户
      checkData(data) {
        let check1 = data.name === '' || data.date === '' || data.time === ''
        let check2 = data.password !== data.confirm_password
        let check3 = data.normal_type == '0' && (data.organization === '' || data.society === '')
        if (check1 || check3) {
          this.http.messageFun('error', "请填写必填信息")
        }
        if (check2) {
          this.http.messageFun('error', '两次密码输入不一致')
        }
        return !(check1 || check2 || check3)
      },
      // 新增确定
      handleSubmit(name) {
        this.formValidate.normal_type = this.names
        if (!this.checkData(this.formValidate)) {
          return false
        }
        // var tell = this.formValidate.qu + this.formValidate.phone
        this.formValidate.date = this.time.timestampToTime(this.formValidate.date, 'DT1')
        this.formValidate.time = this.time.timestampToTime(this.formValidate.time, 'DT1')
        var status = ''
        if (this.names == '0') {
          status = this.formValidate.deputy
        } else {
          status = this.formValidate.username
        }
        var num = ''
        if (this.formValidate.papers == '身份证') {
          num = this.formValidate.num
        } else if (this.formValidate.papers == '护照') {
          num = this.formValidate.frnum
        } else if (this.formValidate.papers == '港澳通行证') {
          num = this.formValidate.pass
        } else if (this.formValidate.papers == '台胞证') {
          num = this.formValidate.compatriots
        }
        var param = {
          username: this.formValidate.name,
          password: this.formValidate.password,
          confirm_password: this.formValidate.confirm_password,
          new_organization: this.formValidate.organization,
          uscc: this.formValidate.society,
          address: this.formValidate.address,
          person_name: status,
          cert_type: this.formValidate.papers,
          cert_number: num,
          phone: this.formValidate.phone,
          s_time: this.formValidate.date,
          e_time: this.formValidate.time,
          status_type: this.formValidate.status,
          email: this.formValidate.email,
          normal_type: this.names,
        }
        console.log(param)
        this.http.teamadd(param).then(res => {
          // console.log(res)
          if (res.data.code === 0) {
            this.$Message.success('提交成功!')
            // this.modal1 = false
            this.reload()
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
//        this.$refs[name].validate((valid) => {
//          if (valid) {
//
//          } else {
//            this.$Message.error('表单验证失败!')
//          }
//        })
        // location.reload();
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
        console.log(row)
        if (row.type == '身份证') {
          this.forms.num = row.cert_number
        } else if (row.type == '护照') {
          this.forms.frnum = row.cert_number
        } else if (row.type == '港澳通行证') {
          this.forms.pass = row.cert_number
        } else if (row.type == '台胞证') {
          this.forms.compatriots = row.cert_number
        }
        this.forms.name = row.username
        this.forms.username = row.username
        this.forms.password = ''
//        this.forms.password = row.password
//        this.forms.confirm_password = row.password
        this.forms.society = row.uscc
        this.forms.address = row.address
        this.forms.deputy = row.deputy
        this.forms.person_name = row.person_name
        this.forms.papers = row.type
        this.forms.lianxi = row.phone
        this.forms.starttime = row.s_time
        this.forms.endtime = row.e_time
        this.forms.organization = row.organization
        this.forms.email = row.email
        this.forms.id = row.id
        this.forms.normal_type = row.normal_type
        if (row.status) {
          this.forms.status = '0'
        } else {
          this.forms.status = '1'
        }
        if (row.normal_type == '0') {
          this.modal2 = true
        } else {
          this.modal3 = true
        }
      },

      //  编辑提交
      handleSubmits(name) {
        if (!this.checkData(this.forms)) {
          return false
        }
        this.forms.starttime = this.time.timestampToTime(this.forms.starttime, 'DT1')
        this.forms.endtime = this.time.timestampToTime(this.forms.endtime, 'DT1')
        var num = ''
        if (this.forms.papers == '身份证') {
          num = this.forms.num
        } else if (this.forms.papers == '护照') {
          num = this.forms.frnum
        } else if (this.forms.papers == '港澳通行证') {
          num = this.forms.pass
        } else if (this.forms.papers == '台胞证') {
          num = this.forms.compatriots
        }
        var person_name = ''
        if (this.forms.normal_type == '0') {
          person_name = this.forms.deputy
        } else {
          person_name = this.forms.person_name
        }
        // console.log(num)
        var param = {
          username: this.forms.name,
//          password: this.forms.password,
          organization: this.forms.organization,
          uscc: this.forms.society,
          address: this.forms.address,
          person_name: person_name,
          cert_type: this.forms.papers,
          cert_number: num,
          phone: this.forms.lianxi,
          s_time: this.forms.starttime,
          e_time: this.forms.endtime,
          status_type: this.forms.status,
          email: this.forms.email,
          normal_type: this.forms.normal_type,
          target_team_id: this.forms.id
        }
        console.log(param)
        this.http.teamedits(param).then(res => {
          if (res.data.code == '0') {
            this.$Message.success('编辑成功!')
            this.reload()
            this.modal2 = false
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
          if (res.data.code === 0) {
            this.d_modal = false
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
          if (res.data.code === 0) {
            this.reload()
          } else {
            this.http.messageFun('error', res.data.msg)
            this.reload()
          }
        })
      },

      startTimeChange(time) {
        this.s_time = this.time.timestampToTime(time, 'DT5')
        console.log(this.s_time)
      },
      endTimeChange(time) {
        this.e_time = this.time.timestampToTime(time, 'DT5')
        console.log(this.e_time)
      },
    }
  }
</script>

<style lang="scss">
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
