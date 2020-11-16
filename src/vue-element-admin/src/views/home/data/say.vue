<template>
  <div ref="wordCloud" />
</template>

<script>
import echarts from 'echarts'
import Transfer from '../../../api/transfer.js'
import echartswordcloud from 'echarts-wordcloud'
export default {
  name: 'Say',
  data() {
    return {
      wordCloud: null, // 统计图对象
      cloud: []
    }
  },
  mounted() {
    var that = this
    Transfer.$on('say', function(data) {
      that.cloud = data
      // 绘制图表
      const option = {
        tooltip: {
          show: true
        },
        series: [{
          // name: '积分排行',
          type: 'wordCloud',
          gridSize: 20,
          sizeRange: [12, 50],
          rotationRange: [0, 0],
          shape: 'circle',
          autoSize: {
            enable: true,
            minSize: 15
          },
          data: that.cloud
        }]
      }
      // 绑定位置
      this.$nextTick(() => {
        that.wordCloud = echarts.init(that.$refs.wordCloud)
        that.wordCloud.setOption(option)
        // on(window, 'resize', this.resize)
      })
    })
  },
  methods: {
    resize() {
      this.wordCloud.resize()
    }
  }
}
</script>

<style scoped>

</style>
