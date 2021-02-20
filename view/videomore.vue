<template>
  <div class="indexmore">
    <Card class="theme-card-background mb-3">
      <div class="text-center my-3">
        <div class="h5">{{ video.title }}</div>
        <div class="small my-2">
          {{ video.subTitle }}
        </div>
        <div class="flex-center">
          <Icon type="md-eye" class="mr-1" /> {{ video.watch }}
          <Icon type="md-happy" class="ml-2 mr-1" /> {{ video.nice }}
          <Icon type="md-heart" class="ml-2 mr-1" /> {{ video.love }}
        </div>
      </div>
      <VideoPlayer
        :danmu="danmu"
        :videosrc="video.videoMusicUrl"
        :logined="logined"
        :loginpath="'/logins'"
        :icon="video.icon"
        @uploaddanmu="uploadDanmu"
      />
      <div class="my-3">
        <Button :type="!niceFlag ? 'success' : 'error'" long @click="niceClick">
          <Icon type="md-heart" class="ml-2 mr-1" />{{ niceFlag ? "取消" : "赞" }}
        </Button>
      </div>
      <div class="mb-3">
        <p>标签(20):</p>
        <div class="mt-2">
          <Tag
            size="medium"
            type="border"
            color="success"
            v-for="(item, index) in video.tags"
            :key="index"
            >{{ item }}</Tag
          >
        </div>
      </div>
    </Card>
    <Card class="theme-card-background mb-3">
      <div class="mb-2">留言:</div>
      <TalkBox :articleId="$route.params.id" :kind="kind" @onchange="selectComments" />
    </Card>
    <Card class="theme-card-background mb-3">
      <div class="mb-2">评论(20):</div>
      <MessageBox :comments="contexts" />
    </Card>
    <div class="text-center">
      <Page
        :page-size="pageSteep"
        :total="contextSum"
        :current="page"
        @on-change="pageChange"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import articleEnum from "@/plugins/articleEnum.js";
export default {
  data() {
    return {
      // video: {},
      comments: [], // 弹幕

      contextSum: 0, // 总数
      contexts: [], // 记录
      pageSteep: 10, // 每页条数

      loading: true, // 加载中
      page: 1,

      danmu: [], // 弹幕
      kind: articleEnum.video,
    };
  },
  async asyncData({ route, $http, redirect }) {
    try {
      return {
        video: (await $http.videomusicfindbyid(route.params.id)).data[0],
      };
    } catch (error) {
      redirect("/Error404");
    }
  },
  mounted() {
    this.selectComments();
    this.selectDanmu();
  },
  computed: {
    ...mapState("user", ["inf", "logined"]),
    ...mapState("nice", ["nices"]),
    niceFlag() {
      return this.nices.includes(this.$route.params.id);
    },
  },
  methods: {
    ...mapMutations("nice", ["addNice"]),
    // 点赞
    niceClick() {
      this.$http
        .videoMusicNiceById(this.$route.params.id, this.niceFlag ? -1 : 1)
        .then((result) => {
          if (result.flag) {
            this.addNice(this.$route.params.id);
            this.$Message.success("操作成功!");
          } else {
            this.$Message.error(result.msg);
          }
        })
        .catch((err) => {});
    },
    uploadDanmu(inf, callback) {
      this.$http
        .danmuInsert(this.$route.params.id, inf.content, inf.start, inf.color)
        .then((result) => {
          callback(result.flag);
          if (result.flag) {
            this.$Message.success("发送成功!");
          } else {
            this.$Message.error(result.msg);
          }
        })
        .catch((err) => callback(false));
    },
    selectComments() {
      this.$http
        .commentFindByPage(
          this.page,
          this.pageSteep,
          this.$route.params.id,
          articleEnum.video
        )
        .then((result) => {
          if (result.flag) {
            this.contexts = result.data.comments;
            this.contextSum = result.data.commentSum;
          }
        })
        .catch((err) => {});
    },
    pageChange(num) {
      this.page = num;
      this.selectComments();
    },
    selectDanmu() {
      this.$http
        .danmuFindRByVId(this.$route.params.id)
        .then((result) => {
          if (result.flag) {
            this.danmu = result.data;
          }
        })
        .catch((err) => {});
    },
  },
};
</script>

<style></style>
