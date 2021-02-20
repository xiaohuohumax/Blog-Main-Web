<template>
  <div class="tools">
    <Button
      class="tools-button theme-card-background"
      icon="md-cog"
      shape="circle"
    ></Button>
    <div class="tools-items flex-column align-items-end d-flex">
      <Button
        class="mt-2 theme-card-background"
        icon="md-add"
        title="放大"
        shape="circle"
        @click="fontSizeChange(1)"
      ></Button>
      <Button
        class="mt-2 theme-card-background"
        icon="md-remove"
        title="缩小"
        shape="circle"
        @click="fontSizeChange(-1)"
      ></Button>
      <Button
        class="mt-2 theme-card-background"
        icon="ios-bowtie"
        title="换肤"
        shape="circle"
        @click="changeThemeNextFilter"
      ></Button>
      <Button
        class="mt-2 theme-card-background"
        icon="md-arrow-round-up"
        title="回到顶部"
        shape="circle"
        @click="myScrollToTop"
      ></Button>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      isShow: false,
      fontSize: 15,
      fontSizeMax: 18,
      fontSizeMin: 13,
      fontSizeSteep: 0.5,

      themeFlag: false,
    };
  },
  mounted() {
    this.fontSizeChange(1);
  },
  methods: {
    ...mapMutations("webSet", ["changeThemeNext"]),
    ...mapMutations("font", ["setFontSzie"]),
    // 回到顶部
    myScrollToTop() {
      scrollTo(0, 0);
    },
    // 数量点击限制 2s过后才能继续点击
    changeThemeNextFilter() {
      if (this.themeFlag) return;
      this.changeThemeNext();
      this.themeFlag = true;
      setTimeout(() => {
        this.themeFlag = false;
      }, 2000);
    },
    // 设置字体大小
    setFontSize() {
      var html = document.documentElement;
      html.style.fontSize = this.fontSize + "px";
      this.setFontSzie(this.fontSize);
    },
    // 字体大小切换
    fontSizeChange(val) {
      this.fontSize += val * this.fontSizeSteep;
      this.fontSize =
        this.fontSize > this.fontSizeMax
          ? this.fontSizeMax
          : this.fontSize < this.fontSizeMin
          ? this.fontSizeMin
          : this.fontSize;
      this.setFontSize();
    },
  },
};
</script>
<style lang="less">
.tools {
  position: fixed;
  z-index: 7000;
  bottom: 1rem;
  right: 1rem;
  .ivu-btn {
    border-color: transparent !important;
  }

  &:hover .tools-button,
  .tools-items {
    display: none !important;
  }
  &:hover .tools-items {
    display: flex !important;
  }
}
</style>
