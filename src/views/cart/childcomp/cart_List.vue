<template>
  <div class="cart_list">
    <div v-for="(item,index) in list " :key="index">
      <list-item :product="item"></list-item>
    </div>
  </div>
</template>
<script>

import ListItem from "./cart_listitem.vue";
export default {
  name: "cart_List",
  components: {
   
    ListItem
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>

</style>