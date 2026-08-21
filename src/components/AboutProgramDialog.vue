<script setup>
    import { ref, defineExpose } from 'vue';
    import { openPath, openUrl } from '@tauri-apps/plugin-opener';

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
<!-- https://github.com/knonyks/onyks-web-ui -->
<template>
    <onyks-dialog title="About the program" modal corner-close ref="dialog">
        <onyks-container padding="" gap="l">
            <onyks-header level="5">ONYKS Chalcedon</onyks-header>
            <onyks-text>A PC program which cooperate with ONYKS Bloodstone to manage electronics elements for PCB design.</onyks-text>
            <onyks-text>Authors: Karol Ambroziński, Jakub Jastrzębski</onyks-text>
            <onyks-text>This project uses <onyks-text>ONYKS WebUI</onyks-text> - a web UI elements based on Lit.</onyks-text>
        </onyks-container>
    </onyks-dialog>
</template>

<style>
</style>