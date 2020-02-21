<template>
  
    <tabbar class="tabbarmain">
      <item path="/home" activecolor="red">
        <img slot="item-icon" src="~assets/images/tabbar/home.png" alt  class="tabbarimg"/>
        <!-- <img slot="item-icon" src="./assets/images/tabbar/home.png" alt /> -->
        <img slot="item-icon_active" src="~assets/images/tabbar/home_active.png" alt  class="tabbarimg"/>
        <div slot="item-text">首页</div>
      </item>
     
      <item path="/category" activecolor="red">
        <img slot="item-icon" src="~assets/images/tabbar/category.png" alt class="tabbarimg"/>
        <img slot="item-icon_active" src="~assets/images/tabbar/category_active.png" alt class="tabbarimg"/>
        <div slot="item-text">分类</div>
      </item>
       <item path="/cart" activecolor="red">
        <img slot="item-icon" src="~assets/images/tabbar/cart.png" alt class="tabbarimg"/>
        <img slot="item-icon_active" src="~assets/images/tabbar/cart_active.png" alt class="tabbarimg"/>
        <div slot="item-text">购物车</div>
      </item>
      <item path="/profile" activecolor="red">
        <img slot="item-icon" src="~assets/images/tabbar/profile.png" alt class="tabbarimg"/>
        <img slot="item-icon_active" src="~assets/images/tabbar/profile_active.png" alt class="tabbarimg"/>
        <div slot="item-text">我的</div>
      </item>
    </tabbar>
  
</template>

<script>
import tabbar from "components/common/tabbar/TabBar.vue";
import item from "components/common/tabbar/TabBar_Item.vue";
export default {
  name: "tabbar_main",
  components:  { tabbar, item }
};
</script>
<style scoped>
.tabbarmain{
  z-index: 10;
}
.tabbarmain .tabbarimg {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-bottom: 2px;
  margin-top: 2px;
}
</style>
