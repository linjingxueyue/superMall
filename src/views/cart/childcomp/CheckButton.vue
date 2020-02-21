<template>
        <div class="check-button"  :class="{active:ischecked}">
            <img src="~assets/images/cart/tick.svg" alt="">
        </div>
</template>
<script>
export default {
    name:'CheckButton',
    props:{
         ischecked:{
             type:Boolean,
             default:false
         }
    },
    data(){
        return{
           
        }
    },
    methods:{
    }
}
</script>
<style scoped>
.check-button{
    width: 18px;
    height: 18px;
    border-radius: 50%;
    /* background-color: #ff8198; */
    border: 2px solid #ccc;
}
.active{
       background-color: #ff8198;
    border: 2px solid #ff8198;
}
</style>