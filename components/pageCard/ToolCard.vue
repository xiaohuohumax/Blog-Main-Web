<template>
  <div class="tool-card theme-card-background p-2 mb-3 rounded bg-white d-flex">
    <nuxt-link :to="`/toolmore/${tool._id}`">
      <img :src="tool.icon" class="tool-card-icon" />
    </nuxt-link>
    <div class="flex-grow-1 d-flex flex-column">
      <div class="tool-title h6 mb-0 flex-shrink-0 d-flex justify-content-between">
        <nuxt-link :to="`/toolmore/${tool._id}`">
          <span class="pt-1 font-weight-bold">[{{tool.kind}}]{{ tool.title }}</span>
        </nuxt-link>
        <Tag color="success">{{ tool.kind }}</Tag>
      </div>
      <div class="mb-1 flex-grow-1">{{ tool.subTitle }}</div>
      <div class="flex-left-center flex-shrink-0">
        <Icon type="md-eye" class="mr-1" /> {{ tool.watch }}
        <Icon type="md-happy" class="ml-2 mr-1" /> {{ tool.nice }}
        <Icon type="md-heart" class="ml-2 mr-1" /> {{ tool.love }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tool: Object,
  },
};
</script>

<style lang="less">
.tool-card {
  overflow: hidden;
  &:hover .tool-card-icon {
    transform: scale(1.05);
  }
  .tool-card-icon {
    width: 5rem;
    height: 5rem;
    padding: 0.5rem 0 0 0;
    object-fit: contain;
    transition: 0.4s all;
  }
}
</style>
