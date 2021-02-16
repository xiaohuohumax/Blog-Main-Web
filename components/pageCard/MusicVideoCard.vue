
<template>
  <div class="theme-card-background video-card rounded bg-white mb-3">
    <nuxt-link :to="`/videomore/${video._id}`">
      <img :src="video.icon" class="video-card-icon" />
    </nuxt-link>
    <div class="text-center p-3">
      <div class="h6 mb-1">
        <nuxt-link :to="`/videomore/${video._id}`">{{ video.title }}</nuxt-link>
      </div>
      <div class="small my-2">
        {{ video.subTitle }}
      </div>
      <div class="flex-between-center">
        <div class="flex-left-center">
          <Icon type="md-eye" class="mr-1" /> {{ video.watch }}
          <Icon type="md-happy" class="ml-2 mr-1" /> {{ video.nice }}
          <Icon type="md-heart" class="ml-2 mr-1" /> {{ video.love }}
        </div>
        <div class="">{{ video.uploadTime }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    video: Object,
  },
};
</script>

<style lang="less">
.video-card {
  overflow: hidden;
  &:hover .video-card-icon {
    transform: scale(1.05);
  }
  .video-card-icon {
    padding: 0.5rem 0 0 0;
    height: 10rem;
    width: 100%;
    object-fit: contain;
    transition: 0.4s all;
  }
}
</style>
