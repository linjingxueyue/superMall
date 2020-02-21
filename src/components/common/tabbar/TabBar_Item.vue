<template>
  <div class="tabbaritem " @click="click">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon_active"></slot>
    </div>
    <div :style="activestyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabbar_item",
  props: {
    path: String,
    activecolor:{
        type:String,
        default:'blue'
    }
  },
  components: {},
  data() {
    return {};
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activestyle(){
        return this.isActive ? {color:this.activecolor} :{}
    }
  },
  methods: {
    click() {
       console.log('---',this.path)
      this.$router.push(
        this.path,
        () => {},
        e => {
          console.log("输出报错", e);
        }
      );
    }
  }
};
</script>

<style scoped>
.tabbaritem {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.active {
  color: red;
}

</style>
