<script setup>
    import { onMounted } from 'vue';
    onMounted(() =>
    {
        if(import.meta.env.PROD)
        {
            document.addEventListener('contextmenu', (e) => 
            {
                e.preventDefault();
            });
        }
    })
</script>

<template>
    <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
            <component :is="Component" :key="$route.fullPath" />
        </transition>
    </router-view>
    <onyks-container padding="m" class="toast-container">
        <onyks-toast-container class="toast-container-content"></onyks-toast-container>
    </onyks-container>
</template>

<style>
    body
    {
        margin: 0;
        height: 100vh;
        width: 100vw;
        overflow: hidden;
    }

    onyks-button
    {
        min-width: 120px;
    }

    .fade-enter-active, .fade-leave-active
    {
        transition: opacity 0.25s ease;
    }

    .fade-enter-from, .fade-leave-to
    {
        opacity: 0;
    }

    .toast-container
    {
        position: fixed; 
        bottom: 0; 
        right: 0;
        box-sizing: border-box;
    }

    .toast-container-content
    {
        flex-direction: column-reverse;
    }
</style>