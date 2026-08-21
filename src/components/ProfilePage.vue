<script setup>
    const props = defineProps(['title'])
</script>

<template>
    <onyks-container type="stack" gap="m" padding="l">
        <onyks-header class="header">{{ props.title }}</onyks-header>
        <onyks-container gap="l" class="content" padding="" >
            <slot></slot>
        </onyks-container>
    </onyks-container>
</template>

<style scoped>
    onyks-container
    {
        width: 100%;
        max-width: 1024px;
        height: 100%;
        margin-left: auto;
        margin-right: auto;
        box-sizing: border-box;
    }

    onyks-header.header
    {
        padding: var(--onyks-spacing-lg)  0 ;
    }
</style>