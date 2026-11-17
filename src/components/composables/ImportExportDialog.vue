<script setup>
    const props = defineProps(
    {
        type:
        {
            default: 'export'
        }
    })

    const model = defineModel()
    const open = defineModel('open', {default: true})
</script>

<template>
    <onyks-dialog modal :open="open" @dialog-close="open = false" :title="props.type === 'export' ? 'Export' : 'Import'" scroll-target="none" size="m" title-size="xl" corner-close v-bind="props.type === 'import' ? { 'bottom-buttons': false } : {}">
        <onyks-container gap="m">
            <onyks-alert size="s" v-if="props.type == 'export'">Export data are not encrypted. Be carefull where you keep it.</onyks-alert>
            <onyks-container v-if="props.type == 'export'" gap="m" type="group" align="center">
                <onyks-text size="s">Contain login and password</onyks-text>
                <onyks-checkbox size="s"></onyks-checkbox>
            </onyks-container>
            <onyks-text size="s" v-if="props.type == 'export'">Copy below text:</onyks-text>
            <onyks-text size="s" v-else>Enter the text below:</onyks-text>
            <onyks-textarea v-model="model" placeholder="" class="text" size="m" resize="none"></onyks-textarea>
            
        </onyks-container>
        <onyks-button slot="footer" v-if="props.type == 'import'" @click="export_settings">Import</onyks-button>
    </onyks-dialog>
</template>

<style scoped>
    .text
    {
        width: 100%;
        height: 90px;
    }
</style>