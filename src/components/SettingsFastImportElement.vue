<script setup>
    import { ref } from 'vue';
    import { defineEmits } from 'vue';
    import { Profile, profile_export, profile_import } from '../settings';

    const import_dialog = ref(null)
    const import_textarea_value = ref('')
    const emit = defineEmits(['settings-import'])

    const import_event = () => 
    {
        let imported_settings = profile_import(import_textarea_value.value)
        emit('settings-import', imported_settings)
    }
</script>

<template>
    <onyks-button background="yellow" @click="() => import_dialog.opened = true">Fast Import</onyks-button>

    <onyks-dialog ref="import_dialog" modal title="Import Profile" no-title resize="none">
        <onyks-dialog-content>
            <p>Paste the code of the settings:</p>
            <onyks-textarea resize="none" placeholder="Code of the settings..." @input="(e) => import_textarea_value = e.target.value"></onyks-textarea>
        </onyks-dialog-content>
        <onyks-button slot="footer" background="green" @click="import_event()">Import</onyks-button>
        <onyks-button slot="footer" background="red" @click="import_dialog.opened = false">Cancel</onyks-button>
    </onyks-dialog>
</template>

<style scoped>
    onyks-button
    {
        width: 150px;
    }

    onyks-textarea
    {
        height: 200px;
    }

    onyks-dialog-content
    {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
    }

    onyks-dialog
    {
        position: fixed;
    }
</style>