<template>
  <div class="sidebar-logo-container " :class="collapse">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img :src="logo2" class="sidebar-logo">
        <!--<h1 class="sidebar-title" style="font-size:19px">{{ c_title }} </h1>-->
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img :src="logo" class="sidebar-logo" >
        <!--<h1 class="sidebar-title" style="font-size:19px">{{ title }} </h1>-->
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      // required: true
    }
  },
  data() {
    return {
      title: '博雅数据存证平台',
      c_title: '博雅',
      // 当前版本ui暂无logo和title
//      title: ''
      logo2: require('@/assets/img/logo2_white.png'),
      logo: require('@/assets/img/logo_white.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 72px;
  line-height: 72px;
  background: #3B3783;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      height: 55px;
      vertical-align: middle;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 72px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      height: 32px;
      margin: 0 auto;
    }
  }
}
</style>
