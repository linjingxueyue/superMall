<template>
    <div id="tab-bar">
        <slot> </slot>
    </div>
</template>

<script>

export default {
  name: "tabbar",
  components: {}
};
</script>
<style scoped>

#tab-bar {
  display: flex;
  width: 100%;
  background-color: #f6f6f6;

  position: fixed;
  bottom: 0px;
  left: 0px;
  box-shadow: 0px -1px 1px rgba(100, 100, 100, .2)

}

</style>
