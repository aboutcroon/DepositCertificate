<!-- 两条线 同一坐标系 -->
<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import resize from '@/components/echarts/resize'

  export default {
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '300px'
      },
      LineName: {
        type: Array,
        default: () => {
          return ['用证数量', '存证数量']
        }
      },
      xAxis: {
        type: Array,
        default: () => {
          return ['10:06', '02:11', '19:20', '05:14', '19:00', '05:24', '18:12']
        }
      },
      lineColor: {
        type: Array,
        default: () => {
          return ['#FAAD14', 'rgba(191,73,90,1)']
        }
      },
      areaColor: {
        type: Array,
        default: () => {
          return ['#FAAD14', 'rgba(191,73,90,1)']
        }
      },
      unit: {
        type: String,
        default: '%'
      },
      /*折线图*/
      LineData: {
        type: Array,
        default: () => {
          return [[{name: '10:06', value: 1820},
            {name: '10:06', value: 1932},
            {name: '10:06', value: 1901},
            {name: '10:06', value: 1934},
            {name: '10:06', value: 1390},
            {name: '10:06', value: 1430},
            {name: '10:06', value: 1420},
          ], [{name: '10:06', value: 820},
            {name: '10:06', value: 932},
            {name: '10:06', value: 901},
            {name: '10:06', value: 934},
            {name: '10:06', value: 1290},
            {name: '10:06', value: 1330},
            {name: '10:06', value: 1320},]]
        }
      }
    },
    data() {
      return {
        chart: null,
        left: 64,
        showMinLabel: false
      }
    },
    watch: {
      LineData: {
        deep: true,
        handler(val) {
          if (Math.max(...val) > 1000000) {
            this.left = 120
          } else {
            this.left = 64
          }
          this.showMinLabel = true
//          if(val.length < 90) {
//
//          } else {
//            this.showMinLabel = false
//          }
          this.setOptions()
        }
      },
    },
    mounted() {
      this.$nextTick(() => {
        this.initChart()

        // 测试用 接入数据后移除
        this.setOptions()
      })
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el)
      },
      setOptions() {
        const that = this
        this.chart.setOption({
          grid: {
            top: 20,
            left: that.left,
            right: 40,
            bottom: '10%',
          },
          tooltip: {
            show: true,
            trigger: 'axis',
            axis: 'x',
            formatter: function (params) {
              let res = `<div class="boya-tooltip-title">${params[0].axisValue}</div>
                <div class="boya-tooltip"><div style="boya-tooltip-flex"><div>${params[0].seriesName}</div><div>${params[0].data + that.unit}</div>
                <div style="position: absolute;height: 5px;width: 5px;left: 4px;top: 24px;background-color:${params[0].color};border-radius: 5px;"></div></div>
                <div style="boya-tooltip-flex"><div>${params[1].seriesName}</div><div>${params[1].data + that.unit}</div>
                <div style="position: absolute;height: 5px;width: 5px;left: 4px;top: 24px;background-color:${params[1].color};border-radius: 5px;"></div></div></div>`
              return res;
            },
            axisPointer: {
              type: 'line',
              lineStyle: {
                width: 2,
                color: '#8794AE'
              },
            },
            backgroundColor: '#2E3548',
            padding: [0, 10],
            borderRadius: 8,
            color: '#f7fafb',
          },
          xAxis: {
            type: 'category',
            axisLine: {
              show: false
            },
            axisLabel: {
              color: "#485465",
              fontSize: 14,
              showMinLabel: true,
              formatter: function (value) {
                return value
//                if(that.LineData.length > 90) {
//                  return value
//                } else {
//                  let label = value.split(' ')[1]
//                  return label.split(':')[0] + ':' + label.split(':')[1]
//                }
              }
            },
            axisTick: {
              show: false
            },
            boundaryGap: false,
            data: this.xAxis
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: false
            },
            axisLabel: {
              color: "#485465",
              margin: 8,
              fontSize: 14
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: ['#F5F7F8']
              }
            },
            splitNumber: 3
          },
          series: [{
            name: this.LineName[0],
            data: this.LineData[0],
            type: 'line',
            symbol: 'none',
            smooth: true,
            lineStyle: {
              color: this.lineColor[0]
            },
            areaStyle: {
              color: this.areaColor[0]
            }
          }, {
            name: this.LineName[1],
            data: this.LineData[1],
            type: 'line',
            symbol: 'none',
            smooth: true,
            lineStyle: {
              color: this.lineColor[1]
            },
            areaStyle: {
              color: this.areaColor[1]
            }
          }]
        })
      }
    }
  }
</script>
<style lang="less">
  .chart {
    .boya-tooltip-title {
      width: 213px;
      background: #394052;
      height: 35px;
      line-height: 35px;
      border-radius: 8px 8px 0 0;
    }
    .boya-tooltip {
      width: 213px;
      display: flex;
      justify-content: space-between;
      height: 76px;
      padding: 15px 0;
      border-radius: 8px 8px 0 0;
      .boya-tooltip-flex {
        min-width: 80px;
        display: inline-flex;
        flex-grow: 1;
        height: 76px;
        position: relative;
      }
    }
  }
</style>
