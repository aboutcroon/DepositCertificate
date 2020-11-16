<template>
  <div class="export" @click="modal1 = true">
    <span class="icon iconfont iconexport" />
    <Modal v-model="modal1" width="448px">
      <p class="image-container">
        <img class="image" src="../../assets/img/delete@3x.png" alt="删除">
      </p>
      <div class="text-container">
        <p class="textUp">您确定要删除这个小组吗?</p>
        <p class="textDown">
          <span style="display: flex; justify-content: center">
            您将<span style="color: #3B3783">无法还原</span>它
          </span>
        </p>
      </div>
      <div slot="footer" class="footer">
        <Button class="button" style="margin-left: 57px" @click="cancel">取消</Button>
        <Button class="button" style="margin-right: 57px; background: rgba(191,73,90,1); border-color: rgba(191,73,90,1); color: rgba(255,255,255,1)" @click="installContract">确定</Button>
      </div>
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
