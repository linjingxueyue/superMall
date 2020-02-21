<template>
  <div class="comment-info" v-if="Object.keys(commentinfo).length>0">
    <div class="top">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        <span>更多</span>
        <i class="arrow-right"></i>
      </div>
    </div>
    <div class="user-info">
      <img :src="commentinfo.user.avatar" alt class="avatar" />
      <span class="user-name">{{commentinfo.user.uname}}</span>
      <!-- <span class="comment-content"></span> -->
    </div>
    <div class="info-detail">
      <p>{{commentinfo.content}}</p>
      <div class="info-other">
        <span class="date">{{commentinfo.created|showDate}}</span>
        <span class="style">{{commentinfo.style}}</span>
      </div>
     <div class="info-imgs">
          <img :src="item" v-for="(item, index) in commentinfo.images" :key="index">
        </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "common/utils.js";
export default {
  name: "detail_commentinfo",
  props: {
    commentinfo: {
      type: Object,
      defeault() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  filters: {
    showDate: function(value) {
      let date = new Date(value * 1000);
      return formatDate(date, "yyyy-MM-dd");
    }
  }
};
</script>
<style scoped>
.comment-info {
  padding: 5px 12px;
  color: #333;
  border-bottom: 5px solid #f2f5f8;
}
.comment-info .top {
  display: flex;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.top .header-title {
  font-size: 15px;
}
.top .header-more {
  font-size: 13px;
}
.arrow-right {
  width: 9px;
  height: 9px;
  display: inline-block;
  background-color: transparent;
  border-top: 1px solid black;
  border-right: 1px solid black;
  transform: rotate(45deg);
  margin-top: 1px;
}
.user-info {
  padding: 10px 0 5px;
  display: flex;
  align-items: center;
}
.user-info .avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}
.user-info .user-name {
  margin-left: 10px;
  font-size: 15px;
}
.info-detail{
    padding: 0px 5px 15px;
}
.info-detail p{
    font-size: 14px;
    color:#777;
    line-height: 1.5;
}
.info-other{
    font-size: 12px;
    color:#999;
    margin-top: 10px;
}
.info-other .date{
    margin-right:8px;
}
.info-imgs{
    margin-top: 10px;
}
.info-imgs img{
   height: 70px;
    width: 70px;
}
</style>