<template>
  <div class="theme-card-background image-card rounded bg-white mb-3">
    <nuxt-link :to="`/imagemore/${image._id}`">
      <img :src="image.icon" class="image-card-icon" />
    </nuxt-link>
    <div class="text-center p-3">
      <div class="h6 mb-1">
        <nuxt-link :to="`/imagemore/${image._id}`">{{ image.title }}</nuxt-link>
      </div>
      <div class="small my-2">
        {{ image.subTitle }}
      </div>
      <div class="flex-between-center">
        <div class="flex-left-center">
          <Icon type="md-eye" class="mr-1" /> {{ image.watch }}
          <Icon type="md-happy" class="ml-2 mr-1" /> {{ image.nice }}
          <Icon type="md-heart" class="ml-2 mr-1" /> {{ image.love }}
        </div>
        <div class="">{{ image.uploadTime }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: Object,
  },
};
</script>

<style lang="less">
.image-card {
  overflow: hidden;
  &:hover .image-card-icon {
    transform: scale(1.05);
  }
  .image-card-icon {
    padding: 0.5rem 0 0 0;
    height: 10rem;
    width: 100%;
    object-fit: contain;
    transition: 0.4s all;
  }
}
</style>
