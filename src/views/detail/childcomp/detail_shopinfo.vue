<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shopinfo.logo" alt />
      <span class="title">{{shopinfo.name}}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">{{shopinfo.sells|sellCountFilter}}</div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">{{shopinfo.goodsCount}}</div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item,index) in shopinfo.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more': item.isBetter}">
              <span>{{item.isBetter ? '高':'低'}}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<style  scoped>
.shop-info {
  padding: 25px 8px;
  border-bottom: 5px solid #f2f5f8;
}
.shop-top {
  line-height: 45px;
  display: flex;
  align-items: center;
}
.shop-top .title {
  margin-left: 10px;
  vertical-align: center;
}
.shop-top img {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  width: 45px;
}
.shop-top span {
  margin-left: 15px;
}
.shop-middle {
  margin-top: 15px;
  display: flex;
  align-items: center;
}
.shop-middle-item {
  flex: 1;
  display: flex;
  justify-content: space-around;
}
.shop-middle-right {
  font-size: 13px;
  color: #333;
}
.shop-middle-left {
  display: flex;
  justify-content: space-evenly;
  color: #333;
  text-align: center;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}
.info-sells .sells-count {
  font-size: 18px;
}
.sells-text,
.goods-text {
  margin-top: 10px;
  font-size: 12px;
}
.shop-middle-right table {
  width: 120px;
  margin-left: 30px;
}
.shop-middle-right table td {
  padding: 5px 0;
}
.shop-middle-right .score {
  color: #5ea732;
}

.shop-middle-right .score-better {
  color: #f13e3a;
}

.shop-middle-right .better span {
  background-color: #5ea732;
  color: #fff;
  text-align: center;
}

.shop-middle-right .better-more span {
  background-color: #f13e3a;
}
.shop-bottom {
  text-align: center;
  margin-top: 10px;
}
.enter-shop {
  display: inline-block;
  font-size: 14px;
  background-color: #f2f5f8;
  width: 150px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 10px;
}
</style>

<script>
export default {
  name: "detail_shopinfo",
  props: {
    shopinfo: {
      type: Object
    }
  },
  filters: {
    sellCountFilter(val) {
      if (val < 10000) {
        return val;
      } else {
        return (val / 10000).toFixed(1) + "万";
      }
    }
  },
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>
