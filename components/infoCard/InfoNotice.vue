<template>
  <InfoCardSolt>
    公告
    <template #content>
      <div class="h5 p-2 pb-0">
        <div :style="`color:${notice.color}`">
          {{ notice.notice }}
        </div>
        <div class="text-right small mt-2"><Time :time="notice.uploadTime" /></div>
      </div>
    </template>
  </InfoCardSolt>
</template>

<script>
export default {
  data() {
    return {
      notice: { color: "inherit", notice: "暂无公告!", uploadTime: new Date().getTime() },
      setTime: null,
    };
  },
  mounted() {
    this.select();
    // this.setTime = setInterval(() => {
    //   this.select();
    // }, 5000);
  },
  destroyed() {
    clearInterval(this.setTime);
  },
  methods: {
    select() {
      this.$http
        .noticeFindTop()
        .then((result) => {
          if (result.flag) {
            this.notice = result.data.notices[0];
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="less"></style>
