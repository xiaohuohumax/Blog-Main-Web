<template>
  <div class="theme-card-background banner mx-2 mx-md-5 my-3 rounded">
    <Carousel autoplay :autoplay-speed="5000" v-if="isRouterAlive">
      <CarouselItem v-for="(item, index) in bannerArray" :key="index">
        <img :src="item" class="icon-card w-100" style="height: 13rem" />
      </CarouselItem>
    </Carousel>
  </div>
</template>

<script>
import { mapState } from "vuex";
import config from "@/config.js";
export default {
  data() {
    return {
      bannerDefine: config.banners, // 默认横幅
      isRouterAlive: true,
    };
  },
  watch: {
    fontSzie: "reloadBanner",
  },
  methods: {
    // 刷新
    reloadBanner() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    },
  },
  computed: {
    ...mapState("webSet", ["webSet"]),
    ...mapState("font", ["fontSzie"]),
    bannerArray() {
      // 若无banner 则使用默认值
      let bannerIcon = this.webSet.bannerIcon;
      return bannerIcon && bannerIcon.length > 0 ? bannerIcon : this.bannerDefine;
    },
  },
};
</script>

<style lang="less">
.banner {
  overflow: hidden;
  position: relative;

  .ivu-carousel-arrow {
    outline: none !important;
  }
}
</style>
