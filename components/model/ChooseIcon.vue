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
        v-for="(item, index) in icons"
        :key="index"
        @click="choose(item)"
        class="user-icon cursor-pointer mb-2 mr-2 shadow-sm rounded-circle d-inline-block"
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
      chooseOpen: false,
    };
  },
  methods: {
    chooseChange() {
      this.chooseOpen = !this.chooseOpen;
    },
    choose(item) {
      this.$emit("choose", item);
      this.chooseOpen = false;
    },
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
