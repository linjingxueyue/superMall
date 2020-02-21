<template>
  <div id="category">
    <nav-bar class="category-nav">
      <div slot="center">商品分类</div>
    </nav-bar>

    <scroll class="scroll-0">
      <tab-menu :categorylist="categorylist" @category_menu_click="category_menu_click"></tab-menu>
    </scroll>

    <tab-control
      ref="category_tab_control_1"
      :titles="titles"
      class="tab-control"
      v-show="isTabfixed"
      @tabclick="tabclick"
    ></tab-control>
    <scroll class="scroll-1" :probe-type="3" ref="scroll" @scrollposition="contentscroll">
      <tab-content-category
        :subcontent="show_subcategories"
        @category_sub_imgload="category_sub_imgload"
      ></tab-content-category>
      <tab-control v-show="isdelayshowtabcontrol"  :titles="titles" ref="category_tab_control_2" @tabclick="tabclick"></tab-control>
      <good-list
        v-for="(item,index) in types"
        :key="index"
        :goods="show_goods[item]"
        v-show="goods_flage==index"
      ></good-list>
    </scroll>
    <back-top @click.native="backtopclick" v-show="isshow_backtop" />
  </div>
</template>

<script>
// 公共组件 -----------------------------------------------------------------
import NavBar from "components/common/navbar/NavBar.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import TabControl from "components/content/tabcontrol/TabControl.vue";
import GoodList from "components/content/goods/Goods.vue";
//  子组件 -------------------------------------------
import TabMenu from "./childcomp/TabMenu";
import TabContentCategory from "./childcomp/TabContentCategory";
// ------ 工具 函数
import { debounce } from "common/utils.js";
import { back_top } from "common/mixin.js";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from "network/category.js";

export default {
  name: "category",
  mixins: [back_top],
  components: {
    NavBar,
    Scroll,
    TabMenu,
    TabContentCategory,
    TabControl,
    GoodList
  },
  data() {
    return {
      categorylist: [],
      categrydata: [],
      isTabfixed: false,
      menu_currentindex: -1,
      goods_flage: -1,
      titles: ["综合", "新品", "销量"],
      types: ["pop", "new", "sell"],
      refresh: null,
      tab_control_offsettop: 0,
      isactived: true,
      isdelayshowtabcontrol:false
    };
  },
  created() {
    this._getCategory();
  },
  activated() {
    this.isactived = true;
  },
  deactivated() {
    this.isactived = false;
    this.isTabfixed = false;
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 100);
    this.$bus.$on("category_imgload", () => {
      // this.refresh("category__categorygoodsitem_imgload_refersh..........");
    });
  },
  computed: {
    show_subcategories() {
      if (this.menu_currentindex == -1) return [];
      return this.categrydata[this.menu_currentindex].subcategories;
    },
    show_goods() {
      if (this.goods_flage == -1) return {};
      return this.categrydata[this.menu_currentindex].categoryDetail;
    }
  },
  methods: {
    _getCategory() {
      getCategory().then(res => {
        this.categorylist = res.data.data.category.list;
        this.categorylist.forEach((item, i) => {
          this.categrydata[i] = {
            subcategories: [],
            categoryDetail: {
              pop: [],
              new: [],
              sell: []
            }
          };
        });
        // console.log("getCategory: ", this.categorylist);

        this._getSubcategory(0);
      });
    },
    _getSubcategory(index) {
      var maitKey = this.categorylist[index].maitKey;
      getSubcategory(maitKey).then(res => {
        this.menu_currentindex = index;
        this.categrydata[index].subcategories = res.data.data.list;
        // console.log("getSubcategory: ", res.data);
        this._getCategoryDetail("pop");
        this._getCategoryDetail("new");
        this._getCategoryDetail("sell");
      });
    },
    _getCategoryDetail(type) {
      var miniWallkey = this.categorylist[this.menu_currentindex].miniWallkey;
      getCategoryDetail(miniWallkey, type).then(res => {
        this.categrydata[this.menu_currentindex].categoryDetail[type] =
          res.data;
        if (type == "pop") {
          this.goods_flage = 0;
        }
        // console.log(
        //   "getCategoryDetail: ",
        //   this.categrydata[this.menu_currentindex].categoryDetail[type]
        // );
      });
    },
    category_menu_click(index) {
      this._getSubcategory(index);
    },
    tabclick(index) {
      this.goods_flage = index;
    },
    contentscroll(position) {
      // 1: 判断back-top 是否显示
      if(this.isactived)
        this.isshow_backtop = position.y < -1000;
      // 2： 判断tab-control 是否 吸顶
      this.isTabfixed = -position.y > this.tab_control_offsettop;
    },
    category_sub_imgload() {
      this.refresh("category_subcontent_imgload..........");
      this.tab_control_offsettop = this.$refs.category_tab_control_2.$el.offsetTop;
      if(!this.isdelayshowtabcontrol){
        this.isdelayshowtabcontrol =true
      }
    }
  }
};
</script>

<style scoped>
#category {
  height: 100vh;
  position: relative;
}

.tab-control {
  width: calc(100% - 100px);
  position: relative;
  left: 100px;
  z-index: 999;
}
.scroll-0,
.scroll-1 {
  position: absolute;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
}

.scroll-1 {
  left: 100px;
}
.category-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
