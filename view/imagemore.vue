<template>
  <div class="indexmore">
    <Card class="theme-card-background mb-3">
      <div class="text-center my-3">
        <div class="h5">{{ image.title }}</div>
        <div class="small my-2">
          {{ image.subTitle }}
        </div>
        <div class="flex-center">
          <Icon type="md-eye" class="mr-1" /> {{ image.watch }}
          <Icon type="md-happy" class="ml-2 mr-1" /> {{ image.nice }}
          <Icon type="md-heart" class="ml-2 mr-1" /> {{ image.love }}
        </div>
      </div>
      <div class="">
        <img
          :src="item"
          class="mx-auto d-block rounded my-2 shadow-sm"
          style="max-height: 20rem; max-width: 100%"
          v-for="(item, index) in image.icons"
          :key="index"
        />
      </div>
      <div class="my-3">
        <Button :type="!niceFlag ? 'success' : 'error'" long @click="niceClick">
          <Icon type="md-heart" class="ml-2 mr-1" />{{ niceFlag ? "取消" : "赞" }}
        </Button>
      </div>
      <div class="mb-3">
        <p>标签:</p>
        <div class="mt-2">
          <Tag
            size="medium"
            type="border"
            color="success"
            v-for="(item, index) in image.tags"
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
      <div class="mb-2">评论:</div>
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
      // image: {},
      comments: [], // 弹幕

      contextSum: 0, // 总数
      contexts: [], // 记录
      pageSteep: 10, // 每页条数

      loading: true, // 加载中
      page: 1,
      kind: articleEnum.image,
    };
  },
  async asyncData({ route, $http, redirect }) {
    try {
      let image = (await $http.imageFindbyid(route.params.id)).data[0];
      if (!image) throw new Error("");
      return {
        image,
      };
    } catch (error) {
      redirect("/Error404");
    }
  },
  mounted() {
    this.selectComments();
  },
  computed: {
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
        .imageNiceById(this.$route.params.id, this.niceFlag ? -1 : 1)
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
    selectComments() {
      this.$http
        .commentFindByPage(
          this.page,
          this.pageSteep,
          this.$route.params.id,
          articleEnum.image
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
  },
};
</script>

<style></style>
