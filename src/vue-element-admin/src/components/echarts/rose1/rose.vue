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
        type: String,
        default: '内存使用率'
      },
      legend: {
        type: Array,
        default: () => {
          return ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
        }
      },
      legendData: {
        type: Object,
        default: () => {
          return {
            rose1: 10,
            rose2: 5,
            rose3: 15,
            rose4: 25,
            rose5: 20,
            rose6: 35,
            rose7: 30,
            rose8: 40,
          }
        }
      },
      unit: {
        type: String,
        default: '%'
      },
      /*柱状图*/
      LineData: {
        type: Array,
        default: () => {
          return [{value: 10, name: 'rose1'},
            {value: 5, name: 'rose2'},
            {value: 15, name: 'rose3'},
            {value: 25, name: 'rose4'},
            {value: 20, name: 'rose5'},
            {value: 35, name: 'rose6'},
            {value: 30, name: 'rose7'},
            {value: 40, name: 'rose8'},]
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
          tooltip: {
            show: true,
            formatter: function (params) {
              console.log(params)
              let res = `<div style="width:213px;background: #394052;height:35px;line-height: 35px;border-radius: 8px 8px 0 0">${params.name}</div>
                <div style="height: 76px;padding:15px ;position: relative"><div>${params.seriesName}</div><div>${params.percent + that.unit}</div>
                <div style="position: absolute;height: 5px;width: 5px;left: 4px;top: 24px;background-color:${params.color};border-radius: 5px;"></div>
                </div>`
              return res;
            },
            backgroundColor: '#2E3548',
            padding: [0, 10],
            borderRadius: 8,
            color: '#f7fafb',
          },
          legend: {
            type: 'scroll',
            orient: 'vertical',
            left: '48',
            top: 'center',
            itemWidth: 10,
            itemHeight: 10,
            formatter: function (name) {
              console.log(name)
              return name + ' ' + that.legendData[name] + that.unit;
            },
            data: this.legend
          },
          color: ['#3B3783', '#FAAD14', '#BF495A', '#5FC167', '#495ABF', '#00BFDC', '#6088D6', '#F56D6D', '#0091FF', '#32C5FF'],
          series: [{
            name: '合约调用情况',
            type: 'pie',
            radius: ['50%', '80%'],
            center: ['60%', '50%'],
            roseType: 'area',
            label: {
              position: 'inside',
              rotate: true
            },
            data: this.LineData
          }]
        })
      }
    }
  }
</script>
