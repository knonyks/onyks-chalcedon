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
    <onyks-dialog title="About the program" modal corner-close ref="dialog">
        <onyks-container padding="" gap="l">
            <onyks-header level="5">ONYKS Chalcedon</onyks-header>
            <onyks-text>A PC program which cooperate with ONYKS Bloodstone to manage electronics elements for PCB design.</onyks-text>
            <onyks-text>Authors: Karol Ambroziński, Jakub Jastrzębski</onyks-text>
        </onyks-container>
    </onyks-dialog>
</template>

<style>
</style>