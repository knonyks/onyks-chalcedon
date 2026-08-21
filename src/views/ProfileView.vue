<script setup>
    import { ref } from 'vue';
    import AboutProgramDialog from '../components/AboutProgramDialog.vue';
    import { WebviewWindow } from '@tauri-apps/api/webviewWindow';

    const dialogs = ref({about: null})
    let webManagerIsOpened = false

    const openWebManager = () =>
    {
        const newWindow = new WebviewWindow('webManagerWindow', {
            url: 'https://github.com/tauri-apps/tauri',
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
    <onyks-container type="group" gap="m" padding="m" class="container">
        <onyks-strip-menu type="v">
            <onyks-strip-menu-option size="m" icon="F43C" @click="webManagerOpenAction"></onyks-strip-menu-option>
            <RouterLink to="/profile/repository"><onyks-strip-menu-option size="m" icon="F10D"></onyks-strip-menu-option></RouterLink>
            <RouterLink to="/profile/settings"><onyks-strip-menu-option size="m" icon="F3E3"></onyks-strip-menu-option></RouterLink>
            <onyks-strip-menu-option size="m" icon="F1C2"></onyks-strip-menu-option>
            <onyks-strip-menu-option size="m" icon="F431" @click="dialogs.about.open"></onyks-strip-menu-option>
        </onyks-strip-menu>
        <onyks-container class="content" padding='' gap="m">
            <router-view/>
        </onyks-container>
    </onyks-container>

    <AboutProgramDialog :ref="(el) => {if(dialogs) dialogs.about = el}"></AboutProgramDialog>
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

    a 
    {
        color: inherit;
        text-decoration: none;
    }
</style>