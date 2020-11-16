<template>
  <div id="twChart" ref="line" :style="{width: '100%',height:'350px'}" />
</template>

<script>
import echarts from 'echarts'
import Transfer from '../../../api/transfer.js'
// let elementResizeDetectorMaker = require("element-resize-detector");
export default {
  name: 'Data',
  data() {
    return {
      line: null, // 统计图对象
      datax: [],
      xAxis: [],
      series: []
    }
  },
  mounted() {
    var that = this
    Transfer.$on('data', function(data) {
      // console.log(data)
      that.datax = data.legend.data
      that.xAxis = data.xAxis.data
      that.series = data.series
      // 绘制图表
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        //  绘制图的位置
        grid: {
          left: '2%',
          right: '4%',
          bottom: '14%',
          top: '16%',
          containLabel: true
        },
        legend: {
          data: that.datax,
          right: 10,
          top: 12,
          itemWidth: 12,
          itemHeight: 10
          // itemGap: 35
        },
        xAxis: {
          type: 'category',
          // data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
          data: that.xAxis,
          axisLine: {
            show: false,
            lineStyle: {
              color: '#ccc'

            }
          },
          axisLabel: {
            textStyle: {
              fontFamily: 'Microsoft YaHei',
              color: '#000'
            }
          }
        },

        yAxis: {
          type: 'value',
          axisLine: {
            show: false,
            lineStyle: {
              color: '#ccc'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#ccc'
            }
          },
          axisLabel: {
            color: '#000'
          }
        },
        // 下面的时间选择
        dataZoom: [{
          type: 'inside',
          height: 20,
          start: 0,
          end: 100
        }, {
          start: 0,
          end: 100,
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }],
        // 数据
        series: that.series
      }
      const app = {
        currentIndex: -1
      }
      that.$nextTick(() => {
        that.line = echarts.init(that.$refs.line)
        that.line.setOption(option)
        // window.onresize = that.line.resize;
        // console.log(option)
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
  #twChart div {
    margin: 0 auto !important;
  }
</style>
