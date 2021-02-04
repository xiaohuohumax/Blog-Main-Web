<template>
  <div class="error-404 d-flex justify-content-center align-items-center">
    <div class="font-weight-bold text-center text-md-left">
      <div class="display-4">404 NOT FOUND!</div>
      <div class="h6 font-weight-bold mb-3">我们未能找到此网页,你可以尝试:</div>
      <div class="mb-2">
        <div>刷新网页</div>
        <div><nuxt-link to="/">返回首页</nuxt-link></div>
        <div><a @click="$router.go(-1)">返回上一页</a></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.error-404 {
  min-height: 100vh;
}
</style>
