<template>
  <div class="toast" v-show="isshow">{{message}}</div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      isshow: false,
      message: ""
    };
  },
  methods: {
    show(message, duration = 2000) {
      this.isshow = true;
      this.message = message;
      setTimeout(() => {
        this.isshow = false;
      }, duration);
    }
  }
};
</script>
<style scoped>
.toast {
  position: fixed;
  padding: 10px 15px;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color:#fff;
  background-color: rgba(0, 0, 0, 0.75);
}
</style>