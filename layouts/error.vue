<template>
  <div
    v-if="error.statusCode == 500"
    class="error-page h-100 d-flex align-items-center justify-content-center"
  >
    <div class="text-center">
      <img class="w-50" src="/image/errorpage/500.svg" />
      <div class="text-success mt-2 font-weight-bold mt-3" style="font-size: 25px">
        500 服务器抽风了!
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["error"],
};
</script>

<style lang="less">
.error-page {
  min-height: 100vh;
}
</style>
