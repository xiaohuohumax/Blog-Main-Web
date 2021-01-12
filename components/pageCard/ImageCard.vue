<template>
<div class="articleCard rounded bg-white mb-3">
    <nuxt-link :to="`/imagemore/${image._id}`">
        <div class="image-card-icon rounded-top" :style="{
          background: `url('${image.icon}') center / cover`,
        }"></div>
    </nuxt-link>
    <div class="text-center p-3">
        <div class="h6 mb-1">{{ image.title }}</div>
        <div class="small">
            {{ image.subTitle }}
        </div>
        <div class="flex-between-center">
            <div class="flex-left-center">
                <Icon type="md-eye" class="mr-1" /> {{ image.watch }}
                <Icon type="md-happy" class="ml-2 mr-1" /> {{ image.nice }}
                <Icon type="md-heart" class="ml-2 mr-1" /> {{ image.love }}
            </div>
            <div class=""> {{image.uploadTime}}</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        image: Object,
    },
}
</script>

<style lang="less">
.image-card-icon {
    height: 10rem;
}
</style>
