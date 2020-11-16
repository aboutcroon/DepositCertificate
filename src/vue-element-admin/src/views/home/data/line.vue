<template>
  <div ref="line" />
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'Line',
  data() {
    return {
      line: null // 统计图对象
    }
  },
  mounted() {
    // 绘制图表
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: '#57617B'
          }
        }
      },
      // 位置
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      // X轴
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: '#57617B'
          }
        },
        data: ['10-23周日', '10-24周一 ', '10-25周二', '10-26周三', '10-27周四', '10-28周五', '10-29周六']
      }],
      // Y轴
      yAxis: [{
        type: 'value',
        // name: '单位（%）',
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#57617B'
          }
        },
        axisLabel: {
          margin: 10,
          textStyle: {
            fontSize: 14
          }
        },
        splitLine: {
          lineStyle: {
            color: '#ccc'
          }
        }
      }],
      // 折线样式
      series: [{
        // name: '移动',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          normal: {
            width: 2,
            color: '#2db7f5'
          }
        },
        areaStyle: {
          normal: {
            shadowColor: '#2db7f5',
            shadowBlur: 10
          }
        },
        // 背景样式
        itemStyle: {
          normal: {
            color: '#d5f0fd',
            // 鼠标滑过的点样式
            borderColor: '#2db7f5',
            borderWidth: 12

          }
        },
        data: [220, 182, 191, 134, 150, 120, 110]
      }]
    }
    // 绑定位置
    this.$nextTick(() => {
      this.line = echarts.init(this.$refs.line)
      this.line.setOption(option)
      // on(window, 'resize', this.resize)
    })
  },
  methods: {
    resize() {
      this.line.resize()
    }
  }
}
</script>

<style scoped>

</style>
