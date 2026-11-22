<script setup lang="ts">
    import LeftPanel from './LeftPanel.vue';
    import { OnyksToastContainer } from 'onyks-web-ui';
    import { repository } from '../../utils/repository.js';
    import { useProfileStore } from '../../stores/profile.js';
    import { openPath } from '@tauri-apps/plugin-opener';
    import { reactive } from 'vue';
    
    const profile_store = useProfileStore()

    const btns = reactive({
        repository:
        {
            push: false,
            pull: false,
            reset: false,
            revert: false
        }
    })

    const handle_click = async (key) =>
    {
        switch(key)
        {
            case 'push':
                btns.repository.push = true
                console.log(await repository.push(profile_store.profile.path + '\\' + profile_store.profile.repository.name, profile_store.profile.username, profile_store.profile.password))
                btns.repository.push = false
                break;

            case 'pull':
                btns.repository.pull = true
                console.log(await repository.pull(profile_store.profile.path + '\\' + profile_store.profile.repository.name, profile_store.profile.username, profile_store.profile.password, profile_store.profile.repository.address))
                btns.repository.pull = false
                break;

            case 'reset':
                btns.repository.reset = true
                console.log(await repository.reset(profile_store.profile.path + '\\' + profile_store.profile.repository.name))
                btns.repository.reset = false
                break;

            case 'revert':
                btns.repository.revert = true
                console.log(await repository.revert(profile_store.profile.path + '\\' + profile_store.profile.repository.name))
                btns.repository.revert = false
                break;

            case 'explorer':
                await openPath(profile_store.profile.path + '\\' + profile_store.profile.repository.name)
                break;
        }
    }
</script>

<template>
    <LeftPanel title="Repository" class="panel">
        <!-- <onyks-alert class="alert">Last update: 22.22.2026, 12:22:2321</onyks-alert> -->
        <onyks-container type="grid" cols="2" gap="m" class="btns-container">
            <onyks-button  class="btn" background="green" @click="handle_click('push')" :disabled="btns.repository.push">Push</onyks-button>
            <onyks-button  class="btn" background="blue" @click="handle_click('pull')" :disabled="btns.repository.pull">Pull</onyks-button>
            <onyks-button  class="btn" background="red" @click="handle_click('reset')" :disabled="btns.repository.reset">Reset</onyks-button>
            <onyks-button  class="btn" background="yellow" @click="handle_click('revert')" :disabled="btns.repository.revert">Revert</onyks-button>
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