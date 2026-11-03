<script setup lang="ts">
    import LeftPanel from './LeftPanel.vue';

</script>

<template>
    <LeftPanel title="Database">
        <onyks-alert type="info">Last updated: 19.19.2019, 12:12:12</onyks-alert>
        <onyks-button class="btn" background="green" @click="">Update</onyks-button>
    </LeftPanel>
</template>

<style scoped>
    .btn
    {
        width: 120px;
    }
</style>