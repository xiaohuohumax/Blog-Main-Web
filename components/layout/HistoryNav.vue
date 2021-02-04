<template>
  <div
    class="theme-card-background breadcrumbNav bg-white p-2 mb-3 rounded flex-left-center flex-wrap"
  >
    <span class="mr-2">当前位置:</span>
    <nuxt-link :to="item.path" v-for="(item, index) in history" :key="index">
      <span class="mr-2">
        {{ item.name }}
      </span>
    </nuxt-link>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      routerData: [],
    };
  },

  methods: {
    ...mapMutations("history", ["addHistory"]),
  },
  computed: {
    ...mapState("history", ["history"]),
  },
};
</script>

<style lang="less"></style>
