<template>
  <div
    class="header theme-card-background bg-white px-2 px-md-5 py-2 shadow flex-between-center sticky-top"
  >
    <div class="flex-center">
      <div class="font-weight-bold theme-header-icon" style="font-size: 1.5rem">
        <!-- {{ set.webName }} -->
      </div>
      <ul class="nav">
        <li class="nav-item px-2" v-for="(item, index) in navArray" :key="index">
          <nuxt-link :to="item.path">
            <Icon :type="item.icon" />
            <span class="d-none d-md-inline">
              {{ item.name }}
            </span>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div v-if="logined" class="flex-center">
      <nuxt-link to="/userinf">
        <div
          class="rounded-circle p-3"
          :style="{
            background: `url('${inf.icon}') center / cover`,
          }"
        ></div>
      </nuxt-link>
      <a class="ml-2" @click="logoutedNow">注销</a>
    </div>
    <div v-else class="flex-center">
      <div class="rounded-circle p-3"></div>
      <nuxt-link to="/logins">注册登录</nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "",
  data() {
    return {
      navArray: [
        {
          name: "首页",
          icon: "ios-planet",
          path: "/",
        },
        {
          name: "音乐视频",
          icon: "ios-videocam",
          path: "/video",
        },
        {
          name: "图包分享",
          icon: "md-images",
          path: "/image",
        },
        {
          name: "在线工具",
          icon: "md-hammer",
          path: "/tool",
        },
        {
          name: "时间轴",
          icon: "md-alarm",
          path: "/time",
        },
      ],
    };
  },
  computed: {
    ...mapState("user", ["key", "inf", "logined"]),
    ...mapState("webSet", ["set"]),
  },
  methods: {
    ...mapMutations("user", ["logouted"]),
    logoutedNow() {
      this.logouted();
     
    },
  },
};
</script>

<style lang="less">
.header {
  z-index: 30;
}
</style>
