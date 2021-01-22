<template>
  <div class="text-center">
    <div class="mb-2">预计恢复时间: <Time :time="time" type="datetime" /></div>
    <div class="w-50 row mx-auto justify-content-center">
      <div class="col-12 col-md-6 back-time-block p-4">
        <div class="back-time-title">{{ timeRule.days }}</div>
        <div class="back-time-subtitle">天</div>
      </div>
      <div class="col-12 col-md-6 back-time-block p-4">
        <div class="back-time-title">{{ timeRule.hours }}</div>
        <div class="back-time-subtitle">时</div>
      </div>
      <div class="col-12 col-md-6 back-time-block p-4">
        <div class="back-time-title">{{ timeRule.minutes }}</div>
        <div class="back-time-subtitle">分</div>
      </div>
      <div class="col-12 col-md-6 back-time-block p-4">
        <div class="back-time-title">{{ timeRule.seconds }}</div>
        <div class="back-time-subtitle">秒</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    time: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      timeRule: {},
    };
  },
  mounted() {
    this.start();
  },
  methods: {
    start() {
      setInterval(() => {
        let timeLess = new Date(this.time) - Date.now();
        this.timeRule = this.formatDuring(timeLess < 0 ? 0 : timeLess);
      }, 500);
    },
    formatDuring(mss) {
      var days = parseInt(mss / (1000 * 60 * 60 * 24));
      var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = parseInt((mss % (1000 * 60)) / 1000);
      return { days, hours, minutes, seconds };
    },
  },
};
</script>

<style lang="less">
.back-time-block {
  .back-time-title {
    font-size: 2.5rem;
  }
}
</style>
