<template>
  <div class="infoCardSolt mb-3">
    <Collapse>
      <Panel name="1">
        <slot></slot>
        <slot name="content" slot="content"></slot>
      </Panel>
    </Collapse>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less'>
.infoCardSolt {
  .ivu-collapse-header {
    // background: white !important;
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