<template>
  <div>
    <Table :columns="columns1" :data="data1" style="border:0"></Table>
  </div>
</template>

<script>
  export default {
    name: 'noun',
    data () {
      return {
        columns1: [
          {
            type: 'index',
            title: '排名'
          },
          {
            title: '企业名称',
            key: 'name'
          },
          {
            title: '存证数量',
            key: 'num'
          },
          {
            title: '存证数量周环比',
            key: 'pk'
          }
        ],
        data1: [
          {
            name: '银监会',
            num: 120,
            pk: '10%'
          },
          {
            name: '证监会',
            num: 113,
            pk: '10%'
          },
          {
            name: '银监会',
            num: 120,
            pk: '10%'
          },
          {
            name: '证监会',
            num: 113,
            pk: '10%'
          },
          {
            name: '银监会',
            num: 120,
            pk: '10%'
          },
          {
            name: '证监会',
            num: 113,
            pk: '10%'
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
