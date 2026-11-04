<script setup lang="ts">
    import { useProfileSelector } from '../components/composables/useProfileSelector.js';
    import DeleteProfileDialog from '../components/DeleteProfileDialog.vue';
    import Logos from '../components/Logos.vue';
    import ProfileSelector from '../components/ProfileSelector.vue';
    import router from '../router/index.js';
    import { useProfileStore } from '../stores/profile.js';
    import { ref, reactive, onMounted } from 'vue';

    const profiles_store = useProfileStore()
    const profile_selector = reactive(useProfileSelector())

    const dialogs = reactive(
    {
        delete: 
        {
            profile: {},
            open: false,
            handle_open: async () =>
            {
                dialogs.delete.profile = await profiles_store.load_profile(profile_selector.current_index); 
                dialogs.delete.open = true
            },
            handle_confirm: async () =>
            {
                await profiles_store.remove_profile(profile_selector.current_index)
                profile_selector.items = await profiles_store.load_profiles()
                dialogs.delete.open = false
            }
        }
    })
   
    onMounted(async () => 
    {
        profile_selector.items = await profiles_store.load_profiles()
    })

    const handle_open = async () =>
    {
        profiles_store.profile = await profiles_store.load_profile(profile_selector.current_index)
        profiles_store.index = profile_selector.current_index
        router.push('/profile/settings')
    }
</script>

<template>
    <onyks-container class="profiles-container" align="center" justify="center">
        <onyks-container padding="l" gap="m" class="profiles-content">
            <Logos></Logos>
            <onyks-container cols="2" type="grid" class="profiles-subcontent" gap="m">
                <onyks-container gap="m" class="profile-selector-container">
                    <ProfileSelector v-model="profile_selector"></ProfileSelector>
                </onyks-container>
                <onyks-container gap="m">
                    <onyks-button @click="handle_open" class="btn" background="green" :disabled="profile_selector.current_index == -1">Open</onyks-button>
                    <onyks-button class="btn" background="blue" @click="router.push('/create-profile')">New</onyks-button>
                    <!-- <onyks-button class="btn" background="yellow" :disabled="profile_selector.current_index == -1">Edit</onyks-button> -->
                    <onyks-button class="btn" @click="dialogs.delete.handle_open" background="red" :disabled="profile_selector.current_index == -1">Delete</onyks-button>
                    <!-- <onyks-button class="btn" background="purple">Settings</onyks-button> -->
                    <!-- <onyks-button class="btn" background="gray">About</onyks-button> -->
                </onyks-container>
            </onyks-container>
            <DeleteProfileDialog v-model:open="dialogs.delete.open" v-model:profile="dialogs.delete.profile" @confirm="dialogs.delete.handle_confirm"></DeleteProfileDialog>
        </onyks-container>
    </onyks-container>
</template>

<style scoped>
    .profiles-container
    {
        width: 100vw;
        height: 100vh;
        /* background-color: red; */
        box-sizing: border-box;
    }

    .profiles-content
    {
        /* background-color: blue; */
        max-width: 600px;
        max-height: 500px;
        width: 100%;
        height: 100%;
        min-height: 0;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
    }

    .profiles-subcontent
    {
        grid-template-columns: 400px auto;
        grid-template-rows: 1fr;
        flex: 1;
        height: auto;
        min-height: 0;
    }

    .btn
    {
        width: 100%;
    }

    .profile-selector-container
    {
        height: 100%;
        width: 100%;
        min-height: 0;
        /* background-color: yellow; */
    }
</style>