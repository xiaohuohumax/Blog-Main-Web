<template>
  <div class="theme-background bg-dark theme-color">
    <div class="defult-background">
      <Loading :loading="flag" @isover="isover" />
      <Nuxt />
      <GlobalFont />
      <GlobalLine />
      <GlobalTheme />
      <GlobalWebSet />
      <GlobalWebsocket />
      <GlobalWebState />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      flag: true,
    };
  },
  mounted() {
    this.$Notice.config({
      top: 50,
      duration: 5,
    });
    setTimeout(() => {
      this.flag = false;
    }, 5000);
  },

  methods: {
    isover() {
      this.loading = false;
    },
  },
};
</script>

<style lang="less">
.defult-background {
  transition: none !important;
}
</style>
