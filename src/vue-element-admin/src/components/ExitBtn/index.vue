<template>
  <div class="notice-div" @click="click">
    <span class="icon iconfont iconsignout "></span>
    <span style="font-size: 14px;margin-left: 11px;">退出</span>
  </div>
</template>

<script>
  //  import notice from 'notice'

  export default {
    name: 'ExitBtn',
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
        // 关闭当前页面
        window.close();
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
