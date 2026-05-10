<script setup>
import PageContentElement from '../components/PageContentElement.vue';
import { useRouter } from 'vue-router'
import SettingsElement from '../components/SettingsElement.vue';
import AvatarPicker from '../components/AvatarPicker.vue'
import SettingsFastImportElement from '../components/SettingsFastImportElement.vue';
import { ref } from 'vue';
import { Profile, profile_create, stronghold_insert_record } from '../settings';
import { DateTime } from 'luxon';
import { inject } from 'vue';

const global_settings = inject('global_settings');

const router = useRouter()
const settings = ref(null)

const import_handle = (e) =>
{
    settings.value.setSettings(e)
}

const avatar_element = ref(null)

const create_profile = () =>
{
    let profile = new Profile()
    profile.avatar = avatar_element.value.get_avatar()
    const settingsData = settings.value.getSettings()
    Object.assign(profile, settingsData)
    profile.last_use = DateTime.now().toUTC().toISO()
    profile_create(profile)
    stronghold_insert_record(profile.id, profile.password)
    global_settings.current_user = profile
    router.push('/profile')
}

</script>

<template>
    <div class="container">
        <div class="content">
            <PageContentElement title="Creating a profile">
                <onyks-alert type="info">You can fill or change later these settings.</onyks-alert>
                <SettingsFastImportElement @settings-import="import_handle"></SettingsFastImportElement>
                <h2>Avatar</h2>
                <AvatarPicker ref="avatar_element"></AvatarPicker>
                <SettingsElement ref="settings"></SettingsElement>
                <div class="row btns">
                    <onyks-button background="green" @click="create_profile">Create</onyks-button>
                    <onyks-button background="red" @click="router.push('/start')">Return</onyks-button>
                </div>
            </PageContentElement>
        </div>
    </div>
</template>

<style scoped>
    .container
    {
        height: 100%;
        overflow-y: auto;
        box-sizing: border-box;
        /* padding: var(--spacing-lg); */
    }

    .content
    {
        max-width: 800px;
        box-sizing: border-box;
        margin-left: auto;
        margin-right: auto;
        /* height: 100%; */
        padding: var(--spacing-lg);
    }

    .row
    {
        display: flex;
        flex-direction: row;
        gap: var(--spacing-lg);
    }

    .col
    {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
    }

    .btns
    {
        align-self: self-end;
    }

    onyks-button
    {
        width: 150px;
    }
</style>