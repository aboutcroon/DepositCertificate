<!-- 两条线 同一坐标系 -->
<template>
  <div :class="className" :style="{height:height,width:width}" />
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
      default: 'bar-chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    xAxis: {
      type: Array,
      default: () => {
        return ['10:06', '02:11', '19:20', '05:14', '19:00', '05:24', '18:12']
      }
    },
    unit: {
      type: String,
      default: ' '
    },
    /* 折线图*/
    barData: {
      type: Array,
      default: () => {
        return [{ name: '创建绑定', data: [0, 0, 1, 0, 0] }, { name: '创建未绑定', data: [0, 0, 6, 0, 2] }, {
          name: '创建未绑定',
          data: [0, 0, 6, 0, 2]
        }]
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
    barData: {
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
    }
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
          bottom: '10%'
        },
        color: ['#3B3783', '#FAAD14', '#BF495A', '#5FC167', '#495ABF', '#00BFDC', '#6088D6', '#F56D6D', '#0091FF', '#32C5FF'],
        tooltip: {
          show: true,
          trigger: 'axis',
          axis: 'x',
          formatter: function(params) {
            const res = `<div class="boya-tooltip-title1">${params[0].axisValue}</div>
                <div class="boya-tooltip1"><div class="boya-tooltip-flex"><div>${params[0].seriesName}</div><div>${params[0].data + that.unit}</div>
                <div style="position: absolute;height: 5px;width: 5px;left: -8px;top: 10px;background-color:${params[0].color};border-radius: 5px;"></div></div>
                <div class="boya-tooltip-flex"><div>${params[1].seriesName}</div><div>${params[1].data + that.unit}</div>
                <div style="position: absolute;height: 5px;width: 5px;left: -8px;top: 10px;background-color:${params[1].color};border-radius: 5px;"></div></div>
                <div class="boya-tooltip-flex"><div>${params[2].seriesName}</div><div>${params[2].data + that.unit}</div>
                <div style="position: absolute;height: 5px;width: 5px;left: -8px;top: 10px;background-color:${params[2].color};border-radius: 5px;"></div></div></div>`
            return res
          },
          axisPointer: {
            type: 'line',
            lineStyle: {
              width: 2,
              color: '#8794AE'
            }
          },
          backgroundColor: '#2E3548',
          padding: [0, 10],
          borderRadius: 8,
          color: '#f7fafb'
        },
        xAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#485465',
            fontSize: 14,
            showMinLabel: true
          },
          axisTick: {
            show: false
          },
          splitNumber: 3
        },
        yAxis: {
          type: 'category',
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#485465',
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
          boundaryGap: true,
          data: this.xAxis
        },
        series: [
          {
            name: this.barData[0].name,
            type: 'bar',
            barMaxWidth: 4,
            data: this.barData[0].data
          },
          {
            name: this.barData[1].name,
            type: 'bar',
            barMaxWidth: 4,
            data: this.barData[1].data
          },
          {
            name: this.barData[2].name,
            type: 'bar',
            barMaxWidth: 4,
            data: this.barData[2].data
          }
        ]
      })
    }
  }
}
</script>
<style lang="less">
  .bar-chart {
    .boya-tooltip-title1 {
      min-width: 213px;
      background: #394052;
      height: 35px;
      line-height: 35px;
      border-radius: 8px 8px 0 0;
    }
    .boya-tooltip1 {
      min-width: 213px;
      display: flex;
      justify-content: space-between;
      height: 76px;
      padding: 15px 0;
      border-radius: 8px 8px 0 0;
      .boya-tooltip-flex {
        margin-left: 15px;
        position: relative;
      }
    }
  }
</style>
