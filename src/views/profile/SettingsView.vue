<script setup>
    import Page from '../../components/Page.vue';
    import SettingsForm from '../../components/SettingsForm.vue'
    import { useProfileStore } from '../../stores/profile.js';
    const profile_store = useProfileStore()
</script>

<template>
    <Page title="Settings">
        <SettingsForm v-model="profile_store.profile"></SettingsForm>
    </Page>
</template>

<style scoped>

</style>