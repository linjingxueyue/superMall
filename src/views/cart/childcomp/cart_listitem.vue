<template>
  <div class="cart_list_item">
      <div class="item-selector">
        <CheckButton :ischecked='product.checked' @click.native="button_click"></CheckButton>
      </div>
      <div class="item_left">
        <img :src="product.image" alt />
      </div>
      <div class="item_right">
        <div class="top">{{product.title}}</div>
        <div class="middle">商品描述: {{product.desc}}</div>
        <div class="bottom">
          <div class="price">￥{{product.realPrice}}</div>
          <div>x{{product.count}}</div>
        </div>
      </div>
  </div>
</template>
<script>
import CheckButton from "./CheckButton";
export default {
  name: "cart_listitem",
  components:{
      CheckButton
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods:{
      button_click(){
        this.$store.commit('checkclick',this.product)
      }
  }
};
</script>
<style scoped>
.cart_list_item {
  width: 100%;
  display: flex;
  padding: 10px 5px 8px;
  border-bottom: 2px solid rgba(100, 100, 100, 0.2);
}
.item-selector {
  width: 14%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item_left,
.item_right {
  padding: 5px;
}
.item_left img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}
.item_right {
  color: black;
  flex-grow: 1;
  overflow: hidden;
  font-size: 17px;
  color: #333;
}
.top,
.middle {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.top {
  margin-top: 8px;
}
.middle {
  font-size: 14px;
  color: #666;
  margin-top: 18px;
  margin-bottom: 20px;
}

.bottom {
  display: flex;
  padding-right: 5px;
  justify-content: space-between;
}
.price {
  color: orangered;
}
</style>