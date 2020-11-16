<template>
  <div class="export" @click="handleClick">
    <span class="icon iconfont iconexport" />
    <Modal
      v-model="modal1"
      title="确定框"
      :loading="loading"
      @on-ok="installContract"
      @on-cancel="cancel"
    >
      确定要导出数据么
    </Modal>
    <div class="modal2">
      <Modal
        v-model="modal2"
        title="确定框"
        @on-cancel="cancel2"
      >
        当前选择下载数据超过最大下载数据量，请重新下载。
      </Modal>
    </div>
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
      modal2: false,
      autoWidth: true,
      bookType: 'xlsx',
      needExport: false,
      loading: true
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
    cancel2() {
      this.modal2 = false
    },
    handleClick() {
      if (this.count > 10000) {
        return this.modal2 = true
      }
      this.modal1 = true
    },
    installContract() {
      this.needExport = true
      this.$emit('exportfun', '')
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

<style>
</style>
