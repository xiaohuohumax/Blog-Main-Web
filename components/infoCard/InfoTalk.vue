<template>
  <div class="talkCard">
    <InfoCardSolt>
      评论
      <p slot="content">
        <InfoTalkItem v-for="(item, index) in comments" :key="index" :comment="item" />
        <Null v-if="comments.length == 0" />
      </p>
    </InfoCardSolt>
  </div>
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
    // this.setTime = setInterval(() => {
    //   this.selectComments();
    // }, 10000);
  },
  destroyed() {
    clearInterval(this.setTime);
  },
  methods: {
    selectComments() {
      this.$http
        .commentRandom(6)
        .then((result) => {
          if (result.flag) {
            this.comments = result.data.comments;
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style></style>
