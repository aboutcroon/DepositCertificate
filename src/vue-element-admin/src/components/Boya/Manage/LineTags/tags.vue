<template>
  <div class="home-block boya-line-tag">
    <div class="line-tag-line" style="line-height: 58px;">
      <img class="line-icon" :src="line[0]" :srcset="line[1]"/>
    </div>
    <div class="line-tag-tag">
      <div>
        <p class="home-card-title">{{ title }}</p>
        <p class="home-card-value">{{ value }}</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      line: {
        type: Array,
        default: () => {
          return ['../../../../assets/img/Line.png', '../../../../assets/img/Line@2x.png 2x']
        }
      },
      // 标题不要超过7个字
      title: {
        type: String,
        default: '默认标题'
      },
      value: {
        type: String,
        default: ''
      },
    },
  }
</script>
<style lang="scss">
  .boya-line-tag {
    min-height: 97px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px 0;

    .line-tag-line {
      display: inline-flex;
      flex-grow: 13;
      min-width: 78px;

      .line-icon {
        width: 78%;
        margin: 0 auto;
      }
    }

    .line-tag-tag {
      display: inline-flex;
      flex-grow: 14;
      min-width: 87px;
      .home-card-title {
        min-width: 84px;
        color: #C5C8D4;
        font-size: 12px;
      }
      .home-card-value {
        color: #555466;
        font-size: 26px;
      }
    }
  }
</style>
