<template>
  <TimelineItem :color="time.color">
    <Card class="theme-card-background">
      <div class="font-weight-bold">{{ time.notice }}</div>
      <div class="small">{{ time.uploadTime }}</div>
      <img
        v-if="time.icon && time.icon.length > 0"
        :src="time.icon[0]"
        class="time-card-icon rounded"
      />
    </Card>
  </TimelineItem>
</template>

<script>
export default {
  props: {
    time: Object,
  },
};
</script>

<style lang="less">
.time-card-icon {
  max-height: 20rem !important;
  max-width: 75% !important;
  object-fit: contain;
}
</style>
