<template>
  <div class="navbar">
    <div v-if="isHome" class="left-menu2">
      <div v-if="!isSuperAdmin" class="nav-search2">
        <span class="iconfont iconsearch_all " style="margin-left: 27px;font-size: 18px;cursor: pointer;" @click="topquery" />
        <input v-model="input" class="transition-box bar_input" placeholder="交易哈希/区块号/标签" @keyup.enter="topquery()">
      </div>
    </div>
    <div v-else="" class="left-menu">
      <img src="../../assets/img/icon_light@1x.png" srcset="../../assets/img/icon_light@2x.png 2x,../../assets/img/icon_light@3x.png 3x" style="margin-top: 6px;margin-left: -6px;">
      <div class="nav-title">{{ getRouteName }}</div>
      <div v-if="!isSuperAdmin" class="nav-search">
        <span class="iconfont iconsearch_all " style="margin-left: 27px;font-size: 18px;cursor: pointer;" @click="topquery" />
        <input v-model="input" class="transition-box bar_input" placeholder="交易哈希/区块号/标签" @keyup.enter="topquery()">
      </div>
    </div>
    <!--<hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />-->

    <!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container" /> -->
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <!-- <search id="header-search" class="right-menu-item" /> -->

        <!--        <error-log class="errLog-container right-menu-item hover-effect" />-->

        <!--<screenfull id="screenfull" class="right-menu-item hover-effect" />-->

        <!--<notice id="notice" class="right-menu-item hover-effect" />-->

        <!--<el-tooltip content="Global Size" effect="dark" placement="bottom">-->
        <!--<size-select id="size-select" class="right-menu-item hover-effect" />-->
        <!--</el-tooltip>-->

        <exit-btn id="exit-btn" class="right-menu-item hover-effect" @click.native="logout" />
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <!--<svg-icon icon-class="userlogo"/>-->
          <span class="iconfont iconadmin1" />
          <span style="font-size: 14px;margin-left: 11px;">{{ userName }}</span>
          <!-- <img src="../../assets/img/13250a485e26f89a1a90c35324cca08.jpg" class="user-avatar"> -->
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link :to="isSuperAdmin?'/home-user':'/users/user'">
            <el-dropdown-item>用户中心</el-dropdown-item>
          </router-link>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import Notice from '@/components/Notice'
import ExitBtn from '@/components/ExitBtn'

export default {
  inject: ['reload'],
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search,
    Notice,
    ExitBtn
  },
  data() {
    return {
      input: '',
      show2: false,
      userName: ''
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ]),
    getRouteName() {
      console.log(this.$route)
      return this.$route.meta.title
    },
    isSuperAdmin() {
      const value = sessionStorage.getItem('key')
      return JSON.parse(value) === 0
    },
    isHome() {
      return this.$route.path === '/home' && this.$route.name !== 'home-node-user'
    }
  },
  created() {
    this.userName = sessionStorage.getItem('user_name')
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
      this.reload()
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    topquery() {
      this.http.search({ search_word: this.input }).then(res => {
        if (res.status == '200') {
          var isnum = /^\d+$/.test(this.input)
          if (this.input.slice(0, 2) == '0x') {
            this.$router.push({
              name: 'details',
              query: {
                'detailsdata': this.input
              }
            })
          } else if (isnum == true) {
            var data = res.data.data.value
            this.$router.push({
              name: 'block',
              query: {
                'blockdata': data,
                'datatype': 'hash'
              }
            })
          } else {
            console.log(res)
            this.$router.push({
              name: 'data_census',
              query: {
                'censusdata': this.input
              }
            })
          }
        } else {
          this.http.messageFun('error', res.data.msg)
        }
      })
    },
    isActive(route) {
      return route.path === this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 68px;
  overflow: hidden;
  position: relative;
  /*box-shadow: 0 1px 4px rgba(0,21,41,.08);*/

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }
  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .left-menu {
    float: left;
    padding: 14px 0;
    height: 100%;
    line-height: 50px;

    div {
      display: inline-block;
      height: 40px;
      line-height: 40px;
      vertical-align: top;
    }

    .nav-title {
      font-size: 20px;
    }
    .nav-search {
      margin-left: 17px;
      border-radius: 21px;
      background-color: #E8EAED;
    }

    .bar_input {
      width: 260px;
      margin-left: 11px;
      margin-right: 20px;
      height: 42px;
    }
  }
  .left-menu2 {
    float: left;
    padding: 6px 0;
    height: 100%;
    line-height: 56px;

    .nav-search2 {
      height:56px;
      border-radius: 8px;
      background-color: #fff;
    }
    .bar_input {
      width: 310px;
      margin-left: 11px;
      margin-right: 20px;
      height: 56px;
    }
  }
  .bar_input {
    display: inline-block;
    vertical-align: top;
    font-size: 14px;
    border: none;
    outline: none;
    background-color: transparent;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    padding-top: 8px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      margin-left: 10px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 10px;

      .avatar-wrapper {
        // margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 35px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -15px;
          top: 20px;
          font-size: 12px;
        }
      }
    }
  }
}
#bar{
  display: inline-block;
  padding: 0 8px;
  height: 100%;
  font-size: 18px;
  color: #5a5e66;
  vertical-align: text-bottom;
}
#bar input{
  float: right;
  width: 87%;
  margin-left: 5px;
  font-size: 14px;
  height: 1.5rem;
  line-height: 1.5rem;
  margin-top: 13px;
  border: 0;
  border-bottom: 1px solid #515151;
  padding-left:10px;
}
#bar svg{

}
</style>
