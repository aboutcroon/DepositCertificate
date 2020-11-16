<template>
  <div class="boya-view">
    <div v-show="radio1 === '1'">
      <el-row style="width:100%; padding-top: 20px">
        <el-col :span="24">
          <div class="home-main-input" style="width: 386px">
            <Input v-model="value" placeholder="请输入部门名称" @keyup.enter.native="selectGet(1)">
            <Button slot="append" style="color: #fff; height: 100%" @click="selectGet(1)">搜索</Button>
            </Input>
          </div>
        </el-col>
      </el-row>
      <el-table
        class="boya-table"
        :data="tableData"
        style="width: 100%;clear:both;margin-bottom: 20px;"
        :row-style="common.rowStyle"
        empty-text="暂无数据，请重新查询"
        row-key="id">
        <el-table-column prop="id" label="序号" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="org_name" label="单位名称" width="250" show-overflow-tooltip></el-table-column>
        <el-table-column prop="department_name" label="部门名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="group_name" label="小组名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="c_time" label="创建时间" show-overflow-tooltip></el-table-column>
        <el-table-column label="状态" align="center" width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="icon iconfont " :class="scope.row.status_type?'iconactivated':'iconDisable1'"
                  @click="statueup(scope.$index, scope.row)" style="font-size: 21px;"></span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
              <span class="icon iconfont iconedit " @click="handleEdit(scope.$index, scope.row)"></span>
            </el-tooltip>
            <span style="margin:0 4px">|</span>
            <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
              <span class="icon iconfont icondelete" @click="deleteRow(scope.$index, scope.row)"></span>
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
      <el-drawer
        :visible.sync="modal1"
        custom-class="boya-drawer"
        direction="rtl"
        :with-header="false"
        size="28%"
      >
        <div class="drawer-title">
          <span class="icon iconfont iconadd1"></span>
          <span>新增组织架构</span>
        </div>
        <div class="drawer-main">
          <Form ref="formValidate" :model="formValidate" label-position="top" :rules="ruleValidate">

            <Form-item label="等级" prop="grade">
              <Select v-model="formValidate.grade" placeholder="请选择等级">
                <Option value="grade1">部门级别</Option>
                <Option value="grade2">小组级别</Option>
              </Select>
            </Form-item>

            <Form-item label="部门名称" prop="bmmc" v-show="formValidate.grade == 'grade1'">
              <Input v-model="formValidate.bmmc" placeholder="请输入部门名称"/>
            </Form-item>

            <Form-item label="部门名称" prop="bmmc2" v-show="formValidate.grade == 'grade2'">
              <Select v-model="formValidate.bmmc" placeholder="请选择部门名称">
                <Option v-for="item in bm2" :value="item.value">{{ item.label }}</Option>
              </Select>
            </Form-item>
            <Form-item label="小组名称" prop="bumen2" v-show="formValidate.grade == 'grade2'">
              <Input v-model="formValidate.bumen2" placeholder="请输入小组名称"/>
            </Form-item>
          </Form>
        </div>
        <div class="drawer-bottom-btn">
          <div class="drawer-btn-container user-btn">
            <Button class="btn-search" @click="department('formValidate')">确定</Button>
            <Button class="btn-reset" style="margin-left: 5px" @click="cancel">取消</Button>
          </div>
        </div>

      </el-drawer>
      <el-drawer
        :visible.sync="modal2"
        custom-class="boya-drawer"
        direction="rtl"
        :with-header="false"
        size="28%"
      >
        <div class="drawer-title">
          <span class="icon iconfont iconadd1"></span>
          <span>新增单位</span>
        </div>
        <div class="drawer-main">
          <Form ref="unit" :model="unit" label-position="top" :rules="ruleValidate">

            <Form-item label="机构名称" prop="organization">
              <Input v-model="unit.organization" placeholder="请输入机构名称"/>
            </Form-item>
            <Form-item label="社会统一信用代码" prop="uscc">
              <Input v-model="unit.uscc" placeholder="请输入社会统一信用代码"/>
            </Form-item>
            <Form-item label="注册地址" prop="address">
              <Input v-model="unit.address" placeholder="请输入注册地址"/>
            </Form-item>
            <Form-item label="法定代表人" prop="person_name">
              <Input v-model="unit.person_name" placeholder="请输入法定代表人"/>
            </Form-item>
            <Form-item label="证件类型" prop="cert_type">
              <Select v-model="unit.cert_type" placeholder="请选择证件类型">
                <Option value="身份证">身份证</Option>
                <Option value="港澳通行证">港澳通行证</Option>
                <Option value="台胞证">台胞证</Option>
                <Option value="护照">护照</Option>
              </Select>
            </Form-item>
            <Form-item label="证件号码" prop="cert_number">
              <Input v-model="unit.cert_number" placeholder="请输入证件号码"/>
            </Form-item>
          </Form>
        </div>
        <div class="drawer-bottom-btn">
          <div class="drawer-btn-container user-btn">
            <Button class="btn-search" @click="orgAdd('formValidate')">确定</Button>
            <Button class="btn-reset" style="margin-left: 5px" @click="cancel">取消</Button>
          </div>
        </div>

      </el-drawer>
      <el-drawer
        :visible.sync="organization"
        custom-class="boya-drawer"
        direction="rtl"
        :with-header="false"
        size="28%"
      >
        <div class="drawer-title">
          <span class="icon iconfont iconadd1"></span>
          <span>编辑组织架构</span>
        </div>
        <div class="drawer-main">
          <Form ref="formValidate" :model="forms" label-position="top" :rules="ruleValidate">

            <Form-item label="等级" prop="grade">
              <Select v-model="forms.grade" placeholder="请选择等级" disabled>
                <Option value="grade1">部门级别</Option>
                <Option value="grade2">小组级别</Option>
              </Select>
            </Form-item>

            <Form-item label="部门名称" prop="bmmc" v-show="forms.grade == 'grade1'">
              <Input v-model="forms.bmmc" placeholder="请输入部门名称"/>
            </Form-item>

            <Form-item label="部门名称" prop="bmmc2" v-show="forms.grade == 'grade2'">
              <Select v-model="forms.bmmc" placeholder="请选择部门名称">
                <Option v-for="item in bm2" :value="item.value">{{ item.label }}</Option>
              </Select>
            </Form-item>
            <Form-item label="小组名称" prop="bumen2" v-show="forms.grade == 'grade2'">
              <Input v-model="forms.bumen2" placeholder="请输入小组名称"/>
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
    </div>
    <div v-show="radio1 === '2'">
      <el-row style="width: 100%">
        <el-col :span="20">
          <!-- 联级筛选稍后实现 -->
          <!--<el-col class="main-filter-container" >-->
          <!--<span class="icon iconfont iconfilter filter-button " @click="showFilter = !showFilter"><span>筛选</span></span>-->
          <!--</el-col>-->
          <el-col class="main-input-container">
            <el-col class="normal-input">
              <el-cascader
                style="width: 100%"
                v-model="selectedUser"
                :options="user_options"
                placeholder="请选择组织架构"
                :props="{ checkStrictly: true }"
                @keyup.enter.native="createds(1)"
                clearable>
              </el-cascader>
            </el-col>
            <el-col class="normal-input">
              <span class="icon iconfont iconIcon-search "></span>
              <Input v-model="groupname" clearable placeholder="请输入用户名" class="search-input"
                     @keyup.enter.native="createds(1)"/>
            </el-col>
            <el-col class="normal-input">
              <span class="icon iconfont iconIcon-search "></span>
              <Input v-model="groupusername" clearable placeholder="请输入真实姓名" class="search-input"
                     @keyup.enter.native="createds(1)"/>
            </el-col>
          </el-col>
          <el-col class="main-btn-container">
            <Button class="btn-search" @click="createds(1)">查询</Button>
            <Button class="btn-reset" style="margin-left: 5px" @click="handleReset('formValidate')">重置</Button>
          </el-col>
        </el-col>
      </el-row>
      <!--<collapse-transition :collapseData="collapseData" :showFilter="showFilter" :formData="formData" @collapseFun="collapseFun" style="width:98%;margin:0 auto;;padding-top: 20px"/>-->
      <el-table
        class="boya-table"
        :data="tableDatas"
        style="width: 98%;clear:both;margin:auto;margin-bottom: 137px;"
        :row-style="common.rowStyle"
        empty-text="暂无数据，请重新查询">
        <el-table-column prop="num" width="70" label="序号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="organization" label="机构名称" width="250" show-overflow-tooltip></el-table-column>
        <el-table-column prop="department" label="部门名称" width="200" show-overflow-tooltip></el-table-column>
        <el-table-column prop="group_name" label="小组名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="post" label="用户类型" show-overflow-tooltip></el-table-column>
        <el-table-column prop="cert_type" label="用户名" width="160" show-overflow-tooltip></el-table-column>
        <el-table-column prop="person_name" label="真实姓名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="countdown" label="倒计时" show-overflow-tooltip></el-table-column>
        <el-table-column label="状态" align="center" width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="icon iconfont " :class="scope.row.status_type?'iconactivated':'iconDisable1'"
                  @click="statue(scope.$index, scope.row)" style="font-size: 21px;"></span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
              <span class="icon iconfont iconedit " @click="dorole(scope.$index, scope.row)"></span>
            </el-tooltip>
            <span style="margin:0 4px">|</span>
            <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
              <span class="icon iconfont icondelete" @click="doDelete(scope.$index, scope.row)"></span>
            </el-tooltip>
          </template>
        </el-table-column>

      </el-table>
      <div class="float-btn" style="z-index: 4;">
        <div class="create" @click="role=true"><span class="icon iconfont iconcreate "></span></div>
      </div>
      <p class="boya-page">
        <el-pagination
          @size-change="onpage"
          @current-change="onchang"
          :current-page="pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </p>
      <el-drawer
        :visible.sync="role"
        custom-class="boya-drawer"
        direction="rtl"
        :with-header="false"
        size="28%"
      >
        <div class="drawer-title">
          <span class="icon iconfont iconadd1"></span>
          <span>新增用户</span>
        </div>
        <div class="drawer-main boya-scrollbar">
          <Form ref="formValidate" :model="coledata" :rules="ruleValidate" label-position="top">
            <Form-item label="用户名称" prop="name">
              <Input v-model="coledata.name" placeholder="请输入用户名称"/>
            </Form-item>
            <Form-item label="密码" prop="password">
              <Input v-model="coledata.password" placeholder="请输入密码" type="password" autocomplete="new-password"/>
            </Form-item>
            <Form-item label="确认密码" prop="confirm_password">
              <Input v-model="coledata.confirm_password" placeholder="请输入密码" type="password"
                     autocomplete="new-password"/>
            </Form-item>
            <Form-item label="真实姓名" prop="username">
              <Input v-model="coledata.username" placeholder="请输入真实姓名"/>
            </Form-item>
            <Form-item label="岗位类型" prop="papers">
              <Select v-model="coledata.papers" placeholder="请选择岗位类型">
                <Option value="管理员">管理员</Option>
                <Option value="普通用户">普通用户</Option>
              </Select>
            </Form-item>
            <Form-item label="证件类型" prop="card">
              <Select v-model="coledata.card" placeholder="请选择证件类型">
                <Option value="身份证">身份证</Option>
                <Option value="港澳通行证">港澳通行证</Option>
                <Option value="台胞证">台胞证</Option>
                <Option value="护照">护照</Option>
              </Select>
            </Form-item>
            <Form-item label="证件号码" prop="num" v-show="coledata.card == '身份证' || coledata.card == ''">
              <Input v-model="coledata.num" placeholder="请输入证件号码"/>
            </Form-item>
            <Form-item label="证件号码" prop="frnum" v-show="coledata.card == '港澳通行证'">
              <Input v-model="coledata.frnum" placeholder="请输入证件号码"/>
            </Form-item>
            <Form-item label="证件号码" prop="pass" v-show="coledata.card == '台胞证'">
              <Input v-model="coledata.pass" placeholder="请输入证件号码"/>
            </Form-item>
            <Form-item label="证件号码" prop="compatriots" v-show="coledata.card == '护照'">
              <Input v-model="coledata.compatriots" placeholder="请输入证件号码"/>
            </Form-item>
            <Form-item label="运营联系方式" prop="phone">
              <Input v-model="coledata.phone" placeholder="请输入联系号码"/>
            </Form-item>
            <Form-item label="邮箱" prop="emal">
              <Input v-model="coledata.emal" placeholder="请输入邮箱"/>
            </Form-item>
            <Form-item label="所属部门" prop="bumen">
              <el-cascader
                style="width: 100%"
                v-model="coledata.selectedUser2"
                :options="user_options"
                :props="{ checkStrictly: true }"
                clearable>
              </el-cascader>
            </Form-item>
            <Form-item label="有效时间" prop="valids">
              <el-row>
                <el-col :span="11">
                  <Form-item prop="date">
                    <Date-picker type="date" placeholder="开始时间" :options="pickerOptions" placement="top-start"
                                 v-model="coledata.date"></Date-picker>
                  </Form-item>
                </el-col>
                <el-col :span="2" style="text-align: center">-</el-col>
                <el-col :span="11">
                  <Form-item prop="time">
                    <Date-picker type="date" placeholder="结束时间" :options="pickerOptionsdata" placement="top-end"
                                 v-model="coledata.time"></Date-picker>
                  </Form-item>
                </el-col>
              </el-row>
            </Form-item>
            <Form-item label="状态" prop="status">
              <Radio-group v-model="coledata.status" vertical class="boya-radio-group">
                <Radio label="0">开启</Radio>
                <Radio label="1">关闭</Radio>
              </Radio-group>
            </Form-item>
          </Form>
        </div>
        <div class="drawer-bottom-btn">
          <div class="drawer-btn-container user-btn">
            <Button class="btn-search" @click="sure('formValidate')">确定</Button>
            <Button class="btn-reset" style="margin-left: 5px" @click="cancel">取消</Button>
          </div>
        </div>
      </el-drawer>

      <el-drawer
        :visible.sync="editcol"
        custom-class="boya-drawer"
        direction="rtl"
        :with-header="false"
        size="28%"
      >
        <div class="drawer-title">
          <span class="icon iconfont iconadd1"></span>
          <span>编辑用户</span>
        </div>
        <div class="drawer-main boya-scrollbar">
          <Form ref="formValidate" :model="editdata" :rules="ruleValidate" label-position="top">
            <Form-item label="用户名称" prop="name">
              <Input v-model="editdata.name" placeholder="请输入用户名称"/>
            </Form-item>
            <!--<Form-item label="密码" prop="password">-->
            <!--<Input v-model="editdata.password" placeholder="请输入密码" type="password" autocomplete="new-password" />-->
            <!--</Form-item>-->
            <!--<Form-item label="确认密码" prop="confirm_password">-->
            <!--<Input v-model="editdata.confirm_password" placeholder="请输入密码" type="password" autocomplete="new-password" />-->
            <!--</Form-item>-->
            <Form-item label="真实姓名" prop="username">
              <Input v-model="editdata.username" placeholder="请输入真实姓名"/>
            </Form-item>
            <Form-item label="岗位类型" prop="papers">
              <Select v-model="editdata.papers" placeholder="请选择岗位类型">
                <Option value="管理员">管理员</Option>
                <Option value="普通用户">普通用户</Option>
              </Select>
            </Form-item>
            <Form-item label="证件类型" prop="card">
              <Select v-model="editdata.card" placeholder="请选择证件类型">
                <Option value="身份证">身份证</Option>
                <Option value="港澳通行证">港澳通行证</Option>
                <Option value="台胞证">台胞证</Option>
                <Option value="护照">护照</Option>
              </Select>
            </Form-item>
            <Form-item label="证件号码" prop="num" v-show="editdata.card == '身份证' || editdata.card == ''">
              <Input v-model="editdata.num" placeholder="请输入证件号码"/>
            </Form-item>
            <Form-item label="证件号码" prop="frnum" v-show="editdata.card == '港澳通行证'">
              <Input v-model="editdata.frnum" placeholder="请输入证件号码"/>
            </Form-item>
            <Form-item label="证件号码" prop="pass" v-show="editdata.card == '台胞证'">
              <Input v-model="editdata.pass" placeholder="请输入证件号码"/>
            </Form-item>
            <Form-item label="证件号码" prop="compatriots" v-show="editdata.card == '护照'">
              <Input v-model="editdata.compatriots" placeholder="请输入证件号码"/>
            </Form-item>
            <Form-item label="运营联系方式" prop="phone">
              <Input v-model="editdata.phone" placeholder="请输入联系号码"/>
            </Form-item>
            <Form-item label="邮箱" prop="emal">
              <Input v-model="editdata.emal" placeholder="请输入邮箱"/>
            </Form-item>
            <Form-item label="所属部门" prop="bumen">
              <el-cascader
                style="width: 100%"
                v-model="editdata.selectedUser2"
                :options="user_options"
                :props="{ checkStrictly: true }"
                clearable>
              </el-cascader>
            </Form-item>
            <Form-item label="有效时间" prop="valids">
              <el-row>
                <el-col :span="11">
                  <Form-item prop="date">
                    <Date-picker type="date" placeholder="开始时间" :options="pickerOptions" placement="top-start"
                                 v-model="editdata.date"></Date-picker>
                  </Form-item>
                </el-col>
                <el-col :span="2" style="text-align: center">-</el-col>
                <el-col :span="11">
                  <Form-item prop="time">
                    <Date-picker type="date" placeholder="结束时间" :options="pickerOptionsdata" placement="top-end"
                                 v-model="editdata.time"></Date-picker>
                  </Form-item>
                </el-col>
              </el-row>
            </Form-item>
            <Form-item label="状态" prop="status">
              <Radio-group v-model="editdata.status" vertical class="boya-radio-group">
                <Radio label="0">开启</Radio>
                <Radio label="1">关闭</Radio>
              </Radio-group>
            </Form-item>
          </Form>
        </div>
        <div class="drawer-bottom-btn">
          <div class="drawer-btn-container user-btn">
            <Button class="btn-search" @click="ok('formValidate')">确定</Button>
            <Button class="btn-reset" style="margin-left: 5px" @click="cancel">取消</Button>
          </div>
        </div>
      </el-drawer>

    </div>
    <boya-dialog
      :modal="dodele"
      :image="2"
      :loading="loading"
      textUp="是否要删除此用户"
      textDown="您将无法还原它"
      @cancelfun="cancel"
      @confirmfun="dele"></boya-dialog>
    <boya-dialog
      :modal="demo"
      :image="2"
      :loading="loading"
      textUp="是否要删除此部门"
      textDown="您将无法还原它"
      @cancelfun="cancel"
      @confirmfun="demodele"></boya-dialog>
    <boya-dialog
      :modal="dele_team"
      :image="2"
      :loading="loading"
      textUp="是否要删除此小组"
      textDown="您将无法还原它"
      @cancelfun="cancel"
      @confirmfun="teamdele"></boya-dialog>
    <!--<Modal-->
    <!--v-model="dele_team"-->
    <!--title="删除"-->
    <!--@on-ok="dele"-->
    <!--@on-cancel="cancel">-->
    <!--<p>是否要删除此用户</p>-->
    <!--</Modal>-->
    <!--<Modal-->
    <!--v-model="demo"-->
    <!--title="删除"-->
    <!--@on-ok="demodele"-->
    <!--@on-cancel="cancel">-->
    <!--<p>是否要删除此部门</p>-->
    <!--</Modal>-->
    <!--<Modal-->
    <!--v-model="dele_team"-->
    <!--title="删除"-->
    <!--@on-ok="teamdele"-->
    <!--@on-cancel="cancel">-->
    <!--<p>是否要删除此小组</p>-->
    <!--</Modal>-->
    <div class="home-block-RT">
      <el-radio-group v-model="radio1" class="boya-switch-group">
        <el-radio-button label="1">组织架构</el-radio-button>
        <el-radio-button label="2">角色人</el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
  import BoyaDialog from '@/components/ButtonDialog/Dialog/dialog'
  export default {
    inject: ['reload'],
    name: 'group',
    components: {
      BoyaDialog
    },
    data() {
      const validatePassword = (rule, value, callback) => {
        if (value.length > 5) {
          callback()
        } else {
          return callback(new Error('密码长度不能小于6位'));
        }
      }
      return {
        value: '',
        modal1: false,
        modal2: false,
        grades: 0,
        //部门联级
        selectedUser: [],
        organization_name: '',
        user_options: [],
        dataCheck: false,
        loading: false,

        groups: '',
        teams: '',
        groupname: '',
        groupusername: '',
        total: 0,
        pageNum: 1,
        pageSize: 10,
        names: '',
        dodele: false,
        dodata: '',
        organization: false,
        demo: false,
        demodata: '',
        dele_team: false,
        team_data: '',
        // 组织架构表格
        tableData: [],
        timedata: '',
        currentTime: new Date(),
        times: '',
        // 组织新增
        formValidate: {
          bumen2: '',
          zu2: '',
          grade: 'grade1',
          bmmc: '',
          xzmc: ''
        },
        unit: {
          organization: '',
          uscc: '',
          address: '',
          person_name: '',
          cert_type: '',
          cert_number: ''
        },
        // 组织编辑
        forms: {
          bumen2: '',
          zu2: '',
          grade: 'grade1',
          bmmc: '',
          bmmc2: '',
          xzmc: ''
        },
        // 编辑
        formedit: {
          bume: '',
          zu2: '',
          grade: 'grade1',
          bmmc: '',
          bmmc2: '',
          xzmc: ''
        },
        bm: [],
        // 编辑参数
        full_depart_id: '',
        org_name: '',
        full_group_id: '',
        bmedit: [
          {
            value: 'aaa',
            label: '部门'
          }
        ],
        xmz: [],
        xmzedit: [],
        bm2: [],
        bmmcedit: [],
        xmz2: [],

        // 角色人设置
        //  编辑
        editcol: false,
        editdata: {
          id: '',
          card: '',
          name: '',
          password: '',
          confirm_password: '',
          username: '',
          papers: '',
          num: '',
          emal: '',
          phone: '',
          status: '0',
          date: '',
          time: '',
          valid: '',
          bumen: '',
          bumen2: '',
          zu: '',
          zu2: '',
          grade: 'grade1',
          bmmc: '',
          bmmc2: '',
          xzmc: '',
          frnum: '',
          pass: '',
          compatriots: '',
          selectedUser2: '',
        },
        tableDatas: [],
        // 新增
        role: false,
        coledata: {
          card: '',
          name: '',
          password: '',
          confirm_password: '',
          username: '',
          papers: '',
          num: '',
          emal: '',
          phone: '',
          status: '0',
          date: '',
          time: '',
          valid: '',
          bumen: '',
          bumen2: '',
          zu: '',
          zu2: '',
          grade: 'grade1',
          bmmc: '',
          bmmc2: '',
          xzmc: '',
          frnum: '',
          pass: '',
          compatriots: '',
          selectedUser2: '',
        },
        ruleValidate: {
          name: [
            {required: true, message: '姓名不能为空', trigger: 'blur'},
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
            {required: true, message: '真实姓名不能为空', trigger: 'blur'}
          ],
          emal: [
            {required: true, message: '邮箱不能为空', trigger: 'blur'}
          ],
          valids: [
            {required: true, message: '请选择日期', trigger: 'change'}
          ],
          desc: [
            {required: true, message: '请输入个人介绍', trigger: 'blur'},
            {type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur'}
          ],
          organization: [
            {required: true, message: '请输入机构名称', trigger: 'blur'},
            {pattern: /(^[A-Za-z0-9_()（）\-\u4e00-\u9fa5]*$)/, message: '机构名称不能使用特殊字符', trigger: 'blur'}
          ],
          uscc: [
            {required: true, message: '请输入社会统一信用代码', trigger: 'blur'}
          ],
          phone: [
            {
              pattern: /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/,
              message: '手机格式有误！',
              trigger: 'blur'
            }
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
          bumen: [
            {required: true, message: '所属部门不能为空', trigger: 'blur'}
          ],
          selectedUser2: [
            {required: true, message: '所属部门不能为空', trigger: 'blur'}
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
        radio1: '1'
      }
    },
    created() {
      this.createds()
      this.droupDown()
      this.selectGet()
      this.getUesrInfo()

    },
    methods: {
      onchang(pageNum){
        this.pageNum = pageNum
        this.createds()
      },
      onpage(pageSize){
        this.pageSize = pageSize
        this.createds()
      },
      //获取用户信息
      getUesrInfo() {
        this.http.userinfo().then(res => {
          // console.log(res)
          if (res.data.code === 0) {
            this.organization_name = res.data.data.organization
            this.getOrg()
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      },
      //获取组织架构
      getOrg() {
        this.http.organizationlink().then(res => {
          if (res.data.code === 0) {
            var list = res.data.data.org_list_info;
            var data = []
            for (var item1 of list) {
              if (item1.org_name === this.organization_name) {
                var devList = item1.full_org_obj
                console.log(devList)
                for (var item2 of devList) {
                  var json2 = {
                    value: item2.department_name,
//                    value: item2.full_depart_id,
                    label: item2.department_name,
                    children: []
                  }
                  var groupList = item2.full_depart_obj
                  for (var item3 of groupList) {
                    var json3 = {
//                      value: item3.full_group_id,
                      value: item3.group_name,
                      label: item3.group_name,
                    }
                    json2.children.push(json3)
                  }
                  data.push(json2)
                }
              }
            }
            console.log(data)
            this.user_options = data
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      },
      // 删除部门,小组
      deleteRow(index, rows) {
        // console.log(rows)
        if (Number.isInteger(rows.id) == true) {
          this.demo = true
          var params = {
            full_depart_id: rows.full_depart_id,
            org_name: rows.org_name,
            department_name: rows.department_name
          }
          this.demodata = params
        } else {
          this.dele_team = true
          var param = {
            full_group_id: rows.full_group_id,
            org_name: rows.org_name,
            group_name: rows.group_name,
            depart_name: rows.department_name
          }
          this.team_data = param
        }
      },
      // 删除部门
      demodele() {
        this.http.departdelete(this.demodata).then(res => {
          if (res.data.code === 0) {
            this.reload()
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      },
      // 删除小组
      teamdele() {
        this.http.groupdelete(this.team_data).then(res => {
          if (res.data.code === 0) {
            this.reload()
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      },
      // 开启关闭小组
      handleOpen(index, row) {
        // console.log(row)
        if (Number.isInteger(row.id) == true) {
          var params = {
            full_depart_id: row.full_depart_id,
            org_name: row.org_name,
            department_name: row.department_name
          }
          this.http.departclose(params).then(res => {
            if (res.data.code === 0) {
              this.reload()
            } else {
              this.http.messageFun('error', res.data.msg)
            }
          })
        } else {
          var param = {
            full_group_id: row.full_group_id,
            org_name: row.org_name,
            group_name: row.group_name,
            depart_name: row.department_name,
          }
          this.http.groupclose(param).then(res => {
            if (res.data.code === 0) {
              this.reload()
            } else {
              this.http.messageFun('error', res.data.msg)
            }
          })
        }
      },
      // 组织架构编辑
      handleEdit(index, row) {
        console.log(row)
        this.organization = true;
        if (Number.isInteger(row.id) == true) {
          this.forms.grade = 'grade1'
        } else {
          this.forms.grade = 'grade2'
        }
        this.forms.bmmc = row.department_name
        this.forms.bmmc2 = row.depart_name
        this.forms.bumen2 = row.group_name
        this.full_depart_id = row.full_depart_id
        this.org_name = row.org_name
        this.full_group_id = row.full_group_id
      },
      // 下拉框选择
      droupDown() {
        // 部门
        this.http.departmentshow().then(res => {
          // console.log(res)
          if (res.data.code === 0) {
            var list = res.data.data.department_list_info;
            // console.log(list)
            var data = []
            for (var index of list) {
              var json = {
                value: index.department_name,
                label: index.department_name
              }
              data.push(json)
            }
            this.bm = data
            this.bm2 = data
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      },
      change() {
        // 新增小组
        this.http.groupshow({department: this.coledata.bumen}).then(res => {
          // console.log(res)
          if (res.data.code === 0) {
            var list = res.data.data.group_list_info;
            console.log(list)
            var data = []
            for (var index of list) {
              var json = {
                value: index.group_name,
                label: index.group_name
              }
              data.push(json)
            }
            this.xmz = data
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      },
      // 编辑下拉
      changes() {
        this.http.groupshow({department: this.editdata.bumen}).then(res => {
          // if (res.data.code == '0'){
          var list = res.data.data.group_list_info;
          var data = []
          for (var index of list) {
            var json = {
              value: index.group_name,
              label: index.group_name
            }
            data.push(json)
          }
          this.xmz = data
          // }else{
          //   this.http.messageFun('error',res.data.msg)
          // }
        })
      },
      onchange() {
        this.http.groupshow({department: this.groups}).then(res => {
          // if (res.data.code == '0'){
          var list = res.data.data.group_list_info;
          var data = []
          for (var index of list) {
            var json = {
              value: index.group_name,
              label: index.group_name
            }
            data.push(json)
          }
          this.xmz = data
          // }else{
          //   this.http.messageFun('error',res.data.msg)
          // }
        })
      },
      // 重置
      handleReset (name) {
        // this.$refs.formValidate.resetFields()
        this.groups = '';
        this.teams = '';
        this.groupname = '';
        this.groupusername = '';
        this.createds();
      },
      // 组织架构查询
      selectGet() {
        this.http.groupadmin({keyword: this.value}).then(res => {
          // console.log(res)
          if (res.data.code == '0') {
            var list = res.data.data.depart_list_info
            this.dataCheck = list === undefined || !list.length

            for (var num of list) {
              // console.log(num)
              num.status_type = num.status_type == 0 ? true : false
              for (var status of num.full_depart_obj) {
                status.status_type = status.status_type == 0 ? true : false
              }
            }
            for (var time of list) {
              time.c_time = this.time.timestampToTime(time.c_time, 'DT2')
              for (var times of time.full_depart_obj) {
                times.c_time = this.time.timestampToTime(times.c_time, 'DT2')
              }
            }
            for (var item of list) {
              for (var it of item.full_depart_obj) {
                // console.log(it)
                it.depart_name = item.department_name //部门名称
              }
            }
            for (var item of list) {
              if (item.full_depart_obj.length !== 0) {
                item.group_name = item.full_depart_obj[0].group_name
              }
            }
            for (var index in list) {
              list[index].id = (Number(index) + 1) //序号
              for (var ind in list[index].full_depart_obj) {
                list[index].full_depart_obj[ind].id = (Number(index) + 1) + '.' + (Number(ind) + 1)
              }
            }
            this.tableData = list
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      },

      // 角色人设置查询
      createds(index) {
        if (this.selectedUser.length > 0) {
          this.groups = this.selectedUser[0]
        }
        if (this.selectedUser.length > 1) {
          this.teams = this.selectedUser[1]
        }
        if (index) {
          this.pageNum = 1;
        } else {
          this.pageNum = this.pageNum;
        }
        var param = {
          department_name: this.groups,
          group_name: this.teams,
          username: this.groupname,
          person_name: this.groupusername,
          pagination: this.pageNum,
          limit: this.pageSize,
        }
        // console.log(param)
        this.http.stafffilter(param).then(res => {
          if (res.data.code === 0) {
            this.total = res.data.data.staff_count
            var list = res.data.data.staff_list_info;
            this.dataCheck = list === undefined || !list.length;
            // console.log(list)
            var newdata = [];
            var num = (this.pageNum - 1) * 10;
            var nums = 1;
            for (var item of list) {
              if (item != null) {
                var json = {
                  num: num + nums,
                  organization: item.organization,
                  department: item.department,
                  group_name: item.group_name,
                  cert_type: item.username,
                  post: item.post,
                  username: item.username,
                  password: item.password,
                  person_name: item.person_name,
                  countdown: item.countdown,
                  status_type: item.status_type == 0 ? true : false,

                  card: item.cert_type,
                  disabled: item.countdown == '已经过期' ? true : false,
                  cert_number: item.cert_number,
                  s_time: item.s_time,
                  phone: item.phone,
                  e_time: item.e_time,
                  email: item.email,
                  user_type: item.user_type,
                  id: item.id
                }
                nums++;
                newdata.push(json);
              }
            }
            this.tableDatas = newdata;
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        });
        this.http.userinfo().then(res => {
          this.timedata = res.data.data.e_time.substr(0, 10)
          // countdown
        })
      },
      checkData(data) {
        let check1 = data.name === '' ||
//          data.password === '' ||
          data.username === '' ||
          data.emal === '' ||
          data.date === '' ||
          data.time === '' ||
          data.selectedUser2 === ''
//        let check2 = data.password !== data.confirm_password
        if (check1) {
          this.http.messageFun('error', "请填写必填信息")
        }
        return !(check1)
      },
      // 角色人新增
      sure(name) {
        if (!this.checkData(this.coledata)) {
          return false
        }
        this.coledata.date = this.time.timestampToTime(this.coledata.date, 'DT1')
        this.coledata.time = this.time.timestampToTime(this.coledata.time, 'DT1')
        var num = ''
        if (this.coledata.card == '身份证') {
          num = this.coledata.num
        } else if (this.coledata.card == '港澳通行证') {
          num = this.coledata.frnum
        } else if (this.coledata.card == '台胞证') {
          num = this.coledata.pass
        } else if (this.coledata.card == '护照') {
          num = this.coledata.compatriots
        }
        let list = this.coledata.selectedUser2
        if (list.length > 0) {
          this.coledata.bumen = list[0]
        }
        if (list.length > 1) {
          this.coledata.zu = list[1]
        }
        var param = {
          username: this.coledata.name,
          password: this.coledata.password,
          department: this.coledata.bumen,
          group_name: this.coledata.zu,
          person_name: this.coledata.username,
          cert_type: this.coledata.card,
          cert_number: num,
          post: this.coledata.papers,
          phone: this.coledata.phone,
          s_time: this.coledata.date,
          e_time: this.coledata.time,
          status_type: this.coledata.status,
          email: this.coledata.emal,
          normal_type: this.names,
          organization: ''
        }
        // console.log(param)
        this.http.staffadd(param).then(res => {
          // console.log(res)
          if (res.data.code == '2002') {
            this.$Message.error(res.data.msg);
          } else if (res.data.code == '0') {
            this.$Message.success('提交成功!')
            this.role = false
            this.createds()
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      },
      // 编辑
      dorole(index, row) {
        console.log(row)
        if (row.card == '身份证') {
          this.editdata.num = row.cert_number
        } else if (row.card == '护照') {
          this.editdata.compatriots = row.cert_number
        } else if (row.card == '港澳通行证') {
          this.editdata.frnum = row.cert_number
        } else if (row.card == '台胞证') {
          this.editdata.pass = row.cert_number
        }
        this.editdata.name = row.username;
//        this.editdata.password = row.password;
//        this.editdata.confirm_password = row.password;
        this.editdata.username = row.person_name;
        this.editdata.papers = row.cert_type;
        this.editdata.date = row.s_time;
        this.editdata.time = row.e_time;
        this.editdata.phone = row.phone;
        this.editdata.bumen = row.department;
        this.editdata.zu = row.group_name;
        this.editdata.card = row.card;
        this.editdata.emal = row.email;
        this.editdata.id = row.id;
        let list = []
        if (this.editdata.bumen.length > 0) {
          list.push(this.editdata.bumen)
        }
        if (this.editdata.zu.length > 0) {
          list.push(this.editdata.zu)
        }
        this.editdata.selectedUser2 = list
        if (row.status_type) {
          this.editdata.status = '0'
        } else {
          this.editdata.status = '1'
        }
        if (row.post == '管理员') {
          this.editdata.papers = '管理员'
        } else if (row.post == '普通用户') {
          this.editdata.papers = '普通用户'
        }
        //  下拉框选项
        this.http.groupshow({department: this.editdata.bumen}).then(res => {
          // if (res.data.code == '0'){
          var list = res.data.data.group_list_info;
          var data = []
          for (var index of list) {
            var json = {
              value: index.group_name,
              label: index.group_name
            }
            data.push(json)
          }
          this.xmz = data
          // }else{
          // this.http.messageFun('error',res.data.msg)
          // }
        })
        this.editcol = true
      },
      // 编辑提交
      ok(name) {
        if (!this.checkData(this.editdata)) {
          return false
        }
        // card
        this.editdata.date = this.time.timestampToTime(this.editdata.date, 'DT1')
        this.editdata.time = this.time.timestampToTime(this.editdata.time, 'DT1')
        var num = ''
        if (this.editdata.card == '身份证') {
          num = this.editdata.num
        } else if (this.editdata.card == '护照') {
          num = this.editdata.compatriots
        } else if (this.editdata.card == '港澳通行证') {
          num = this.editdata.frnum
        } else if (this.editdata.card == '台胞证') {
          num = this.editdata.pass
        }
        let list = this.editdata.selectedUser2
        if (list.length > 0) {
          this.editdata.bumen = list[0]
        }
        if (list.length > 1) {
          this.editdata.zu = list[1]
        }
        // console.log(num)
        var param = {
          username: this.editdata.name,
//          password: this.editdata.password,
          department: this.editdata.bumen,
          group_name: this.editdata.zu,
          person_name: this.editdata.username,
          cert_type: this.editdata.card,
          post: this.editdata.papers,
          cert_number: num,
          phone: this.editdata.phone,
          s_time: this.editdata.date,
          e_time: this.editdata.time,
          status_type: this.editdata.status,
          email: this.editdata.emal,
          normal_type: this.names,
          target_staff_id: this.editdata.id
        }
        console.log(param)
        this.http.staffedit(param).then(res => {
          // console.log(res)
          if (res.data.code == '2002') {
            this.$Message.error(res.data.msg);
          } else if (res.data.code == '0') {
            this.$Message.success('提交成功!')
            this.reload()
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      },
      // 新增部门
      department() {
        if (this.formValidate.grade == 'grade1') {
          this.http.departmentadd({new_department: this.formValidate.bmmc}).then(res => {
            // console.log(res)
            if (res.data.code == '0') {
              this.modal1 = false
              this.reload()
            } else if (res.data.code == '2023') {
              this.modal1 = false
              this.modal2 = true
            } else {
              this.http.messageFun('error', res.data.msg)
            }
          })
        } else {
          var param = {
            department: this.formValidate.bmmc,
            new_group: this.formValidate.bumen2
          }
          this.http.groupadd(param).then(res => {
            if (res.data.code == '0') {
              this.modal1 = false
              this.reload()
            } else {
              this.http.messageFun('error', res.data.msg)
            }
          })
        }
      },
      // 新增单位
      orgAdd() {
        var param = {
          organization: this.unit.organization,
          uscc: this.unit.uscc,
          address: this.unit.address,
          person_name: this.unit.person_name,
          cert_type: this.unit.cert_type,
          cert_number: this.unit.cert_number
        }
        this.http.orgadd(param).then(res => {
          if (res.data.code == '0') {
            this.modal2 = false
            this.reload()
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      },
      // 部门编辑提交
      handleSubmit (name) {
        console.log(this.forms.grade)
        if (this.forms.grade == 'grade1') {
          var param = {
            full_depart_id: this.full_depart_id,
            org_name: this.org_name,
            department_name: this.forms.bmmc,
          }
          this.http.departedit(param).then(res => {
            if (res.data.code == '0') {
              this.$Message.success('提交成功!')
              this.organization = false
              this.reload()
            } else {
              this.http.messageFun('error', res.data.msg)
            }
          })
        } else {
          var params = {
            full_group_id: this.full_group_id,
            org_name: this.org_name,
            department_name: this.forms.bmmc2,
            group_name: this.forms.bumen2
          }
          console.log(params)
          this.http.groupedit(params).then(res => {
            if (res.data.code == '0') {
              this.$Message.success('提交成功!')
              this.organization = false
              this.reload()
            } else {
              this.http.messageFun('error', res.data.msg)
            }
          })
        }
      },

      cancel() {
        this.$Message.info('点击了取消');
        this.modal1 = false;
        this.role = false;
        this.editcol = false;
        this.organization = false;
        this.dodele = false
        this.demo = false
        this.dodele = false
        this.handleReset()
      },
      doDelete(index, row) {
        this.dodata = row.id
        this.dodele = true
      },
      dele() {
        this.http.userdelete({target_id: this.dodata}).then(res => {
          // console.log(res)
          if (res.data.code == '0') {
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
            this.http.messageFun('success', res.data.msg)
            this.reload()
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      },
      statueup(index, row){
        // console.log(row)
        if (row.group_name == '————') {
          // 部门
          var params = {
            full_depart_id: row.full_depart_id,
            org_name: row.org_name,
            department_name: row.department_name
          }
          this.http.departclose(params).then(res => {
            if (res.data.code = '0') {
              this.http.messageFun('success', res.data.msg)
              this.reload()
            } else {
              this.http.messageFun('error', res.data.msg)
            }
          })
        } else {
          // 小组
          var param = {
            full_group_id: row.full_group_id,
            org_name: row.org_name,
            group_name: row.group_name,
            depart_name: row.department_name
          }
          this.http.groupclose(param).then(res => {
            if (res.data.code = '0') {
              this.http.messageFun('success', res.data.msg)
            } else {
              this.http.messageFun('error', res.data.msg)
            }
          })
        }
      }
    }
  }
</script>

<style lang="less">
  @import './index.less';

  .team_head {
    margin: 0 auto;
    padding-bottom: 20px;
  }

  .team_cont {
    float: right;
    border: 1px solid #ccc;
    border-radius: 5px;
    position: relative;
  }

  .team_cont input {
    border: 0;
    font-size: 14px;
    line-height: 30px;
    height: 31px;
  }

  .el-table__expanded-cell {
    padding: 0 !important;
  }

  .el-table__expanded-cell .el-table__header-wrapper {
    display: none !important;
  }

  body .el-table th.gutter {
    display: table-cell !important;
  }

  .ivu-form {
    width: 100%
  }

  .ivu-modal-body {
    margin: 0 auto;
  }

  .sensus_font {
    display: inline-block;
    margin-top: 7px;
    text-align: right;
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
