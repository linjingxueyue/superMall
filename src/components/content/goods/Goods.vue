<template>
  <div class="goods">
      <goods-item v-for="(item,index) in goods" :key="index" :goodsitem='item'> </goods-item>
  </div>
</template>

<script>
import  GoodsItem from './GoodsItem.vue'
export default { 
  name: "goods",
  props:{
      goods:{
          type:Array,
          default(){
              return []
          }
      }
  },
  components: {GoodsItem},
  data() {
    return {

    };
  }
};
</script>

<style>
.goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>
