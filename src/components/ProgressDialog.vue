<script setup>
    import { ref, defineExpose } from 'vue';

    const dialog = ref(null)
    const max = ref(100)
    const state = ref(5)
    const message = ref('Placeholder...')

    const toggleOpen = (val) => 
    {
        dialog.value.open = val
        if(!val)
        {
            state.value = 0
        }
    };

    defineExpose({
        message,
        max,
        state,
        toggleOpen
    });
</script>

<template>
    <onyks-dialog no-title modal ref="dialog">
        <onyks-container gap="m" padding="">
            <onyks-text>{{ message }}</onyks-text>
            <onyks-loading-bar :max="max" :current-state="state" color="blue" size="l" striped></onyks-loading-bar>
        </onyks-container>
    </onyks-dialog>
</template>

<style>
</style>