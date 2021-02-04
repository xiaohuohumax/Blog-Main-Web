<template>
  <div class="theme-card-background banner mx-2 mx-md-5 my-3 rounded">
    <Carousel autoplay :autoplay-speed="5000" v-if="isRouterAlive">
      <CarouselItem
        v-for="(item, index) in bannerArray"
        :key="index"
        :style="bannerStyle(item)"
      >
      </CarouselItem>
    </Carousel>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      bannerDefine: [require("@/assets/image/oooo7.jpg")], // 默认横幅
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
    bannerStyle(item) {
      return {
        height: "13rem",
        background: `url('${item}') center / cover`,
      };
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
