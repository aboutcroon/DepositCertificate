<template>
  <div class="right_cont">
    <div class="center">
      <div class="cont" style="width:50%;margin:2rem;">
        <div class="container">
          <p class="rectangle" />
          <p style="margin-top:1.5rem; margin-bottom:.5rem; margin-left: 12px; font-size:16px; font-family:PingFangSC-Medium,PingFang SC; font-weight:500; color: rgba(35,44,90,1);">基础信息</p>
          <p style="margin-bottom:1.5rem">{{ baseInfo }}</p>
        </div>
        <div style="padding-bottom: 0.8rem; height:12.8rem">
          <p style="margin-left: 21px; font-size:12px; font-family:PingFangSC-Regular,PingFang SC; font-weight:400; color:rgba(146,158,183,1); line-height:17px;">合约文件</p>
          <p style="margin-bottom: 19px; margin-top: 5px;">
            <Button class="button-file" type="primary" @click="checkFile">查看文件</Button>
            <a :href="url" download="file.sol">
              <Button class="button-download" style="padding:9px 10px; margin-left: 6px;">
                下载文件
              </Button>
            </a>
          </p>
          <p style="margin-bottom: 12px;">
            <el-row style="margin-left: 21px;">
              <el-col :span="24" class="left">bincode:</el-col>
              <br>
              <div class="container">
                <el-col :span="18" class="right" style="max-height: 90px; overflow: hidden">{{ bincode }}</el-col>
                <el-col :span="2" style="margin-left: 5px; margin-top: 0"><span class="iconfont copy" @click="copy" style="width:19px; height:21px; cursor: pointer; overflow: hidden">&#xe664;</span></el-col>
              </div>
              <el-col :span="24" style="opacity: 0">
                <input id="bincode" v-model="bincode" type="text" style="width:64%">
              </el-col>
            </el-row>
          </p>
          <p style="margin-bottom: 10.4px; margin-left: 21px">
            <el-row>
              <el-col :span="24" class="left">合约地址:</el-col>
              <br>
              <el-col :span="20" class="right-down">{{ address }}</el-col>
            </el-row>
          </p>
        </div>

        <!--提示-->

      </div>
    </div>
  </div>

</template>

<script>
import Transfer from '../../api/transfer.js'
import ElCol from 'element-ui/packages/col/src/col'
export default {
  inject: ['reload'],
  name: 'ContractCheckNocache',
  components: {
    ElCol
  },
  data() {
    return {
      baseInfo: '',
      bincode: '',
      address: '',
      url: '',
    }
  },
  mounted() {
    this.getdata()
  },
  methods: {
    copy() {
      document.getElementById('bincode').select() // 选择对象
      document.execCommand('Copy') // 执行浏览器复制命令
      alert('复制成功')
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },

    cancel() {
      this.$Message.info('点击了关闭')
      window.history.back()
    },

    checkFile() {
      this.$router.push({
        name: 'contract_file',
        query: {
          'contractId': this.$route.query.contractId
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
            this.bincode = i.bincode
            this.address = i.address
            this.url = i.file_url
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
  .left {
    height: 17px;
    font-size: 12px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: rgba(146,158,183,1);
    line-height: 17px;
  }
  .right{
    word-wrap: break-word;
    word-break: normal;
    padding-bottom: 1rem;
    width: 747px;
    height: 60px;
    font-size: 14px;
    font-family: PingFangSC-Medium,PingFang SC;
    font-weight: 500;
    color: rgba(85,84,102,1);
    line-height: 20px;
  }
  .right-down {
    width: 344px;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Medium,PingFang SC;
    font-weight: 500;
    color: rgba(107,106,125,1);
    line-height: 20px;
  }

  .button-file {
    margin-right: 20px;
    margin-left: 20px;
    width: 102px;
    height: 42px;
    background: rgba(235,235,242,1);
    border-color: rgba(235,235,242,1);
    border-radius: 8px;
    font-size: 14px;
    font-family: PingFangSC-Medium,PingFang SC;
    font-weight: 500;
    color: rgba(59,55,131,1);
    line-height: 20px;
    &:hover {
      background-color: rgba(59,55,131,1);
      border-color: rgba(59,55,131,1);
    }
  }
  .button-download {
    margin-right: 20px;
    margin-left: 20px;
    width: 102px;
    height: 42px;
    background: rgba(255,255,255,1);
    border: 1px solid rgba(135,148,174,1);
    border-radius: 8px;
    font-size: 14px;
    font-family: PingFangSC-Medium,PingFang SC;
    font-weight: 500;
    color: rgba(135,148,174,1);
    line-height: 20px;
    &:hover {
      color: rgba(59,55,131,1);
      border-color: rgba(59,55,131,1);
    }
  }
</style>
