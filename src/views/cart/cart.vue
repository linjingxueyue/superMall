<template>
  <div id="cart">
    <nav-bar class="cart_bar">
      <div slot="center">购物车({{cartList_Length}})</div>
    </nav-bar>
    <scroll :probe-type="3" class="content0" ref="scroll">
      <cart-list :list="$store.state.cartList"></cart-list>
    </scroll>
    <bottom-Menu
      :cacluate="checked_cartlist"
      :flage="bottom_bar_flage"
      @bottommenu_btnclick="bottommenu_btnclick"
    ></bottom-Menu>
  </div>
</template>
 
<script>
import { mapGetters } from "vuex";
import NavBar from "components/common/navbar/NavBar.vue";
import CartList from "./childcomp/cart_List.vue";
import Scroll from "components/common/scroll/Scroll.vue";

import BottomMenu from "./childcomp/cart_bottommenu";

export default {
  name: "cart",
  components: { NavBar, CartList, Scroll, BottomMenu },
  data() {
    return {};
  },
  mounted() {},
  computed: {
    // https://vuex.vuejs.org/zh/guide/getters.html
    ...mapGetters(["cartList_Length", "checked_cartlist"]),
    bottom_bar_flage() {
      return this.cartList_Length == this.checked_cartlist.length;
    }
  },
  activated() {
    this.$refs.scroll.refresh();
  },
  methods: {
    bottommenu_btnclick() {
      if(this.cartList_Length == 0){
         console.log('别点了！')
        return 
      }
      if (this.bottom_bar_flage) {
        this.$store.commit("all_unchecked");
      } else {
        this.$store.commit("all_checked");
      }
    }
  }
};
</script>

<style scoped>
#cart {
  height: 100vh;
  position: relative;
}
.cart_bar {
  background-color: var(--color-high-text);
  color: #fff;
}
.content0 {
  position: absolute;
  top: 44px;
  bottom: 93px;
  left: 0px;
  right: 0px;
  overflow: hidden;
}
</style>
