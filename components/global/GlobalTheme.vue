<template>
  <div class="d-none"></div>
</template>

<script>
import { mapState ,mapGetters} from "vuex";
export default {
  data() {
    return {
      link: null,
    };
  },
  watch: {
    theme() {
      this.changeLnkHref();
    },
  },
  mounted() {
    this.createLink();
    this.changeLnkHref();
  },
  methods: {
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
  },
  computed: {
    ...mapState("webSet", ["theme"]),
    ...mapGetters("webSet", ["themeUrl"]),
  },
};
</script>
