<script setup>
    import ProfilePage from '../../components/ProfilePage.vue';
    import { onMounted, ref } from 'vue';
    import { openPath } from '@tauri-apps/plugin-opener';
    import { useUserStore } from '../../stores/user.js';
    import ErrorDialog from '../../components/ErrorDialog.vue';
    import { invoke } from '@tauri-apps/api/core';
    import ProgressDialog from '../../components/ProgressDialog.vue'
    import { watch } from 'vue';
    import { nextTick } from 'vue';
    
    const userStore = useUserStore()
    const currentPath = ref(['\\'])
    const explorerContent = ref(null)
    const dialogs = ref({error: null, progress: null})
    const path = ref(null)
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


    const repositoryIsExist = async () =>
    {
        dialogs.value.progress.message = 'Checking the state of the repository...'
        dialogs.value.progress.state = 25
        dialogs.value.progress.toggleOpen(true)
        await sleep(1000)
        let answer = await invoke('is_svn_repository', {svnFolderPath: userStore.repository.path})
        return answer
    }

    const repositoryPull = async (answer) =>
    {
        dialogs.value.progress.message = 'Downloading the content of the repository...'
        dialogs.value.progress.state = 50
        await sleep(1000)
        try
        {
            if(answer)
            {
                answer = await invoke('svn_update', 
                {
                    svnFolderPath: userStore.repository.path,
                    login: userStore.login,
                    password: userStore.password
                })
            }
            else
            {
                answer = await invoke('svn_checkout', 
                {
                    svnFolderPath: userStore.repository.path,
                    login: userStore.login,
                    password: userStore.password,
                    url: userStore.repository.address,
                })
            }
            return true
        }
        catch(e)
        {
            console.log(e)
            dialogs.value.progress.message = 'Error...'
            dialogs.value.progress.state = 100
            await sleep(1000)
            dialogs.value.progress.toggleOpen(false)
            return false
        }
    }

    const repositoryPush = async () =>
    {
        dialogs.value.progress.message = 'Commiting the changes...'
        dialogs.value.progress.state = 50
        await sleep(1000)
        try
        {
            let answer = null
            answer = await invoke('svn_delete', 
            {
                svnFolderPath: userStore.repository.path
            })

            answer = await invoke('svn_add_all', 
            {
                svnFolderPath: userStore.repository.path
            })
            console.log(answer)
            answer = await invoke('svn_commit', 
            {
                svnFolderPath: userStore.repository.path,
                login: userStore.login,
                password: userStore.password,
                commitName: userStore.login + userStore.password
            })
            console.log(answer)
            dialogs.value.progress.message = 'Finishing...'
            dialogs.value.progress.state = 100
            await sleep(1000)
            dialogs.value.progress.toggleOpen(false)
            return true
        }
        catch(e)
        {
            console.log(e)
            dialogs.value.progress.message = 'Error...'
            dialogs.value.progress.state = 100
            await sleep(1000)
            dialogs.value.progress.toggleOpen(false)
            return false
        }
    }

    const repositoryCleanup = async () =>
    {

    }

    const repositoryReverse = async () =>
    {
        
    }

    const handleClickBtn = async (source) =>
    {
        let answer = null
        if(userStore.repository.path != '')
        {
            
        
            switch(source)
            {
                case 'push':
                    await repositoryIsExist()
                    await repositoryPush()
                    break;
                case 'pull':
                    answer = await repositoryPull(await repositoryIsExist())
                    if(answer)
                    {
                        dialogs.value.progress.message = 'Finishing...'
                        dialogs.value.progress.state = 100
                        await sleep(1000)
                        dialogs.value.progress.toggleOpen(false)
                    }
                    break;
                case 'explorer':
                    if(userStore.repository.path == '')
                    {
                        dialogs.value.error.message = 'The repository path is empty. Fill it in the settings section.'
                        dialogs.value.error.open()
                    }
                    else
                    {
                        await openPath(userStore.repository.path);
                    }
                    break;
                case 'revert':
                    console.log(await invoke('svn_revert', {svnFolderPath: userStore.repository.path}))
                    break;
                case 'reset':
                    console.log(await invoke('svn_cleanup', {svnFolderPath: userStore.repository.path}))
                    break
            }
        }
        else
        {
            dialogs.value.error.message = 'The repository path is empty. Fill it in the settings section.'
            dialogs.value.error.open()
        }
    }

    // onMounted(async () => 
    // {
    //     if(userStore.repository.path != '')
    //     {
    //         currentPath.value = [...userStore.repository.path.split('\\')]
    //     }
    //     path.value.disabled = true
    // })


    onMounted(() => 
    {
        watch(() => userStore.isReady, async (ready) => 
        {
            if (ready) 
            {
                await nextTick()

                if(userStore.repository.path != '')
                {
                    currentPath.value = [...userStore.repository.path.split('\\')]
                }

                path.value.disabled = true
        }
    }, { immediate: true })
})
</script>

<template>
    <ProfilePage title="Repository">
        <onyks-path :content="currentPath" ref="path"></onyks-path>
        <onyks-container type="group" gap="m" padding="">
            <onyks-container type="stack" gap="m" class="files" padding="">
                <onyks-file-explorer ref="explorer"></onyks-file-explorer>
            </onyks-container>
            <onyks-container type="stack" class="btns" gap="m" padding="">
                <onyks-button background="green" @click="handleClickBtn('push')">Push</onyks-button>
                <onyks-button background="blue" @click="handleClickBtn('pull')">Pull</onyks-button>
                <onyks-button background="red" @click="handleClickBtn('reset')">Reset</onyks-button>
                <onyks-button background="yellow" @click="handleClickBtn('revert')">Revert</onyks-button>
                <onyks-button background="gray" @click="handleClickBtn('explorer')">Explorer</onyks-button>
            </onyks-container>
        </onyks-container>
        <ErrorDialog :ref="(el) => {if(dialogs && el) dialogs.error = el}"></ErrorDialog>
        <ProgressDialog :ref="(el) => {if(dialogs && el) dialogs.progress = el}"></ProgressDialog>
    </ProfilePage>
</template>

<style scoped>
    onyks-file-explorer
    {
        width: 100%;
    }

    onyks-path
    {
        width: 100%;
    }

    .btns
    {
        width: 140px;
    }

    .btns > onyks-button
    {
        width: 100%;
    }

    .files
    {
        flex: 1;
    }
</style>