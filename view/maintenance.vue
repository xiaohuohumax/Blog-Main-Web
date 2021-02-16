<template>
  <div class="maintenance d-flex justify-content-center align-items-center">
    <div class="text-center font-weight-bold w-100">
      <Icon type="ios-construct-outline" size="60" class="font-weight-bold" />
      <div class="h5 font-weight-bold">网站维护中</div>
      <BackTime :time="webSet.opentime" />
    </div>
    <div class="maintenance-refsh">
      <Button type="error" ghost @click="selectSebSet">刷新</Button>
    </div>
    <div class="maintenance-copy-right w-100 text-center">
      {{ webSet.copyRight }}
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  mounted() {
    if (this.webSet.webState) {
      this.$router.push("/");
    }
  },
  methods: {
    ...mapMutations("webSet", ["addWebSet"]),
    ...mapMutations("user", ["putUser"]),
    selectSebSet() {
      this.$http
        .webSetFindOnly()
        .then((result) => {
          if (result.flag) {
            this.addWebSet(result.data);
            result.webState ? this.$router.push("/") : "";
          }
        })
        .catch((err) => {});
    },
  },
  computed: {
    ...mapState("webSet", ["webSet"]),
  },
};
</script>

<style lang="less">
.maintenance {
  min-height: 100vh;
  overflow: hidden;
  background-color: #85ffbd;
  // background-image: linear-gradient(145deg, #85ffbd 0%, #fffb7d 100%);
  background: url("/image/errorpage/city_life.svg") no-repeat center bottom / 50% 50%;

  // background-size: contain;
  position: relative;
  .maintenance-refsh {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }
  .maintenance-copy-right {
    position: absolute;
    bottom: 1rem;
    left: 0;
  }
}
</style>
