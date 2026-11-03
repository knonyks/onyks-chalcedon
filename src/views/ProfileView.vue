<script setup>
    import { reactive } from 'vue';
    import RepositoryPanel from '../components/panels/RepositoryPanel.vue';
    import DatabasePanel from '../components/panels/DatabasePanel.vue';
    import { useRouter } from 'vue-router';
    import { usePanels } from '../components/composables/usePanels.js';
    const panels = reactive(usePanels(2))
    const router = useRouter()
    // import { ref } from 'vue';
    // import AboutProgramDialog from '../components/AboutProgramDialog.vue';
    // import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
    // import { useUserStore } from '../stores/user.js';
    // import ErrorDialog from '../components/ErrorDialog.vue';
    // import { fetch } from '@tauri-apps/plugin-http';

    // const dialogs = ref({about: null})
    // const userStore = useUserStore()
    // let webManagerIsOpened = false
    
    // const openWebManager = async () =>
    // {
    //     const response = await fetch('http://localhost/api/repository/name', 
    //     {
    //         method: 'GET',
    //     });
    //     console.log(await response.json())
    //     if(userStore.webManagerAddress != '')
    //     {
    //         const newWindow = new WebviewWindow('webManagerWindow', {
    //             url: userStore.webManagerAddress,
    //             x: 0,
    //             y: 0,
    //             width: 800,
    //             height: 600,
    //             title: 'Web Manager'
    //         });

    //         newWindow.once('tauri://created', function () 
    //         {
    //             webManagerIsOpened = true
    //         });

    //         newWindow.once('tauri://error', function (e) 
    //         {
    //             webManagerIsOpened = false
    //             console.error(e);
    //         });

    //         newWindow.onCloseRequested(() =>
    //         {
    //             webManagerIsOpened = false
    //         });
    //     }
    //     else
    //     {
    //         dialogs.value.error.message = 'The address of the web manager is unset. Fill it in the settings section.'
    //         dialogs.value.error.open()
    //     }
    // }

    // const webManagerOpenAction = async () =>
    // {
    //     if(webManagerIsOpened)
    //     {
    //         const temp = await WebviewWindow.getByLabel('webManagerWindow')
    //         if (temp)
    //         {
    //             await temp.setFocus()
    //         }
    //     }
    //     else
    //     {
    //         openWebManager()
    //     }
    // }
</script>

<template>
    <onyks-container class="container" type="group">
        <onyks-container padding="m" class="menu-container">
            <onyks-strip-menu type="v" class="menu">
                <!-- <onyks-strip-menu-option size="m" icon="F10D"></onyks-strip-menu-option> -->
                 <onyks-strip-menu-option @click="panels.toggle(0)" size="m" icon="F8C4"></onyks-strip-menu-option>
                <onyks-strip-menu-option @click="panels.toggle(1)" size="m" icon="F10D"></onyks-strip-menu-option>
                <onyks-strip-menu-option @click="router.push('/profile/settings')" size="m" icon="F3E3"></onyks-strip-menu-option>
            </onyks-strip-menu>
        </onyks-container>
        <onyks-container class="content">
            <DatabasePanel v-model:open="panels.items[0]"></DatabasePanel>
            <RepositoryPanel v-model:open="panels.items[1]"></RepositoryPanel>
            
            <onyks-container class="subcontent">
                <Transition name="fade" mode="out-in" appear>
                    <router-view v-slot="{ Component, route }">
                        <component :is="Component" :key="route.fullPath" />
                    </router-view>
                </Transition>
            </onyks-container>
        </onyks-container>
    </onyks-container>
</template>

<style lang="css" scoped>
    .container
    {
        height: 100vh;
        width: 100vw;
        min-height: 0;
        box-sizing: border-box;
        display: flex;
        overflow: hidden;
    }

    .menu-container
    {
        height: 100%;
        box-sizing: border-box;
    }

    .menu
    {
        height: 100%;
    }

    .content
    {
        display: block;
        flex: 1 1 0%;
        height: 100%;
        min-height: 0;
        min-width: 0;
        overflow-y: auto;
    }

    .subcontent
    {
        margin: 0 auto 0 auto;
        max-width: 1024px;
    }
</style>