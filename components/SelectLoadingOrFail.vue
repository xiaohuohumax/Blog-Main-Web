<template>
  <div
    v-if="kind != 1"
    class="theme-card-background p-5 text-center theme-card-background bg-white rounded mb-3 font-weight-bold"
  >
    <span v-if="kind == 0">loading...</span>
    <span v-else-if="kind == 2">loading fail...</span>
  </div>
</template>

<script>
export default {
  props: {
    kind: Number,
  },
};
</script>

<style></style>
