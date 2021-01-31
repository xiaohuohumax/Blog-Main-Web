<template>
  <div class="home">
    <div class="theme-card-background  mb-3 rounded bg-white">
      <Input
        suffix="ios-search"
        placeholder="搜索"
        style="width: auto"
        v-model="selectWorld"
        @keydown.enter.native="selectInput"
      />
    </div>

    <SelectLoadingOrFail :kind="loadingKind" />
    <div v-if="loadingKind == 1">
      <Null v-if="contexts.length == 0" />
      <Row :gutter="16" type="flex">
        <Col
          span="8"
          :xs="{ span: 24 }"
          :md="{ span: 12 }"
          :xl="{ span: 8 }"
          v-for="(item, index) in contexts"
          :key="index"
        >
          <ToolCard :tool="item" />
        </Col>
      </Row>
    </div>
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
export default {
  meta: {
    title: "在线系列",
  },
  data() {
    return {
      contextSum: 0, // 总数
      contexts: [], // 记录
      pageSteep: 10, // 每页条数

      loading: true, // 加载中
      page: 1,

      loadingKind: 0, // 0 加载中 1 加载成功 2 加载失败
      selectWorld: "", // 搜索关键词
    };
  },
  mounted() {
    this.select();
  },
  methods: {
    select() {
      this.loadingKind = 0;
      this.$http
        .toolFindByPage(this.page, this.pageSteep, this.selectWorld)
        .then((result) => {
          this.contexts = result.tools;
          this.contextSum = result.toolSum;
          this.loadingKind = 1;
        })
        .catch((err) => (this.loadingKind = 2));
    },
    pageChange(num) {
      this.page = num;
      this.select();
    },
    selectInput() {
      this.pageChange(1);
    },
  },
};
</script>

<style></style>
