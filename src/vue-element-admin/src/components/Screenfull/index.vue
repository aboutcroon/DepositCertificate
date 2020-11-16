<template>
  <div class="screenfull-svg" @click="click">
    <span class="icon iconfont " v-bind:class="[isFullscreen ? 'iconexitscreen ' : 'iconfullscreen ']"></span>
    <span style="font-size: 14px;margin-left: 11px;">{{isFullscreen? '退出全屏':'全屏'}}</span>
    <!--<svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'"  />-->
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'Screenfull',
  data() {
    return {
      isFullscreen: false
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    click() {
      if (!screenfull.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
    },
    init() {
      if (screenfull.enabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy() {
      if (screenfull.enabled) {
        screenfull.off('change', this.change)
      }
    }
  }
}
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;;
  height: 20px;
  font-size: 18px;
  vertical-align: 10px;
}
</style>
