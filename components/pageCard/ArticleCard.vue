<template>
  <div class="theme-card-background article-card rounded bg-white mb-3">
    <nuxt-link :to="`/indexmore/${article._id}`">
      <img :src="article.icon" class="article-card-icon" />
    </nuxt-link>
    <div class="text-center p-3">
      <div class="h6 mb-1">
        <nuxt-link :to="`/indexmore/${article._id}`">{{ article.title }}</nuxt-link>
      </div>
      <div class="small my-2">
        {{ article.subTitle }}
      </div>
      <div class="flex-between-center">
        <div class="flex-left-center">
          <Icon type="md-eye" class="mr-1" /> {{ article.watch }}
          <Icon type="md-happy" class="ml-2 mr-1" /> {{ article.nice }}
          <Icon type="md-heart" class="ml-2 mr-1" /> {{ article.love }}
        </div>
        <div class="">{{ article.uploadTime }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    article: Object,
  },
};
</script>

<style lang="less">
.article-card {
  overflow: hidden;
  &:hover .article-card-icon {
    transform: scale(1.05);
  }
  .article-card-icon {
    padding: 0.5rem 0 0 0;
    height: 10rem;
    width: 100%;
    object-fit: contain;
    transition: 0.4s all;
  }
}
</style>
