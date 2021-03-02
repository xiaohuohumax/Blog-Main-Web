<template>
  <div class="error-404 h-100 d-flex align-items-center justify-content-center">
    <div class="text-center">
      <img class="w-50" src="/image/errorpage/403.svg" />
      <div class="text-success mt-2 font-weight-bold mt-3" style="font-size: 20px">
        403 木有权限!
        <Button type="primary" ghost @click="$router.push('/')">
          返回首页
        </Button>
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
