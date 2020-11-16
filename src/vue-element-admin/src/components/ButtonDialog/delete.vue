<template>
  <div class="delete-dialog">
    <boya-dialog
      :modal="modal1"
      :image="2"
      :loading="loading"
      :textUp="textUpShow"
      :textDown="textDownShow"
      @cancelfun="reset"
      @confirmfun="confirm"></boya-dialog>
  </div>
</template>

<script>
  import BoyaDialog from './Dialog/dialog'
  export default {
    name: 'DeleteDialog',
    components: {
      BoyaDialog
    },
    props: {
      textUp: {
        type: String,
        default: '您确定要删除吗？'
      },
      textDown: {
        type: String,
        default: '您将无法还原它'
      },
      textUpLoading: {
        type: String,
        default: '正在执行删除操作。。。'
      },
      textDownLoading: {
        type: String,
        default: '请稍后查询'
      },
    },
    data() {
      return {
        modal1: false,
        loading: false,
        textUpShow: ' ',
        textDownShow: ' '
      }
    },
    computed: {},
    mounted() {
      this.textUpShow = this.textUp
      this.textDownShow = this.textDown
    },
    methods: {
      handleClick() {
        this.reset()
        this.modal1 = true
      },
      confirm() {
        this.textUpShow = this.textUpLoading
        this.textDownShow = this.textDownLoading
        this.loading = true
        this.$emit('deletefun', '')
      },
      reset() {
        this.modal1 = false
        this.loading = false
        this.textUpShow = this.textUp
        this.textDownShow = this.textDown
      },
    }
  }
</script>

<style>
  .delete-dialog {
    display: inline-block;
  }
</style>
