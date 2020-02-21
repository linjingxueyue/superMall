<template>
  <div id="app">
    <icon></icon>
    <svg-icon></svg-icon>
    <keep-alive exclude="detail">
       <router-view></router-view>
    </keep-alive>
    <tabbarmain></tabbarmain>
  </div>
</template>

<script>

import tabbarmain from 'components/content/tabbar_main.vue'
import Icon from "components/content/Icon/Icon.vue";
import SvgIcon from "components/content/Icon/svg.vue";

export default {
  name: "App",
  components: { tabbarmain,Icon,SvgIcon }
};
</script>

<style>
@import "assets/css/base.css";
</style>
