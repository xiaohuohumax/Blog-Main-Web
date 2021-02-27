<template>
  <InfoCardSolt>
    公告
    <template #content>
      <div class="h5 p-2 pb-0" v-if="finded">
        <div :style="`color:${notice.color}`">
          {{ notice.notice }}
        </div>
        <div class="text-right small mt-2"><Time :time="notice.uploadTime" /></div>
      </div>
      <div v-else class="text-center">暂无公告~~</div>
    </template>
  </InfoCardSolt>
</template>

<script>
export default {
  data() {
    return {
      notice: { color: "inherit", notice: "暂无公告!", uploadTime: new Date().getTime() },
      setTime: null,
      finded: false, // 是否有公告
    };
  },
  mounted() {
    this.select();
    // this.setTime = window.setInterval(this.select, 30000);
  },
  destroyed() {
    clearInterval(this.setTime);
  },
  methods: {
    select() {
      this.finded = false;
      this.$http
        .noticeFindTop()
        .then((result) => {
          if (result.flag) {
            let notice = result.data;
            notice ? (this.notice = notice) : "";
            this.finded = true;
          } else {
            this.finded = false;
          }
        })
        .catch((err) => (this.finded = false));
    },
  },
};
</script>
