<template>
<div class="header px-2 px-md-5 py-2 shadow flex-between-center bg-white sticky-top">
    <div class="flex-center">
        <div class="font-weight-bold">xiaohuohu</div>
        <ul class="nav">
            <li class="nav-item px-2" v-for="(item, index) in navArray" :key="index">
                <nuxt-link :to="item.path">
                    <Icon :type="item.icon" />
                    <span class="d-none d-md-inline">
                        {{ item.name }}
                    </span>
                </nuxt-link>
            </li>
        </ul>
    </div>
    <div class="flex-center">
        <nuxt-link to="/userinf">
            <div class="p-3 border border-success rounded-circle mr-2"></div>
        </nuxt-link>
        <Button type="success" size="small" ghost>注销</Button>
    </div>
</div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            navArray: [{
                    name: '首页',
                    icon: 'ios-planet',
                    path: '/'
                },
                {
                    name: '音乐视频',
                    icon: 'ios-planet',
                    path: '/video'
                },
                {
                    name: '图包分享',
                    icon: 'ios-planet',
                    path: '/image'
                },
                {
                    name: '在线工具',
                    icon: 'ios-planet',
                    path: '/tool'
                },
                {
                    name: '时间轴',
                    icon: 'ios-planet',
                    path: '/time'
                },
            ],
        }
    },
}
</script>

<style lang="less">
</style>
