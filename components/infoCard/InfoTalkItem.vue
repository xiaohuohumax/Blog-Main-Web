<template>
  <div class="d-flex mb-3">
    <div class="flex-shrink-0 mr-2 text-center">
      <img :src="comment.user.icon" class="info-talk-item icon-card rounded-circle" />
    </div>
    <div class="flex-grow-1">
      <div class="small">
        <div class="font-weight-bold">
          <nuxt-link :to="`/otherinf/${comment.user._id}`">
            {{ comment.user.name }}
          </nuxt-link>
        </div>
        <div class="my-1">
          <nuxt-link :to="getUrl">{{ comment.message }}</nuxt-link>
        </div>
        <span><Icon type="md-thumbs-up" /> {{ comment.nice }}</span>
        <Time :time="comment.uploadTime" />
      </div>
    </div>
  </div>
</template>

<script>
import articleEnum from "@/plugins/articleEnum.js";
export default {
  props: {
    comment: Object,
  },
  computed: {
    getUrl() {
      let kind = this.comment.kind;
      if (kind == articleEnum.article) {
        return `/indexmore/${this.comment.articleId}`;
      } else if (kind == articleEnum.image) {
        return `/imagemore/${this.comment.articleId}`;
      } else if (kind == articleEnum.video) {
        return `/videomore/${this.comment.articleId}`;
      }
      return "";
    },
  },
};
</script>

<style>
.info-talk-item {
  width: 4rem;
  height: 4rem;
}
</style>
