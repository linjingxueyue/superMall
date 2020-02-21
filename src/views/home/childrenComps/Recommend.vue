<template>
  <div class="recommends">
       <div v-for=" (item,i) in recommends" :key='i' class="re_item">
        <a :href="item.link">
          <img :src="item.image" alt="" >
          <div>{{item.title}}</div>
        </a>
      </div>
  </div>
</template>

<script>
export default {
  name: "Recommend",
  props:{
    recommends:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components: {},
  data() {
    return {

    }; 
  }
};
</script>

<style>
.recommends{
  display: flex;
  padding: 10px 0px 20px;
  border-bottom: 10px solid #eee;
}
.re_item{
  flex: 1;
  text-align: center;
  font-size: 12px;
 
}
.re_item img{
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>
