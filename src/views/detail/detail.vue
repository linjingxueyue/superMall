<template>
  <div id="detail">
    <detail-nav
      @navbarclick="navbarclick"
      :currentindex="currentindex"
      :titles="navbar_titles"
      ref="nav"
    ></detail-nav>
    <scroll ref="scroll" :probe-type="3" class="content0" @scrollposition="contentscroll">
      <detail-swiper :topImages="topImages" @detailswiper_imgload="detail_imageload"></detail-swiper>
      <base-info :basesinfo="detailbasesinfo"></base-info>
      <shop-info-c :shopinfo="shopinfos"></shop-info-c>
      <detail-info :detail-info="details_info" @imageload="detail_imageload"></detail-info>
      <params-info :paraminfo="paraminfo" ref="params"></params-info>
      <comment-info :commentinfo="commentinfo" ref="comment"></comment-info>
      <recommend-info :recommendList="recommendList" ref="recommend"></recommend-info>
    </scroll>
    <bottom-bar class="detail_bottombar" @addToCart="addToCart"></bottom-bar>
    <back-top @click.native="backtopclick" v-show="isshow_backtop" />
    <!-- <goods-info :goods='goodbasesinfo'></goods-info> -->
  </div>
</template>

<script>
// --------------------------------公共组件 -----------------------------------------------------------------
import DetailNav from "./childcomp/detail_nav.vue";
import Scroll from "components/common/scroll/Scroll.vue";
// import BackTop from "components/content/backtop/BackTop.vue";

// -------------------------------home 下 子组件 ------------------------------------------------------
import DetailSwiper from "./childcomp/detail_swiper.vue";
import BaseInfo from "./childcomp/detail_basesinfo.vue";
import ShopInfoC from "./childcomp/detail_shopinfo.vue";
import DetailInfo from "./childcomp/DetailGoodsInfo.vue";
import ParamsInfo from "./childcomp/detail_ParamsInfo.vue";
import CommentInfo from "./childcomp/detail_commentinfo.vue";
import RecommendInfo from "./childcomp/detail_recommend.vue";
import BottomBar from "./childcomp/detail_bottombar.vue";

// ------------------------------------------网络 请求相关 ------- -----------------------------
import {
  getDetail,
  DBaseInfo,
  ShopInfo,
  GoodsParams,
  getRecommend
} from "network/detail.js";

//  ----------------------------------- common 工具 函数 ------------------------------
import { debounce } from "common/utils.js";
import { back_top } from "common/mixin.js";

export default {
  name: "detail",
  mixins: [back_top],
  components: {
    DetailNav,
    Scroll,
    // BackTop,
    DetailSwiper,
    BaseInfo,
    ShopInfoC,
    DetailInfo,
    ParamsInfo,
    CommentInfo,
    RecommendInfo,
    BottomBar
  },
  data() {
    return {
      id: null,
      topImages: null,
      detailbasesinfo: {},
      shopinfos: {},
      // isshow_backtop: false,
      details_info: {},
      paraminfo: {},
      commentinfo: {},
      recommendList: [],
      refresh: null,
      gettopY: null,
      topY_List: [1],
      // 为 滚动到不同位置 相应位置显示 红色
      currentindex: 0,
      navbar_titles: ["商品", "参数", "评论", "推荐"]
    };
  },
  created() {
    console.log("detail------created");
    this.id = this.$route.params.id;
    // console.log(this.id)
    this.getDetail(this.id);
    // 推荐信息
    this._getRecommend();
  },
  mounted() {
    console.log(" isshow_backtop: ", this.isshow_backtop);
    // 监听  goodsitem_imgload 图片加载完成
    this.refresh = debounce(this.$refs.scroll.refresh, 300);
    //
    this.gettopY = debounce(this.getoffsetTopY, 300);
    this.$bus.$on("recomend_imgload", () => {
      // console.log("detail-refresh()");
      this.refresh(100);
      // console.log("------imgload--------------------");
    });
  },
  methods: {
    // 获取 detail数据
    getDetail(id) {
      getDetail(id).then(res => {
        var data = res.data.result;
        // 1：轮播图 信息
        this.topImages = data.itemInfo.topImages;
        // 2： 商品基本信息
        this.detailbasesinfo = new DBaseInfo(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        // 3： 店铺基本信息
        this.shopinfos = new ShopInfo(data.shopInfo);
        // 4: 商品细节展示信息
        this.details_info = data.detailInfo;
        // 5： 参数信息
        this.paraminfo = new GoodsParams(
          data.itemParams.info,
          data.itemParams.rule
        );
        console.log(
          "details: ",
          res,
          this.detailbasesinfo,
          this.shopinfos,
          this.paraminfo,
          " this.details_info: ",
          this.details_info
        );
        if (data.rate.list) {
          // 6： 评论信息
          this.commentinfo = data.rate.list[0];
        } else {
          this.navbar_titles.splice(2, 1);
        }
      });
    },
    // 获取推荐数据
    _getRecommend() {
      getRecommend().then(res => {
        this.recommendList = res.data.data.list;
        console.log("this.recommendList: ", this.recommendList);
      });
    },
    // 鼠标 滚动 调用
    contentscroll(position) {
      // 1: 判断back-top 是否显示
      this.isshow_backtop = position.y < -1000;
      // 2. 导航条 随着下滑时候的交互
      var y = -position.y;
      for (var i = 0; i < this.topY_List.length - 1; i++) {
        // 有时候 评论 是undefined
        if (this.currentindex == i || i == undefined) {
          continue;
        }

        if (this.topY_List[i] <= y && y < this.topY_List[i + 1]) {
          this.currentindex = i;
          console.log(this.currentindex);
        }
      }
    },
    // 图片加载完毕调用
    detail_imageload() {
      // console.log("-----------detail ");
      this.refresh(200);
      this.gettopY();
    },
    // 导航栏 点击调用
    navbarclick(index) {
      switch (index) {
        case 0:
          this.$refs.scroll.scrollTo(0, -this.topY_List[0], 200);
          break;
        case 1:
          this.$refs.scroll.scrollTo(0, -this.topY_List[1], 200);
          break;
        case 2:
          this.$refs.scroll.scrollTo(0, -this.topY_List[2], 200);
          break;
        case 3:
          this.$refs.scroll.scrollTo(0, -this.topY_List[3], 200);
          break;
      }
      this.currentindex = index;
      console.log(index);
    },
    getoffsetTopY() {
      this.topY_List = [
        0,
        this.$refs.params.$el.offsetTop,
        this.$refs.comment.$el.offsetTop,
        this.$refs.recommend.$el.offsetTop,
        Number.MAX_VALUE
      ];
      console.log("------------------->", this.topY_List);
    },
    addToCart() {
      var product = {};
      product.image = this.topImages[0];
      product.desc = this.detailbasesinfo.desc;
      product.title = this.detailbasesinfo.title;
      product.iid = this.id;
      product.realPrice = this.detailbasesinfo.realPrice;
      console.log(this.$store.state.cartList);
      // then 表示 添加成功 promise
      this.$store.dispatch("addCartList", product).then(res => {
        this.$toast.show(res)
        console.log(res);
      });
    }
  }
};
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 11;
  background-color: white;
}
.content0 {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0px;
  right: 0px;
}
</style>