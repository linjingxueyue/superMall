<template>
  
    <Swiper >
      <swiper-item v-for=" (item,i) in banners" :key='i'>
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgload" >
        </a>
      </swiper-item>
    </Swiper>
  
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js";


export default {
  name: "home_swiper",
  props:{
    banners:{
      type: Array,
      default(){
        return []
      }
    }
  },
  components: { Swiper, SwiperItem },
  data() {
    return {
      isload :false
    };
  },
  methods:{
    imgload(){
      if(!this.isload){
          this.$emit('homeswiper_imgload')
          this.isload = true
      }
      
    }
  }
};
</script>

<style>
</style>
