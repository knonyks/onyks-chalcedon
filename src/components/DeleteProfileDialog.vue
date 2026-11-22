<script setup>
    const open = defineModel('open')
    const profile = defineModel('profile', {default: {name: ''}})
    const emit = defineEmits(['confirm'])
</script>

<template>
    <onyks-dialog modal class="dialog" @dialog-close="open = false" :open="open" title="Delete Profile" corner-close title-size="l" bottom-buttons>
        <onyks-container gap="m" type="stack" align="start">
            <onyks-text>Are you sure you want to remove below listed profile?</onyks-text>
            <onyks-tag icon="F4D7" background="indigo" class="tag">{{ profile.name }}</onyks-tag>
        </onyks-container>
        <onyks-button slot="footer" @click="emit('confirm')">Confirm</onyks-button>
    </onyks-dialog>
</template>

<style lang="css" scoped>
    .dialog::part("content")
    {
        width: 200px;
    }
</style>