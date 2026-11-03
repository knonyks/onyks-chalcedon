<script setup lang="ts">
    import LeftPanel from './LeftPanel.vue';

</script>

<template>
    <LeftPanel title="Repository">
        <onyks-alert type="info">Last updated: 19.19.2019, 12:12:12</onyks-alert>
        <onyks-container type="grid" cols="2" gap="m" class="btns-container">
            <onyks-button class="btn" background="green" @click="">Push</onyks-button>
            <onyks-button class="btn" background="blue" @click="">Pull</onyks-button>
            <onyks-button class="btn" background="red" @click="">Reset</onyks-button>
            <onyks-button class="btn" background="yellow" @click="">Revert</onyks-button>
            <onyks-button class="btn" background="gray" @click="">Explorer</onyks-button>
        </onyks-container>
    </LeftPanel>
</template>

<style scoped>
    .btns-container
    {
        box-sizing: border-box;
    }

    .btn
    {
        width: 100%;
    }
</style>