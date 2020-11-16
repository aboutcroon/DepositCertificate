<template>
  <div class="boya-button-group" :class="modal?'group-show':'group-hide'" @click="showButtonGroup">
    <div class="button-right">
      <span class="icon iconfont iconexport1 " :class="showIcon?'button-hide':'button-show'"></span>
      <span class="icon iconfont iconcreate " :class="showIcon?'button-show':'button-hide'"></span>
    </div>
    <div class="button-group" v-show="modal">
      <div class="group-button"  @click="modal1 = true">
        <span class="icon iconfont iconexport1"></span>
      </div>
      <div class="group-button" style="margin-right: 14px" @click="handleCreate">
        <span class="icon iconfont iconcreate"></span>
      </div>
    </div>

    <Modal
      v-model="modal1"
      title="确定框"
      @on-ok="installContract"
      @on-cancel="cancel">
      确定要导出数据么
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'ExportExcel',
    props: {
      count: Number,
      valueList: Array,
      tHeader: Array,
      filterVal: Array,
      filename: String,
      getData: Function
    },
    data() {
      return {
        modal: false,
        modal1: false,
        icon: 0,
        showIcon: true,
        timer: '',
        autoWidth: true,
        bookType: 'xlsx',
        needExport: false,
      }
    },
    watch: {
      valueList(valueList) {
        if(this.needExport && valueList.length > 0) {
          this.handleDownload()
          this.needExport = false
        }
      }
    },
    computed: {

    },
    mounted() {
      this.timer = setInterval(this.changeIcon, 5000)
    },
    methods: {
      cancel() {
        this.modal1 = false
      },
      handleCreate() {
        this.$emit('handelCreate',0)
      },
      showButtonGroup() {
        this.showIcon = true
        this.modal = !this.modal
      },
      changeIcon() {
        this.icon = (this.icon + 1) % 2
        this.getIcon()
      },
      getIcon() {
        if(this.modal) {
          this.showIcon = true
        } else {
          if(this.icon === 1) {
            this.showIcon = false
          } else {
            this.showIcon = true
          }
        }
      },
      installContract() {
        this.needExport = true
        this.$emit('exportfun', '')
        this.modal1 = false
      },
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = this.tHeader
          const filterVal = this.filterVal
          const list = this.valueList
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename,
            autoWidth: this.autoWidth,
            bookType: this.bookType
          })
          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          return v[j]
        }))
      }
    }
  }
</script>

<style lang="less">
.boya-button-group {
  overflow: hidden;
  cursor: pointer;
  height: 54px;
  margin-bottom: 14px;
  border-radius: 27px;
  font-size: 18px;
  color: #fff;
  background-color: #BF495A;
  transition: width .5s;

  .iconfont {
    font-size: 14px;
    transition: .5s;
  }

  .button-hide {
    transition: 0.5s;
    transform: scale(0);
    opacity: 0;
  }
  .button-show {
    transition: 0.5s;
    transform: scale(1);
    opacity: 1;
  }

  &.group-hide {
    width: 54px;
    transition: width .5s;
  }
  &.group-show {
    width: 172px;
    transition: width .5s;

    .button-show {
      transition: 0.5s;
      transform: rotate(45deg);
    }
  }

  .button-right {
    display: inline-block;
    float: right;
    position: relative;
    width: 54px;
    height: 54px;
    padding: 14px 20px;

    .icon {
      position: absolute;
      left: 20px;
      top: 18px;

    }
  }
  .button-show {

  }
  .group-button {
    display: inline-block;
    float: right;
    width: 34px;
    margin: 10px 0;
    border-radius: 27px;
    background-color: #d17e8a;
    padding: 4px 10px;
    .group-button {
      display: inline-block;
    }
  }
}
</style>
