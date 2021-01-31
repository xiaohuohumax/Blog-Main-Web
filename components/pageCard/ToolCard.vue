<template>
  <div class="theme-card-background  p-2 mb-3 rounded bg-white d-flex">
    <nuxt-link :to="`/toolmore/${tool._id}`">
      <div class="game-card-icon rounded mr-2 flex-shrink-0" :style="iconStyle"></div>
    </nuxt-link>
    <div class="flex-grow-1 d-flex flex-column">
      <div class="tool-title h6 mb-0 flex-shrink-0 d-flex justify-content-between">
        <nuxt-link :to="`/toolmore/${tool._id}`">
          <span class="pt-1 font-weight-bold">{{ tool.title }}</span>
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
  computed: {
    iconStyle() {
      return {
        background: `url('${this.tool.icon}') center / cover`,
      };
    },
  },
};
</script>

<style lang="less">
.game-card-icon {
  width: 5rem;
  height: 5rem;
}
</style>
