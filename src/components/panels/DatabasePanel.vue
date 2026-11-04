<script setup lang="ts">
    import LeftPanel from './LeftPanel.vue';
</script>

<template>
    <LeftPanel title="Database">
        <onyks-button class="btn" background="green" @click="">Update</onyks-button>
    </LeftPanel>
</template>

<style scoped>
    .btn
    {
        width: 150px;
    }
</style>