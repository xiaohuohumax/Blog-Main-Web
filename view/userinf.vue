<template>
  <div class="theme-card-background p-3 rounded bg-white">
    <div class="text-left" v-if="logined">
      <div class="font-weight-bold mb-4 h6">个人信息</div>
      <Form
        ref="formUser"
        :model="userInf"
        :rules="userRule"
        label-position="top"
        class="w-100"
      >
        <ChooseIcon
          class="mb-3"
          :icon="userInf.icon"
          :icons="webSet.userDefIcon"
          @choose="iconChoose"
        />

        <FormItem label="昵称" prop="name">
          <Input v-model="userInf.name"></Input>
        </FormItem>
        <FormItem label="密码" prop="pass">
          <Input v-model="userInf.pass" type="password"></Input>
        </FormItem>

        <FormItem label="性别" prop="genger">
          <RadioGroup v-model="userInf.genger">
            <Radio class="mb-0" label="男" border></Radio>
            <Radio class="mb-0" label="女" border></Radio>
            <Radio class="mb-0" label="其他" border></Radio>
          </RadioGroup>
        </FormItem>

        <FormItem label="签名" prop="signature">
          <Input v-model="userInf.signature"></Input>
        </FormItem>

        <FormItem>
          <Button type="success" @click="handleSubmit('formUser')">保存</Button>
        </FormItem>
      </Form>

      <div class="userinf-Item-head font-weight-bold mb-2 h6">基本信息</div>
      <div class="flex-between">
        <div class="flex-grow-1">
          <Row type="flex" class="small">
            <Col class="mb-2" :lg="{ span: 12 }" :xl="{ span: 6 }">
              <span class="text-success mr-2">用户等级:</span>lv{{ userInf.level }}
            </Col>
            <Col class="mb-2" :lg="{ span: 12 }" :xl="{ span: 6 }">
              <span class="text-success mr-2">登录时间:</span>
              {{ userInf.loginTime }}
            </Col>
            <Col class="mb-2" :lg="{ span: 12 }" :xl="{ span: 6 }">
              <span class="text-success mr-2">上次登录IP:</span>{{ userInf.loginIp }}
            </Col>
            <Col class="mb-2" :lg="{ span: 12 }" :xl="{ span: 6 }">
              <span class="text-success mr-2">注册日期:</span>
              {{ userInf.logonTime }}
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

      userInf: {
        logonTime: "",
        loginTime: "",
      }, // 用户信息
      userRule: {
        name: [
          {
            required: true,
            message: "昵称不能为空呦~",
            trigger: "blur",
          },
          {
            type: "string",
            min: 6,
            message: "昵称必须大于6位呦~",
            trigger: "blur",
          },
        ],
        pass: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            type: "string",
            min: 6,
            message: "密码必须大于6位呦~",
            trigger: "blur",
          },
        ],
        genger: [
          {
            required: true,
            message: "请选择性别",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState("user", ["inf", "logined"]),
    ...mapState("webSet", ["webSet"]),
  },

  mounted() {
    this.logined ? this.select() : "";
  },

  methods: {
    ...mapMutations("user", ["logouted", "putUser"]),
    iconChoose(item) {
      this.userInf.icon = item;
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.update();
        }
      });
    },
    select() {
      this.$http
        .webUserFindBySession()
        .then((result) => {
          if (result.flag) {
            this.userInf = result.data.inf;
          } else {
            this.logouted();
            this.$Message.error(result.msg);
          }
        })
        .catch((err) => {});
    },

    update() {
      this.$http
        .WebUserUpdateBySession(this.userInf)
        .then((result) => {
          if (result.flag) {
            this.$Message.success("更新成功!");
            this.putUser(result.data);
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
