<script setup>
    import { onMounted } from 'vue';
    import PageContentElement from '../components/PageContentElement.vue';
    import SettingsElement from '../components/SettingsElement.vue';
    import AvatarPicker from '../components/AvatarPicker.vue';
    import { inject } from 'vue';
    import { ref } from 'vue';
    import { Profile, profile_edit, profile_get_settings, stronghold_insert_record } from '../settings';

    const global_settings = inject('global_settings');
    const settings_view = ref(null)

    onMounted(() => 
    {
        console.log(global_settings.current_user)
        settings_view.value.setSettings(global_settings.current_user)
    })

    const save = async () =>
    {
        await profile_edit(global_settings.current_user.id, settings_view.value.getSettings())
        global_settings.current_user = await profile_get_settings(global_settings.current_user.id)
        stronghold_insert_record(global_settings.current_user.id, global_settings.current_user.password)
    }

</script>

<template>
    <PageContentElement title="Settings">
        <!-- <div style="width: 20px; height: 2000px; background-color: aqua;"></div> -->
         <AvatarPicker ref="avatar_view"></AvatarPicker>
         <SettingsElement ref="settings_view"></SettingsElement>
         <onyks-button @click="save">Save</onyks-button>
    </PageContentElement>
</template>

<style lang="css" scoped>

</style>