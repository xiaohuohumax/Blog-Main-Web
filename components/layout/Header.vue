<template>
  <div
    class="theme-card-background theme-header-color bg-white header px-2 px-md-5 py-2 shadow flex-between-center sticky-top"
  >
    <div class="flex-center">
      <div
        class="font-weight-bold"
        style="font-size: 1.2rem"
        :title="webSet.webDescription"
      >
        {{ webSet.webName }}
      </div>
      <ul class="nav">
        <li class="nav-item px-2" v-for="(item, index) in menu" :key="index">
          <nuxt-link :to="item.path" class="theme-header-color">
            <Icon :type="item.icon" />
            <span class="d-none d-md-inline">
              {{ item.name }}
            </span>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div v-if="$authres(['view_top_loginlogon_button'])">
      <div v-if="logined" class="flex-center">
        <nuxt-link to="/userinf" class="theme-header-color">
          <img :src="inf.icon" class="header-user-icon icon-card rounded-circle" />
        </nuxt-link>
        <a class="ml-2" @click="logouted">注销</a>
      </div>
      <div v-else class="flex-center">
        <div class="rounded-circle p-3"></div>
        <nuxt-link to="/logins" class="theme-header-color">注册登录</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState("user", ["key", "inf", "logined"]),
    ...mapState("webSet", ["webSet"]),
    ...mapState("auth", ["menu"]),
  },
  methods: {
    ...mapMutations("user", ["logouted"]),
  },
};
</script>

<style lang="less">
.header {
  z-index: 30;
  .header-user-icon {
    width: 2rem;
    height: 2rem;
  }
}
</style>
