<template>
  <div class="p-3 rounded bg-white">
    <div class="text-left" v-if="logined">
      <div class="font-weight-bold mb-4 h6">个人信息</div>
      <div
        class="user-icon shadow-sm rounded-circle d-inline-block"
        :style="{ background: `url('${inf.icon}') center / cover` }"
      ></div>

      <div class="my-2">昵称</div>
      <Input v-model.trim="inf.name" placeholder="昵称" />
      <div class="my-2">昵称</div>
      <Input v-model.trim="inf.pass" type="password" placeholder="密码" />

      <div class="my-2">性别</div>
      <RadioGroup class="my-1" v-model="inf.genger">
        <Radio label="男" border></Radio>
        <Radio label="女" border></Radio>
        <Radio label="未知" border></Radio>
      </RadioGroup>

      <div class="my-2">签名</div>
      <Input v-model.trim="inf.signature" placeholder="签名" />

      <div class="text-right mt-2">
        <Button type="success" @click="update">保存</Button>
      </div>
      <div class="userinf-Item-head font-weight-bold mb-2 h6">基本信息</div>
      <div class="flex-between">
        <div class="flex-grow-1">
          <Row type="flex" class="small">
            <Col class="mb-2" :lg="{ span: 12 }" :xl="{ span: 6 }">
              <span class="text-success mr-2">用户等级:</span>lv{{ inf.level }}
            </Col>
            <Col class="mb-2" :lg="{ span: 12 }" :xl="{ span: 6 }">
              <span class="text-success mr-2">登录时间:</span>
              <Time :time="inf.loginTime" type="datetime" />
            </Col>
            <Col class="mb-2" :lg="{ span: 12 }" :xl="{ span: 6 }">
              <span class="text-success mr-2">上次登录IP:</span>{{ inf.loginIp }}
            </Col>
            <Col class="mb-2" :lg="{ span: 12 }" :xl="{ span: 6 }">
              <span class="text-success mr-2">注册日期:</span>
              <Time :time="inf.logonTime" type="datetime" />
            </Col>
          </Row>
        </div>
        <div class="userinf-right flex-shrink-0 text-center"></div>
      </div>
    </div>
    <div class="p-4 text-center" v-else>你还没有登录~~~</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
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
  computed: {
    ...mapState("user", ["inf", "logined"]),
    isRight() {
      return this.inf.name == "" || this.inf.signature == "";
    },
  },

  methods: {
    ...mapMutations("user", ["logouted"]),

    update() {
      if (this.isRight) {
        return this.$Message.error("信息不完整!");
      }
      this.$http
        .WebUserUpdateById(this.inf._id, this.inf)
        .then((result) => {
          if (result.flag) {
            this.$Message.success("更新成功!");
            this.logouted();
          } else {
            this.$Message.error(result.msg);
          }
        })
        .catch((err) => {});
    },
  },
};
</script>

<style>
.user-icon {
  width: 4rem;
  height: 4rem;
}
</style>
