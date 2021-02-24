<template>
  <div class="theme-background bg-dark theme-color">
    <div class="defult-background">
      <Loading :loading="flag" @isover="isover" />
      <Nuxt />
      <MusicPlayer @randomplaylist="randomPlaylist" :playlist="playlist" />
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
      playlist: {},
    };
  },
  mounted() {
    this.linkWebsocket(); // 链接websocket
    this.selectWebSet(); // 查询网站设置
    this.createLink(); // 创建link标签
    this.changeLnkHref();
    setTimeout(() => {
      this.flag = false;
    }, 5000);
    this.randomPlaylist(); // 查询歌单
  },
  watch: {
    // 网站状态监视
    "webSet.webState"() {
      this.webSet.webState ? this.$router.go(-1) : this.$router.push("/maintenance");
    },
    // 字体监视
    "webSet.webFontFamily": "setFontFamily",
    $route: "setFontFamily",
    theme() {
      this.changeLnkHref();
    },
  },
  methods: {
    ...mapMutations("webSet", ["addWebSet"]),
    ...mapMutations("user", ["putUser"]),
    randomPlaylist() {
      this.$http
        .playListRandomFindOne()
        .then((result) => {
          if (result.flag) {
            this.playlist = result.data;
            this.$Message.success(`歌单已切换至[${this.playlist.title}]`);
          } else {
            this.$Message.error("切换失败!");
          }
        })
        .catch((err) => this.$Message.error("切换失败!"));
    },
    isover() {
      this.loading = false;
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

    // 设置字体
    setFontFamily() {
      let webFontFamily = this.webSet.webFontFamily;
      if (!webFontFamily) return;
      document.body.style.fontFamily = webFontFamily;
      // 子窗口
      let iframes = document.getElementsByTagName("iframe");
      iframes.forEach((val) => {
        try {
          // 排除跨域
          val.contentWindow.document.body.style.fontFamily = webFontFamily;
        } catch (error) {}
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
