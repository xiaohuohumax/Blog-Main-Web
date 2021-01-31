<template>
<div class="theme-card-background  videoCard rounded bg-white mb-3">
    <nuxt-link :to="`/videomore/${video._id}`">
        <div class="video-card-icon rounded-top" :style="{
          background: `url('${video.icon}') center / cover`,
        }"></div>
    </nuxt-link>
    <div class="text-center p-3">
        <div class="h6 mb-1">{{ video.title }}</div>
        <div class="small">
            {{ video.subTitle }}
        </div>
        <div class="flex-between-center">
            <div class="flex-left-center">
                <Icon type="md-eye" class="mr-1" /> {{ video.watch }}
                <Icon type="md-happy" class="ml-2 mr-1" /> {{ video.nice }}
                <Icon type="md-heart" class="ml-2 mr-1" /> {{ video.love }}
            </div>
            <div class=""> {{video.uploadTime}}</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        video: Object,
    },
}
</script>

<style lang="less">
.video-card-icon {
    height: 10rem;
}
</style>
