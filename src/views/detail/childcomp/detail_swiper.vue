<template>
  <Swiper>
    <swiper-item v-for=" (item,i) in topImages" :key="i" class="detail_swiperitem">
      <img :src="item" alt @load="imgload" />
    </swiper-item>
  </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js";

export default {
  name: "detail_swiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: { Swiper, SwiperItem },
  data() {
    return {};
  },
  methods: {
    imgload() {
      this.$emit("detailswiper_imgload");
    }
  }
};
</script>

<style scoped>
.detail_swiperitem {
  height: 300px;
  overflow: hidden;
}
</style>
