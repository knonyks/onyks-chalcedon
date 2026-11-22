<script setup>
    const props = defineProps({
        title:
        {
            default: '',
            require: false
        }
    })
</script>

<template>
    <onyks-container class="container" align="center">
        <onyks-container class="content" gap="xl" type="stack" padding="xl">
            <onyks-header size="4xl">{{ props.title }}</onyks-header>
            <onyks-container gap="m">
                <slot></slot>
            </onyks-container>
        </onyks-container>
    </onyks-container>
</template>

<style lang="css" scoped>
    .container
    {
        overflow-y: auto;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }

    .content
    {
        max-width: 900px;
        width: 100%;
        height: fit-content;
        box-sizing: border-box;
    }
</style>