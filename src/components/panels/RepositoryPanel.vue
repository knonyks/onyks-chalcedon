<script setup lang="ts">
    import LeftPanel from './LeftPanel.vue';

</script>

<template>
    <LeftPanel title="Repository">
        <onyks-container type="stack" gap="m" class="btns-container">
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
        width: 150px;
    }

    .btn
    {
        width: 100%;
    }
</style>