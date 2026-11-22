<script setup lang="ts">
    import Page from '../components/Page.vue';
    import SettingsForm from '../components/SettingsForm.vue';
    import router from '../router/index.js';
    import { useProfileStore } from '../stores/profile.js';
    import { OnyksToastContainer } from 'onyks-web-ui';
    
    const profile_store = useProfileStore()
    const profile = profile_store.profile

    const handle_edit = async () =>
    {
        if(profile.name != '')
        {
            await profile_store.save_profile(profile_store.index, profile)
            OnyksToastContainer.success('Profile edited successfully')
            router.push('/start')
        }
        else
        {
            OnyksToastContainer.error('Profile name cannot be empty')
        }
    }
</script>

<template>
    <Page title="Edit Profile">
        <SettingsForm v-model="profile"></SettingsForm>
        <onyks-container type="group" gap="m" justify="end" align="center">
            <onyks-button @click="router.push('/start')" animated>Return</onyks-button>
            <onyks-button @click="handle_edit" background="yellow" animated>Confirm</onyks-button>
        </onyks-container>
    </Page>
</template>

<style lang="css" scoped>
    .container
    {
        width: 100vw;
        box-sizing: border-box;
        height: 100vh;
        overflow-y: auto;
    }

    .content
    {
        max-width: 800px;
        width: 100%;
        margin-inline: auto;
        height: 100%;
        box-sizing: border-box;
    }
</style>