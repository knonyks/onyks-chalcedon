<script setup>
    import { ref, defineExpose } from 'vue';

    const dialog = ref(null)
    const message = ref('')

    const open = () => 
    {
        dialog.value.open = true
    };

    defineExpose({
        open,
        message
    });
</script>

<template>
    <onyks-dialog title="Error" modal corner-close ref="dialog">
        <onyks-text>{{ message }}</onyks-text>
    </onyks-dialog>
</template>

<style>
</style>