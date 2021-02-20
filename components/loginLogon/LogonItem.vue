<template>
  <Form
    ref="formlogon"
    label-position="top"
    key="formlogon"
    class="w-100"
    :model="logonValDate"
    :rules="logonRuleValidate"
  >
    <FormItem label="注册昵称" prop="name">
      <Input v-model="logonValDate.name"></Input>
    </FormItem>
    <FormItem label="注册密码" prop="password">
      <Input v-model="logonValDate.password"></Input>
    </FormItem>
    <FormItem label="重复密码" prop="passagain">
      <Input v-model="logonValDate.passagain"></Input>
    </FormItem>
    <FormItem label="验证码" prop="code">
      <div class="d-flex">
        <Input class="mr-2" v-model="logonValDate.code"></Input>

        <img
          key="logonCode"
          :src="codeUrl"
          class="log-code rounded cursor-pointer"
          @click="changeCode"
        />
      </div>
    </FormItem>
    <FormItem class="text-center">
      <div class="d-flex">
        <Button type="success" class="mr-2" long @click="handleLogonSubmit('formlogon')">
          注册
        </Button>
        <Button type="error" long ghost @click="handleReset('formlogon')">清空</Button>
      </div>
    </FormItem>
  </Form>
</template>

<script>
import { mapMutations } from "vuex";
import config from "@/config";
export default {
  data() {
    return {
      codeFlag: Date.now(),

      logonValDate: {
        name: "",
        password: "",
        passagain: "",
        code: "",
      },
      logonRuleValidate: {
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
        passagain: [
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
        code: [
          {
            required: true,
            message: "验证码不能为空~",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.changeCode();
  },
  methods: {
    ...mapMutations("user", ["putUser"]),

    changeCode() {
      this.codeFlag = Date.now();
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    handleLogonSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$http
            .webUserAdd(
              this.logonValDate.name,
              this.logonValDate.password,
              this.logonValDate.code
            )
            .then((result) => {
              this.$Message[result.flag ? "success" : "error"](result.msg);
              if (result.flag) {
                // 注册成功
                this.logonValDate.name = "";
                this.$emit("logoned");
              }
              this.logonValDate.password = "";
              this.logonValDate.passagain = "";
              this.logonValDate.code = "";
              this.changeCode();
            })
            .catch((err) => {});
        } else {
          this.$Message.error("信息不符合要求呦!");
        }
      });
    },
  },
  computed: {
    codeUrl() {
      return `${config.proxyPrefix}/user/checkCode?i=${this.codeFlag}`;
    },
  },
};
</script>

<style lang="less">
.log-code {
  min-width: 3rem;
  background: #5a5c60;
}
</style>
