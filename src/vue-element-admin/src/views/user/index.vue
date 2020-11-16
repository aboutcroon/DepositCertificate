<template>
  <div class="boya-user" style="margin:34px 20px; min-height: calc(100vh - 222px)">
    <div class="back1"><img src="../../assets/img/BG.png" style="height: 180px; width: 100%;"></div>
    <div class="user-card2">
      <el-tabs v-model="tabPosition">
        <el-tab-pane label="基础信息" name="1">
          <div class="card2-tab">
            <div class="card2-row" v-if="getPermission != '4'"><span class="card2-title">企业名称</span><span style="font-weight: 500">{{organization}}</span>
            </div>
            <!--<div class="card2-row"><span class="card2-title">单位注册地址</span><span>{{address}}</span></div>-->
            <div class="card2-row"><span class="card2-title">法人代表</span><span style="font-weight: 500">{{legal_person}}</span></div>
            <!--<div class="card2-row"><span class="card2-title">法人证件类型</span><span>{{cert_type}}</span></div>-->
            <div class="card2-row"><span class="card2-title">有效时间</span><span style="font-weight: 500">{{s_time}}~{{e_time}}</span></div>
            <div class="card2-row" v-if="getPermission == '4'"><span
              class="card2-title">appid</span><span>{{secret_id}}</span></div>
            <div class="card2-row" v-if="getPermission == '4'"><span class="card2-title">appsecret</span><span style="font-weight: 500">{{secret_key}}</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="修改信息" name="2">
          <div class="card2-tab">
            <Form :model="formItem" ref="formFilter" label-position="left" :label-width="112" :rules="ruleValidate">
              <Form-item label="用户名" prop="value11">
                <Input disabled v-model="formItem.value11" :placeholder="user_name"></Input>
              </Form-item>
              <Form-item label="旧密码" prop="value1">
                <Input v-model="formItem.value1" placeholder="请输入旧密码" type="password"></Input>
              </Form-item>
              <Form-item label="新密码" prop="value2">
                <Input v-model="formItem.value2" placeholder="请输入新密码" type="password"></Input>
              </Form-item>
              <Form-item label="确认新密码" prop="value3">
                <Input v-model="formItem.value3" placeholder="请确认新密码" type="password"></Input>
              </Form-item>
              <Form-item label="运营联系方式" prop="phone">
                <Input v-model="formItem.phone" placeholder="请输入运营联系方式"></Input>
              </Form-item>
            </Form>
            <div class="drawer-btn-container user-btn">
              <Button class="btn-search" @click="sure('formFilter')">确定</Button>
              <Button class="btn-reset" style="margin-left: 28px" @click="handleReset">重置</Button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="密钥管理" name="3" v-if="getPermission != '4'">
          <div class="card2-tab3">
            <div class="card2-row"><span class="card2-title icon iconfont iconnotice11"></span><span>开放平台不会以任何形式(包括不限于：邮件、社交软件、电话、短信等)获取密钥，请务必妥善保管不要泄漏给他人。</span>
            </div>
            <div class="card2-row" @click="showSecret = !showSecret"><span
              class="card2-title icon iconfont iconKey"></span><span>查看</span></div>
            <div class="card2-row" v-if="showSecret">
              <div class="secret-block">
                <div class="secret-title">
                  SERCETID：
                </div>
                <div class="secret-text">
                  {{secret_id}}
                </div>
              </div>
              <div class="secret-block">
                <div class="secret-title">
                  SERCETKEY：
                </div>
                <div class="secret-text">
                  {{secret_key}}
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="user-card1">
      <div class="top_head">
        <div class="img-head">
          <!--              <img src="../../assets/img/默认企业logo.png">-->
          <img v-if="imageUrl" :src="imageUrl">
        </div>
        <div class="card1-btn-text" v-show="tabPosition === '1'" style="margin-top:26px">{{user_name}}</div>
        <el-upload
          v-show="tabPosition !== '1'"
          ref="upload"
          class="upload-demo"
          action="/beaas/api/avatar_up/"
          :on-preview="handlePreview"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          style="margin-top:26px">
          <div class="card1-btn-text" @click="submitUpload">上传logo</div>
        </el-upload>
      </div>
      <div class="card1-main">
        <div class="card1-title">单位注册地址</div>
        <div class="card1-text">{{address}}</div>
        <div class="card1-title" v-if="getPermission == '0'">账号</div>
        <div class="card1-text" v-if="getPermission == '0'">{{person_name}}</div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'index',
    computed: {
      getPermission(){
        return sessionStorage.getItem('key')
      }
    },
    data () {
      const validatePassword = (rule, value, callback) => {
        if (value.length > 5) {
          callback()
        } else {
          return callback(new Error('密码长度不能小于6位'));
        }
      }
      const validatePasswords = (rule, value, callback) => {
        if (value === this.formItem.value2) {
          callback()
        } else {
          return callback(new Error('两次输入的密码不一致'));
        }
      }
      return {
        formItem: {
          value11: '',
          // 旧密码
          value1: '',
          //  新密码
          value2: '',
          value3: '',
          //  运营联系方式2
          phone: '',
        },
        // 显示信息
        cert_type: '',
        address: '',
        person_name: '',
        organization: '',
        user_name: '',
        s_time: '',
        e_time: '',
        imageUrl: '',
        avatar: '',
        legal_person: '',

        showSecret: false,
        secret_id: '',
        secret_key: '',
        //标签页
        tabPosition: '1',
        ruleValidate: {
          value11: [
            {required: true, message: '用户名不能为空', trigger: 'blur'}
          ],
          value1: [
            {required: true, message: '旧密码不能为空', trigger: 'blur'},
            {validator: validatePassword, trigger: 'blur'}
          ],
          value2: [
            {required: false, message: ' ', trigger: 'blur'},
            {validator: validatePassword, trigger: 'blur'}
          ],
          value3: [
            {required: false, message: ' ', trigger: 'blur'},
            {validator: validatePasswords, trigger: 'blur'}
          ],
          phone: [
            {required: false, message: ' ', trigger: 'blur'}
          ],
        },
      }
    },
    mounted(){
      this.exhibition();
    },
    methods: {
      // 上传头像
      handlePreview(file) {
        console.log(file);
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = ['image/jpeg', 'image/png', 'image/gif'].includes(file.type);  //包含类型
        if (!isJPG) {
          this.$message.error('上传头像图片不属于 JPG 、PNG、GIF格式!');
        }
        return isJPG;
      },
      exhibition() {
        // 获取用户信息
        this.http.accounteditget().then(res => {
          // console.log(res)
          if (res.status == '200') {
            var accedit = res.data.data.user_info
            this.cert_type = accedit.cert_type
            this.address = accedit.address
            this.person_name = accedit.person_name
            this.user_name = accedit.username
            this.organization = accedit.organization
            this.formItem.phone = accedit.phone
            this.s_time = this.time.timestampToTime(accedit.s_time, 'DT8')
            this.e_time = this.time.timestampToTime(accedit.e_time, 'DT8')
            this.imageUrl = accedit.avatar
            this.formItem.phone = accedit.phone
            this.secret_id = accedit.secret_id
            this.secret_key = accedit.secret_key
            this.legal_person = accedit.legal_person
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      },
      handleReset() {
        let tmp = this.formItem.value11
        this.formItem = {
          value11: tmp,
          // 旧密码
          value1: '',
          //  新密码
          value2: '',
          value3: '',
          //  运营联系方式2
          phone: '',
        }
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      sure(name) {
        //  修改密码
        if (this.formItem.value1 != '') {
          if (this.formItem.value2 === this.formItem.value1) {
            this.$message.error('新密码不能和旧密码相同');
          } else if (this.formItem.value2 !== this.formItem.value3) {
            this.$message.error('两次输入密码不一致');
          } else {
            let param = {
              old_password: this.formItem.value1,
              new_password: this.formItem.value2,
              confirm_password: this.formItem.value3,
              new_phone: this.formItem.phone
            }
            this.http.accountedit(param).then(res => {
              if (res.data.code == '0') {
                this.$message({
                  message: '我的账号信息修改成功',
                  type: 'success'
                });
                this.$refs[name].resetFields()
                this.exhibition()
              } else {
                this.http.messageFun('error', res.data.msg)
              }
            })
          }
        } else {
          this.$message.error('旧密码不能为空');
        }
      }
    }
  }
</script>

<style lang="less">
  @import './index.less';
</style>
