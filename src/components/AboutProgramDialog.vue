<script setup>
    import Logos from './Logos.vue';
    import { openPath, openUrl } from '@tauri-apps/plugin-opener';
    
    const open = defineModel()
</script>

<template>
    <onyks-dialog :open="open" title-size="xl" title="About the program" modal corner-close @dialog-close="open = false">
        <onyks-container padding="" gap="m" >
            <Logos></Logos>
            <onyks-text>A PC program which cooperate with ONYKS Bloodstone to manage electronics elements for PCB design.</onyks-text>
            <onyks-text>Authors: Karol Ambroziński, Jakub Jastrzębski</onyks-text>
            <onyks-text>Source: <span @click="async () => {await openUrl('https://github.com/knonyks/onyks-chalcedon');}">ONYKS Chalcedon</span></onyks-text>
            <onyks-text>This project uses <span @click="async () => {await openUrl('https://github.com/knonyks/onyks-web-ui');}">ONYKS WebUI</span> - a web UI elements library based on Lit designed by ONYKS.</onyks-text>
        </onyks-container>
    </onyks-dialog>
</template>

<style scoped>
    span
    {
        text-decoration: underline;
        cursor: pointer;
    }

    img
    {
        aspect-ratio: 1;
        width: 128px;
        height: 128px;
    }

    onyks-dialog
    {
        max-width: 200px;
    }
</style>