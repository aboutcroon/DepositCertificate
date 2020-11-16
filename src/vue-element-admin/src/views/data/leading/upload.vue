<template>
  <div>
    <Row>
      <el-upload
        class="upload-demo"
        action=""
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-upload="beforeAvatarUpload"
        multiple
        :file-list="fileList">
        <el-button size="small" style="padding:9px 10px"><svg-icon icon-class="上传" style="margin-right:6px"/>点击上传</el-button>
      </el-upload>
    </Row>
  </div>
</template>

<script>
  import excel from '@/api/excel'
  import Transfer from '../../../api/transfer';

  export default {
    name: 'upload',
    data () {
      return {
        tableData: [],
        tableLoading: false,
        fileList: [],
        fileFormData: null,
        percentage: 0,
        filename: '',
        formdata:[],
      }
    },
    methods:{
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      beforeAvatarUpload(file,fileList) {
        // console.log(file.name)
        // this.paramsData.data_file = file.name

        const fileExt = file.name.split('.').pop().toLocaleLowerCase() === 'xlsx' || file.name.split('.').pop().toLocaleLowerCase() === 'xls'
        if (!fileExt) {
          this.$message.error('上传文件不是EXCEL 格式!');
        }
        Transfer.excel = file;
        return false;
      }
    }
  }
</script>

<style lang="css">
.ivu-btn>.ivu-icon+span, .ivu-btn>span+.ivu-icon{
  margin-left:0;
}
</style>
