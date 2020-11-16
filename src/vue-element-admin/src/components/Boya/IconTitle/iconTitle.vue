<template>
  <div class="boya-border-title">
    <!-- 可以替换成iconfont -->
    <div class="boya-border" :style="{'background-color': beforeColor}">
    </div>
    <div class="boya-title"><span>{{ title }}</span><span class="ml-8">{{value}}</span></div>
  </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: '默认标题'
      },
      value: {
        type: String,
        default: ''
      },
      beforeColor: {
        type: String,
        default: '#BF495A'
      },
    }
  }
</script>
<style lang="scss">
  .boya-border-title {
    position: relative;
    display: inline-block;
    padding-left: 15px;
    margin-right: 20px;
    height: auto;
    color: #555466;

    .boya-border {
      position: absolute;
      left: 0;
      top: 5px;
      height: 15px;
      width: 3px;
      border-radius: 0;
      background-color: inherit;
    }

    .boya-title {
      height: 25px;
      font-size: 18px;
      line-height: 25px;
    }

    .ml-8 {
      margin-left: 8px;
    }
  }
</style>
