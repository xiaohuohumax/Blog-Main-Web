<template>
  <Form
    ref="formlogin"
    label-position="top"
    key="formlogin"
    class="w-100"
    :model="loginValDate"
    :rules="loginRuleValidate"
  >
    <FormItem label="你的昵称" prop="name">
      <Input v-model="loginValDate.name"></Input>
    </FormItem>
    <FormItem label="你的密码" prop="password">
      <Input v-model="loginValDate.password"></Input>
    </FormItem>
    <FormItem label="验证码" prop="code">
      <div class="d-flex">
        <Input class="mr-2" v-model="loginValDate.code"></Input>
        <img :src="codeUrl" class="bg-white rounded cursor-pointer" @click="changeCode" />
      </div>
    </FormItem>
    <FormItem class="text-center">
      <Button type="success" long class="mb-3" @click="handleSubmit('formlogin')">
        登录
      </Button>
      <Button type="error" long ghost @click="handleReset('formlogin')">清空</Button>
    </FormItem>
  </Form>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import config from "@/config";
export default {
  props: {
    ref: Boolean,
  },
  watch: {
    ref: "changeCode",
  },
  data() {
    return {
      codeFlag: 0,

      loginValDate: {
        name: "",
        password: "",
        code: "",
      },
      loginRuleValidate: {
        code: [
          {
            required: true,
            message: "验证码不能为空~",
            trigger: "blur",
          },
        ],
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
        password: [
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
      },
    };
  },
  methods: {
    ...mapMutations("user", ["putUser"]),

    changeCode() {
      this.codeFlag += 1;
    },

    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$http
            .webUserLogin(
              this.loginValDate.name,
              this.loginValDate.password,
              this.loginValDate.code
            )
            .then((result) => {
              if (result.flag) {
                // 登录成功
                this.putUser(result); // 保存信息到仓库
                this.$router.go(-1);
              } else {
                this.$Message.error(result.inf);
                this.loginValDate.password = "";
                this.loginValDate.code = "";
                this.changeCode();
              }
            })
            .catch((err) => {});
        } else {
          this.$Message.error("信息不符合要求呦!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
  },
  computed: {
    codeUrl() {
      return `${config.proxyPrefix}/user/checkCode?i=${this.codeFlag}`;
    },
  },
};
</script>

<style lang="less"></style>
