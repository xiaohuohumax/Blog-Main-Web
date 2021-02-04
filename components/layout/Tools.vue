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
        @click="changeThemeNext"
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
    };
  },
  mounted() {
    this.fontSizeChange(1);
  },
  methods: {
    ...mapMutations("webSet", ["changeThemeNext"]),
    ...mapMutations("font", ["setFontSzie"]),
    myScrollToTop() {
      scrollTo(0, 0);
    },
    setFontSize() {
      var html = document.documentElement;
      html.style.fontSize = this.fontSize + "px";
      this.setFontSzie(this.fontSize);
    },

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
