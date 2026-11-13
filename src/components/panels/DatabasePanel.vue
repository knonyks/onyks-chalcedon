<script setup lang="ts">
    import LeftPanel from './LeftPanel.vue';
    import {useProfileStore} from '../../stores/profile.js'
    import { invoke } from '@tauri-apps/api/core';

    const profile_store = useProfileStore()

    const handle_click = async () =>
    {
        console.log(profile_store.profile.path)
    }
</script>

<template>
    <LeftPanel title="Database">
        <onyks-button class="btn" background="green" @click="handle_click">Update</onyks-button>
    </LeftPanel>
</template>

<style scoped>
    .btn
    {
        width: 150px;
    }
</style>