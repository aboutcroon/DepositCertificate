<template>
  <el-dialog
    title=""
    class="boya-default-dialog"
    :visible.sync="modal"
    width="450px"
    center>
    <p class="image-container">
      <img v-if="image === 1" class="data-upload" src="../../../assets/img/data_upload.png"
           srcset="../../../assets/img/data_upload@2x.png"/>
      <img v-else="image === 2" class="data-upload" src="../../../assets/img/delete.png"
           srcset="../../../assets/img/delete@2x.png 2x,../../../assets/img/delete@3x.png 3x"/>
      <!--<img class="image" src="../../../assets/img/delete@3x.png" alt="删除">-->
    </p>
    <div class="text-container">
      <p class="text-up">{{textUp}}</p>
      <p class="text-down">
          <span style="display: flex; justify-content: center">
            {{textDown}}
          </span>
      </p>
    </div>
    <div slot="footer" class="footer">
      <div class="main-btn-container">
        <Button class="btn-reset" style="margin-right: 42px" @click="cancel">取消</Button>
        <Button :class="btnClass" @click="confirm" :loading="loading">确定</Button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'ExportExcel',
    props: {
      // 图标只支持iconfont
      modal: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      },
      textUp: {
        type: String,
        default: '这里是对话框提示信息'
      },
      textDown: {
        type: String,
        default: '这里也是对话框提示信息'
      },
      image: {
        type: Number,
        default: 1
      },
      data: {
        // 可以传递数据
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        btnClass: 'btn-search'
      }
    },
    computed: {},
    mounted() {
      if (this.image === 2) {
        this.btnClass = 'btn-delete'
      }
    },
    methods: {
      cancel() {
        this.$emit('cancelfun', this.data)
      },
      confirm() {
        this.$emit('confirmfun', this.data)
      },
    }
  }
</script>

<style lang="less">
  .boya-default-dialog {

    .el-dialog__header {
      display: none;
    }
    .data-upload {
      width: 150px;
      height: 103px;
    }

    .image-container {
      display: flex;
      justify-content: center;
      margin-top: 25px;
      margin-bottom: 20px;
    }
    .image {
      width: 114px;
      height: 78px;
    }

    .text-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #555466;
    }
    .text-up {
      width: auto;
      height: 28px;
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 5px;
      font-weight: bold;
    }
    .text-down {
      width: auto;
      height: 20px;
      font-size: 14px;
      line-height: 20px;
      margin-left: -10px;
      margin-bottom: 36px;
    }

    .footer {
      display: flex;
      justify-content: space-around;
      margin-bottom: 10px;

      .main-btn-container {
        width: 250px;
      }
    }
  }
</style>
