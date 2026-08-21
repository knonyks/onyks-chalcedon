<script setup>
    import { ref, defineExpose } from 'vue';

    const dialog = ref(null)

    const open = () => 
    {
        console.log(dialog)
        dialog.value.open = true
    };

    defineExpose({
        open
    });
</script>

<template>
    <onyks-dialog title="Error" modal corner-close ref="dialog">
        <onyks-text></onyks-text>
    </onyks-dialog>
</template>

<style>
</style>