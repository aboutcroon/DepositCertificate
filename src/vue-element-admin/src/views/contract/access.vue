<template>
  <div class="boya-view">
    <el-row style="width: 100%; padding-top: 20px">
      <el-col :span="24">
        <el-col class="main-input-container">
          &nbsp;
        </el-col>
        <el-col class="main-btn-container single-btn">
          <Button class="btn-search" @click="setPermissions()">权限分配</Button>
        </el-col>
      </el-col>
    </el-row>
    <el-table
      class="boya-table boya-table-scroll"
      :data="tableData"
      max-height="700"
      ref="multipleTable"
      style="width: 100%;clear:both;margin-bottom: 137px;"
      :row-style="common.rowStyle"
      :cell-style="cellStyle"
      @selection-change="handleSelectionChange"
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      empty-text="暂无数据，请重新查询">
      <el-table-column type="selection" width="55" show-overflow-tooltip/>
      <el-table-column prop="type" label="用户类型" width="400" show-overflow-tooltip/>
      <el-table-column prop="name" label="用户名称" show-overflow-tooltip/>
    </el-table>
  </div>
  <!--<div class="level_top">-->
    <!--<el-row style="width:98%;margin:0 auto;padding-top: 20px">-->
      <!--<el-col :span="24" style="margin-top: 1rem">-->
        <!--<el-col :span="12" style="font-size: 16px;font-weight: bold">-->
          <!--&nbsp;-->
        <!--</el-col>-->
        <!--<el-col :span="12">-->
          <!--<Button type="primary" @click="setPermissions()" style="float: right;margin-left:3px;margin-right:12px;padding:4px 21px 4.03px 20px">修改权限</Button>-->
        <!--</el-col>-->
      <!--</el-col>-->
    <!--</el-row>-->
    <!--<el-table-->
      <!--:data="tableData"-->
      <!--max-height="700"-->
      <!--ref="multipleTable"-->
      <!--border-->
      <!--style="width: 98%;clear:both;margin:auto;margin-top:20px;"-->
      <!--empty-text="暂无数据，请重新查询"-->
      <!--@selection-change="handleSelectionChange"-->
      <!--row-key="id"-->
      <!--:tree-props="{children: 'children', hasChildren: 'hasChildren'}">-->
      <!--<el-table-column type="selection" width="55"/>-->
      <!--<el-table-column prop="type" label="用户类型" width="400" align="center" />-->
      <!--<el-table-column prop="name" label="用户名称" align="center" />-->
    <!--</el-table>-->
    <!--<el-row style="width:98%;margin:0 auto;padding-top: 20px">-->
      <!--&nbsp;-->
    <!--</el-row>-->
  <!--</div>-->
</template>

<script>
  export default {
    name: 'contract_call_more_nocache',
    data() {
      return {
        address: '',
        refresh:false,
        isInit:true,
        keyMap:{},
        selectedData:{},
        tableData: [],
        staticData: [],
        multipleSelection: []
      }
    },
    mounted() {
      console.log('11')
      console.log(this.tableData)
      console.log(this.selectedData)
      console.log('22')
    },
    created() {
      this.getUserList()
    },
    methods: {
// 获取用户列表
      getUserList() {
        this.address = this.$route.query.address
        let param = {
          address:this.address
        }
        this.http.alluser(param).then(res => {
          console.log(res)
          this.options = []
          this.selectedUsers2 = []
          if (res.data.code == '0') {
            var data = res.data.data.all_user
            var typedata = []
            var firstJson = {
              id:'-1',
              select:' ',
              type:'计算机一级用户',
              name:'---',
              organization:'---',
              hasC:true,
              children:[]
            }
            var firstData = data['计算机一级用户']
            this.selectedData['-1'] = false
            for (var item of firstData) {
              var tmpJson = {
                id:item.username,
                select:' ',
                type:'计算机一级用户',
                name:item.username,
                hasC:false,
                organization:'---',
              }
              firstJson.children.push(tmpJson)
              this.selectedData[item.username] = item.able === 0
            }
            var secondJson = {
              id:'-2',
              select:' ',
              type:'计算机二级用户',
              name:'---',
              organization:'---',
              hasC:true,
              children:[]
            }
            var secondData = data['计算机二级用户']
            this.selectedData['-2'] = false
            for (var item of secondData) {
              tmpJson = {
                id:item.username,
                select:' ',
                type:'计算机二级用户',
                name:item.username,
                hasC:false,
                organization:'---',
              }
              secondJson.children.push(tmpJson)
              this.selectedData[item.username] = item.able === 0
            }
            var thirdJson =  {
              id:'-3',
              select:' ',
              type:'计算机三级用户',
              name:'---',
              organization:'---',
              hasC:true,
              children:[]
            }
            var thirdData = data['计算机三级用户']
            this.selectedData['-3'] = false
            for (var item of thirdData) {
              var tmpJson = {
                id:item.username,
                select:' ',
                type:'计算机三级用户',
                name:item.username,
                hasC:false,
                organization:'---',
              }
              thirdJson.children.push(tmpJson)
              this.selectedData[item.username] = item.able === 0
            }
            this.tableData.push(firstJson)
            this.tableData.push(secondJson)
            this.tableData.push(thirdJson)
            this.buildSelectedList( 'id')
            this.refresh = true
            this.toggleSelection(this.multipleSelection)
            this.refresh = false
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      },

      selectedReset() {
        for(let item in this.selectedData) {
          this.selectedData[item] = false
        }
      },
      // 联级更新 找出更改项
      compare(val, key) {
        let source = []
        let target = []
        let map = {}
        let changeRow = []
        let add = false

        this.selectedReset()
        val.forEach(row => {
          this.selectedData[row[key]] = true
        })

        if(val.length > this.multipleSelection.length) {
          add = true
          source = this.multipleSelection
          target = val
        } else if(val.length < this.multipleSelection.length) {
          add = false
          target = this.multipleSelection
          source = val
        }

        source.forEach(row => {
          map[row[key]] = 1
        })
        target.forEach(row => {
          if(!map.hasOwnProperty(row[key])) {
            changeRow.push(row)
          }
        })
        return {
          row:changeRow,
          add:add
        }
      },

      addChildren(item, key, add) {
        this.selectedData[item[key]] = add
        if(item.hasC) {
          item.children.forEach(row => {
            this.addChildren(row, key, add)
          })
        }
      },
// 维护选中列表
      check(item, key) {
        let add = item.add
        let rowList = item.row
        this.selectedData['-1'] = false
        this.selectedData['-2'] = false
        this.selectedData['-3'] = false

        rowList.forEach(row => {
          if(row.hasC) {
            row.children.forEach(row2 => {
              this.addChildren(row2, key, add)
            })
          }
        })
      },
// 更新被选中项
      buildSelectedListChildren(item, key) {
        if(item.hasC) {
          let show = this.selectedData[item[key]]
          item.children.forEach(row2 => {
            show = show || this.buildSelectedListChildren(row2, key)
          })
          if(show) {
            this.multipleSelection.push(item)
          }
          return show
        } else {
          if(this.selectedData[item[key]]) {
            this.multipleSelection.push(item)
          }
        }
        return this.selectedData[item[key]]
      },

      buildSelectedList(key) {
        let tmplist = this.tableData
        this.multipleSelection = []
        tmplist.forEach(row => {
          if(row.hasC) {
            let show = this.selectedData[row[key]]
            row.children.forEach(row2 => {
              show = this.buildSelectedListChildren(row2, key) || show
            })
            if(show) {
              this.multipleSelection.push(row)
            }
          } else {
            if(this.selectedData[row[key]]) {
              this.multipleSelection.push(row)
            }
          }
        })

      },

      //设置选中项
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      //处理选中事件
      handleSelectionChange(val) {
        if(this.refresh) {
          return false
        }
        if(this.isInit) {
          //不知道什么原因，浏览器在第一次加载时会清空二级选项，这里还原这一操作
          this.isInit = false
          this.buildSelectedList( 'id')
          this.refresh = true
          this.toggleSelection()
          this.toggleSelection(this.multipleSelection)
          this.refresh = false
          return false
        }
        if(val.length === this.multipleSelection.length) {
          return false
        } else {
          let item = this.compare(val, 'id')
          this.check(item, 'id')
          this.buildSelectedList( 'id')
          this.refresh = true
          this.toggleSelection()
          this.toggleSelection(this.multipleSelection)
          this.refresh = false
        }
      },
      // 设置合约权限控制
      setPermissions() {
        this.selectedData['-1'] = false
        this.selectedData['-2'] = false
        this.selectedData['-3'] = false
        var list = []

        for (var item in this.selectedData) {
          if(this.selectedData[item])list.push(item)
        }

        const param = {
          'user_list': list,
          'address': this.address
        }
        this.http.contractassignpermissions(param).then(res => {

          if (res.data.code == '2002') {
            this.$Message.error(res.data.msg)
          } else if (res.data.code == '0') {
            this.$Message.success('权限分配成功!')
            this.modal1 = false
            this.reload()
          }
        })
      },
    }
  }
</script>

<style lang="less">
  .boya-table-scroll {
    .el-table__body-wrapper{
      &::-webkit-scrollbar {
        width: 4px;
        /*height: 4px;*/
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px #3B3783;
        background: #3B3783;
      }
      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px #F2F2F2;
        border-radius: 0;
        background: #F2F2F2;
      }

      .el-table__body {
        width: 100%!important;
      }
    }
  }
  .el-table tr{
    cursor:pointer
  }
</style>
