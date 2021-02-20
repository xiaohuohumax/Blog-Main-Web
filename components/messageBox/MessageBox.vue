<template>
  <div>
    <div v-if="comments.length == 0" class="p-4 text-center">还没有评论~~~</div>
    <MessageItem v-for="(item, index) in comments" :key="index" :comment="item" />
  </div>
</template>

<script>
export default {
  props: {
    comments: Array,
  },
};
</script>
