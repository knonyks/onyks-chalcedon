<script setup>
    import PageContentElement from '../components/PageContentElement.vue';
</script>

<template>
    <iframe class="web-frame" src="https://iframetest.com/"></iframe>
</template>

<style scoped>
    .web-frame 
    {
        display: block;
        width: 100%;
        height: 100%;
        border: none;
        border-radius: var(--radius-md);
        background-color: var(--surface-marked);
        border: 0;
        border: 1px solid var(--surface-border);
        box-sizing: border-box;
    }

    .web-frame::-webkit-scrollbar 
    {
        display: none;
    }

    .web-frame 
    {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
</style>