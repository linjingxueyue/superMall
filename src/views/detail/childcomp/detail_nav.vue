<template>
  <div id="detail_nav">
    <navbar>
      <div slot="left" @click="imgclick">
        <!-- <img src="~assets/images/common/1225467.png" alt="" > -->
        <img src="~assets/images/common/back.svg" alt />
      </div>
      <div slot="center" class="center2">
        <div
          v-for="(item,i) in titles"
          :key="i"
          class="center_item"
          :class="{active:i == currentindex}"
          @click="navbarclick(i)"
        >{{item}}</div>
      </div>
    </navbar>
  </div>
</template>

<script>
import navbar from "components/common/navbar/NavBar.vue";
export default {
  name: "detail_nav",
  components: { navbar },
  props: {
    currentindex: {
      type: Number,
      default: 0
    },
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      id: null,
      flage: false,
      index: this.currentindex
    };
  },

  created() {
    this.id = this.$route.params.id;
    console.log("this.id", this.id);
  },
  methods: {
    imgclick() {
      this.$router.back();
    },
    navbarclick(index) {
      this.index = index;
      this.$emit("navbarclick", index);
    }
  }
};
</script>

<style scoped>
img {
  margin-top: 10px;
  width: 25px;
}
/* 
  自己写着玩的 
.arrow{
  width: 0;
  height: 0px;
  border-width: 20px;
  border-style: solid;
  border-color:transparent red transparent transparent;
} */
.center2 {
  display: flex;
}
.center_item {
  flex: 1;
  align-items: center;
}
.active {
  color: var(--color-high-text);
}
</style>