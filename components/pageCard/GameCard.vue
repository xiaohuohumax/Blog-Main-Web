<template>
<div class="gameCard p-2 mb-3 rounded bg-white d-flex">
    <nuxt-link to="/gamemore">
        <div class="game-card-icon rounded mr-2 flex-shrink-0" :style="{
        background: `url('${require('@/assets/image/oooo7.jpg')}') center / cover`,
      }"></div>
    </nuxt-link>
    <div class="flex-grow-1 d-flex flex-column">
        <div class="h6 mb-1 flex-shrink-0">dasasd</div>
        <div class="small flex-grow-1">
            asdfasdfa sdfasdf sadfasdfasd a asdfasdf asdf asdfasdf asdf
        </div>
        <div class="flex-left-center flex-shrink-0">
            <Icon type="md-eye" class="mr-1" /> 000
            <Icon type="md-happy" class="ml-2 mr-1" /> 000
            <Icon type="md-heart" class="ml-2 mr-1" /> 000
        </div>
    </div>
</div>
</template>

<script>
export default {}
</script>

<style lang="less">
.game-card-icon {
    width: 5rem;
    height: 5rem;
}
</style>
