<template>
  <el-collapse-transition>
    <el-row v-show="showFilter">
      <el-col v-for="data in collapseData" class="filter" style="margin-right: 20px;margin-bottom:20px">
        <div class="filter-title">{{ data.name }}</div>
        <div class="filter-divider" />
        <div :class="{ 'filter-selected': formData[data.key] === '' }" style="cursor:pointer" @click="clickFun([data.key],'',formData[data.key])">全部</div>
        <div v-for="item in data.list" :class="{ 'filter-selected': formData[data.key] === item.value }">
          <span style="cursor:pointer" @click="clickFun([data.key],item.value,formData[data.key])">{{ item.label }}</span>
          <i v-if="formData[data.key] === item.value" class="el-icon-close" @click="clickFun([data.key],'',formData[data.key])" />
        </div>
      </el-col>
    </el-row>
  </el-collapse-transition>
</template>
<script>
export default {
  props: {
    showFilter: Boolean,
    collapseData: Array,
    formData: Object
  },
  data() {
    return {}
  },
  methods: {
    clickFun(type, value, paras) { // type类型   value 数值
      this.$emit('collapseFun', type, value)
    },
    filterCol() {
      if (window.sessionStorage.getItem('user_name') !== 'super_admin' && this.collapseData.length === 4) {
        this.collapseData.splice(0, 1)
      }
    }
  }
}
</script>
<style>
  .filter {
    font-size: 14px;
    line-height: 28px;
    color: #ABB6CD;
    width: 135px;
  }

  .filter div {
    cursor: pointer;
  }

  .filter-title {
    font-weight: bold;
    color: #333;
    cursor: default;
  }

  .filter-selected {
    color: #495abf;
  }

  .filter-divider {
    border-bottom: solid 1px #f6f7fc;
    margin: 2px 0;
  }
</style>
