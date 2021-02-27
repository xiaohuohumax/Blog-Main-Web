<template>
  <div class="d-none"></div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  mounted() {
    this.selectWebSet();
  },
  methods: {
    ...mapMutations("webSet", ["addWebSet"]),
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
  computed: {
    ...mapState("webSet", ["webSet"]),
  },
};
</script>

<style></style>
