<script setup>
    import { ref } from 'vue';
    import { schemas } from '../schemas/profile';
    import { export_profile_to_base64, import_profile_from_base64 } from '../utils/profile';
import { OnyksToast, OnyksToastContainer } from 'onyks-web-ui';

    const props = defineProps(
    {
        type:
        {
            default: 'export'
        }
    })

    const model = defineModel()
    const open = defineModel('open', {default: true})
    const text = defineModel('text', {default: ''})
    const state = ref(false)
    const error = ref('')

    const handle_generate = () =>
    {
        if(state.value)
        {
            text.value = export_profile_to_base64(model.value)
        }
        else
        {
            let schema = { ...model.value }
            schema.username = ''
            schema.password = ''
            text.value = export_profile_to_base64(schema)
        }
    }

    const handle_import = () =>
    {
        try
        {
            const data = import_profile_from_base64(text.value)
            Object.assign(model.value, data)
            open.value = false
            text.value = ''
            OnyksToastContainer.success('Import successfull')
        }
        catch(e)
        {
            error.value = "The entered data are invalid or uncomplete."
        }
    }
</script>

<template>
    <onyks-dialog class="dialog" modal :open="open" @dialog-close="open = false; text = ''" :title="props.type === 'import' ? 'Import' : 'Export'" scroll-target="none" size="m" title-size="xl" corner-close bottom-buttons>
        <onyks-container gap="m">
            <onyks-alert size="m" v-if="props.type == 'export'">Export data are not encrypted. Be carefull where you keep it.</onyks-alert>
            <onyks-container v-if="props.type == 'export'" gap="m" type="group" align="center">
                <onyks-text size="m">Contain login and password</onyks-text>
                <onyks-checkbox size="m" :checked="state" @click="state = !state"></onyks-checkbox>
            </onyks-container>
            <onyks-text size="m" v-if="props.type == 'export'">Copy below text:</onyks-text>
            <onyks-text size="m" v-else>Enter the text below:</onyks-text>
            <onyks-textarea @input="error = ''" v-model="text" placeholder="" class="text" size="m" resize="none"></onyks-textarea>
            <onyks-text v-if="props.type == 'import'" color="error">{{ error }}</onyks-text>
        </onyks-container>
        <onyks-button slot="footer" v-if="props.type == 'export'" @click="handle_generate">Generate</onyks-button>
        <onyks-button slot="footer" v-if="props.type == 'import'" @click="handle_import">Import</onyks-button>
    </onyks-dialog>
</template>

<style scoped>
    .text
    {
        width: 100%;
        max-height: 100%;
        height: 150px;
    }

    
    .dialog::part(container)
    {
        max-height: 1000px;
    }
</style>