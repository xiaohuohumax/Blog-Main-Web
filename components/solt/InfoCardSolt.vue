<template>
  <div class="infoCardSolt mb-3">
    <Collapse value="1">
      <Panel :name="name">
        <slot></slot>
        <slot name="content" slot="content"></slot>
      </Panel>
    </Collapse>
  </div>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    name() {
      return this.open ? "1" : "0";
    },
  },
};
</script>

<style lang="less">
.infoCardSolt {
  .ivu-collapse-header {
    border-bottom: none !important;
    line-height: 1.2rem !important;
    height: auto !important;
    padding: 0.5rem !important;
    .ivu-icon {
      margin-right: 0.5rem !important;
    }
  }
  .ivu-collapse-content-box {
    padding-top: 0 !important;
  }
}
</style>
