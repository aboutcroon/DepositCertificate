<template>
  <div class="has-logo">
    <logo :collapse="isCollapse"/>
    <div class="sidebar-divider"></div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical">
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" :index="String(route.path)"></sidebar-item>
      </el-menu>
    </el-scrollbar>
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="sidebar-btn" @toggleClick="toggleSideBar" />
    <!--<div class="sidebar-btn">-->
      <!--<span class="icon iconfont iconPutaway sidebar-icon"></span>-->
      <!--<span>收起</span>-->
    <!--</div>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import Hamburger from '@/components/Hamburger'

export default {
  inject: ['reload'],
  components: { SidebarItem, Logo, Hamburger },
  data(){
    return{

    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },
  },
  methods: {
    toggleSideBar() {
      console.log('tttttt')
      this.$store.dispatch('app/toggleSideBar')
      this.reload()
    },
  }
}
</script>
