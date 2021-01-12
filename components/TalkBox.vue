<template>
<div class="talkBox">
    <div class="">
        <Input :maxlength="100" :rows="3" :show-word-limit="true" type="textarea" placeholder="Enter something..." />
    </div>
    <div class="flex-between-center my-2">
        <div class="">
            <Icon type="md-happy" :size="20" />
            <Icon type="md-pricetags" :size="20" />
        </div>
        <div class="">
            <Icon type="md-close" :size="20" />
            <Icon type="md-paper-plane" :size="20" />
        </div>
    </div>
</div>
</template>

<script>
export default {}
</script>

<style>
</style>
