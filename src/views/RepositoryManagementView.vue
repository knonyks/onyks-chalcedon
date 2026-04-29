<script setup>
    import { invoke } from '@tauri-apps/api/core';
    import { onMounted } from 'vue';
    import PageContentElement from '../components/PageContentElement.vue';
    import { ref } from 'vue';
//     // const result = ref(null)
//     const run = async () =>
//     {
//         console.clear()
//         let result = ""
//         result = await invoke('is_svn_repository', {svnFolderPath: '/home/zero-jedynkowy/Obrazy/modyfikacje'})
//         console.log('1', result)
//         result = await invoke('svn_checkout', {svnFolderPath: '/home/zero-jedynkowy/Obrazy/modyfikacje', login: 'server_access', password: 'haslodlaservera321321', url: 'http://localhost:8111/svn/elements'})
//         console.log('2', result)
//         result = await invoke('svn_status', {svnFolderPath: '/home/zero-jedynkowy/Obrazy/modyfikacje'})
//         console.log('3', result)
//         result = await invoke('svn_add_all', {svnFolderPath: '/home/zero-jedynkowy/Obrazy/modyfikacje'})
//         console.log('4', result)
//         result = await invoke('svn_commit', {svnFolderPath: '/home/zero-jedynkowy/Obrazy/modyfikacje', login: 'server_access', password: 'haslodlaservera321321', commitName: 'marek lowca pieczarek'})
//         console.log('5', result)
//         result = await invoke('svn_update', {svnFolderPath: '/home/zero-jedynkowy/Obrazy/modyfikacje', login: 'server_access', password: 'haslodlaservera321321'})
//         console.log('6', result)
        

//     }
    const path = ref('/home/zero-jedynkowy/Obrazy/modyfikacje')
    const login = ref('server_access')
    const password = ref('haslodlaservera321321')
    const url = ref('http://localhost:8111/svn/elements')
    const value = ref('')

    const ui_toast = (message, type = 'info') => 
    {
        const new_toast = document.createElement('onyks-toast');
        new_toast.textContent = message;
        new_toast.type = type;
        document.body.appendChild(new_toast);
    };

    const push_btn = async () => 
    {
        console.log(value.value)
        try
        {
            console.log('push')
            path.value = value.value
            let result = null
            result = await invoke('svn_checkout', {svnFolderPath: path.value, login: login.value, password: password.value, url: url.value})
            result = await invoke('svn_add_all', {svnFolderPath: path.value})
            result = await invoke('svn_commit', {svnFolderPath: path.value, login: login.value, password: password.value, commitName: 'marek lowca pieczarek'})
            result = await invoke('svn_update', {svnFolderPath: path.value, login: login.value, password: password.value})
            ui_toast('SVN Update pushed!', 'success')
        }
        catch(e)
        {
            console.log(e)
            ui_toast('SVN Error!', 'error')
        }
    }

    const pull_btn = async () => 
    {
        try
        {
            path.value = value.value
            let result = null
            result = await invoke('svn_checkout', {svnFolderPath: path.value, login: login.value, password: password.value, url: url.value})
            console.log(result)
            ui_toast('SVN Update pulled!', 'success')
        }
        catch(e)
        {
            console.log(e)
            ui_toast('SVN Error!', 'error')
        }
    }

    const delete_btn = async () => 
    {
        console.log('delete')
    }

    const reset_btn = async () => 
    {
        console.log('reset')   
    }


    onMounted(async () => 
    {

    })
</script>


<template>
    <PageContentElement title="Repository">
        <onyks-textfield style="width: 100%;" :value="value" @input="(e) => value = e.target.value"></onyks-textfield>
        <div class="row">
            <onyks-file-explorer></onyks-file-explorer>
            <div class="btns">
                <onyks-button background="green" @click="push_btn">Push</onyks-button>
                <onyks-button background="purple"  @click="pull_btn">Pull</onyks-button>
                <onyks-button background="red"  @click="delete_btn">Delete</onyks-button>
                <onyks-button background="yellow"  @click="reset_btn">Reset</onyks-button>
            </div>
        </div>
    </PageContentElement>
</template>

<style scoped>
    .btns
    {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
        min-width: 200px
    }

    .row
    {
        display: flex;
        flex-direction: row;
        gap: var(--spacing-md);
    }

    onyks-file-explorer
    {
        width: 100%;
    }
</style>