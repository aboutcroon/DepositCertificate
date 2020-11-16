<template>
  <div ref="line" />
</template>

<script>
import echarts from 'echarts'
import Transfer from '../../../api/transfer.js'
export default {
  name: 'Echarts',
  data() {
    return {
      line: null, // 统计图对象
      week_user_activity_list: [],
      date_list: []
    }
  },
  mounted() {
    var that = this
    Transfer.$on('latelys', function(data) {
        console.log(data)
      that.date_list = data.date_list
      that.week_user_activity_list = data.week_user_activity_list
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
          data: that.date_list
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
          name: '活跃用户数',
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
          data: that.week_user_activity_list
        }]
      }
      // 绑定位置
      that.$nextTick(() => {
        that.line = echarts.init(that.$refs.line)
        that.line.setOption(option)
        // on(window, 'resize', this.resize)
      })
    })
  },
  methods: {
    resize() {
      this.line.resize()
    }
  }
}
</script>

<style lang="less">
  .ivu-card-body{
    padding:0!important;
  }
</style>
