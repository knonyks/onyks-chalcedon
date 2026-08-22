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

<template>
    <onyks-dialog title="About the program" modal corner-close ref="dialog">
        <onyks-container padding="" gap="l" >
            <onyks-container type="group" justify="left" align="center" gap="l">
                <img src="../assets/logo.png" class="logo">
                <onyks-header level="1">ONYKS Chalcedon</onyks-header>
            </onyks-container>
            
            <onyks-text>A PC program which cooperate with ONYKS Bloodstone to manage electronics elements for PCB design.</onyks-text>
            <onyks-text>Authors: Karol Ambroziński, Jakub Jastrzębski</onyks-text>

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
</style>