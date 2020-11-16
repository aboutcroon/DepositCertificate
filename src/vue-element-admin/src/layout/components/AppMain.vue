<template>
  <section class="app-main">
    <!--<transition name="fade-transform" mode="out-in">-->

    <!--</transition>-->
    <keep-alive :include="cachedViews">
      <router-view :key="key" />
    </keep-alive>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar + footer = 50 + 66  */
  min-height: calc(100vh - 116px);
  width: 100%;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  background-color: #F5F7FA;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view + footer = 50 + 38 + 66 */
    min-height: calc(100vh - 154px);
    background: #fff;
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
