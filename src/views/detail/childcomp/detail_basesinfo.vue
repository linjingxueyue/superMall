<template>
  <div v-if="Object.keys(basesinfo).length >0" class="base-info">
    <div class="info-title">{{basesinfo.title}}</div>
    <div class="info-price">
      <span class="n-price">{{basesinfo['newPrice']}}</span>
      <span class="o-price">{{basesinfo['oldPrice']}}</span>
      <span
        v-if="basesinfo.discount"
        class="discount"
        :style="{backgroundColor:basesinfo.discountBgColor}"
      >{{basesinfo['discount']}}</span>
    </div>
    <div class="info-orther">
      <span>{{basesinfo['columns'][0]}}</span>
      <span>{{basesinfo['columns'][1]}}</span>
      <span>{{basesinfo.services[basesinfo.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in basesinfo.services.length-1" :key="index">
        <img :src="basesinfo.services[index-1].icon" alt />
        <span>{{basesinfo.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<style  scoped>
.base-info {
  z-index: 9;
  margin-top: 15px;
  padding: 0 8px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;
}
.info-title {
  color: #222;
}
.info-price {
  margin-top: 10px;
}
.info-price .n-price {
  font-size: 24px;
  color: var(--color-high-text);
}
.info-price .o-price {
  font-size: 13px;
  margin-left: 5px;
  text-decoration: line-through;
}
.info-price .discount {
  position: relative;
  padding: 2px 5px;
  top: -8px;
  color: white;
  margin-left: 5px;
  border-radius:8px;
  font-size: 12px;
}
.info-orther {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  font-size: 13px;
  line-height: 30px;
  margin-top: 10px;
}
.info-service {
  margin: 10px 0;
  display: flex;

  justify-content: space-between;
}
.info-service img {
  width: 14px;
  position: relative;
  top: 2px;
  margin-right: 2px;
}
.info-service span {
  font-size: 13px;
  color: #333;
}
</style>

<script>
export default {
  name: "detail_baseinfo",
  props: {
    basesinfo: {
      type: Object
    }
  },
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>
