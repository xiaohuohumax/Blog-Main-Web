<template>
  <div class="d-none"></div>
</template>

<script>
import { mapState } from "vuex";
export default {
  watch: {
    // 网站状态监视
    "webSet.webState"() {
      this.webSet.webState ? this.$router.go(-1) : this.$router.push("/maintenance");
    },
  },
  mounted() {
    this.selectWebSet();
  },
  computed: {
    ...mapState("webSet", ["webSet"]),
  },
  methods: {
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
};
</script>
