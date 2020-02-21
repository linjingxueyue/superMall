<template>
  <div id="cart-bottom-menu">
    <div class="selecter">
      <CheckButton class="bottom_menu_select" :ischecked='flage_com' @click.native="btnclick"></CheckButton>
     
        <div class="all">全选</div>
        <div class="add">合计:{{totalsum_com}}</div>
    </div>
    <div class="buy">去计算({{cacluate.length}})</div>
  </div>
</template>
<script>
import CheckButton from "./CheckButton";
export default {
  name: "cart_bottommenu",
   components: {
    CheckButton
  },
  props:{
      cacluate:{
          type:Array,
          default(){
              return []
          }
      },
      flage:{
          type:Boolean,
          default:false
      }
  },
  data(){
      return{
          totalsum:0
      }
  },
  computed:{
      totalsum_com(){
          return this.cacluate.reduce((preval,item)=>{
              return preval + item.realPrice*item.count
          },0).toFixed(2)
      },
      flage_com(){
          if(this.flage && this.cacluate.length !==0 ) {
              return true
          }
          return false
      }
  },
  methods:{
      btnclick(){
          this.$emit('bottommenu_btnclick')
      }
  }
 
};
</script>
<style scoped>
#cart-bottom-menu {
  position: fixed;
  bottom: 49px;
  left: 0px;
  right: 0px;
  height: 44px;
  background-color: #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}
.bottom_menu_select{
    margin-right: 5px;
}
.selecter {
  display: flex;
  align-items: center;
}
.all{
    font-size: 14px;
    margin-right: 10px;
}
.add{
    font-size: 16px;
    color: #666666;
}
.buy{
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
}
</style>