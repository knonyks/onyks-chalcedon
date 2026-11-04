<script setup lang="ts">
    import { reactive } from 'vue';
    import Page from '../components/Page.vue';
    import SettingsForm from '../components/SettingsForm.vue';
    import router from '../router/index.js';
    import { schemas } from '../schemas/profile.js';
    import { useProfileStore } from '../stores/profile.js';
    import { OnyksToastContainer } from 'onyks-web-ui';
    
    const profile = reactive(schemas.profile())
    const profile_store = useProfileStore()

    const handle_create = async () =>
    {
        if(profile.name != '')
        {
            let index = await profile_store.add_profile(profile)
            profile_store.profile = await profile_store.load_profile(index)
            router.push('/profile/settings')
        }
        else
        {
            OnyksToastContainer.error('Profile name cannot be empty')
        }
    }
</script>

<template>
    <Page title="Create Profile">
        <SettingsForm v-model="profile"></SettingsForm>
        <onyks-container type="group" gap="m" justify="end" align="center">
            <onyks-button @click="router.push('/start')">Return</onyks-button>
            <onyks-button @click="handle_create">Create</onyks-button>
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