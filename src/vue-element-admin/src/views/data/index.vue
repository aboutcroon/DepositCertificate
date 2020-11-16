<template>
  <div class="right_cont">
    <div class="center">
      <div class="center_top">
        <Tabs :animated="false">
          <Tab-pane label="单用户数据存证">
            <SingleUser></SingleUser>
          </Tab-pane>
          <!--      多用户导数据-->
          <Tab-pane label="批量用户数据存证">
            <Data @showUserList="showUserList"></Data>
          </Tab-pane>
        </Tabs>
      </div>
    </div>
    <Modal v-model="modal2">
      <p slot="header" style="">查看有权限用户</p>
      <div style="word-wrap:break-word; word-break:break-all;">
        <span v-for="item in userdata" :key="item.value"  style="font-size: 14px;margin-bottom:5px">{{item.label}},</span>
      </div>
      <div slot="footer">
        <i-button size="large" @click="del">取消</i-button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import SingleUser from './single-user/single-user'
  import Data from './leading/data'
  import Transfer from '../../api/transfer.js';
  export default{
    name: 'data_data',
    components: {
      SingleUser,
      Data
    },
    data () {
      return {
        tableData: [{
          name: '',
          tag_1: '',
          tag_2: '',
          tag_3: '',
          tag_4: '',
          tag_5: '',
          record: ''
        }],
        username: '',
        userdata: [],
        tag_1: '',
        tag_2: '',
        tag_3: '',
        tag_4: '',
        tag_5: '',
        record: '',
        modal2: false
      }
    },
    mounted() {
      var that = this
      Transfer.$on('dataindex', function (data) {
        console.log(data)
        that.userdata = data
      })
    },
    methods: {
      // 存证提示
      handleSubmit (name) {
        // this.$refs[name].validate((valid) => {
        //   if (valid) {
        var tag =[]
          tag.push(this.tag_1,this.tag_2,this.tag_3,this.tag_4,this.tag_5)
        console.log(tag)
            var params ={
              method: 'upload_evidence',
              owner: this.username,
              tag_list: tag,
              data_list: this.record
            }
          this.http.upload(params).then(res => {
            console.log(res)
            if(res.data.code == '0'){
              this.$Message.success('存证成功!');
            }else {
              this.http.messageFun('error',res.data.msg)
            }
          })
          this.username = ''
          this.tag_1 =''
        this.tag_2 =''
        this.tag_3 =''
        this.tag_4 =''
        this.tag_5 =''
        this.record = ''
      },
      del() {
        // this.$Message.info('点击了取消');
        this.modal2 = false
      },
      showUserList() {
        this.modal2 = true
      }
    }
  }
</script>

<style lang="less">
  .right_cont {
    padding: 0;

    .top {
      background: #fff;
      line-height: 3rem;
      padding-left: 2rem;
      height: 3rem;
      font-size: 14px;
    }

    .center {
      margin: 10px;
      background: #fff;
      min-height:31rem;
    }

    .center_top {
      padding: 1rem 1rem;
    }
  }
</style>
