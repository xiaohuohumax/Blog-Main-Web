<template>
<div class="videomore rounded p-2 shadow-sm bg-white">
    <div class="text-center my-3">
        <div class="h5">阿斯顿发送到</div>
        <div class="small my-2">
            阿斯顿发斯蒂芬阿斯顿发斯蒂芬阿斯顿发生大是的发送发送到发声反对阿斯蒂芬阿斯蒂芬
        </div>
        <div class="flex-center">
            <Icon type="md-eye" class="mr-1" /> 000
            <Icon type="md-happy" class="ml-2 mr-1" /> 000
            <Icon type="md-heart" class="ml-2 mr-1" /> 000
        </div>
    </div>
    <div class="mb-3">
        <!-- <VideoPlayer :danmu="[]" :videosrc="require('~/assets/video/video.mp4')" :logined="false" :loginpath="'/logins'" :icon="''"/> -->
    </div>
    <div class="mb-3">
        <Button type="success" long>
            <Icon type="md-heart" class="ml-2 mr-1" />赞
        </Button>
    </div>
    <div class="mb-3">
        <p>标签(20):</p>
        <div class="mt-2">
            <Tag size="medium" type="border" color="success" v-for="(item, index) in 10" :key="index">Medium Tag</Tag>
        </div>
    </div>
    <div>
        <p>评论(20):</p>
        <div class="mt-2">
            <TalkBox />
        </div>
        <MessageBox />
    </div>
</div>
</template>

<script>
export default {
    meta: {
        title: '视频详细',
    },
}
</script>

<style>
</style>
