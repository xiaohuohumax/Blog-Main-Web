<template>
  <div class="">
    <SelectLoadingOrFail :kind="loadingKind" />
    <div v-if="loadingKind == 1">
      <Null v-if="contexts.length == 0" />
      <Card class="mb-3 theme-card-background">
        <div class="d-flex">
          <div
            class="card-icon rounded-circle mr-2 shadow-sm flex-shrink-0"
            :style="cardIconStyle"
          ></div>
          <div class="flex-grow-1 ml-2">
            <div>
              <router-link to="/AdminUserMore" class="h6 font-weight-bold">
                {{ contexts.name }}
              </router-link>
              <span class="ml-2 small font-weight-bold">
                lv{{ contexts.level }} {{ contexts.genger }}
              </span>
            </div>
            <div class="small my-1">{{ contexts.signature }}</div>
          </div>
        </div>
        <div class="small mt-3">
          <div class="border-bottom mb-2 pb-2">其他信息:</div>
          <Row>
            <Col class="mb-1" :xs="{ span: 12 }" :lg="{ span: 6 }">
              登录时间:<Time :time="contexts.loginTime" type="datetime" />
            </Col>
            <!-- <Col class="mb-1" :xs="{ span: 12 }" :lg="{ span: 6 }">
              允许评论: <i-switch :value="contexts.allowTalk" disabled size="small" />
            </Col> -->
          </Row>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contextSum: 0, // 总数
      contexts: {}, // 记录
      pageSteep: 10, // 每页条数

      loading: true, // 加载中
      page: 1,

      loadingKind: 0, // 0 加载中 1 加载成功 2 加载失败
    };
  },
  watch: {
    "$route.params.id": "select",
  },
  mounted() {
    this.select();
  },
  methods: {
    select() {
      this.loadingKind = 0;
      this.$http
        .webUserFindbyid(this.$route.params.id)
        .then((result) => {
          this.contexts = result[0];
          this.loadingKind = 1;
        })
        .catch((err) => (this.loadingKind = 2));
    },
  },
  computed: {
    cardIconStyle() {
      return `background:url("${this.contexts.icon}") center / cover;`;
    },
  },
};
</script>

<style>
.card-icon {
  width: 4.5rem;
  height: 4.5rem;
}
</style>
