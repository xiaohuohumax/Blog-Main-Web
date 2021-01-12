<template>
<div class="articleCard rounded bg-white mb-3">
    <nuxt-link :to="`/indexmore/${article._id}`">
        <div class="article-card-icon rounded-top" :style="{
          background: `url('${article.icon}') center / cover`,
        }"></div>
    </nuxt-link>
    <div class="text-center p-3">
        <div class="h6 mb-1">{{ article.title }}</div>
        <div class="small">
            {{ article.subTitle }}
        </div>
        <div class="flex-between-center">
            <div class="flex-left-center">
                <Icon type="md-eye" class="mr-1" /> {{ article.watch }}
                <Icon type="md-happy" class="ml-2 mr-1" /> {{ article.nice }}
                <Icon type="md-heart" class="ml-2 mr-1" /> {{ article.love }}
            </div>
            <div class=""> {{article.uploadTime}}</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        article: Object,
    },
}
</script>

<style lang="less">
.article-card-icon {
    height: 10rem;
}
</style>
