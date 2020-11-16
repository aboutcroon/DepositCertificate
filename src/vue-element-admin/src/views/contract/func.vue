<template>
  <div class="right_cont">
    <div class="center">
      <div class="cont" style="width:96%;margin:2rem;">
        <div>
          <div class="container">
            <p class="rectangle" />
            <p style="margin-top:1.5rem; margin-bottom:.5rem; margin-left: 12px; font-size:16px; font-family: PingFangSC-Medium,PingFang SC; font-weight: 500; color: rgba(35,44,90,1); line-height: 22px;"><span>{{ filename }}</span></p>
          </div>
          <p class="pb-text" style="margin-bottom: .5rem; font-size:16px; font-family: PingFangSC-Medium,PingFang SC; font-weight:500;">函数调用</p>
          <div class="editor-container">
            <p class="float-text" @mouseenter="handleShow">
              <el-button v-show="btnShow" class="btn" style="float: right; color: #3B3783;" @click="checkFile">查看合约源代码</el-button>
            </p>
            <json-editor ref="func" v-model="value1" @mouseenter.native="handleShow" @mouseleave.native="handleFade" />
          </div>
          <Button class="pb-text" type="primary" style="margin-top:1rem; background-color: #3B3783; border-color: #3B3783;" @click="handleSubmit">调用</Button>
          <p class="pb-text" style="margin-bottom: .5rem; font-size:16px; font-family: PingFangSC-Medium,PingFang SC; font-weight:500;">您的返回结果如下：</p>
          <json-editor ref="func" v-model="value2" />
          <div style="margin-top:1rem;">
            <Button class="pb-text" type="primary" style="background-color: #FAAD14; border-color: #FAAD14;" @click="getdata">重填</Button>
            <Button class="pb-text" type="primary" style="background-color: #FAAD14; border-color: #FAAD14;" @click="back">返回</Button>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import JsonEditor from '@/components/JsonEditor'
export default {
  inject: ['reload'],
  name: 'ContractCallNocache',
  components: { JsonEditor },
  data() {
    return {
      id: '',
      contract_num: '',
      value1: {
        'id': 0,
        'contract': '',
        'function': 'parse',
        'owner': 'admin@nifa.org.cn',
        'appid': '001',
        'params': [['accountName', 'account', 'interestRate', 'startDate', 'expirationDate', 'balance', 'productName', 'productType'], ['accountName', 'account', '12', '1587610745', '1587610749', '5000', 'productName', 'productType']]
      },
      value2: {},
      filename: '合约名称',
      btnShow: false
    }
  },
  mounted() {
    this.getdata()
  },
  methods: {
    // 重置
    handleReset() {
      this.value1 = {
        'id': this.id,
        'contract': this.contract_num,
        'function': 'parse',
        'owner': 'admin@nifa.org.cn',
        'appid': '001',
        'params': [['accountName', 'account', 'interestRate', 'startDate', 'expirationDate', 'balance', 'productName', 'productType'], ['accountName', 'account', '12', '1587610745', '1587610749', '5000', 'productName', 'productType']]
      }
      this.value2 = {}
    },

    // 调用
    // 等待接口联调
    handleSubmit() {
      if (this.value1 == '') {
        this.$Message.warning('函数不能为空')
      } else {
        const param = this.value1
        console.log(param)
        this.http.contractCall(param).then(res => {
          console.log(res)
          this.value2 = res.data
          if (res.status == '200') {
            if (res.data.code == 0) {
              //                var list =res.data.data.owners_list;
              // console.log(list)
            }
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      }
    },
    checkFile() {
      this.$router.push({
        name: 'contract_file', // 跳转的页面
        query: {
          'contractId': this.$route.query.contractId // 我们要传递的参数
        }
      })
    },
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
            this.filename = i.filename
            this.id = i.id
            this.contract_num = i.address
            this.handleReset()
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        } else {
          this.http.messageFun('error', res.data.msg)
        }
      })
    },
    back() {
      // this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
      // this.$router.push(this.$store.state.tagsView.visitedViews[this.$store.state.tagsView.visitedViews.length - 1].path)
      this.$router.push('contract')
    },
    handleShow() {
      this.btnShow = true
    },
    handleFade() {
      this.btnShow = false
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

  .pb-text {
    margin-left: 42px;
  }

  .float-text {
    position: relative;
    z-index: 99;
    top: 4px;
    right: 4px;
  }
  .btn {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 14px;
    font-family: PingFangSC-Medium,PingFang SC;
    font-weight: 500;
    color: rgba(59,55,131,1);
    line-height: 20px;
    border-radius: 8px;
  }
</style>
