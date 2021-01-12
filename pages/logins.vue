<template>
  <div
    class="login row justify-content-center align-items-center p-0 m-0"
    :style="{
      background: `url('${require('@/assets/image/login/loginBG_night.png')}') center / cover`,
    }"
  >
    <div class="login-body d-flex px-1 pt-2 pb-3 rounded position-relative">
      <div class="login-left d-none d-lg-block">
        <img src="~/assets/image/login/login.png" />
      </div>
      <div
        class="login-right d-flex flex-column align-items-center font-weight-bold px-2 px-md-4"
      >
        <h2 class="mb-2 mt-2">Welcome</h2>
        <div class="d-block d-md-none">
          <span @click="linkTo('/')">xiaohuohu</span>
        </div>
        <div class="text-center mb-4 small">
          <span
            class="mx-2 px-3 py-1 btn btn-sm"
            :class="{ 'login-cho': isLoginOrLogon }"
            @click="isLoginOrLogon = true"
            >登录</span
          >
          <span
            class="mx-2 px-3 py-1 btn btn-sm"
            :class="{ 'login-cho': !isLoginOrLogon }"
            @click="isLoginOrLogon = false"
            >注册</span
          >
        </div>
        <!-- 登录 -->
        <div class="w-100">
          <Form
            ref="formlogin"
            label-position="top"
            key="formlogin"
            class="w-100"
            v-if="isLoginOrLogon"
            :model="loginValDate"
            :rules="loginRuleValidate"
          >
            <FormItem label="你的昵称" prop="name">
              <Input placeholder="your name" v-model="loginValDate.name"></Input>
            </FormItem>
            <FormItem label="你的密码" prop="password">
              <Input placeholder="your password" v-model="loginValDate.password"></Input>
            </FormItem>
            <FormItem class="text-center">
              <Button type="success" long class="mb-3" @click="handleSubmit('formlogin')"
                >登录</Button
              >
              <Button type="error" long ghost @click="handleReset('formlogin')"
                >清空</Button
              >
            </FormItem>
          </Form>
          <Form
            ref="formlogon"
            label-position="top"
            key="formlogon"
            class="w-100"
            v-if="!isLoginOrLogon"
            :model="logonValDate"
            :rules="logonRuleValidate"
          >
            <FormItem label="注册昵称" prop="name">
              <Input placeholder="your name" v-model="logonValDate.name"></Input>
            </FormItem>
            <FormItem label="注册密码" prop="password">
              <Input placeholder="your password" v-model="logonValDate.password"></Input>
            </FormItem>
            <FormItem label="重复密码" prop="passagain">
              <Input
                placeholder="password again"
                v-model="logonValDate.passagain"
              ></Input>
            </FormItem>
            <FormItem class="text-center">
              <Button
                type="success"
                long
                class="mb-3"
                @click="handleLogonSubmit('formlogon')"
                >登录</Button
              >
              <Button type="error" long ghost @click="handleReset('formlogon')"
                >清空</Button
              >
            </FormItem>
          </Form>
        </div>
      </div>
      <div class="login-title position-absolute font-weight-bold d-none d-lg-block">
        <nuxt-link to="/">
          <span>xiaohuohu</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      isLoginOrLogon: true,

      loginValDate: {
        name: "",
        password: "",
      },
      loginRuleValidate: {
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
      logonValDate: {
        name: "",
        password: "",
        passagain: "",
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
      },
    };
  },
  methods: {
    ...mapMutations("user", ["putUser"]),
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$http
            .webUserLogin(this.loginValDate.name, this.loginValDate.password)
            .then((result) => {
              if (result.flag) {
                // 登录成功
                this.putUser(result); // 保存信息到仓库
                this.$router.go(-1);
              } else {
                this.$Message.error(result.inf);
                this.loginValDate.password = "";
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
    handleLogonSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$http
            .webUserAdd(this.logonValDate.name, this.logonValDate.password)
            .then((result) => {
              this.$Message[result.flag ? "success" : "error"](result.message);
              if (result.flag) {
                // 注册成功
                this.isLoginOrLogon = true;
                this.logonValDate.name = "";
              }
              this.logonValDate.password = "";
              this.logonValDate.passagain = "";
            })
            .catch((err) => {});
        } else {
          this.$Message.error("信息不符合要求呦!");
        }
      });
    },
  },
};
</script>

<style lang="less">
.login {
  height: 100vh;
  color: teal;

  .login-body {
    height: 30rem;
  }

  .login-title {
    left: 2rem;
    bottom: 1rem;

    span {
      color: tomato;
      cursor: pointer;
      text-transform: uppercase;

      &:hover {
        color: teal;
      }
    }
  }

  .login-body {
    box-shadow: 10px 10px 7px 2px rgba(0, 0, 0, 0.7);
    background: rgba(80, 78, 78, 0.322);
    background: linear-gradient(90deg, #26282c83, rgba(168, 166, 166, 0.411));
  }

  .login-left {
    width: 40rem;
    min-width: 40rem;
    z-index: 5;
    opacity: 0.7;
    pointer-events: none;
  }

  .login-left img {
    width: 110%;
  }

  .login-right {
    width: 16rem;
    min-width: 16rem;
    z-index: 1;

    .ivu-form-item-label {
      color: tomato !important;
      margin: 0 !important;
    }

    .ivu-input {
      background: none !important;
      color: tomato !important;
      border: 1px solid teal !important;
    }

    // .ivu-form-item {
    //     // margin-bottom: 1rem !important;
    // }

    .login-cho {
      border-bottom: 1px solid teal;
    }
  }
}
</style>
