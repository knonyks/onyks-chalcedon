<script setup>
    import get_random_emoji from '../utils/emoji';
    import { open } from '@tauri-apps/plugin-dialog';
    import { reactive, ref } from 'vue';

    const model = defineModel()
    model.value.web_manager ??= { address: '' }
    const import_export_dialog = reactive(
    {
        export: false,
        import: false
    })
    const handle_change_path = async () =>
    {
        const file = await open(
        {
            multiple: false,
            directory: true,
        });
        model.value.path = file
    }
</script>

<template>
    <onyks-container gap="m" type="stack">
        <!-- <onyks-container type="group" gap="m">
            <onyks-button background="yellow" @click="import_export_dialog.import = true">Import</onyks-button>
            <onyks-button background="purple" @click="import_export_dialog.export = true">Export</onyks-button>
            <onyks-button background="purple">Test Connection</onyks-button>
        </onyks-container> -->
        <onyks-header size="l">Avatar & Name</onyks-header>
        <onyks-container type="grid" cols="2" class="settings" gap="m">
            <onyks-text>Avatar</onyks-text>
            <onyks-container type="group" gap="m" align="center">
                <onyks-avatar style="width: auto; height: auto;" size="m" :src="model.avatar"></onyks-avatar>
                <onyks-button @click="model.avatar = get_random_emoji()">Random</onyks-button>
            </onyks-container>
            
            <onyks-text>Name</onyks-text>
            <onyks-textfield v-model="model.name" class="textfield"></onyks-textfield>
        </onyks-container>
        <onyks-header size="l">Access Data</onyks-header>
        <onyks-container type="grid" cols="2" class="settings" gap="m">
            <onyks-text>Login</onyks-text>
            <onyks-textfield class="textfield" v-model="model.username"></onyks-textfield>
            <onyks-text>Password</onyks-text>
            <onyks-textfield type="password" class="textfield" v-model="model.password"></onyks-textfield>
        </onyks-container>

        <onyks-header size="l">Web Manager</onyks-header>

        <onyks-container type="grid" cols="2" class="settings" gap="m">
            <onyks-text>Address</onyks-text>
            <onyks-textfield class="textfield" v-model="model.web_manager.address"></onyks-textfield>
        </onyks-container>

        <onyks-header size="l">Repository</onyks-header>

        <onyks-container type="grid" cols="2" class="settings" gap="m">
            <onyks-text>Address</onyks-text>
            <onyks-textfield class="textfield" v-model="model.repository.address"></onyks-textfield>
            <onyks-text>Autoupdate</onyks-text>
            <onyks-checkbox size="m" :checked="model.repository.autoupdate" @click="model.repository.autoupdate != !model.repository.autoupdate"></onyks-checkbox>
            <onyks-text>Autoupdate Interval (in minutes)</onyks-text>
            <onyks-textfield v-model="model.repository.interval" type="number" class="textfield"></onyks-textfield>
        </onyks-container>

        <!-- <onyks-header size="l">Database</onyks-header>

        <onyks-container type="grid" cols="2" class="settings" gap="m">
            <onyks-text>Autoupdate</onyks-text>
            <onyks-checkbox :checked="model.database.autoupdate" @click="model.database.autoupdate != !model.repository.autoupdate" size="m"></onyks-checkbox>
            <onyks-text>Autoupdate Interval (in minutes)</onyks-text>
            <onyks-textfield v-model="model.database.interval" type="number" class="textfield"></onyks-textfield>
        </onyks-container> -->

        <onyks-header size="l">Other Settings</onyks-header>
        <onyks-alert type="warning">It's recommended to use an empty folder. The program may delete files that you don't want to remove.</onyks-alert>
        <onyks-container type="grid" cols="2" class="settings" gap="m">
            <onyks-text>Destination Path</onyks-text>
            <onyks-textfield v-model="model.path" disabled class="textfield"></onyks-textfield>
        </onyks-container>
        <onyks-container align="end">
            <onyks-button background="blue" @click="handle_change_path">Select</onyks-button>
        </onyks-container>
    </onyks-container>
</template>

<style lang="css">
    .settings
    {
        grid-template-columns: 1fr 1fr;
        justify-content: start;
        justify-items: start;
        align-items: center;
        align-content: center;
    }

    .textfield
    {
        width: 100%;
    }
</style>