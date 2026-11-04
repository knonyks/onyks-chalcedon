<script setup>
    import "@fontsource/pixelify-sans";
</script>

<template>
    <onyks-container type="group" gap="m" class="logos" justify="center" align="center">
        <img class="logo-img" src="../assets/logo.png">
        <img class="logo-img" src="../../node_modules/onyks-web-ui/dist/logo.png">
        <span class="logo-text">Chalcedon</span>
    </onyks-container>
</template>

<style scoped>
    .logos
    {
        width: 100%;
        height: 75px;
        box-sizing: border-box;
    }

    .logo-img
    {
        height: 100%;
    }

    .logo-text
    {
        flex: 1;
        text-align: left;
        font-size: 3rem;
        font-family: "Pixelify Sans";
    }
</style>