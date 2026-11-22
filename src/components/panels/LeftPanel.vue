<script setup>
    const open = defineModel('open')
    const props = defineProps(['title'])
</script>

<template>
    <onyks-container padding="m" class="panel" :class="{ open }">
        <onyks-panel class="subpanel" padding="s">
            <onyks-container class="content" gap="m" padding="s">
                <onyks-header v-if="props.title != ''" size="xl">{{ props.title }}</onyks-header>
                <slot></slot>
            </onyks-container>
        </onyks-panel>
    </onyks-container>
</template>

<style lang="css" scoped>
    .panel
    {
        height: 100vh;
        box-sizing: border-box;
        position: fixed;
        padding-left: var(--onyks-spacing-sm);
        width: fit-content;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        z-index: 100;
    }

    .panel.open
    {
        opacity: 1;
        visibility: visible;
    }

    .subpanel
    {
        height: 100%;
        width: fit-content;
    }

    .content
    {
        width: fit-content;
        height: 100%;
        box-sizing: border-box;
        overflow-y: auto;
    }
</style>