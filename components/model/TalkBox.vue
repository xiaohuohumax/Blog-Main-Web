<template>
  <div class="talkBox">
    <div v-if="logined">
      <div v-if="inf.allowTalk">
        <Input
          class="bg-0"
          :maxlength="100"
          :rows="3"
          :show-word-limit="true"
          type="textarea"
          v-model.trim="message"
          placeholder="说点啥吧..."
        />
        <div class="flex-between-center mt-2">
          <div>
            <Icon class="mr-2 d-none" type="md-happy" :size="20" />
            <Icon class="d-none" type="md-pricetags" :size="20" />
          </div>
          <div>
            <Icon class="mr-2" type="md-close" :size="20" @click="message = ''" />
            <Icon type="md-paper-plane" :size="20" @click="uploadComment" />
          </div>
        </div>
      </div>
      <div class="text-center p-4" v-else>你已被限制评论~</div>
    </div>
    <div v-else class="text-center p-4">
      <nuxt-link to="/logins">您还没有登录,去登陆吧~~</nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    articleId: String,
    kind: String,
  },
  data() {
    return {
      message: "",
    };
  },
  methods: {
    // 发布评论
    uploadComment() {
      if (this.message == "") {
        return this.$Message.error("评论不能为空呦~~");
      }
      this.$http
        .commentInsert(this.inf._id, this.articleId, this.kind, this.message)
        .then((res) => {
          if (res.flag) {
            this.$Message.success(res.msg);
            this.$emit("onchange"); // 提醒评论已经改变
          } else {
            this.$Message.error(res.smg);
          }
          this.message = "";
        })
        .catch((err) => console.log(err));
    },
  },
  computed: {
    ...mapState("user", ["key", "inf", "logined"]),
  },
};
</script>

<style lang="less">
.talkBox {
  textarea.ivu-input {
    border: none !important;
    color: inherit !important;
  }
}
</style>
