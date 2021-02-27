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
  computed: {
    ...mapState("webSet", ["webSet"]),
  },
};
</script>

<style></style>
