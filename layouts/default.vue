<template>
  <div class="app theme-background theme-color bg-dark">
    <Loading :loading="flag" @isover="isover" />
    <Nuxt />
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
    "webSet.webTheme"() {
      this.changeLnkHref();
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
      this.link.href = this.themeUrl;
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
    ...mapState("webSet", ["webSet"]),
    ...mapGetters("webSet", ["themeUrl"]),
  },
};
</script>

<style lang="less"></style>
