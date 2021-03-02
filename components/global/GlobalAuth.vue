<template>
  <div class="d-none"></div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  mounted() {
    this.select();
  },
  watch: {
    logined() {
      // 注销查询基础权限
      if (!this.logined) {
        this.select();
      }
    },
  },
  methods: {
    ...mapMutations("auth", ["authInit"]),
    select() {
      this.$http
        .getDefRolesResources()
        .then((result) => {
          if (result.flag) {
            let data = result.data;
            this.authInit(data);
          }
        })
        .catch(() => {});
    },
  },
  computed: {
    ...mapState("user", ["logined"]),
  },
};
</script>
