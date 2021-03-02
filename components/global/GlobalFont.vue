<template>
  <div class="d-none"></div>
</template>

<script>
import { mapState } from "vuex";
export default {
  watch: {
    // 字体监视
    "webSet.webFontFamily": "setFontFamily",
    $route: "setFontFamily",
  },
  mounted() {
    this.setFontFamily();
  },
  methods: {
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
  },
  computed: {
    ...mapState("webSet", ["webSet"]),
  },
};
</script>
