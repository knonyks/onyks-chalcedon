<script setup lang="ts">
    import LeftPanel from './LeftPanel.vue';
    import { OnyksToastContainer } from 'onyks-web-ui';
    import { repository } from '../../utils/repository.js';
    import { useProfileStore } from '../../stores/profile.js';

    const profile_store = useProfileStore()


    const handle_click = async (key) =>
    {
        switch(key)
        {
            case 'push':
                // console.log(profile_store.user)
                // console.log(repository.pull(profile_store.profile.path, profile_store.profile.username, profile_store.profile.password))
                // console.log(repository.push())
                break;

            case 'pull':
                console.log(profile_store.profile.path)
                console.log(await repository.pull(profile_store.profile.path + '//' + profile_store.profile.repository.name, profile_store.profile.username, profile_store.profile.password, profile_store.profile.repository.address))
                // console.log(repository.push())
                break;

            case 'reset':
                break;

            case 'revert':
                break;

            case 'explorer':
                break;
        }
    }
</script>

<template>
    <LeftPanel title="Repository" class="panel">
        <!-- <onyks-alert class="alert">Last update: 22.22.2026, 12:22:2321</onyks-alert> -->
        <onyks-container type="grid" cols="2" gap="m" class="btns-container">
            <onyks-button  class="btn" background="green" @click="handle_click('push')">Push</onyks-button>
            <onyks-button  class="btn" background="blue" @click="handle_click('pull')">Pull</onyks-button>
            <onyks-button  class="btn" background="red" @click="handle_click('reset')">Reset</onyks-button>
            <onyks-button  class="btn" background="yellow" @click="handle_click('revert')">Revert</onyks-button>
            <onyks-button  class="btn" background="gray" @click="handle_click('explorer')">Explorer</onyks-button>
        </onyks-container>
        <onyks-header size="xl">Database</onyks-header>
        <!-- <onyks-alert class="alert">Last update: 22.22.2026, 12:22:2321</onyks-alert> -->
        <onyks-container type="grid" cols="2" gap="m" class="btns-container">
            <onyks-button >Update</onyks-button>
        </onyks-container>
    </LeftPanel>
</template>

<style scoped>
    .btns-container
    {
        box-sizing: border-box;
        width: 100%;
    }

    .alert
    {
        width: 350px;
    }

    .btn
    {
        width: 100%;
    }
</style>