<template>
  <div class="indexmore">
    <Card class="theme-card-background mb-3">
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

      <iframe
        ref="homePageIframe"
        class="w-100 rounded bg-white"
        id="home-page-iframe"
        v-html="article.content"
        scrolling="no"
        frameborder="0"
      ></iframe>

      <div class="mb-3">
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
            v-for="(item, index) in article.tags"
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
      // article: {},
      comments: [], // 弹幕

      contextSum: 0, // 总数
      contexts: [], // 记录
      pageSteep: 10, // 每页条数

      loading: true, // 加载中
      page: 1,
      kind: articleEnum.article,

      iframeResize: null,
    };
  },
  async asyncData({ route, $http, redirect }) {
    try {
      let article = (await $http.articleFindById(route.params.id)).data[0];
      if (!article) throw new Error("");
      return {
        article,
      };
    } catch (error) {
      redirect("/Error404");
    }
  },
  mounted() {
    this.inframeInit();
    this.selectComments();
  },
  computed: {
    ...mapState("nice", ["nices"]),
    niceFlag() {
      return this.nices.includes(this.$route.params.id);
    },
  },
  beforeDestroy() {
    window.clearInterval(this.iframeResize);
  },
  methods: {
    ...mapMutations("nice", ["addNice"]),
    iframeResizeFunc() {
      var iframe = this.$refs.homePageIframe;
      try {
        var bHeight = iframe.contentWindow.document.body.offsetHeight;
        var dHeight = iframe.contentWindow.document.documentElement.offsetHeight;
        iframe.height = Math.max(bHeight, dHeight);
      } catch (ex) {}
    },
    inframeInit() {
      // 写入html
      this.writeIframe(this.article.content);

      // 添加监视
      window.clearInterval(this.iframeResize);
      this.iframeResize = window.setInterval(this.iframeResizeFunc, 200);
    },

    // 写入文章
    writeIframe(content) {
      var iframeElement = this.$refs.homePageIframe;
      var iframeDoc =
        iframeElement.contentDocument || iframeElement.contentWindow.document;
      iframeDoc.open();
      iframeDoc.write(`<!doctype html><html><head></head><body>${content}</body></html>`);
      iframeDoc.close();
    },

    // 点赞
    niceClick() {
      this.$http
        .articleNiceById(this.$route.params.id, this.niceFlag ? -1 : 1)
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
          articleEnum.article
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

<style>
#home-page-iframe {
  overflow: hidden;
}
</style>
