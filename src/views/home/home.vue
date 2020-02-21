<template>
  <div id="home">
    <navbar class="home_nav">
      <div slot="center">购物街</div>
    </navbar>
    <tab-control
      ref="tab_control_1"
      :titles="titles"
      class="tab-control"
      v-show="isTabfixed"
      @tabclick="tabclick"
    ></tab-control>
    <scroll
      class="content2"
      ref="scroll"
      :probe-type="3"
      :pullupload="true"
      @scrollposition="contentscroll"
      @scroll_pullload="scroll_pullload"
    >
      <Swiper :banners="banners" @homeswiper_imgload="homeswiper_imgload"></Swiper>
      <recommend :recommends="recommends"></recommend>
      <feature></feature>
      <tab-control :titles="titles" ref="tab_control_2" @tabclick="tabclick"></tab-control>

      <good-list v-for="(item,index) in types" :key="index"  
              :goods="goods[item].list" v-show="goods_flage==index"></good-list>
    </scroll>
    <!-- // 组件 不能 直接监听  点击事件 ，需要用 .native 修饰 -->
    <back-top @click.native="backtopclick" v-show="isshow_backtop" /> 
  </div>
</template>

<script>
// 公共组件 -----------------------------------------------------------------
import navbar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabcontrol/TabControl.vue";
import GoodList from "components/content/goods/Goods.vue";
import Scroll from "components/common/scroll/Scroll.vue";
// import BackTop from "components/content/backtop/BackTop.vue";

// home 下 子组件 -----------------------------------------------------------------
import Swiper from "./childrenComps/home_swiper.vue";
import Recommend from "./childrenComps/Recommend.vue";
import Feature from "./childrenComps/feature.vue";

// common 工具 函数
import { debounce } from "common/utils.js";
import { back_top } from "common/mixin.js";
// 网络 请求相关 -------
import { getHomeMultidata, getHomeGoods } from "network/home.js";

export default {
  name: "home",
  mixins: [back_top],
  components: {
    navbar,
    TabControl,
    GoodList,
    Scroll,
    // BackTop,
    Swiper,
    Recommend,
    Feature
  },
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],
      goods: {
        pop: { page: 0, list: [], y:  0 },
        new: { page: 0, list: [], y:  0 },
        sell: { page: 0, list: [], y: 0}
      },
      types:['pop','new','sell'],
      // isshow_backtop: false,
      tab_control_offsettop: 0,
      isTabfixed: false,
      saveY: 0,
      goods_flage: 0
    };
  },

  created() {
    console.log("create--->home: ", this.goods);
    // 1: 请求多个数据。
    this.getHomeMultidata();
    // 2: 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 监听  goodsitem_imgload 图片加载完成
    var refresh = debounce(this.$refs.scroll.refresh, 100);
    this.$refs.scroll.refresh(2);
    console.log("------->", this);
    this.$bus.$on("goodsitem_imgload", () => {
      // console.log("home-refresh()");
      refresh(1);
      // console.log("------imgload--------------------");
    });
  },
  activated() {
    console.log("actived-----");
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.scroll.openPullUp();
  },
  beforeRouteLeave(to, from, next) {
    this.saveY = this.$refs.scroll.scroll.y;
    this.$refs.scroll.scroll.closePullUp();
    console.log(
      "this.$refs.scroll.scroll: ",
      this.saveY,
      this.$refs.scroll.scroll.y,
      this.$refs.scroll.scroll
    );
    next();
  },
  destroyed() {
    console.log("destroyed----home");
  },
  // deactivated(){
  //   this.saveY = this.$refs.scroll.scroll.y
  //    console.log('this.$refs.scroll.scroll: ',this.$refs.scroll.scroll.y,this.$refs.scroll.scroll)
  // },
  methods: {
    func() {
      console.log("--------------------------------------func: ", this);
    },
    //  ---------------------- 事件监听相关 ------------------
    tabclick(index) {
      this.goods_flage = index;

      switch (index) {
        case 0:
          this.isTabfixed &&
            this.$refs.scroll.scrollTo(0, this.goods["pop"].y, 0);
          break;
        case 1:
          this.isTabfixed &&
            this.$refs.scroll.scrollTo(0, this.goods["new"].y, 0);
          break;
        case 2:
          this.isTabfixed &&
            this.$refs.scroll.scrollTo(0, this.goods["sell"].y, 0);
          break;
      }
      this.$refs.tab_control_1.currentindex = index;
      this.$refs.tab_control_2.currentindex = index;

      console.log("zujiancuandi ", index);
    },
    // backtopclick() {
    //   this.$refs.scroll.scrollTo(0, 0);
    //   console.log("backtopclick click");
    // },
    contentscroll(position) {
      // 1: 判断back-top 是否显示
      this.isshow_backtop = position.y < -1000;
      // 2： 判断tab-control 是否 吸顶
      this.isTabfixed = -position.y > this.tab_control_offsettop;
      // 3: 记录 流行、新款、推荐 对应的不同高度
      if (this.isTabfixed) {
        switch (this.goods_flage) {
          case 0:
            this.goods["pop"].y = position.y;
            break;
          case 1:
            this.goods["new"].y = position.y;
            break;
          case 2:
            this.goods["sell"].y = position.y;
            break;
        }
      }

      //  console.log(position)
    },
    scroll_pullload() {
      this.getHomeGoods(this.types[this.goods_flage]);
      this.$refs.scroll.finishPullup();
    },
    // 监听 homeswiper_imgload 图片是否加载完毕
    homeswiper_imgload() {
      this.tab_control_offsettop = this.$refs.tab_control_2.$el.offsetTop;
      for(var key in this.goods){
        this.goods[key].y =  -this.tab_control_offsettop
         console.log(key,this.goods[key])
      }
      console.log(
        "this.$refs.tab_control_2.$el.offsetTop: ",
        this.$refs.tab_control_2.$el.offsetTop
      );
    },
    //----------------------- 网络 请求 相关 -------------------
    getHomeMultidata() {
      getHomeMultidata().then(
        res => {
          this.banners = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list;
          console.log("banners: ", this.banners);
          console.log("recommends: ", this.recommends);
        },
        err => {
          console.log(err);
        }
      );
    },
    getHomeGoods(type) {
      var page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.data.list);
        console.log(type, this.goods[type].list);
        // 请求成功后，让 页码 +1
        this.goods[type].page += 1;
      });
    }
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home_nav {
  background-color: var(--color-tint);
  color: #fff;

  /* 
    在使用 浏览器原生 滚动时候，为了不让 导航跟随浏览器滚动才设置的，但此时我们设置的是BScroll,所以它就没用了
  position: fixed;
  left: 0px;
  top: 0px;
  right: 0px;
  z-index: 9; */
}
.content2 {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0px;
}
.tab-control {
  position: relative;
  z-index: 9;
}
/* 
自从使用了better-scroll 组件后，吸顶 效果就不起作用了，因为stcky 是相对于浏览器滚动，使用了组件后，并不是利用浏览器自身
滚动条
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  } 
*/
</style>