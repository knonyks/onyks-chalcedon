<script setup lang="ts">
    import router from '../../router/index.js';
    import { useProfileStore } from '../../stores/profile.js';
    import LeftPanel from './LeftPanel.vue';
    const profile_store = useProfileStore()
</script>

<template>
    <LeftPanel title="" class="panel">
        <onyks-tag size="m" background="blue" icon="F4D7">{{ profile_store.profile.name }}</onyks-tag>
        <onyks-button style="width: 100%;" size="m" @click="router.push('/start')">Exit</onyks-button>
    </LeftPanel>
</template>

<style scoped>
    .btn    
    {
        width: 120px;
    }

    .panel
    {
        height: fit-content;
        width: fit-content;
    }
</style>