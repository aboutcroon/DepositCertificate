<template>
  <div class="right_cont">
    <div class="center">
      <div class="cont" style="width:96%;margin:2rem;">
        <div>
          <div class="container" style="margin-bottom: 25px">
            <p class="rectangle" />
            <p style="margin-top:1.5rem; margin-bottom:.5rem; margin-left: 12px; font-size:16px; font-family:PingFangSC-Medium,PingFang SC; font-weight:500; color: rgba(35,44,90,1)">{{ name }}</p>
          </div>
          <BaseEditor ref="func" v-model="value2" />
          <div style="margin-top:1rem;">
            <Button type="primary" style="background-color: rgb(250, 173, 20); border-color: rgb(250, 173, 20);" @click="cancel">返回</Button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import BaseEditor from '@/components/BaseCodeEditor'
export default {
  inject: ['reload'],
  name: 'ContractFileNocache',
  components: { BaseEditor },
  data() {
    return {
      value1: {
        'id': 1,
        'contract_num': '231587892878',
        'function': 'parse',
        'owner': 'admin@nifa.org.cn',
        'appid': '001',
        'params': [['accountName', 'account', 'interestRate', 'startDate', 'expirationDate', 'balance', 'productName', 'productType'], ['accountName', 'account', '12', '1587610745', '1587610749', '5000', 'productName', 'productType']]
      },
      value2: '',
      name: ''
    }
  },
  mounted() {
    this.getdata()
  },
  methods: {
    // 重置
    handleReset() {
      this.value1 = {
        'id': 1,
        'contract_num': '231587892878',
        'function': 'parse',
        'owner': 'admin@nifa.org.cn',
        'appid': '001',
        'params': [['accountName', 'account', 'interestRate', 'startDate', 'expirationDate', 'balance', 'productName', 'productType'], ['accountName', 'account', '12', '1587610745', '1587610749', '5000', 'productName', 'productType']]
      }
      this.value2 = ''
    },
    cancel() {
      this.$Message.info('点击了关闭')
      this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
      history.back()
//      this.$router.push(this.$store.state.tagsView.visitedViews[this.$store.state.tagsView.visitedViews.length - 1].path)
    },
    // 调用
    getdata() {
      const contract_id = this.$route.query.contractId
      const param = {
        'contract_id': contract_id
      }
      console.log(param)
      this.http.contract(param).then(res => {
        console.log(res)
        if (res.status == '200') {
          if (res.data.code == '0') {
            var i = res.data.data.contract_info
            // console.log(list)
            this.value2 = res.data.data.contract_file_content
            this.name = i.filename
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        } else {
          this.http.messageFun('error', res.data.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss">
  @import "variables/CodeMirror.scss";
  /* .ivu-form-item-content{
    margin-left: 0!important;
  } */
  .right_cont {
    padding: 0;
  }
  .right_cont  .top {
    background: #fff;
    line-height: 3rem;
    padding-left: 2rem;
    height: 3rem;
    font-size: 14px;
  }

  .right_cont  .center {
    margin: 10px;
    padding-top: .1rem;
    padding-bottom: 1rem;
    background: #fff;
    min-height:31rem;
  }

  .right_cont  .center_top {
    padding: 1rem 1rem;
  }
  .ivu-col-offset-1{
    font-size: 20px;
    margin-left: 1rem;
  }
  .cont p{
    margin-top: 1rem;
  }

  .cm-s-rubyblue span.cm-def, .cm-s-rubyblue span.cm-type {
    color: #50A14F;
  }
</style>
