<script setup lang="js">
    import { ref } from 'vue';
    import { getCurrentWindow } from '@tauri-apps/api/window';
    import ProfileListElement from '../components/ProfileListElement.vue';
    import { useRouter } from 'vue-router'

    const is_tauri = '__TAURI_INTERNALS__' in window;
    const router = useRouter()

    const openProfile = () => 
    {
        router.push('/profile/manager')
    }

    const addProfile = () => 
    {
        console.log('add profile')
    }

    const editProfile = () => 
    {
        console.log('edit profile')
    }

    const removeProfile = () => 
    {
        console.log('remove profile')
    }
</script>

<template>
    <div class="xxx">
        <div class="col a">
            <onyks-logo></onyks-logo>
            <div class="row b">
                <onyks-list>
                    <ProfileListElement></ProfileListElement>
                    <ProfileListElement></ProfileListElement>
                    <ProfileListElement></ProfileListElement>
                    <ProfileListElement></ProfileListElement>
                    <ProfileListElement></ProfileListElement>
                    <ProfileListElement></ProfileListElement>
                    <ProfileListElement></ProfileListElement>
                    <ProfileListElement></ProfileListElement>
                    <ProfileListElement></ProfileListElement>
                </onyks-list>
                <div class="col c">
                    <onyks-button background="green" @click="openProfile">Open</onyks-button>
                    <onyks-button background="blue" @click="addProfile">Add</onyks-button>
                    <onyks-button background="purple" @click="editProfile">Edit</onyks-button>
                    <onyks-button background="red" @click="removeProfile">Remove</onyks-button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .xxx
    {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        max-width: 800px;
        margin: 0 auto;
        padding: var(--spacing-lg);
        box-sizing: border-box;
    }

    .a
    {
        padding: var(--spacing-lg);
        width: 800px;
        max-height: 600px;
    }

    .a, .b, .c
    {
        box-sizing: border-box;
    }

    .b
    {
        box-sizing: border-box;
        flex: 1; 
        min-height: 0;
    }

    .c
    {
        box-sizing: border-box;
        width: 175px;
    }

    .row
    {
        display: flex;
        flex-direction: row;
        gap: var(--spacing-lg);
        width: 100%;
    }

    .col
    {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
        height: 100%;
    }

    onyks-logo
    {
        width: 200px;
    }

    onyks-list
    {
        flex: 1;
        height: 100%;
        box-sizing: border-box;
    }
</style>