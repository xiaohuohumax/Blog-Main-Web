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
    this.createLink();
    this.changeLnkHref();
    setTimeout(() => {
      this.flag = false;
    }, 5000);
  },
  watch: {
  },
  methods: {
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
  },
  computed: {
    ...mapState("webSet", ["theme", "themeList"]),
  },
};
</script>

<style lang="less"></style>
