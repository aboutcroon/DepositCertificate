<template>
  <div class="export" @click="modal1 = true">
    <span class="icon iconfont iconexport" />
    <boya-dialog :modal="modal1"></boya-dialog>
  </div>
</template>

<script>
  import BoyaDialog from './Dialog/dialog'
export default {
  name: 'ExportExcel',
  components: {
    BoyaDialog
  },
  props: {
      // 图标只支持iconfont
    icon: {
      type: String,
      default: 'iconexport'
    },
    valueList: Array,
    tHeader: Array,
    filterVal: Array,
    filename: String,
    getData: Function
  },
  data() {
    return {
      modal1: false,
      autoWidth: true,
      bookType: 'xlsx',
      needExport: false
    }
  },
  computed: {

  },
  watch: {
    valueList(valueList) {
      if (this.needExport && valueList.length > 0) {
        this.handleDownload()
        this.needExport = false
      }
    }
  },
  mounted() {
  },
  methods: {
    cancel() {
      this.modal1 = false
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

<style scoped>
  .image-container {
    display: flex;
    justify-content: center;
    margin-top: 42px;
    margin-bottom: 26px;
  }
  .image {
    width: 114px;
    height: 78px;
  }

  .text-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .textUp {
    width: 240px;
    height: 28px;
    font-size: 20px;
    font-family: PingFangSC-Medium,PingFang SC;
    font-weight: 500;
    color: rgba(29,35,70,1);
    line-height: 28px;
    margin-bottom: 5px;
  }
  .textDown {
    width: 229px;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: rgba(85,84,102,1);
    line-height: 20px;
    margin-left: -10px;
    margin-bottom: 36px;
  }

  .footer {
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
  }
  .button {
    width: 112px;
    height: 42px;
    border-radius: 8px;
    border: 1px solid rgba(135,148,174,1);
    font-size: 14px;
    font-family: PingFangSC-Medium,PingFang SC;
    font-weight: 500;
    color: rgba(135,148,174,1);
    line-height: 20px;
  }
  .ivu-modal-footer {
    border-top: none;
  }
</style>
