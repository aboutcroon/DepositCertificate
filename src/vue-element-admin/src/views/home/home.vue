<style lang="less">
  @import './home.less';
</style>
<template>
  <div class="right_cont home-container" style="margin-top:5px">
    <el-row class="home-row">
      <el-col :span="14">
        <div class="home-block" style="height: 264px;padding: 25px;">
          <el-row>
            <el-col :span="12">
              <div style="height: 40px;">
                <div class="hair">
                  <img :src="imguser">
                </div>
                <div style="padding-left: 50px;font-size: 16px;">
                  {{ user_name }}
                </div>
                <div style="padding-left: 50px;">
                  <div class="type-tag type-tag-normal">
                    {{ user_type }}
                  </div>

                </div>
              </div>
              <span class="icon iconfont iconhuanying" style="font-size: 73px;margin: 14px 0 32px"></span>
              <div class="home-text home-text-hasicon" v-show="node_name.length > 0">
                <div class="home-div-icon" style="background-color: #B65752"></div>
                {{ node_name }}
              </div>
              <div class="home-text home-text-hasicon" v-show="organization.length > 0">
                <div class="home-div-icon" style="background-color: #52B1B6"></div>
                {{ organization }}
              </div>
            </el-col>
            <el-col :span="12">
              <div style="height: 214px;float: right">
                <img src="../../assets/img/img@1x.png"
                     srcset="../../assets/img/img@2x.png 2x,../../assets/img/img@3x.png 3x"/>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="home-block" style="padding: 20px;height: 264px">
          <div class="home-title">
            <span class="icon iconfont iconupload_cunzheng"></span><span>我要存证</span>
          </div>
          <div style="padding: 0 23px;margin-top: 10px;">
            <div>
              <div class="home-btn" @click="toData(1)">
                <div class="home-btn-icon">
                  <span class="icon iconfont iconfile" style="color: #21BF74;"></span>
                </div>
                <div style="height: 23px;line-height: 23px;font-size: 14px;">文件存证</div>
              </div>
              <div class="home-btn" style="margin-left: 25px" @click="toData(2)">
                <div class="home-btn-icon">
                  <span class="icon iconfont icondata" style="color: #EC562B;"></span>
                </div>
                <div style="height: 23px;line-height: 23px;font-size: 14px;">数据存证</div>
              </div>
            </div>
            <div class="home-tag home-tag-blue" style="margin-top: 25px;">
              <span>您已经存证</span>
              <span class="home-tag-info">{{ all_cnt }}条信息</span>
            </div>
            <div class="home-tag home-tag-green" style="margin-top: 12px;">
              <span>已通过检验</span>
              <span class="home-tag-info">{{ successed_cnt }}条信息</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="home-block" style="height: 56px;padding: 8px 20px;">
          <div class="home-main-input">
            <Input v-model="cont" style="border-color: #3B3783" @keyup.enter.native="topquery">
            <Button slot="append" style="color: #fff" @click="topquery">搜索</Button>
            </Input>
          </div>
          <div style="display: inline-block;float: right;width: 300px;height: 40px;line-height: 40px;">
            <el-row class="font">
              <el-col v-for="item in title" :key="item.title" :span="4" style="float: right"><span
                style="cursor: pointer;" @click="tojump($event)">{{ item.title }}</span></el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="home-block home-block-bottom" style="padding: 20px;min-height:360px;height: calc(100vh - 478px);">
          <div class="home-title">
            <span class="icon iconfont icontask1"></span><span>我的任务</span>
          </div>
          <el-table
            class="boya-table"
            :data="hg"
            style=""
            :row-style="common.rowStyle"
            empty-text="暂无数据，请重新查询">
            <el-table-column prop="owner" width="200" label="用户名称" show-overflow-tooltip/>
            <el-table-column prop="block_number_int" label="区块高度" width="120" show-overflow-tooltip>
              <template slot-scope="scope">
                <span @click="jump(scope.$index, scope.row)">{{ scope.row.block_number_int }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="block_hash" label="区块哈希" show-overflow-tooltip>
              <template slot-scope="scope">
                <span @click="jump(scope.$index, scope.row)">{{ scope.row.block_hash }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="timestamp" label="时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.timestamp }} 前</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="home-block home-block-bottom" style="padding: 20px;min-height:360px;height: calc(100vh - 478px);">
          <div class="home-title">
            <span class="icon iconfont iconStoragedynamics"></span><span>存储动态</span>
          </div>
          <superslide v-if="hg.length" :options="options" class="picMarquee-top">
            <div class="bd">
              <ul class="picList">
                <li v-for="item in hg" :key="item.value" class="file">
                  <div class="home-slide-li">
                    <div class="home-slide-block">
                      <div style="height: 40px;line-height: 40px;">
                        <div
                          style="display: inline-block;width: 40px;height: 40px;text-align: center;vertical-align: middle">
                          <span class="icon iconfont iconDefaultavatar"></span>

                          <!--<img src="../../assets/img/u180.png" style="height: 40px;width: 40px;">-->
                        </div>
                        <span style="vertical-align: top;margin-left: 12px;">{{ item.owner }}</span>
                        <span style="float: right">{{ item.timestamp }}前</span>
                      </div>
                      <div style="line-height: 20px;margin-top: 10px;">
                        <span>在</span>
                        <span>计算节点A</span>
                        <span>存储</span>
                        <span style="color: #BF495A">区块</span>
                        <span style="color: #BF495A">#{{ item.block_number_int }}</span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </superslide>
        </div>
      </el-col>
    </el-row>

  </div>
</template>
<script>
  import Transfer from '../../api/transfer'
  export default {
    name: 'Home',
    data() {
      return {
        hackReset: true,
        effect: 'topMarquee',
        vis: 6,
        interTime: 50,
        opp: false,
        pnLoop: true,
        mouseOverStop: false,
        options: {mainCell: '.bd ul', autoPlay: true, effect: 'topMarquee', vis: 6, interTime: 50},
        // 默认单选
        vertical: 'jianguan',
        user_name: '',
        username: '',
        cont: '',
        select1: 'day',
        // 对话框
        // modal1: false,
        user_type: '',
        successed_cnt: '',
        all_cnt: '',
        // 我的任务
        tasks: [],
        hg: [],
        title: [],
        node_name: '',
        organization: '',
        msg: '',
        tips: false,
        imguser: '',
        hometips: ''
      }
    },
    watch: {
      effect(val) {
        console.log('effect:' + val)
        this.options.effect = val
        // this.hackResetFun()
      },
      vis(val) {
        console.log('vis:' + val)
        this.options.vis = val
        // this.hackResetFun()
      },
      interTime(val) {
        console.log('interTime:' + val)
        this.options.interTime = val
        // this.hackResetFun()
      },
      opp(val) {
        console.log('opp:' + val)
        this.options.opp = val
        // this.hackResetFun()
      },
      mouseOverStop(val) {
        console.log('mouseOverStop:' + val)
        this.options.mouseOverStop = val
        // this.hackResetFun()
      },
      pnLoop(val) {
        console.log('pnLoop:' + val)
        this.options.pnLoop = val
        // this.hackResetFun()
      }
    },
    mounted() {
      //  展示用户信息
      this.data()
    },
    methods: {
      // 获取用户信息
      data() {
        this.http.userinfo().then(res => {
          if (res.data.code == '0') {
            this.user_name = res.data.data.user_name
            this.user_type = res.data.data.user_type
            this.node_name = res.data.data.node_name
            this.organization = res.data.data.organization
            this.imguser = res.data.data.avatar
            if (res.data.data.user_type = '计算节点用户') {
              this.vertical = 'jisuan'
            } else if (res.data.data.user_type = '监管节点用户') {
              this.vertical = 'jianguan'
            } else if (res.data.data.user_type = '普通用户') {
              this.vertical = 'putong'
            }
            Transfer.pipe = this.user_name
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
        //  标签搜索
        this.http.tagrank().then(res => {
          // console.log(res)
          var data = res.data.data.rank_data_list
          var showdata = []
          var id = 0
          for (var item of data) {
            var json = {
              id: id,
              title: item
            }
            id++
            showdata.push(json)
            if (id >= 7) break;
          }
          this.title = showdata
        })
        //  存证数量
        this.http.userevidencescnt().then(res => {
          // console.log(res)
          if (res.data.code == '0') {
            // if(res.data.data.all_cnt )
            this.all_cnt = res.data.data.all_cnt

            this.successed_cnt = res.data.data.successed_cnt
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
        // 我的任务
        this.http.userblocks().then(res => {
          // console.log(res)
          if (res.data.code == '0') {
            var taskdata = res.data.data.block_list
            // console.log(taskdata)
            var showdata = []
            var id = 0
            for (var i in taskdata) {
              // if(taskdata[i]!=null){
              // console.log(taskdata[i].timestamp)
              var tell = this.time.timestampToTime(taskdata[i].timestamp * 1000, 'DT1')
              taskdata[i].timestamp = this.time.timeDifference(tell, 'DT5')
              var name = ''
              if (taskdata[i].owner.length > 10) {
                name = taskdata[i].owner.substring(0, 10) + '...'
              } else {
                name = taskdata[i].owner
              }
              var json = {
                id: id,
                block_number_int: taskdata[i].block_number_int,
                block_hash: taskdata[i].block_hash,
                owner: name,
                timestamp: taskdata[i].timestamp
              }
              id++
              if (id >= 6) break;
              showdata.push(json)
              // }
            }
            this.tasks = showdata
            this.hg = showdata
          } else {
            this.tips = true
            this.msg = res.data.msg
            // this.http.messageFun('error',res.data.msg)
          }
        })
        var value = Transfer.Tips
        var phone = Transfer.phone
        if (!value) {
          return false
        }
        var num = parseInt(value.substr(0, value.length - 1))
        if (num < 31) {
          this.hometips = '还有' + value + '系统到期，请提前联系管理员：' + phone
          this.$message({
            showClose: true,
            message: this.hometips,
            type: 'warning',
            duration: 0
          })
        }
      },
      //  跳转详情页
      jump(event) {
        // console.log(this.$refs.numname[event].innerHTML)
        this.$router.push({
          name: 'block', // 跳转的页面
          params: {
            'blockdata': this.$refs.numname[event].innerHTML // 我们要传递的参数
          }
        })
      },
      // 跳转到存证数据统计
      tojump(event) {
        // console.log(event.target.innerText)
        this.$router.push({
          name: 'data_census', // 跳转的页面
          params: {
            'censusdata': event.target.innerText // 我们要传递的参数
          }
        })
      },
      //  跳转存证页
      toData(event) {
        // console.log(this.$refs.numname[event].innerHTML)
        this.$router.push({
          name: 'data_status', // 跳转的页面
          params: {
            'type': event // 我们要传递的参数
          }
        })
      },
      topquery() {
        this.http.search({search_word: this.cont}).then(res => {
          if (res.status == '200') {
            var isnum = /^\d+$/.test(this.cont)
            if (this.cont.slice(0, 2) == '0x') {
              this.$router.push({
                name: 'details', // 跳转的页面
                params: {
                  'detailsdata': this.cont // 我们要传递的参数
                }
              })
            } else if (isnum == true) {
              // console.log(res)
              var data = res.data.data.value
              // console.log(data)
              this.$router.push({
                name: 'block', // 跳转的页面
                params: {
                  'blockdata': data // 我们要传递的参数
                }
              })
            } else {
              // console.log(res)
              this.$router.push({
                name: 'data_census', // 跳转的页面
                params: {
                  'censusdata': this.cont // 我们要传递的参数
                }
              })
            }
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      },
      handleClose() {

      }
    }
  }
</script>

<style lang="less">
</style>
