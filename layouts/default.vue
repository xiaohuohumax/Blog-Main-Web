<template>
  <div class="app theme-background">
    <Loading :loading="flag" @isover="isover" />
    <Nuxt />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
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
    let that = this;
    // websocket
    this.$websocket.onmessage((code, data) => {
      if (code == websocketCode.FLUSH_WEBSET) {
        that.selectSebSet();
      }
    });

    this.selectSebSet();
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
  },
  methods: {
    ...mapMutations("webSet", ["addWebSet"]),
    isover() {
      this.loading = false;
    },

    createLink() {
      const head = document.head || document.getElementsByTagName("head")[0];
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      head.appendChild(link);
      this.link = link;
    },
    changeLnkHref() {
      // this.link.href = `theme/theme_${this.theme}.css`;
    },
    selectSebSet() {
      this.$http
        .webSetFindOnly()
        .then((result) => {
          this.addWebSet(result);
        })
        .catch((err) => {});
    },
  },
  computed: {
    ...mapState("webSet", ["webSet", "theme", "themeList"]),
  },
};
</script>

<style lang="less"></style>
