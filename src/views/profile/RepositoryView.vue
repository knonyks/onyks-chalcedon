<script setup>
    import { onMounted } from 'vue';
    import ProfilePage from '../../components/ProfilePage.vue';
    import ProgressDialog from '../../components/ProgressDialog.vue';
    import { openPath, openUrl } from '@tauri-apps/plugin-opener';
    import { useUserStore } from '../../stores/user.js';

    const userStore = useUserStore()

    const action = async (btn) =>
    {
        switch(btn)
        {
            case 'pull':
                break;
            case 'push':
                break;
            case 'explorer':
                await openPath(userStore.repository.path);
                break;
        }
    }

    onMounted(() => 
    {

    })
</script>

<template>
    <ProfilePage title="Repository">

        <onyks-alert type="info">Last repository local update: {{ userStore.repository.lastLocalCheckUpdate }}</onyks-alert>

        <onyks-container type="group"  padding="" gap="m">
            <onyks-container type="stack" padding="" gap="m" style="flex: 1;">
                <onyks-path></onyks-path>
                <onyks-file-explorer></onyks-file-explorer>
                <!-- <onyks-container type="group" padding="" gap="m" class="btns1">
                    <onyks-button background="green">New *.SchLib</onyks-button>
                    <onyks-button background="blue">New *.PcbLib</onyks-button>
                </onyks-container> -->
            </onyks-container>
            <onyks-container type="stack" padding="" gap="m" style="width: 140px;">
                <onyks-button background="green">Pull</onyks-button>
                <onyks-button background="blue">Push</onyks-button>
                <!-- <onyks-button background="gray">Reset</onyks-button> -->
                <onyks-button background="yellow" @click="() => {action('explorer')}">Explorer</onyks-button>
                <!-- <onyks-button background="red">Delete</onyks-button> -->
            </onyks-container>
        </onyks-container>
        <!-- <ProgressDialog></ProgressDialog> -->
    </ProfilePage>
</template>

<style scoped>
    .x
    {
        max-width: 1024px;
        width: 100%;
        box-sizing: border-box;
        height: 100%;
        background-color: red;
        margin-left: auto;
        margin-right: auto;
    }
    
    onyks-file-explorer
    {
        width: 100%;
        height: 250px;
    }

    onyks-button
    {
        width: 100%;
    }

    .btns1 > onyks-button
    {
        width: 140px;
    }
</style>