<template>
  <InfoCardSolt>
    评论
    <p slot="content">
      <InfoTalkItem v-for="(item, index) in comments" :key="index" :comment="item" />
      <Null v-if="comments.length == 0" />
    </p>
  </InfoCardSolt>
</template>

<script>
export default {
  data() {
    return {
      comments: [],
      setTime: null,
    };
  },
  mounted() {
    this.selectComments();
    this.setTime = window.setInterval(this.selectComments, 60000);
  },
  beforeDestroy() {
    clearInterval(this.setTime);
  },
  methods: {
    selectComments() {
      this.$http
        .commentRandom(6)
        .then((result) => {
          if (result.flag) {
            this.comments = result.data;
          }
        })
        .catch(() => {});
    },
  },
};
</script>
