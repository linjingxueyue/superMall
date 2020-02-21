<template>
  <div class="category-tabmenu" v-if="Object.keys(categorylist).length >0">
    <div class="category-menu-list">
      <div
        v-for="(item,index) in categorylist"
        :key="index"
        class="category-menu-list-item"
        :class="{category_active:currentindex == index}"
        @click="category_menu_click(index,item)"
      >{{item.title}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabMenu",
  props: {
    categorylist: {
      type: Array,
      default() {
        return [];
      }
    },
    
  },
  data(){
      return{
         currentindex:0
      }
  },
  methods:{
      category_menu_click(index){
          this.currentindex = index
          this.$emit('category_menu_click',index)
      }
  }
};
</script>
<style scoped>
.category-tabmenu {
  background-color: #f6f6f6;
  width: 100px;
}

.category-menu-list-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}
.category_active{
    background-color: #fff;
}
</style>