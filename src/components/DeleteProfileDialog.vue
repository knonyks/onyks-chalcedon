<script setup>
    const open = defineModel('open')
    const profile = defineModel('profile', {default: {name: ''}})
    const emit = defineEmits(['confirm'])
</script>

<template>
    <onyks-dialog class="dialog" :open="open" title="Delete Profile" corner-close title-size="l" bottom-buttons>
        <onyks-container gap="s" type="group" align="center">
            <onyks-text>You are removing profile:</onyks-text>
            <onyks-tag background="indigo">{{ profile.name }}</onyks-tag>
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