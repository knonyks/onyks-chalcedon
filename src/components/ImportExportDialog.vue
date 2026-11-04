<script setup>
    const model = defineModel()
    const open = defineModel('open')

    const props = defineProps({
        mode: 
        {
            default: 'export'
        }
    })

    const handle_export = () =>
    {
        console.log(model.value)
    }

    const handle_import = () =>
    {
        console.log(model.value)
    }
</script>

<template>
    <onyks-dialog :open="open" @dialog-close="open.value = false" :title="props.mode == 'export'? 'Export':'Import'" corner-close title-size="l" bottom-buttons>
        <onyks-container>
            <onyks-text></onyks-text>
            <onyks-textarea class="textarea" size="m" placeholder="" resize="none"></onyks-textarea>
        </onyks-container>
        <onyks-button v-if="props.mode == 'export'" slot="footer" @click="handle_export">Export</onyks-button>
        <onyks-button v-else slot="footer" @click="handle_import">Import</onyks-button>
    </onyks-dialog>
</template>

<style scoped>
    .textarea
    {
        height: 200px;
    }
</style>