<template>
  <div class="indexmore">
    <Card class="mb-3">
      <div class="text-center my-3">
        <div class="h5">{{ article.title }}</div>
        <div class="small my-2">
          {{ article.subTitle }}
        </div>
        <div class="flex-center">
          <Icon type="md-eye" class="mr-1" /> {{ article.watch }}
          <Icon type="md-happy" class="ml-2 mr-1" /> {{ article.nice }}
          <Icon type="md-heart" class="ml-2 mr-1" /> {{ article.love }}
        </div>
      </div>

      <div class="mb-3" v-html="article.content"></div>
      <div class="mb-3">
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
            v-for="(item, index) in article.tags"
            :key="index"
            >{{ item }}</Tag
          >
        </div>
      </div>
    </Card>

    <Card class="mb-3">
      <div class="mb-2">留言:</div>
      <TalkBox :articleId="$route.params.id" :kind="kind" @onchange="selectComments" />
    </Card>
    <Card class="mb-3">
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
  meta: {
    title: "文章详细",
  },
  data() {
    return {
      article: {},
      comments: [], // 弹幕

      contextSum: 0, // 总数
      contexts: [], // 记录
      pageSteep: 10, // 每页条数

      loading: true, // 加载中
      page: 1,
      kind: articleEnum.article,
    };
  },
  mounted() {
    this.select();
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
        .articleNiceById(this.$route.params.id, this.niceFlag ? -1 : 1)
        .then((result) => {
          this.addNice(this.$route.params.id);
          this.$Message.success("操作成功!");
        })
        .catch((err) => {});
    },
    select() {
      this.$http
        .articleFindById(this.$route.params.id)
        .then((result) => {
          this.article = result[0];
        })
        .catch((err) => {});
    },
    selectComments() {
      this.$http
        .commentFindByPage(
          this.page,
          this.pageSteep,
          this.$route.params.id,
          articleEnum.article
        )
        .then((result) => {
          this.contexts = result.comments;
          this.contextSum = result.commentSum;
          console.log(result);
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
