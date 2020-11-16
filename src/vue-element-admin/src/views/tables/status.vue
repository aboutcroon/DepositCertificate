<template>
  <div>
    <div class="table">
      <span>用户A</span>
      <span>存储</span>
      <span>区块#323234</span>
      <span>1秒前</span>
    </div>
    <div class="table">
      <span>用户A</span>
      <span>存储</span>
      <span>区块#323234</span>
      <span>1秒前</span>
    </div>
    <div class="table">
      <span>用户A</span>
      <span>存储</span>
      <span>区块#323234</span>
      <span>1秒前</span>
    </div>
    <div class="table">
      <span>用户A</span>
      <span>存储</span>
      <span>区块#323234</span>
      <span>1秒前</span>
    </div>
    <div class="table">
      <span>用户A</span>
      <span>存储</span>
      <span>区块#323234</span>
      <span>1秒前</span>
    </div>
    <div class="table">
      <span>用户A</span>
      <span>存储</span>
      <span>区块#323234</span>
      <span>1秒前</span>
    </div><div class="table">
    <span>用户A</span>
    <span>存储</span>
    <span>区块#323234</span>
    <span>1秒前</span>
  </div>
</template>

<script>
  export default {
    name: 'status',
    data(){
      return{

      }
    },
    mounted(){
      //  展示用户信息
      this.num();
    },
    methods: {
      // 存证动态

    }
  }
</script>

<style lang="less">
  .table{
    margin-bottom: 1rem;
    span{
      display: inline-block;
      width: 25%;
      font-size:13px;
    }
    span:first-child{
      background:#314659;
      width: 15%;
      margin-right: 1rem;
      border-radius: 50%;
      text-align: center;
      color:#fff
    }
  }
</style>
