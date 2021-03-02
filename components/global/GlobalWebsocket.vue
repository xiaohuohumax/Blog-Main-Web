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
    ...mapMutations("auth", ["authInit"]),
    // 连接webosocket
    linkWebsocket() {
      this.$websocket.onmessage((code, data) => {
        if (code == websocketCode.FLUSH_WEBSET) {
          this.selectWebSet();
          this.selectrRole();
          this.$Notice.warning({
            title: "网站设置更改提示:",
            desc: "网站的设置被博主更改了,部分功能有所改变!",
          });
        } else if (code == websocketCode.FLUSH_YOURSELF) {
          this.selectMyself();
          this.selectrRole();
          this.$Notice.success({
            title: "用户信息刷新提醒:",
            desc: "你的信息已经刷新!",
          });
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
    selectrRole() {
      this.$http
        .getDefRolesResources()
        .then((result) => {
          if (result.flag) {
            let data = result.data;
            this.authInit(data);
          }
        })
        .catch(() => {});
    },
    selectMyself() {
      this.$http
        .webUserFindBySession()
        .then((result) => {
          if (result.flag) {
            this.putUser(result.data);
          }
        })
        .catch(() => {});
    },
  },
  computed: {
    ...mapState("webSet", ["webSet"]),
  },
};
</script>

<style></style>
