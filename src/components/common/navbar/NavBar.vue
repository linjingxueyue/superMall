<template>
  <div class="navbar">
    <div class="navbar_left">
      <slot name="left"></slot>
    </div>
    <div class="navbar_center">
      <slot name="center"></slot>
    </div>
    <div class="navbar_right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar",
  components: {}
};
</script>
<style scoped>
.navbar {
  display: flex;
  height: 44px;
  line-height: 44px;
  /* height: 44px; */

  box-shadow: 0px 1px 1px rgba(100, 100, 100, .3)
}
.navbar_left,
.navbar_right{
  width: 60px;
  text-align: center;
  vertical-align: middle;
}
.navbar_center {
  flex-grow: 1;
  text-align: center;
  
}
</style>
