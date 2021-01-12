<template>
<div class="messageItem d-flex mb-4">
    <div class="flex-shrink-0 pr-2">
        <div class="message-item-icon rounded" :style="{
          background: `url('${require('@/assets/image/oooo7.jpg')}') center / cover`,
        }"></div>
    </div>
    <div class="flex-grow-1 border-bottom">
        <p class="">
            <span class="font-weight-bold">时分雨</span>
            <span class="small">2020-09-12 12:12</span>
        </p>
        <p class="my-2">
            阿斯顿发生阿斯顿发斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬沙发阿斯蒂芬阿斯蒂芬
        </p>
        <div class="my-2">
            <span @click="talkBoxOpen = !talkBoxOpen">回复</span>
            <span>赞:000</span>
        </div>
        <TalkBox v-show="talkBoxOpen" />
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            talkBoxOpen: false,
        }
    },
}
</script>

<style lang="less">
.message-item-icon {
    width: 3rem;
    height: 3rem;
}
</style>
