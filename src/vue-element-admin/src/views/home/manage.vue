<style lang="less">
  @import 'home.less';
</style>
<template>
  <div class="right_cont home-container" style="margin-top:5px">
    <el-row class="home-row">
      <el-col :span="14">
        <div class="home-block" style="height: 264px;padding: 25px;">
          <el-row>
            <el-col :span="12">
              <div style="height: 40px; width: 400px">
                <div class="hair">
                  <img :src="imguser">
                </div>
                <div style="display: inline-block; padding-left: 10px;">
                  <div style="font-size: 16px;">
                    {{ user_name }}
                  </div>
                  <div>
                    <div class="type-tag" :class="isYiji?'type-tag-yiji':'type-tag-jianguan'">
                      {{ user_type }}
                    </div>
                  </div>
                </div>
                <Button class="btn-switch" style="margin: 6px 0 0 21px;" @click="modal1 = true">用户类型变更</Button>
              </div>
              <span class="icon iconfont iconhuanying" style="font-size: 65px;margin: 14px 0 32px"></span>
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
        <div class="home-block" style="height: 264px; padding: 20px;">
          <div class="home-title">
            <span class="icon iconfont iconContractcall" style="font-size: 12px"></span><span>合约调用情况</span>
          </div>
          <div style="padding: 0 23px;margin-top: 10px;">
            <ContractPie style="height: 200px;"/>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <line-tags
          :line="[require('../../assets/img/Line1.png'),require('../../assets/img/Line1@2x.png') + ' 2x']"
          title="所有业务数据"
          :value="all_data_count">

        </line-tags>
      </el-col>
      <el-col :span="4">
        <line-tags
          :line="[require('../../assets/img/Line2.png'),require('../../assets/img/Line2@2x.png') + ' 2x']"
          title="存查证业务数据"
          :value="evidence_count">

        </line-tags>
      </el-col>
      <el-col :span="4">
        <line-tags
          :line="[require('../../assets/img/Line3.png'),require('../../assets/img/Line3@2x.png') + ' 2x']"
          title="合约部署数量"
          :value="contract_count">

        </line-tags>
      </el-col>
      <el-col :span="4">
        <line-tags
          :line="[require('../../assets/img/Line4.png'),require('../../assets/img/Line4@2x.png') + ' 2x']"
          title="合约调用数量"
          :value="contract_used_count">

        </line-tags>
      </el-col>
      <el-col :span="4">
        <line-tags
          :line="[require('../../assets/img/Line5.png'),require('../../assets/img/Line5@2x.png') + ' 2x']"
          title="合约调用频率"
          :value="contract_used_frequency">

        </line-tags>
      </el-col>
      <el-col :span="4">
        <line-tags
          :line="[require('../../assets/img/Line6.png'),require('../../assets/img/Line6@2x.png') + ' 2x']"
          title="用户数"
          :value="all_user_count">
        </line-tags>
      </el-col>
      <el-col :span="16">
        <div class="home-block" style="padding: 20px; height: 425px;">
          <div class="home-title">
            <span class="icon iconfont iconNodecirculation"></span><span>节点数据流转图</span>
          </div>
          <div style="width:470px;margin: 49px auto 0">
            <img :src="fixurl" style="width:100%;">
          </div>
          <div class="home-block-RT">
            <div class="data-card-main" style="display: inline-block;">
              <div class="data-card-title data-card-red">今日新增存证数</div>
              <div class="data-card-text">{{evidence}}条</div>
            </div>
            <div class="data-card-main" style="display: inline-block;margin-left: 36px;">
              <div class="data-card-title data-card-blue">今日新增用证数</div>
              <div class="data-card-text">{{card}}条</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="home-block" style="height: 425px;overflow: hidden">
          <el-tabs type="border-card" stretch class="home-block-tabs" v-model="trendsTabs" @tab-click="handleTabsClick">
            <el-tab-pane label="存证动态" name="1">

            </el-tab-pane>
            <superslide v-if="tables.length" :options="options" class="picMarquee-top" v-show="trendsTab1">
              <div class="bd">
                <ul class="picList">
                  <li v-for="item in tables" :key="item.key" class="file">
                    <div class="home-slide-li">
                      <div class="home-slide-block">
                        <div style="height: 40px;line-height: 40px;">
                          <div
                            style="display: inline-block;width: 40px;height: 40px;text-align: center;vertical-align: middle">
                            <!--<span class="icon iconfont iconDefaultavatar"></span>-->
                            <!-- 使用默认头像 -->
                            <img src="../../assets/img/geren_profile.png" style="height: 40px;width: 40px;">
                          </div>
                          <span style="vertical-align: top;margin-left: 12px;">{{ item.owner }}</span>
                          <span style=" float: right">{{ item.timestamp }}前</span>
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
            <el-tab-pane label="查证动态" name="2">

            </el-tab-pane>
            <superslide v-if="Verify.length" :options="options" class="picMarquee-top" v-show="trendsTab2">
              <div class="bd" :class="tabHide">
                <ul class="picList">
                  <li v-for="item in Verify" :key="item.key" class="file">
                    <div class="home-slide-li">
                      <div class="home-slide-block">
                        <div style="height: 40px;line-height: 40px;">
                          <div
                            style="display: inline-block;width: 40px;height: 40px;text-align: center;vertical-align: middle">
                            <!--<span class="icon iconfont iconDefaultavatar"></span>-->
                            <img src="../../assets/img/geren_profile.png" style="height: 40px;width: 40px;">
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
          </el-tabs>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="home-block" style="padding: 20px;">
          <el-table
            class="boya-table"
            :data="tableData2"
            style="width: 98%;clear:both;margin:auto;margin-top:20px;margin-bottom: 57px;"
            :row-style="common.rowStyle"
            :cell-style="cellStyle"
            empty-text="暂无数据，请重新查询">
            <el-table-column prop="num" width="80" label="序号" show-overflow-tooltip/>
            <el-table-column prop="node_name" label="节点名" width="200" show-overflow-tooltip/>
            <el-table-column prop="node_type" label="节点类型" show-overflow-tooltip/>
            <el-table-column prop="block_number" label="区块号" show-overflow-tooltip/>
            <el-table-column prop="node_status" width="400" label="节点状态" style="padding-left: 30px"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <svg t="1597915975120" class="icon" v-if="scope.row.node_status === '正常'"
                     style="width: 20.9px; height: 20.9px; margin-left: 20px;" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="3433" width="16" height="16">
                  <path
                    d="M512 85.333c236.8 0 426.667 192 426.667 426.667S746.667 938.667 512 938.667 85.333 746.667 85.333 512 277.333 85.333 512 85.333z m234.667 262.4l-294.4 245.334-128-138.667-40.534 38.4 162.134 181.333L785.067 384l-38.4-36.267z"
                    p-id="3434" fill="#2aa515"></path>
                </svg>
                <svg t="1597916026765" class="icon" v-if="scope.row.node_status !== '正常'"
                     style="width: 20.9px; height: 20.9px; margin-left: 20px;" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="3647" width="16" height="16">
                  <path
                    d="M512 938.667c-236.8 0-426.667-192-426.667-426.667S275.2 85.333 512 85.333s426.667 192 426.667 426.667-192 426.667-426.667 426.667z m0-61.867c200.533 0 364.8-164.267 364.8-364.8S712.533 147.2 512 147.2 147.2 311.467 147.2 512 309.333 876.8 512 876.8z"
                    p-id="3648" fill="#bfbfbf"></path>
                  <path d="M194.133 236.8l42.667-42.667L829.867 787.2 787.2 829.867z" p-id="3649" fill="#bfbfbf"></path>
                </svg>
              </template>
            </el-table-column>
            <el-table-column prop="c_time" width="180" label="加入时间" show-overflow-tooltip/>
          </el-table>
          <p class="boya-page">
            <el-pagination
              @size-change="onpage"
              @current-change="onchang"
              :current-page="pageNum2"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize2"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totals2">
            </el-pagination>
          </p>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="home-block" style="padding: 20px;height: 450px;">
          <div class="home-title">
            <span class="icon iconfont iconNodestorage"></span><span>节点存储概览图</span>
          </div>
          <div style="margin-top: 30px;">
            <chart-legend
              beforeColor="#BF495A"
              title="存证数量">

            </chart-legend>
            <chart-legend
              beforeColor="#E8B66E"
              title="用证数量">

            </chart-legend>
          </div>
          <div style="margin: 20px auto 0">
            <p v-show="tips" style="padding:1rem">{{ msg }}</p>
            <trend-chart3
              :lineColor="['#FAAD14','#BF495A']"
              :areaColor="['#FAAD14','#BF495A']"
              :LineName="['用证数量','存证数量']"
              unit="条"
              :LineData="chartDataList.nodeStorageList"
              :xAxis="chartDataList.nodeStorageTime"
              height="326px">

            </trend-chart3>
            <Data style="height: 345px;"/>
          </div>
          <div class="home-block-RT">
            <div class="home-main-input">
              <Input v-model="searchKey" @keyup.enter.native="topquery">
              <Button slot="append" style="color: #fff" @click="topquery">搜索</Button>
              </Input>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :span="12">
        <div class="home-block" style="padding: 20px;height: 425px;">
          <div class="home-title">
            <span class="icon iconfont iconNodestorage"></span><span>合约调用趋势</span>
          </div>
          <div style="margin: 20px auto 0">
            <trend-chart
              lineColor="rgba(191,73,90,1)"
              areaColor="rgba(191,73,90,1)"
              LineName="合约调用"
              unit="条"
              :LineData="chartDataList.contractCallTrendList"
              :xAxis="chartDataList.contractCallTrendTime"
              height="326px">

            </trend-chart>
            <!--<ContractLine style="height: 328px;" />-->
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="home-block" style="padding: 20px;height: 425px;">
          <div class="home-title">
            <span class="icon iconfont iconNodestorage"></span><span>合约调用情况</span>
          </div>
          <div style="margin: 20px auto 0">
            <pie-chart
              :LineData="chartDataList.contractCallNumList"
              :legendData="chartDataList.contractCallNumLegendData"
              :legend="chartDataList.contractCallNumLegend"
              height="326px">

            </pie-chart>
            <!--<ContractPie style="height: 328px;" />-->
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="home-block" style="padding: 20px;height: 433px;">
          <div class="home-title" @click="init">
            <span class="icon iconfont iconNodestorage"></span><span>合约创建趋势</span>
          </div>
          <div style="margin-top: 30px;">
            <chart-legend
              beforeColor="#3B3783"
              title="创建绑定">

            </chart-legend>
            <chart-legend
              beforeColor="#FAAD14"
              title="创建未绑定">

            </chart-legend>
          </div>
          <div style="margin: 20px auto 0">
            <bar-chart1
              ref="chart1"
              :barData="chartDataList.contractCompileList"
              :xAxis="chartDataList.contractCompileTime"
              height="310px">

            </bar-chart1>
            <!--<ContractLine style="height: 328px;" />-->
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="home-block" style="padding: 20px;height: 433px;">
          <div class="home-title">
            <span class="icon iconfont iconNodestorage"></span><span>接口调用趋势（前三）</span>
          </div>
          <div style="margin-top: 30px;">
            <chart-legend
              beforeColor="#3B3783"
              v-show="apiNameList[0].name!=='0'"
              :title="chartDataList.apiList[0].name">

            </chart-legend>
            <chart-legend
              beforeColor="#FAAD14"
              v-show="apiNameList[1].name!=='1'"
              :title="chartDataList.apiList[1].name">

            </chart-legend>
            <chart-legend
              beforeColor="#BF495A"
              v-show="apiNameList[2].name!=='2'"
              :title="chartDataList.apiList[2].name">

            </chart-legend>
          </div>
          <div style="margin: 20px auto 0">
            <bar-chart2
              :barData="chartDataList.apiList"
              :xAxis="chartDataList.apiTime"
              height="310px">

            </bar-chart2>
            <!--<ContractLine style="height: 328px;" />-->
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="home-block home-block-bottom" style="padding: 20px;height: 450px;">
          <div class="home-title">
            <span class="icon iconfont iconNodestorage"></span><span>近一周活跃用户趋势表</span>
          </div>
          <div style="margin-top: 30px;">
            <chart-legend
              beforeColor="#BF495A"
              :value="user_total"
              title="所有用户数量">

            </chart-legend>
            <chart-legend
              beforeColor="#495ABF"
              title="新增用户数量">

            </chart-legend>
          </div>
          <div style="margin: 20px auto 0">
            <trend-chart2
              lineColor="rgba(191,73,90,1)"
              LineName="新增用户数量"
              unit="人"
              :LineData="chartDataList.newUserList"
              :xAxis="chartDataList.newUserTime"
              height="326px">

            </trend-chart2>
            <!--<Week />-->
          </div>
        </div>
      </el-col>
    </el-row>
    <Modal v-model="modal1" width="900" class="home-modal">
      <div class="home-identity-modal">
        <div style="margin-bottom: 64px;" class="home-modal-title">请选择登录身份</div>
        <div>
          <div class="home-identity-block" style="margin-right: 125px;" @click="vertical = '1'">
            <img v-show="vertical === '1'" src="../../assets/img/计算几点节点用户_选中@1x.png"
                 srcset="../../assets/img/计算几点节点用户_选中@2x.png 2x,../../assets/img/计算几点节点用户_选中@3x.png 3x"/>
            <img v-show="vertical === '2'" src="../../assets/img/计算节点用户_未选中@1x.png"
                 srcset="../../assets/img/计算节点用户_未选中@2x.png 2x,../../assets/img/计算节点用户_未选中@3x.png 3x"/>
            <div style="margin-top: 56px;" class="home-modal-text">
              <span class="icon iconfont iconactivated" :class="vertical === '1'?'is-selected':''"
                    style="margin-right: 10px;"></span><span>监管节点用户</span>
            </div>
          </div>
          <div class="home-identity-block" @click="vertical = '2'">
            <img v-show="vertical === '2'" src="../../assets/img/监管节点用户_选中@1x.png"
                 srcset="../../assets/img/监管节点用户_选中@2x.png 2x,../../assets/img/监管节点用户_选中@3x.png 3x"/>
            <img v-show="vertical === '1'" src="../../assets/img/监管节点用户_未选中@1x.png"
                 srcset="../../assets/img/监管节点用户_未选中@2x.png 2x,../../assets/img/监管节点用户_未选中@3x.png 3x"/>
            <div style="margin-top: 56px;" class="home-modal-text">
              <span class="icon iconfont iconactivated " :class="vertical === '2'?'is-selected':''"
                    style="margin-right: 10px;"></span><span>计算节点用户</span>
            </div>
          </div>
          <div style="margin-top: 110px;">
            <div class="main-btn-container" style="margin: 0 auto; width: 102px;">
              <Button class="btn-reset" :loading="loading" @click="change">
                <span v-if="!loading">开始使用</span>
                <span v-else>切换中</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
    <div class="right_cont" style="margin-top:5px">
      <!--<div class="top_cont">-->
      <!--<el-row>-->
      <!--<el-col :span="15">-->
      <!--<el-col class="hair"><img :src="imguser"></el-col>-->
      <!--<el-col :span="20" style="margin-left:2rem">-->
      <!--<p class="every">{{ user_name }},祝你开心每一天</p>-->
      <!--<Button type="primary" style="border-radius: 14px;padding:3px 14px 3px 16px;margin-top:5px;font-size:12px;" @click="modal1 = true">用户类型变更</Button>-->
      <!--</el-col>-->
      <!--<el-col :span="20" style="margin-left:2rem">-->
      <!--<p class="people"><span>{{ user_type }}</span><span>|</span><span>{{ node_name }}{{ organization }}</span></p>-->
      <!--</el-col>-->
      <!--</el-col>-->
      <!--</el-row>-->
      <!--</div>-->
      <!--<div class="bottom_cont">-->
      <!--<div class="noun">-->
      <!--<el-row :gutter="10">-->
      <!--<el-col :span="10">-->
      <!--<div class="cont_center">-->
      <!--<p style="font-size: 14px;padding:0.7rem 1rem 1rem">各单位存证数据排行</p>-->
      <!--</div>-->
      <!--<div class="record" style="height:22.5rem">-->
      <!--<Noun />-->
      <!--</div>-->
      <!--</el-col>-->
      <!--<el-col :span="14" style="float:right;">-->
      <!--<div class="cont_center">-->
      <!--<p style="font-size: 14px;padding:0.7rem 1rem 1rem">用证搜索关键词</p>-->
      <!--</div>-->
      <!--<div class="record">-->
      <!--<Say style="height: 328px;" />-->
      <!--</div>-->
      <!--</el-col>-->
      <!--</el-row>-->
      <!--</div>-->
      <!--<div class="noun">-->
      <!--<el-row :gutter="10">-->
      <!--<el-col :span="10">-->
      <!--<div class="cont_center">-->
      <!--<p style="font-size: 14px;padding:0.7rem 1rem 1rem">合约调用趋势</p>-->
      <!--</div>-->
      <!--<div class="record" style="height:22.5rem">-->
      <!--<ContractLine style="height: 328px;" />-->
      <!--</div>-->
      <!--</el-col>-->
      <!--<el-col :span="14" style="float:right;">-->
      <!--<div class="cont_center">-->
      <!--<p style="font-size: 14px;padding:0.7rem 1rem 1rem">合约调用情况</p>-->
      <!--</div>-->
      <!--<div class="record">-->
      <!--<ContractPie style="height: 328px;" />-->
      <!--</div>-->
      <!--</el-col>-->
      <!--</el-row>-->
      <!--</div>-->

      <!--<div class="week">-->
      <!--<div class="cont_center">-->
      <!--<p style="font-size: 14px;padding:0.7rem 1rem 1rem">近一周活跃用户趋势表</p>-->
      <!--</div>-->
      <!--<Week />-->
      <!--</div>-->
      <!--</div>-->
    </div>
  </div>

</template>

<script>
  import Data from './data/data'
  import Noun from './data/noun'
  import Say from './data/say'
  import Week from './data/week'
  import ContractPie from './data/contract-used-pie'
  import ContractLine from './data/contract-line'
  // 数据统计
  import LineTags from '@/components/Boya/Manage/LineTags/tags'
  // 普通折线图
  import TrendChart from '@/components/echarts/line1/line'
  // 渐变色折线图
  import TrendChart2 from '@/components/echarts/line2/line'
  // 双折线
  import TrendChart3 from '@/components/echarts/line3/line'
  // 玫瑰图
  import PieChart from '@/components/echarts/pie1/pie'
  // 折线图图例
  import ChartLegend from '@/components/Boya/BorderTitle/borderTitle'
  // 纵向柱状图
  import barChart1 from '@/components/echarts/bar1/bar'
  // 横向柱状图
  import barChart2 from '@/components/echarts/bar2/bar'
  import Transfer from '../../api/transfer.js'
  export default {
    name: 'Home',
    components: {
      Data,
      Noun,
      Say,
      Week,
      ContractPie,
      ContractLine,
      LineTags,
      TrendChart,
      TrendChart2,
      TrendChart3,
      ChartLegend,
      PieChart,
      barChart1,
      barChart2
    },
    computed: {
      isYiji() {
        let value = sessionStorage.getItem('key')
        return JSON.parse(value) === 2
      },
    },
    data() {
      return {
        hackReset: true,
        effect: 'topMarquee',
        vis: 6,
        interTime: 50,
        opp: false,
        pnLoop: true,
        mouseOverStop: false,
        options: {mainCell: '.bd ul', autoPlay: true, effect: 'topMarquee', vis: 8, interTime: 50},
        tips: false,
        existing: false,
        verifys: false,
        msg: '',
        existingmsg: '',
        verifymsg: '',
        // tab数据
        all_data_count: '',
        all_user_count: '',
        contract_count: '',
        contract_used_count: '',
        contract_used_frequency: '',
        evidence_count: '',
        // 默认单选
        vertical: '1',
        user_name: '',
        username: '',
        node_name: '',
        organization: '',
        cont: '',
        select1: 'day',
        // 对话框
        modal1: false,
        loading: false,
        user_type: '',
        successed_cnt: '',
        evidence: '',
        card: '',
        all_cnt: '',
        user_total: '',
        yesterday_user: '',
        //  词云
        cloud: [],
        lately: '',
        //  下一页
        pageNum: '1',
        list: [],
        node: '',
        pre_day_cnt: '',
        today_cnt: '',
        sum_cnt: '',
        teamdata: '',
        imguser: '',
        // 动态数据
        trendsTabs: '1',
        trendsTab1: true,
        trendsTab2: true,
        tabHide: 'tab-hide',
        tables: [],
        Verify: [],
        // tableData: [],
        //节点列表
        pageNum2: 1,
        pageSize2: 10,
        totals2: 0,
        tableData2: [],
        cellStyle: this.common.cellStyle('node_status', {
          '开发中': 1,
          '正常': 0,
          '异常': 2,
        }, 4),
        searchKey: '',

        pageNum3: 1,
        totals3: '',

        pageNums: 1,
        pageSize: 7,
        manage_page: 1,
        manage_Size: 7,
        tab_back: require('../../assets/img/u4179.png'),
        fixurl: require('../../assets/img/circulation@3x.png'),
        // 图标数据
        chartDataList: {
          contractCallTrendList: [],
          contractCallTrendTime: [],
          newUserList: [],
          newUserTime: [],
          contractCallNumList: [],
          contractCallNumLegend: [],
          contractCallNumLegendData: {},
          nodeStorageList: [],
          nodeStorageTime: [],
          contractCompileTime: [],
          contractCompileList: [],
          apiTime: [],
          apiList: [{name: "接口1", data: [0, 0, 0, 0, 0]}, {name: "接口2", data: [0, 0, 0, 0, 0]}, {name: "接口3", data: [0, 0, 0, 0, 0]}],
        },
        apiNameList: [{name: "0", data: [0, 0, 0, 0, 0]}, {name: "1", data: [0, 0, 0, 0, 0]}, {name: "2", data: [0, 0, 0, 0, 0]}]
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
      this.getApiData()
      this.getContractCompileData()
      this.num()
      this.getNodeData()
      this.getSubuserRank()
      // this.task()
      // window.onresize = () => {
      //   this.$refs.myChange.my() // 调用子组件的功能 - 图表伸缩响应
      // }
    },
    methods: {
      init() {
        console.log('11')
        console.log(this.chartDataList.contractCompileList)
        console.log(this.$refs.chart1.barData)
      },
      // 分页
      onchang(pageNum) {
        this.pageNums = pageNum
        this.num()
      },
      manage_onchang(pageNum) {
        this.manage_page = pageNum
        this.num()
      },
      // 获取用户信息
      data() {
        this.http.userinfo().then(res => {
          // console.log(res)
          if (res.data.code == '0') {
            this.user_name = res.data.data.user_name
            this.user_type = res.data.data.user_type
            this.node_name = res.data.data.node_name
            this.organization = res.data.data.organization
            this.imguser = res.data.data.avatar
            this.vertical = res.data.data.user_type_int.toString()
            this.teamdata = res.data.data.e_time.substr(0, 10)
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
        // 统计数据
        this.http.operaterdata().then(res => {
          // console.log(res)
          if (res.status == '200') {
            this.sum_cnt = res.data.data.sum_cnt
            this.today_cnt = res.data.data.today_cnt
            this.pre_day_cnt = res.data.data.pre_day_cnt
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
        // 区块链数据
        this.http.contractstatistics().then(res => {
          console.log(res)
          if (res.status == '200') {
            this.all_data_count = res.data.data.all_data_count + ''
            this.all_user_count = res.data.data.all_user_count + ''
            this.contract_count = res.data.data.contract_count + ''
            this.contract_used_count = res.data.data.contract_used_count + ''
            this.contract_used_frequency = res.data.data.contract_used_frequency + ''
            this.evidence_count = res.data.data.evidence_count + ''
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
        // 节点数据流转
        this.http.nodedata().then(res => {
          if (res.status == '200') {
            this.evidence = res.data.data.today_upload_cnt
            this.card = res.data.data.today_download_cnt
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
        //  用证搜索关键词
        this.http.cloudsearchkeys().then(res => {
          // console.log(res)
          if (res.status == '200') {
            var echardata = res.data.data.rank_data_list
            // console.log(echardata)
            var echartable = []
            for (var y in echardata) {
              if (echardata[y] != null) {
                var json = {
                  name: echardata[y].name,
                  value: echardata[y].value,
                  textStyle: echardata[y].textStyle
                }
                echartable.push(json)
              }
            }
            this.cloud = echartable
            Transfer.$emit('say', this.cloud)// 提交中转站
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
        //  用户数量统计
        this.http.usercount().then(res => {
          console.log(res)
          if (res.data.code == '0') {
            this.user_total = res.data.data.user_total + '人'
            this.yesterday_user = res.data.data.yesterday_user
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
        //  近一周活跃折线图
        this.http.useractivity().then(res => {
          console.log(res)
          if (res.data.code == '0') {
            let tmpData = res.data.data
            this.chartDataList.newUserList = tmpData.week_user_activity_list
            this.chartDataList.newUserTime = tmpData.date_list
//          Transfer.$emit('latelys', this.lately)// 提交中转站
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
        var param = {
          'data_type': '1',
          'interval_days': '1',
          'x_num': '7',
        }
        //  近一周合约调用趋势
        this.http.echartbrokenline(param).then(res => {
          console.log(res)
          if (res.data.code == '0') {
            let tmpData = res.data.data
            this.chartDataList.contractCallTrendList = tmpData.dataList[0].data
            this.chartDataList.contractCallTrendTime = tmpData.xAxis.data
//          Transfer.$emit('contract_line', this.lately)// 提交中转站
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
        //  合约调用情况
        this.http.piechart().then(res => {
          if (res.data.code == '0') {
            this.buidePieData(res.data.data)
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      },
      // 接口调用趋势
      getApiData() {
        let param = {
          data_type: '0',
          interval_days: '1',
          x_num: '5'
        }
        this.http.echartbrokentwoline(param).then(res => {
          // console.log(res)
          if (res.data.code == '0') {
            let tmpList = []
            for(let item of res.data.data.xAxis.data) {
              tmpList.push(item.substr(5,5))
            }
            this.chartDataList.apiTime = tmpList
            let datalist = res.data.data.dataList
            let numList = []
            for(let item of datalist) {
              let sum = 0
              for(let i of item.data){
                sum += i
              }
              numList.push({value:sum, data:item})
            }
            numList.sort((a, b) => {
              return b.value - a.value
            })

            tmpList = []
            for(let item of numList.slice(0, 3)) {
              tmpList.push(item.data)
            }
            if(tmpList.length === 1) {
              tmpList.push({name: '1', data: [0, 0, 0, 0, 0]})
            }
            if(tmpList.length === 2) {
              tmpList.push({name: '2', data: [0, 0, 0, 0, 0]})
            }
            this.apiNameList = tmpList
            this.chartDataList.apiList = tmpList

          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      },

      getContractCompileData() {
        let param = {
          data_type: '1',
          interval_days: '1',
          x_num: '5'
        }
        this.http.echartbrokentwoline(param).then(res => {
          // console.log(res)
          if (res.data.code == '0') {
            this.chartDataList.contractCompileTime = res.data.data.xAxis.data
            this.chartDataList.contractCompileList = res.data.data.dataList
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      },

      // 处理饼图，保留5%以上的数据
      buidePieData(data) {
        let sum = 0;
        for (let item of data.data) {
          sum += item.value
        }
        let other = 0;
        let tmplist1 = []
        let tmplist2 = []
        let tmpObject = {}
        for (let item of data.data) {
          if (item.value < sum / 20) {
            other += item.value
          } else {
            tmplist1.push(item.name)
            tmplist2.push(item)
            tmpObject[item.name] = (item.value * 100 / sum).toFixed(2)
          }
        }
        // 如果有被隐藏的合约
        if (other > 0) {
          tmplist1.push('其它合约')
          tmplist2.push({
            name: '其它合约',
            value: other
          })
          tmpObject['其它合约'] = (other * 100 / sum).toFixed(2)
        }
        this.pie_contract = {
          data: tmplist2
        }

        this.chartDataList.contractCallNumList = tmplist2
        this.chartDataList.contractCallNumLegend = tmplist1
        this.chartDataList.contractCallNumLegendData = tmpObject
        Transfer.$emit('pie_contract', this.pie_contract)
      },
      // 点击变更按钮状态
      change() {
        this.loading = true
        // this.modal_loading = true
        setTimeout(() => {
          this.http.userchange({new_user_type: this.vertical}).then(res => {
            // console.log(res)
            if (res.data.code == '0') {
              console.log(res)
              var data = res.data.data.new_user_type
              this.modal1 = false
              // console.log(typeof (data))
              sessionStorage.setItem('key', JSON.stringify(data))
              this.$Message.success('更改用户成功')
              this.$router.go(0)
            } else {
              this.http.messageFun('error', res.data.msg)
            }
            this.loading = false
          })
          // this.modal_loading = false
        }, 2000)
      },
      numadd() {
        this.pageNum == this.pageNum++
        this.getSubuserRank()
      },
      num() {
        // 存证动态
        // console.log(param)
        this.http.uploadevidences().then(res => {
          // console.log(res)
          if (res.data.code == '0') {
            var upload_block_list = res.data.data.upload_block_list
            var showdata = []
            for (var i in upload_block_list) {
              if (upload_block_list[i] != null) {
                var tell = this.time.timestampToTime(upload_block_list[i].timestamp * 1000, 'DT1')
                upload_block_list[i].timestamp = this.time.timeDifference(tell, 'DT5')
                var name = ''
                if (upload_block_list[i].owner.length > 10) {
                  name = upload_block_list[i].owner.substr(0, 10) + '...'
                } else {
                  name = upload_block_list[i].owner
                }
                var json = {
                  owner: name,
                  workname: '存储',
                  block_number_int: '#' + upload_block_list[i].block_number_int,
                  timestamp: upload_block_list[i].timestamp
                }
                showdata.push(json)
              }
            }
            this.tables = showdata
          } else {
            this.existing = true
            this.existingmsg = res.data.msg
            // this.http.messageFun('error', res.data.msg)
          }
        })
        //   查证状态
        // var params = {
        //   pagination: this.manage_page,
        //   limit: this.manage_Size
        // };
        this.http.downloadevidences().then(res => {
          if (res.data.code == '0') {
            var down_block_list = res.data.data.down_block_list
            var Verifydata = []
            for (var t in down_block_list) {
              if (down_block_list[t] != null) {
                var tells = this.time.timestampToTime(down_block_list[t].timestamp * 1000, 'DT1')
                down_block_list[t].timestamp = this.time.timeDifference(tells, 'DT5')
                var name = ''
                if (down_block_list[t].owner.length > 20) {
                  name = down_block_list[t].owner.substr(0, 20) + '...'
                } else {
                  name = down_block_list[t].owner
                }
                var jsons = {
                  owner: name,
                  workname: '查证',
                  block_number_int: '#' + down_block_list[t].block_number_int,
                  timestamp: down_block_list[t].timestamp
                }
                Verifydata.push(jsons)
              }
            }
            this.Verify = Verifydata
          } else {
            this.verifys = true
            this.verifymsg = res.data.msg
          }
        })
        //  节点存储概览图
        this.http.nodeechartsdata({months_num: '3'}).then(res => {
          console.log(res)
          if (res.data.code == '0') {
            let node = res.data.data.option
            this.chartDataList.nodeStorageList = [node.series[1].data, node.series[0].data]
            this.chartDataList.nodeStorageTime = node.xAxis.data
//            Transfer.$emit('data', this.node)// 提交中转站
          } else if (res.data.code == '2009') {
            this.tips = true
            this.msg = res.data.msg
            this.node = res.data.data.option
            Transfer.$emit('data', this.node)// 提交中转站
            // this.http.messageFun('error',res.data.msg)
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })

        var value = Transfer.Tips
        var phone = Transfer.phone
        if (value) {
          var num = parseInt(value.substr(0, value.length - 1))
        } else {
        }
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
      //    各单位存证数据排行
      onchang3(pageNum) {
        this.pageNum3 = pageNum
        this.getSubuserRank()
      },
      getSubuserRank() {
        this.http.subuserrank({pagination: this.pageNum3, limit: '5'}).then(res => {
          if (res.status == '200') {
            var weekdata = res.data.data.week_change_data_list
            this.totals3 = res.data.data.all_cnt
            var weektable = []
            var numdata = (this.pageNum - 1) * 10
            var nums = 1
            for (var y in weekdata) {
              if (weekdata[y] != null) {
                // console.log(weekdata[y].name.length)
                var name = ''
                if (weekdata[y].name == null) {
                  name = weekdata[y].name
                } else {
                  if (weekdata[y].name.length > 4) {
                    name = weekdata[y].name.substring(0, 4) + '...'
                  } else {
                    name = weekdata[y].name
                  }
                }
                var json = {
                  numdatas: numdata + nums,
                  username: weekdata[y].name,
                  name: name,
                  num: weekdata[y].cnt,
                  pk: weekdata[y].change_data
                }
                nums++
                weektable.push(json)
              }
            }
            this.list = weektable
//          Transfer.$emit('noun', this.list)// 提交中转站
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      },
      // 获取节点列表
      onchang(pageNum) {
        this.pageNum2 = pageNum
        this.getNodeData()
      },
      onpage(pageSize) {
        this.pageSize2 = pageSize
        this.getNodeData()
      },
      getNodeData() {
        var param = {
          'pagination': this.pageNum2,
          'limit': this.pageSize2
        }
        this.http.nodes(param).then(res => {
          console.log(res)
          if (res.data.code == '0') {
            this.totals2 = res.data.data.all_cnt
            var list = res.data.data.node_list
            var newdata = []
            var num = (this.pageNum - 1) * 10
            var nums = 1
            var user_type = ''
            for (var item of list) {
              if (item != null) {
                var json = {
                  num: num + nums,
                  node_name: item.node_name,
                  node_type: item.node_type,
                  block_number: item.block_number,
                  node_status: item.node_status,
                  c_time: item.c_time.substr(0, 10)
                }
                nums++
                newdata.push(json)
              }
            }
            this.tableData2 = newdata
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      },
      // 搜索
      topquery() {
        this.http.search({search_word: this.searchKey}).then(res => {
          if (res.status == '200') {
            var isnum = /^\d+$/.test(this.cont)
            if (this.cont.slice(0, 2) == '0x') {
              this.$router.push({
                name: 'details', // 跳转的页面
                query: {
                  'detailsdata': this.cont // 我们要传递的参数
                }
              })
            } else if (isnum == true) {
              // console.log(res)
              var data = res.data.data.value
              // console.log(data)
              this.$router.push({
                name: 'block', // 跳转的页面
                query: {
                  'blockdata': data // 我们要传递的参数
                }
              })
            } else {
              // console.log(res)
              this.$router.push({
                name: 'data_census', // 跳转的页面
                query: {
                  'censusdata': this.cont // 我们要传递的参数
                }
              })
            }
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      },
      // 标签页
      handleTabsClick(tab) {
        this.tabHide = ' '
        if (this.trendsTabs === '1') {
          this.trendsTab1 = true
          this.trendsTab2 = false
        } else {
          this.trendsTab1 = false
          this.trendsTab2 = true
        }
      }
    }
  }
</script>

<style lang="less">
  .table {
    margin-bottom: 1rem;
    span {
      display: inline-block;
      width: 27%;
      font-size: 13px;
    }
    span:first-child {
      /*background:#314659;*/
      width: 22%;
      margin-right: 1rem;
      border-radius: 50%;
      /*text-align: center;*/
      /*color:#fff*/
      margin-left: 5%
    }
  }

  .tab-hide {
    opacity: 0;
  }

  body .el-table th.gutter {
    display: table-cell !important;
  }

  .tempWrap {
    height: 840px !important;

    .file {
      height: 105px !important;
    }
  }
</style>
