<template>
  <div class="home">
    <SelectLoadingOrFail :kind="loadingKind" />
    <Card v-if="loadingKind == 1" class="theme-card-background mb-3">
      <Timeline>
        <TimeCard v-for="(item, index) in contexts" :key="index" :time="item" />
      </Timeline>
      <Null v-if="contexts.length == 0" />
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
export default {
  data() {
    return {
      contextSum: 0, // 总数
      contexts: [], // 记录
      pageSteep: 10, // 每页条数

      loading: true, // 加载中
      page: 1,

      loadingKind: 0, // 0 加载中 1 加载成功 2 加载失败
    };
  },
  mounted() {
    this.select();
  },
  methods: {
    select() {
      this.loadingKind = 0;
      this.$http
        .noticeFindByPage(this.page, this.pageSteep)
        .then((result) => {
          this.contexts = result.notices;
          this.contextSum = result.noticeSum;
          this.loadingKind = 1;
        })
        .catch((err) => (this.loadingKind = 2));
    },
    pageChange(num) {
      this.page = num;
      this.select();
    },
  },
};
</script>

<style></style>
