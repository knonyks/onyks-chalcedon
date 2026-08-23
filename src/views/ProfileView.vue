<script setup>
    import { ref } from 'vue';
    import AboutProgramDialog from '../components/AboutProgramDialog.vue';
    import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
    import { useUserStore } from '../stores/user.js';
    import ErrorDialog from '../components/ErrorDialog.vue';
    import { fetch } from '@tauri-apps/plugin-http';

    const dialogs = ref({about: null})
    const userStore = useUserStore()
    let webManagerIsOpened = false
    
    const openWebManager = async () =>
    {
        const response = await fetch('http://localhost/api/repository/name', 
        {
            method: 'GET',
        });
        console.log(await response.json())
        if(userStore.webManagerAddress != '')
        {
            const newWindow = new WebviewWindow('webManagerWindow', {
                url: userStore.webManagerAddress,
                x: 0,
                y: 0,
                width: 800,
                height: 600,
                title: 'Web Manager'
            });

            newWindow.once('tauri://created', function () 
            {
                webManagerIsOpened = true
            });

            newWindow.once('tauri://error', function (e) 
            {
                webManagerIsOpened = false
                console.error(e);
            });

            newWindow.onCloseRequested(() =>
            {
                webManagerIsOpened = false
            });
        }
        else
        {
            dialogs.value.error.message = 'The address of the web manager is unset. Fill it in the settings section.'
            dialogs.value.error.open()
        }
    }

    const webManagerOpenAction = async () =>
    {
        if(webManagerIsOpened)
        {
            const temp = await WebviewWindow.getByLabel('webManagerWindow')
            if (temp)
            {
                await temp.setFocus()
            }
        }
        else
        {
            openWebManager()
        }
    }
</script>

<template>
    <onyks-container type="group" gap="" padding="" class="container">
        <onyks-container padding="l" style="padding-right: 0;">
            <onyks-strip-menu type="v">
                <onyks-strip-menu-option size="m" icon="F43C" @click="webManagerOpenAction"></onyks-strip-menu-option>
                <RouterLink to="/profile/repository"><onyks-strip-menu-option size="m" icon="F10D"></onyks-strip-menu-option></RouterLink>
                <RouterLink to="/profile/settings"><onyks-strip-menu-option size="m" icon="F3E3"></onyks-strip-menu-option></RouterLink>
                <!-- <onyks-strip-menu-option size="m" icon="F1C2"></onyks-strip-menu-option> -->
                <onyks-strip-menu-option size="m" icon="F431" @click="dialogs.about.open"></onyks-strip-menu-option>
            </onyks-strip-menu>
        </onyks-container>
        <onyks-container class="content" padding='' gap="m" style="overflow-y: auto;">
            <Transition name="fade" mode="out-in" appear>
                <router-view v-slot="{ Component, route }">
                    <component :is="Component" :key="route.fullPath" />
                </router-view>
            </Transition>
        </onyks-container>
    </onyks-container>

    <AboutProgramDialog :ref="(el) => {if(dialogs) dialogs.about = el}"></AboutProgramDialog>
    <ErrorDialog :ref="(el) => {if(dialogs) dialogs.error = el}"></ErrorDialog>
</template>

<style lang="css" scoped>
    .container
    {
        height: 100vh;
        box-sizing: border-box;
    }

    onyks-strip-menu
    {
        height: 100%;
        box-sizing: border-box;
    }

    .content
    {
        flex: 1;
        box-sizing: border-box;
        height: 100%;
    }

    .fade-enter-active, .fade-leave-active
    {
        transition: opacity 0.5s ease;
    }

    .fade-enter-from, .fade-leave-to
    {
        opacity: 0;
    }

    a 
    {
        color: inherit;
        text-decoration: none;
    }
</style>