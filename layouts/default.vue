<template>
  <div class="theme-background bg-dark theme-color">
    <div class="defult-background">
      <Loading :loading="flag" @isover="isover" />
      <Nuxt />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import websocketCode from "@/plugins/websocketCode";

export default {
  data() {
    return {
      loading: true,
      flag: true,
      link: null,
    };
  },
  mounted() {
    this.linkWebsocket();
    this.selectWebSet();
    this.createLink();
    this.changeLnkHref();
    setTimeout(() => {
      this.flag = false;
    }, 5000);
  },
  watch: {
    // 网站状态监视
    "webSet.webState"() {
      this.webSet.webState ? this.$router.go(-1) : this.$router.push("/maintenance");
    },
    theme() {
      this.changeLnkHref();
    },
  },
  methods: {
    ...mapMutations("webSet", ["addWebSet"]),
    ...mapMutations("user", ["putUser"]),
    isover() {
      this.loading = false;
    },
    selectMyself() {
      this.$http
        .webUserFindBySession()
        .then((result) => {
          console.log(result);
          if (result.flag) {
            this.putUser(result.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 连接webosocket
    linkWebsocket() {
      this.$websocket.onmessage((code, data) => {
        if (code == websocketCode.FLUSH_WEBSET) {
          this.selectWebSet();
        } else if (code == websocketCode.FLUSH_YOURSELF) {
          this.selectMyself();
        }
      });
    },

    // 创建link 标签
    createLink() {
      const head = document.head || document.getElementsByTagName("head")[0];
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      head.appendChild(link);
      this.link = link;
    },
    // 添加link href地址
    changeLnkHref() {
      this.themeUrl && (this.link.href = this.themeUrl);
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
  },
  computed: {
    ...mapState("webSet", ["webSet", "theme"]),
    ...mapGetters("webSet", ["themeUrl"]),
    ...mapState("user", ["inf"]),
  },
};
</script>

<style lang="less">
.defult-background {
  transition: none !important;
}
</style>
