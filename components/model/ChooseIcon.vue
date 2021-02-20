<template>
  <div class="">
    <img
      v-if="!chooseOpen"
      :src="icon"
      class="user-icon cursor-pointer shadow-sm rounded-circle d-inline-block mb-2"
      @click="chooseChange"
    />
    <div v-else>
      <Button
        type="success"
        shape="circle"
        icon="md-close"
        @click="choosefail"
        class="mr-2"
        title="取消"
      ></Button>
      <img
        :src="item"
        v-for="(item, index) in iconsShow"
        :key="index"
        @click="choose(item)"
        class="user-icon cursor-pointer mb-2 mr-2 shadow-sm rounded-circle d-inline-block p-1"
        :class="{ 'border border-success': icon == item }"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "",
    },
    icons: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      iconsShow: [],
      chooseOpen: false,
      timout: null,
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    window.clearInterval(this.timout);
  },
  methods: {
    // 初始化
    init() {
      let index = 0;
      this.timout = window.setInterval(() => {
        if (index >= this.icons.length) {
          return window.clearInterval(this.timout);
        }
        this.iconsShow.push(this.icons[index++]);
      }, 100);
    },
    // 是否选择头像
    chooseChange() {
      this.chooseOpen = !this.chooseOpen;
    },
    // 选中头像
    choose(item) {
      this.$emit("choose", item);
      this.chooseOpen = false;
    },
    // 取消选择头像
    choosefail() {
      this.chooseOpen = false;
    },
  },
};
</script>
<style lang="less">
.user-icon {
  object-fit: cover;
  width: 4rem;
  height: 4rem;
  &:hover {
    transform: scale(1.1);
  }
}
</style>
