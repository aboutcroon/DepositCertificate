<template>
  <div id="app">
    <router-view v-if="isReloadAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isReloadAlive : true
    }
  },
  methods: {
    reload() {
      this.isReloadAlive = false;
      this.$nextTick(function(){
        this.isReloadAlive = true;
      })
    }
  }
}
</script>
<style lang="less">
  .ivu-btn{
    padding:4px 24px 4.03px 23px;
    font-size:14px;
    font-weight:bold;
  }
  .el-switch.is-checked .el-switch__core {
    border-color: #6cf643 !important;
    background-color: #6fc643 !important;
  }
</style>
