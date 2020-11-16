<template>
  <div style="margin-top:1px">
    <Row style="clear:both;">
      <Card shadow>
        <div class="record_right" style="display: inline-block;margin-left: 1rem;margin-top:1rem;margin-right:1.5rem">
          <p>所有用户</p>
          <p style="font-weight: 400;text-align: center;font-size: 23px">{{ user_total }}</p>
        </div>
        <div class="record_right" style="display: inline-block">
          <p>昨日新增用户</p>
          <p style="font-weight: 400;text-align: center;font-size: 23px">{{ yesterday_user }}</p>
        </div>
        <Each class="weekEach" style="height: 310px;margin-top:-27px" />
      </Card>
    </Row>
  </div>
</template>

<script>
import Each from '../echatrs/echarts'
import Transfer from '../../../api/transfer.js'

export default {
  name: 'Week',
  components: {
    Each
  },
  data() {
    return {
      user_total: '',
      yesterday_user: ''
    }
  },
  mounted() {
    var that = this
    Transfer.$on('weekday', function(data) {
      // console.log(data)
      that.user_total = data.user_total
      that.yesterday_user = data.yesterday_user
    })
  },
  methods: {
  }
}
</script>

<style lang="less">
  .week_map{
    float: right;
    span{
      margin-right: 1rem;
    }
    #two{
      color: rgb(24, 144, 255);
    }
  }
  .weekEach div {
    margin: 0 auto !important;
  }
</style>
