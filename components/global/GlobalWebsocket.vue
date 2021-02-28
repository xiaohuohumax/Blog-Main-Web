<template>
  <div class="d-none"></div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import websocketCode from "@/plugins/websocketCode";
export default {
  mounted() {
    this.linkWebsocket(); // 链接websocket
  },
  methods: {
    ...mapMutations("webSet", ["addWebSet"]),
    ...mapMutations("user", ["putUser"]),
    // 连接webosocket
    linkWebsocket() {
      this.$websocket.onmessage((code, data) => {
        if (code == websocketCode.FLUSH_WEBSET) {
          this.selectWebSet();
          this.$Notice.warning({
            title: "网站设置更改提示:",
            desc: "网站的设置被博客更改了,部分功能有所改变!",
          });
        } else if (code == websocketCode.FLUSH_YOURSELF) {
          this.selectMyself();
        } else if (code == websocketCode.INFORM_MESSAGE) {
          this.$Notice[data.kind]({ ...data });
        }
      });
    },
    // 查询网站设置
    selectWebSet() {
      this.$http
        .webSetFindOnly()
        .then((result) => {
          this.addWebSet(result.data);
        })
        .catch((err) => {});
    },
    selectMyself() {
      this.$http
        .webUserFindBySession()
        .then((result) => {
          if (result.flag) {
            this.putUser(result.data);
          }
        })
        .catch((err) => {});
    },
  },
  beforeDestroy() {
    this.websocket.close();
  },
  computed: {
    ...mapState("webSet", ["webSet"]),
  },
};
</script>

<style></style>
