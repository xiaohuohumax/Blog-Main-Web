<template>
<div class="breadcrumbNav bg-white p-2 mb-3 rounded flex-left-center">
    当前位置:
    <ol class="breadcrumb mb-0 p-0 ml-2">
        <li class="breadcrumb-item" v-for="(item, index) in routerData" :key="index">
            <nuxt-link :to="item.path">{{
          item.meta.title || item.name
        }}</nuxt-link>
        </li>
    </ol>
</div>
</template>

<script>
export default {
    data() {
        return {
            routerData: [],
        }
    },
    watch: {
        $route(val, oldval) {
            this.routerData = val.matched
            // console.log(val)
        },
    },
}
</script>

<style>
</style>
