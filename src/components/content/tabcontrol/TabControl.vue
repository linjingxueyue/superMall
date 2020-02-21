<template>
  <div class="tabcontrol">
    <div v-for="(item,i) in titles" :key="i" :class="{tabcontrol_item:'1',active:i==currentindex}" @click="tabclick(i)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabcontrol",
  components: {},
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentindex: 0
    };
  },
  methods:{
      tabclick(index){
          this.currentindex = index
          this.$emit('tabclick',index)
      }
  }
};
</script>

<style>
.tabcontrol {
  display: flex;
  text-align: center;
  line-height: 40px;
  font-size: 15px;
  background-color: #fff;
}
.tabcontrol_item {
  flex: 1;
}
.active {
    color: var(--color-high-text);
}
.active span{
     padding: 5px;
     border-bottom: 3px solid var(--color-high-text);
    
}
</style>
