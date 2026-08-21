<script setup>
    import { ref, defineExpose } from 'vue';




    const dialog = ref(null)
    const max = ref(120)
    const state = ref(5)
    const message = ref('Placeholder...')

    const toggleOpen = (val) => 
    {
        dialog.value.open = val
    };

    defineExpose({
        toggleOpen
    });
</script>

<template>
    <onyks-dialog no-title modal ref="dialog" open>
        <onyks-container gap="m" padding="">
            <onyks-text>{{ message }}</onyks-text>
            <onyks-loading-bar :max="max" :current-state="state" color="blue" size="l" striped></onyks-loading-bar>
        </onyks-container>
    </onyks-dialog>
</template>

<style>
</style>