<template>
  <el-row class="login-container">
    <el-col :span="13" class="login-left">
      <guide-page>

      </guide-page>
    </el-col>
    <el-col :span="11" class="login-right">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on"
               label-position="top">

        <div class="title-container">
          <h3 class="title">欢迎登录数据存证系统</h3>
        </div>

        <el-form-item prop="username" label="用户名" class="login-form-item">
          <div class="login-form-input">
            <span class="svg-container icon iconfont iconusername">

            </span>
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="用户名"
              name="username"
              type="text"
              tabindex="1"
              autocomplete="on"
              @keyup.enter.native="handleLogin"
            />
          </div>

        </el-form-item>

        <el-tooltip v-model="capsTooltip" content="大写锁定打开" placement="right" manual>
          <el-form-item prop="password" label="密码" class="login-form-item">
            <div class="login-form-input">
              <span class="svg-container icon iconfont iconpassword">
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="密码"
                name="password"
                tabindex="1"
                autocomplete="on"
                @keyup.native="checkCapslock"
                @blur="capsTooltip = false"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd icon iconfont" @click="showPwd"
                    :class="passwordType === 'password' ? 'iconicons8-visible' : 'iconicons8-visible_filled'">
          </span>
            </div>

          </el-form-item>
        </el-tooltip>
        <el-form-item prop="yanzheng" label="验证码" class="login-form-item">
          <div class="login-form-input">
            <span class="svg-container icon iconfont iconcode">
            </span>
            <el-input
              ref="yanzheng"
              v-model="loginForm.yanzheng"
              placeholder="验证码"
              name="yanzhengma"
              type="text"
              tabindex="1"
              autocomplete="on"
              style="width: 50%; vertical-align: middle"
              @keyup.enter.native="handleLogin"
            />
            <p style="display: inline-block;margin-left:1rem;margin-top: 8px;float: right" @click="generatedCode">
              <span class="icon iconfont iconreflash "></span>
            </p>
            <div class="code-style" @click="generatedCode" style="margin-top: 8px;float: right">{{ checkCode }}</div>
          </div>
        </el-form-item>


        <el-button :loading="loading" type="primary"
                   style="border: none;width:100%;margin-top:52px;clear: both;height: 50px;background: #EBEBF2; color: #3B3783"
                   @click.native.prevent="handleLogin">登录
        </el-button>


      </el-form>

    </el-col>
  </el-row>
</template>

<script>
  import Transfer from '../../api/transfer.js'
  import GuidePage from './guide/index'

  export default {
    name: 'Login',
    components: {
      GuidePage
    },
    data() {
      const validateUsername = (rule, value, callback) => {
        callback()
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能少于6位'))
        } else {
          callback()
        }
      }
      return {
        checkCode: '',
        loginForm: {
          username: '',
          password: '',
          yanzheng: ''
        },
        loginRules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername},
            {pattern: /(^[A-Za-z0-9_()（）\-\u4e00-\u9fa5]*$)/, message: '用户名不能使用特殊字符', trigger: 'blur'}],
          password: [{required: true, trigger: 'blur', validator: validatePassword}]
        },
        passwordType: 'password',
        capsTooltip: false,
        loading: false,
        showDialog: false,
        redirect: undefined,
        otherQuery: {}
      }
    },
    watch: {
      $route: {
        handler: function (route) {
          const query = route.query
          if (query) {
            this.redirect = query.redirect
            this.otherQuery = this.getOtherQuery(query)
          }
        },
        immediate: true
      }
    },
    created() {
      // window.addEventListener('storage', this.afterQRScan)
    },
    mounted() {
      if (this.loginForm.username === '') {
        this.$refs.username.focus()
      } else if (this.loginForm.password === '') {
        this.$refs.password.focus()
      }
      this.generatedCode()
    },
    destroyed() {
      // window.removeEventListener('storage', this.afterQRScan)
    },
    methods: {
      checkCapslock(e) {
        const {key} = e
        this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin() {
        // 判断验证码是否正确
        if (this.loginForm.yanzheng != this.checkCode) {
          this.$Notice.error({
            title: '验证码输入错误',
            duration: 2
          })
          return false
        }
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('user/login', this.loginForm)
              .then((res) => {
                var value = sessionStorage.getItem('key')
                console.log(value)
                var data = JSON.parse(value)
                if (data == '3' || data == '4') {
                  this.$router.push({path: '/', query: this.otherQuery})
                  this.$router.go(0)
                } else if (data == '2' || data == '1') {
                  this.$router.push({path: '/', query: this.otherQuery})
                } else if (data == '0') {
                  this.$router.push({path: '/', query: this.otherQuery})
                }
                this.loading = false
                Transfer.$emit('userword', this.loginForm.password) // 提交中转站
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
        this.generatedCode()
      },
      getOtherQuery(query) {
        return Object.keys(query).reduce((acc, cur) => {
          if (cur !== 'redirect') {
            acc[cur] = query[cur]
          }
          return acc
        }, {})
      },
      // 验证码
      generatedCode() {
        this.http.getvercode().then(res => {
          if (res.status == '200') {
            this.checkCode = res.data.data.verification_code
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #283443;
  $light_gray: #fff;
  $cursor: #1D2346;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-right {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      background: #F5F7FA;
      color: #1D2346;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px #F5F7FA inset !important;
          -webkit-text-fill-color: #1D2346 !important;
        }
      }
    }
  }

  .code-style {
    display: inline-block;
    width: 3rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    background: #ccc;
    margin-left: 1rem;
    font-size: 15px;
  }
</style>

<style lang="scss" scoped>
  $bg: #FFFFFF;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    height: 100%;
    background: #3B3783;

    .login-left {
      height: 100%;
      .login-img {
        width: 100%;
        height: 100%;
      }
    }

    .login-right {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100%;
      background-color: $bg;
      overflow: hidden;
      position: relative;
      font-family: PingFangSC-Medium, PingFang SC;

      .login-form {
        height: 590px;
        position: relative;
        width: 420px;
        max-width: 100%;
        padding: 0 35px;
        margin: 0 auto;
        overflow: hidden;

        .login-form-item {
          height: 114px;
          padding-top: 20px;

          .login-form-input {
            height: 48px;
            padding: 0 22px;
            background: #F5F7FA;
            border-radius: 8px;
          }

        }

      }

      .login-logo {
        position: absolute;
        top: 36px;
        left: 42px;
      }

      .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        span {
          &:first-of-type {
            margin-right: 16px;
          }
        }
      }

      .svg-container {
        padding: 6px 0 6px 0;
        color: $dark_gray;
        vertical-align: middle;
        display: inline-block;
      }

      .title-container {
        position: relative;

        .title {
          font-size: 26px;
          color: #1D2346;
          margin: 0px auto 40px auto;
          text-align: center;
          font-weight: bold;
        }
      }

      .show-pwd {
        position: absolute;
        right: 20px;
        top: 7px;
        font-size: 20px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
      }

      .thirdparty-button {
        position: absolute;
        right: 0;
        bottom: 6px;
      }

      @media only screen and (max-width: 470px) {
        .thirdparty-button {
          display: none;
        }
      }
    }
  }


</style>
