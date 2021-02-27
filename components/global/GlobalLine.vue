<template>
  <div class="d-none"></div>
</template>

<script>
export default {
  mounted() {
    window.addEventListener("offline", this.offline);
    window.addEventListener("online", this.online);
  },
  beforeDestroy() {
    window.removeEventListener("offline", this.offline);
    window.removeEventListener("online", this.online);
    this.websocket.close();
  },
  methods: {
    offline() {
      this.$Notice.error({
        title: "网络提示:",
        desc: "你已经断网!",
      });
    },
    online() {
      this.$Notice.success({
        title: "网络提示:",
        desc: "已连接上网络!",
      });
    },
  },
};
</script>

<style></style>
