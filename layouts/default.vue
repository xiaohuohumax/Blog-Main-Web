<template>
  <div class="app theme-background">
    <Loading :loading="flag" @isover="isover" />
    <Nuxt />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      loading: true,
      flag: true,
      link: null,
    };
  },
  mounted() {
    this.selectSebSet();
    this.createLink();
    this.changeLnkHref();
    setTimeout(() => {
      this.flag = false;
    }, 5000);
  },
  watch: {},
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
    ...mapState("webSet", ["theme", "themeList"]),
  },
};
</script>

<style lang="less"></style>
