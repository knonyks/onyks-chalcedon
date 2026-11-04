<script setup>
    import { ref } from 'vue';
    import Page from '../../components/Page.vue';
    import SettingsForm from '../../components/SettingsForm.vue'
    import { useProfileStore } from '../../stores/profile.js';
    import { OnyksToastContainer } from 'onyks-web-ui';
    
    const profile_store = useProfileStore()
    const profile_copy = ref({ ...profile_store.profile })

    const handle_save = async () =>
    {
        await profile_store.save_profile(profile_store.index, profile_copy.value)
        profile_store.profile = await profile_store.load_profile(profile_store.index)
        OnyksToastContainer.success('Ustawienia zapisane')
    }

    const handle_restore = () =>
    {
        profile_copy.value = { ...profile_store.profile }
        OnyksToastContainer.success('Przywrócono ustawienia')
    }
</script>

<template>
    <Page title="Settings">
        <SettingsForm v-model="profile_copy"></SettingsForm>
        <onyks-container type="group" gap="m" justify="end">
            <onyks-button background="green" @click="handle_save">Save</onyks-button>
            <onyks-button @click="handle_restore">Restore</onyks-button>
        </onyks-container>
    </Page>
</template>

<style scoped>

</style>