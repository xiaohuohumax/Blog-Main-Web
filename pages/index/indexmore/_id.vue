<template>
  <div class="indexmore p-3 bg-white rounded">
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
      <Button type="success" long> <Icon type="md-heart" class="ml-2 mr-1" />赞 </Button>
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
    <div>
      <p>评论(20):</p>
      <div class="mt-2">
        <TalkBox />
      </div>
      <MessageBox />
    </div>
  </div>
</template>

<script>
export default {
  meta: {
    title: "文章详细",
  },
  data() {
    return {
      article: {},
    };
  },
  mounted() {
    this.select();
  },
  methods: {
    select() {
      this.$http
        .articleFindById(this.$route.params.id)
        .then((result) => {
          this.article = result[0];
        })
        .catch((err) => {});
    },
  },
};
</script>

<style></style>
