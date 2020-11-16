<template>
  <div class="notice-div" @click="click">
    <span class="icon iconfont iconnotice1"></span>
    <span style="font-size: 14px;margin-left: 11px;">通知</span>
    <!--<svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'"  />-->
  </div>
</template>

<script>
//  import notice from 'notice'

  export default {
    name: 'Notice',
    data() {
      return {
        haveNotice: false,
        noticeNum: 0,
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
        //暂时没有任何功能
      },
      change() {
      },
      init() {

      },
      destroy() {

      }
    }
  }
</script>

<style scoped>
  .notice-div {
    display: inline-block;
    cursor: pointer;
    fill: #5a5e66;;
    height: 20px;
    font-size: 18px;
    vertical-align: 10px;
  }
</style>
