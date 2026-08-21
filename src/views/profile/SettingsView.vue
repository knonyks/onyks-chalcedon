<script setup>
    import ProfilePage from '../../components/ProfilePage.vue';
    import { useUserStore } from '../../stores/user.js';
    import { ref } from 'vue';

    const userStore = useUserStore()
    const visibleSettings = ref(JSON.parse(JSON.stringify(userStore.$state)))



    const reset = () =>
    {
        visibleSettings.value = JSON.parse(JSON.stringify(userStore.$state))
    }

    const save = () =>
    {
        userStore.$patch(JSON.parse(JSON.stringify(visibleSettings.value)))
    }
</script>

<template>
    <ProfilePage title="Settings">

        <onyks-container type="grid" cols="2" gap="l" padding="">
            <onyks-text size="m">Login</onyks-text>
            <onyks-textfield size="m" v-model="visibleSettings.login" placeholder="e.g admin"></onyks-textfield>
            <onyks-text size="m" >Password</onyks-text>
            <onyks-textfield size="m" type="password" v-model="visibleSettings.password" placeholder="e.g admin"></onyks-textfield>
        </onyks-container>

        <onyks-header level="4">Web Manager</onyks-header>

        <onyks-alert type="warning">
            If you change the address of the web manager and it is opened, you have to close and open it again.
        </onyks-alert>
        
        <onyks-container type="grid" cols="2" gap="l" padding="">
            <onyks-text size="m">Address</onyks-text>
            <onyks-textfield size="m" v-model="visibleSettings.webManagerAddress" placeholder="e.g https://google.com"></onyks-textfield>
        </onyks-container>

        <onyks-header level="4">Database</onyks-header>

        <onyks-container type="grid" cols="2" gap="l" padding="">
            <onyks-text size="m">Address</onyks-text>
            <onyks-textfield size="m" v-model="visibleSettings.database.address" placeholder="e.g https://google.com"></onyks-textfield>

            <onyks-text size="m">Autoupdate</onyks-text>
            <onyks-checkbox size="l" :checked="visibleSettings.database.autoupdate" @click="() => {visibleSettings.database.autoupdate = !visibleSettings.database.autoupdate}"></onyks-checkbox>
        
        </onyks-container>

        <onyks-container type="grid" cols="2" gap="l" padding="">
            <onyks-text size="m">Autoupdate Interval (in minutes)</onyks-text>
            <onyks-textfield placeholder="e.g 5" size="m" type="number" v-model="visibleSettings.database.autoupdateInterval" :disabled="!visibleSettings.database.autoupdate"></onyks-textfield>
        </onyks-container>
        <onyks-container gap="m" type="group" align="center" justify="end" padding="">
            <onyks-text size="s">Min. value of the interval is 1 minute.</onyks-text>
        </onyks-container>

        <onyks-header level="4">Repository</onyks-header>

        <onyks-container type="grid" cols="2" gap="l" padding="">
            <onyks-text size="m">Address</onyks-text>
            <onyks-textfield size="m" v-model="visibleSettings.repository.address" placeholder="e.g https://google.com"></onyks-textfield>
            <onyks-text size="m">Autoupdate</onyks-text>
            <onyks-checkbox size="l" :checked="visibleSettings.repository.autoupdate" @click="() => {visibleSettings.repository.autoupdate = !visibleSettings.repository.autoupdate}"></onyks-checkbox>
            <onyks-text size="m">Folder Path</onyks-text>
            <onyks-textfield size="m" v-model="visibleSettings.repository.path" placeholder="e.g C:/User/repository" disabled></onyks-textfield>
        </onyks-container>

        <onyks-container gap="m" type="group" align="center" justify="end" padding="">
            <onyks-button background="yellow" @click="save">Select</onyks-button>
        </onyks-container>

        <onyks-container type="grid" cols="2" gap="l" padding="">
            <onyks-text size="m">Autoupdate Interval (in minutes)</onyks-text>
            <onyks-textfield size="m" placeholder="e.g 5" type="number" v-model="visibleSettings.repository.autoupdateInterval" :disabled="!visibleSettings.repository.autoupdate"></onyks-textfield>
        </onyks-container>
        <onyks-container gap="m" type="group" align="center" justify="end" padding="">
            <onyks-text size="s">Min. value of the interval is 1 minute.</onyks-text>
        </onyks-container>
        
        
        <onyks-container gap="m" type="group" align="center" justify="end" padding="">
            <onyks-button background="green" @click="save">Save</onyks-button>
            <onyks-button background="red" @click="reset">Reset</onyks-button>
        </onyks-container>

        <onyks-container gap="m" type="group" align="center" justify="end" padding="s">
        </onyks-container>
    </ProfilePage>
</template>

<style scoped>
    onyks-text
    {
        align-self: center;
    }

    onyks-textfield
    {
        width: 100%;
    }

    onyks-button
    {
        width: 120px;
    }

    onyks-checkbox
    {
        width: fit-content;
    }
</style>