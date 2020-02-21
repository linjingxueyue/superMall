<template>
  <div class="recommend-info" v-if="Object.keys(recommendList).length>0">
    <div class="info-header">热门推荐</div>
    <goods :goods="recommendList"></goods>
  </div>
</template>

<script>
import Goods from "components/content/goods/Goods.vue";

export default {
  name: "DetailRecommendInfo",
  components: {
    Goods
  },
  props: {
    recommendList: {
      type: Array
    }
  }
};
</script>

<style scoped>
.recommend-info {
  padding: 5px;
}

.info-header {
  line-height: 40px;
  padding-left: 8px;
  font-size: 15px;
  color: #333;
}
</style>
