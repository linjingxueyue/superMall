<template>
  <div class="param-info" v-if="Object.keys(paraminfo).length !== 0">
    <table class="info-size"   >
      <tr v-for="(item,index) in paraminfo.sizes[0]" :key="index" >
        <td v-for="(item2,index2) in item" :key="index2">{{item2}}</td> 
      </tr> 
    </table>
   <table class="info-param">
      <tr v-for="(info, index) in paraminfo.infos" :key="index">
        <td class="info-param-key">{{info.key}}</td>
        <td class="param-value">{{info.value}}</td>
      </tr>
    </table>
    <div class="info-img" v-if="paraminfo.image.length !== 0">
      <img :src="paraminfo.image" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "detail_paramsinfo",
  components: {},
  props:{
    paraminfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data() {
    return {
      
    };
  },
  created() {
    
  },
  methods:{
    
  }
};
</script>

<style scoped>
  .param-info {
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }

  .param-info table {
    width: 100%;
    border-collapse: collapse;
  } 

  .param-info table tr {
    height: 42px;
  }

  .param-info table tr td {
    border-bottom: 1px solid rgba(100,100,100,.1);
  }

  .info-param-key {
    /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
    width: 95px;
  }

  .info-param {
    border-top: 1px solid rgba(0,0,0,.1);
  }

  .param-value {
    color: #eb4868
  }

  .info-img img {
    width: 100%;
  }
</style>