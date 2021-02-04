<template>
  <div
    class="login row justify-content-center align-items-center p-0 m-0"
    :style="backgroundStyle"
  >
    <div
      class="login-body row px-1 pt-2 pb-3 rounded position-relative col-22 col-sm-16 mx-2 mx-md-5"
    >
      <div class="login-left d-none d-lg-block col-18">
        <img src="~/assets/image/login/login.png" />
      </div>
      <div
        class="login-right d-flex flex-column align-items-center font-weight-bold col-24 col-lg-6"
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
          <LoginItem v-if="isLoginOrLogon" />
          <LogonItem v-else @logoned="logoned" />
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
export default {
  data() {
    return {
      isLoginOrLogon: true,
      backgroundIcon: require("@/assets/image/login/loginBG_night.png"),
    };
  },
  methods: {
    logoned() {
      this.isLoginOrLogon = true;
    },
  },
  computed: {
    backgroundStyle() {
      return `background: url('${this.backgroundIcon}') center / cover`;
    },
  },
};
</script>

<style lang="less">
.login {
  height: 100vh;
  color: teal;

  .login-body {
    max-width: 62rem;
    box-shadow: 10px 10px 7px 2px rgba(0, 0, 0, 0.7);
    background: rgba(80, 78, 78, 0.322);
    background: linear-gradient(90deg, #26282c83, rgba(168, 166, 166, 0.411));
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

  .login-left {
    z-index: 5;
    opacity: 0.7;
    pointer-events: none;
  }

  .login-left img {
    width: 110%;
  }

  .login-right {
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

    .login-cho {
      border-bottom: 1px solid teal;
    }
  }
}
</style>
