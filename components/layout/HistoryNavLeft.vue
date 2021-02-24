<template>
  <div class="theme-card-background bg-white p-2 mb-3 rounded flex-left-center flex-wrap">
    <div class="pr-2" v-for="(item, index) in history" :key="index">
      <a @click="intoPath(item)">{{ item.name }}</a>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations("history", ["addHistory"]),
    intoPath(item) {
      this.$router.push(item);
    },
  },
  computed: {
    ...mapState("history", ["history"]),
  },
};
</script>

<style lang="less"></style>
