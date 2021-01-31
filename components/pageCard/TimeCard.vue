<template>
  <TimelineItem :color="time.color" >
    <Card class="theme-card-background ">
      <div class="font-weight-bold">{{ time.notice }}</div>
      <div class="small">{{ time.uploadTime }}</div>
      <img v-if="time.icon && time.icon.length > 0" :src="time.icon[0]" class="w-75 rounded" />
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
  height: 10rem;
}
</style>
