<script setup>
    const open = defineModel('open')
    const props = defineProps(['title'])
</script>

<template>
    <onyks-container padding="m" class="panel" :class="{ open }">
        <onyks-panel class="subpanel">
            <onyks-container class="content" gap="m" padding="s">
                <onyks-header level="3">{{ props.title }}</onyks-header>
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
        padding-left: 0;
        max-width: 350px;
        width: 100%;
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
        width: 100%;
    }

    .content
    {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }
</style>