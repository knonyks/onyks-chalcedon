<script setup>
import PageContentElement from '../components/PageContentElement.vue';
import { useRouter } from 'vue-router'
import SettingsElement from '../components/SettingsElement.vue';
import AvatarPicker from '../components/AvatarPicker.vue'
import SettingsFastImportElement from '../components/SettingsFastImportElement.vue';
import { ref } from 'vue';

const router = useRouter()
const settings = ref(null)

const import_handle = (e) =>
{
    settings.value.setSettings(e)
}

</script>

<template>
    <div class="container">
        <div class="content">
            <PageContentElement title="Creating a profile">
                <onyks-alert type="info">You can fill or change later these settings.</onyks-alert>
                <SettingsFastImportElement @settings-import="import_handle"></SettingsFastImportElement>
                <h2>Avatar</h2>
                <AvatarPicker></AvatarPicker>
                <SettingsElement ref="settings"></SettingsElement>
                <div class="row btns">
                    <onyks-button background="green" id="creating_btn">Create</onyks-button>
                    <onyks-button background="red" id="import_btn" @click="router.push('/start')">Return</onyks-button>
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