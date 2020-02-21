<template>
  <div class="goods-item">
    <img
      v-lazy="img_src"
      alt
      @load="imgload"
      @click="itemclick"
    />
    <div class="goods-info">
      <p>{{goodsitem.title}}</p>
      <span class="price">{{goodsitem.price}}</span>
      <span class="collect">{{goodsitem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "goods-item",
  components: {},
  props: {
    goodsitem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      bus: null
    };
  },
  computed:{
    img_src(){
      return  this.goodsitem.img || this.goodsitem.image || this.goodsitem.show.img
    }
  },
  methods: {
    imgload() {
      // 方法一
      if (this.$route.path.indexOf("/home") !== -1)
        this.$bus.$emit("goodsitem_imgload");               // 发给 home.vue
      
      else if (this.$route.path.indexOf("/detail") !== -1)
        this.$bus.$emit("recomend_imgload");                  // 发给detail.vue
      else if (this.$route.path.indexOf("/category") !== -1)
        this.$bus.$emit("category_imgload");  
    },
    itemclick() {
      if (this.goodsitem.iid)
        this.$router.push("/detail/" + this.goodsitem.iid);
      console.log("itemclick");
    }
  }
};
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goods-info {
  width: 100%;
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  overflow: hidden;
  text-align: center;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}
.goods-info .collect::before {
  content: "";
  position: absolute;
  display: block;
  left: -15px;
  top: -1px;

  width: 14px;
  height: 14px;
  background: url("~assets/images/common/favor.png") 0 0/14px 14px;
}
</style>
