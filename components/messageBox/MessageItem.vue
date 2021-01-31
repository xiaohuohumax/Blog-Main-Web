<template>
<Card class="theme-card-background messageItem mb-3">
  <div class=" d-flex">
    <div class="flex-shrink-0 pr-2">
      <div class="message-item-icon rounded" :style="iconStyle"></div>
    </div>
    <div class="flex-grow-1">
      <p class="font-weight-bold">
        <nuxt-link :to="`/otherinf/${comment.user._id}`">{{
          comment.user.name
        }}</nuxt-link>
      </p>
      <p class="my-2 font-weight-bold rounded">{{ comment.message }}</p>

      <div class="my-2">
        <span
          :class="!isNiceClick ? '': 'text-danger'"
          class="mr-2"
          @click="niceClick"
        >
          <Icon type="md-thumbs-up" /> {{ comment.nice }}</span
        >
        <span class="small"><Time :time="comment.uploadTime" /></span>
      </div>
    </div>
  </div>
</Card>

</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  props: {
    comment: Object,
  },
  computed: {
    ...mapState("nice", ["nices"]),
    isNiceClick() {
      return this.nices.includes(this.comment._id);
    },
    iconStyle() {
      return {
        background: `url('${this.comment.user.icon}') center / cover`,
      };
    },
  },

  methods: {
    ...mapMutations("nice", ["addNice"]),
    // 点赞
    niceClick() {
      let inc = !this.isNiceClick ? 1 : -1;
      this.$http
        .commentNiceById(this.comment._id, inc)
        .then((res) => {
          this.addNice(this.comment._id);
          this.comment.nice += inc;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="less">
.message-item-icon {
  width: 3rem;
  height: 3rem;
}
</style>
