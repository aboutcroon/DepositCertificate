<template>
  <div class="right_cont">
    <div class="center">
      <div class="top_center" style="padding-top:4rem">
          <p><Row><Col span="4" style="text-align:right;margin-top:8px">用户姓名&nbsp;&nbsp;</Col><Col span="20">
            <Select v-model="value" placeholder="请选择">
              <Option v-for="(item ,index) in username" :value="item.value" :key="index">{{ item.label }}</Option>
            </Select>
          </Col></Row></p>
          <p><Row><Col span="4" style="text-align:right;margin-top:8px">标签&nbsp;&nbsp;</Col><Col span="20">
            <Input v-model="model1" placeholder="请输入"></Input>
          </Col></Row></p>
        <div>
          <Row><Col span="4" style="text-align:right;margin-top:8px">文件上传&nbsp;&nbsp;</Col><Col span="20">
            <Upload></Upload>
            <span style="margin-top:5px;display: inline-block"><a href="http://192.168.1.34:10080/download/批量用户数据存证模板.xlsx" style="color:#2d8cf0">下载模板</a></span>
          </Col></Row>
        </div>
        <p style="text-align: center;margin-top: 5.5rem;padding-bottom: 6rem"><Button type="primary"  @click="handleSubmit ('formValidate')">存证</Button></p>
      </div>
    </div>
  </div>
</template>

<script>
  import Upload from './leading/upload'
  export default {
    name: 'file',
    components: {
      Upload
    },
    data () {
      return {
        value: '',
        model1: '',
        username:[]
      }
    },
    mounted() {
      this.getdata()
    },
    methods: {
      // 存证提示
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('存证成功!');
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      getdata() {
        this.http.permissionowners().then(res => {
          // console.log(res)
          if (res.status == '200'){
            var list =res.data.data.owners_list;
            // console.log(list)
            var newdata =[];
            for(var index in list){
              if(index !=null){
                var json={
                  value: index,
                  label: list[index]
                }
                newdata.push(json)
              }
            }
            this.username = newdata;
          }else{
            this.http.messageFun('error',res.data.msg)
          }
        })
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
      // padding-top: 4rem;
    }
    .top_center {
      width: 36%;
      margin: 0 auto;
      p{
        margin-bottom: 1rem;
      }
    }
  }
</style>
