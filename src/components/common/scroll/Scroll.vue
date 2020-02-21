<template>
  <div class="common_wrapper" ref="wrapper">
    <div class="common_content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
// common 工具 函数
import { debounce2,debounce3 } from "common/utils.js";
export default {
  name: "BScroll",
  components: {},
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullupload: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
 
  mounted() {
    console.log('--->scroll: ',this)
    var x = this.$emit;
    // var emit = debounce3(x, 300);
    var emit = debounce2(x, 2000, this);
    console.log("scroll.vue----------");
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullupload
    });
    // 监听 滚动 事件
    this.scroll.on("scroll", position => {
      this.$emit("scrollposition", position);
      // console.log(position)
    });
    // 监听 上拉 事件
    this.scroll.on("pullingUp", () => {
      console.log("----------------------pullingUp-----------");
      // this.$emit("scroll_pullload");
      // 这里 利用 防抖 解决了  一个 bug, bug 是 一次上拉 响应多个pullingUp
      emit("scroll_pullload");
      // x.call(this,"scroll_pullload");
    });
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time); // 表示 500ms 之内 回到顶部
    },
    finishPullup() {
      this.scroll && this.scroll.finishPullUp();
      console.log("----------------------finishPullUp-----------");
    },
    refresh(i = 0) {
      // console.log("this.scroll.refresh() 执行", i, this);
      this.scroll && this.scroll.refresh();
    }
  }
};
</script>

<style scoped>
</style>
