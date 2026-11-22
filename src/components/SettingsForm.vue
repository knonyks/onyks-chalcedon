<script setup>
    import get_random_emoji from '../utils/emoji';
    import { open } from '@tauri-apps/plugin-dialog';
    import { reactive, ref } from 'vue';
    import ImportExportDialog from './ImportExportDialog.vue';
    import { export_profile_to_base64 } from '../utils/profile.js';
    import { schemas } from '../schemas/profile.js';
    import { i18n } from '@bloodstone/utils/localization.js';

    const model = defineModel({default: schemas.profile()})


    const import_export_dialog = reactive(
    {
        export: false,
        import: false,
        export_current_text: '',
        handle_export: () =>
        {
            import_export_dialog.export_current_text = export_profile_to_base64(model.value)
            import_export_dialog.export = true
        }
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
    <onyks-container gap="m" type="stack" align="start">
        <onyks-container type="group" gap="m">
            <onyks-button background="lime" @click="import_export_dialog.import = true">Import</onyks-button>
            <onyks-button background="indigo" @click="import_export_dialog.handle_export">Export</onyks-button>
            <!-- <onyks-button background="teal">Test Connection</onyks-button> -->
        </onyks-container>
        <onyks-header size="l">Basics</onyks-header>
        <onyks-container type="grid" cols="2" class="settings" gap="m">
            <onyks-container justify="center"><onyks-text>Avatar</onyks-text></onyks-container>
            <onyks-container type="group" gap="m" align="center">
                <onyks-avatar style="width: auto; height: auto;" size="m" :src="model.avatar"></onyks-avatar>
                <onyks-button @click="model.avatar = get_random_emoji()">{{ i18n.global.t('common.select') }}</onyks-button>
            </onyks-container>
            <onyks-container justify="center"><onyks-text>Name</onyks-text></onyks-container>
            
            <onyks-textfield v-model="model.name" class="textfield"></onyks-textfield>
        </onyks-container>
        <onyks-alert type="warning">It's recommended to use an empty folder. The program may delete files that you don't want to remove.</onyks-alert>
        <onyks-container type="grid" cols="2" class="settings" gap="m">
            <onyks-container justify="center"><onyks-text>Destination Path</onyks-text></onyks-container>
            <onyks-textfield v-model="model.path" disabled class="textfield"></onyks-textfield>
        </onyks-container>
        <onyks-container align="end">
            <onyks-button background="blue" @click="handle_change_path">Select</onyks-button>
        </onyks-container>

        <onyks-header size="l">Access Data</onyks-header>
        <onyks-container type="grid" cols="2" class="settings" gap="m">
            <onyks-container justify="center"><onyks-text>Login</onyks-text></onyks-container>
            <onyks-textfield class="textfield" v-model="model.username"></onyks-textfield>
            <onyks-container justify="center"><onyks-text>Password</onyks-text></onyks-container>
            <onyks-textfield type="password" class="textfield" v-model="model.password"></onyks-textfield>
        </onyks-container>

        <onyks-header size="l">Web Manager</onyks-header>

        <onyks-container type="grid" cols="2" class="settings" gap="m">
            <onyks-container justify="center"><onyks-text>Address</onyks-text></onyks-container>
            <onyks-textfield class="textfield" v-model="model.web_manager.address"></onyks-textfield>
        </onyks-container>

        <onyks-header size="l">Repository</onyks-header>

        <onyks-container type="grid" cols="2" class="settings" gap="m">
            <onyks-container justify="center"><onyks-text>Address</onyks-text></onyks-container>
            <onyks-textfield class="textfield" v-model="model.repository.address"></onyks-textfield>
            <onyks-container justify="center"><onyks-text>Name</onyks-text></onyks-container>
            <onyks-textfield class="textfield" v-model="model.repository.name"></onyks-textfield>
            <!-- <onyks-container justify="center"><onyks-text>Autoupdate</onyks-text></onyks-container> -->
            <!-- <onyks-checkbox size="m" :checked="model.repository.autoupdate" @click="model.repository.autoupdate = !model.repository.autoupdate"></onyks-checkbox> -->
            <!-- <onyks-container justify="center"><onyks-text>Autoupdate Interval (in minutes)</onyks-text></onyks-container> -->
            <!-- <onyks-textfield v-model="model.repository.interval" type="number" class="textfield"></onyks-textfield> -->
        </onyks-container>

        <onyks-header size="l">Database</onyks-header>

        <onyks-container type="grid" cols="2" class="settings" gap="m">
            <onyks-container justify="center"><onyks-text>Address</onyks-text></onyks-container>
            <onyks-textfield class="textfield" v-model="model.database.address"></onyks-textfield>
            <onyks-container justify="center"><onyks-text>Port</onyks-text></onyks-container>
            <onyks-textfield class="textfield" type="number" v-model="model.database.port"></onyks-textfield>
            <!-- <onyks-container justify="center"><onyks-text>Autoupdate</onyks-text></onyks-container> -->
            <!-- <onyks-checkbox :checked="model.database.autoupdate" @click="model.database.autoupdate = !model.database.autoupdate" size="m"></onyks-checkbox> -->
            <!-- <onyks-container justify="center"><onyks-text>Autoupdate Interval (in minutes)</onyks-text></onyks-container> -->
            <!-- <onyks-textfield v-model="model.database.interval" type="number" class="textfield"></onyks-textfield> -->
        </onyks-container>

        <ImportExportDialog v-model:open="import_export_dialog.export" v-model="model"></ImportExportDialog>
        <ImportExportDialog type="import" v-model:open="import_export_dialog.import" v-model="model"></ImportExportDialog>
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