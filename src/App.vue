<script setup>
</script>

<template>
    <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
            <Suspense>
                <component :is="Component" />
            </Suspense>
        </transition>
    </router-view>
</template>

<style>
    body
    {
        margin: 0;
        height: 100vh;
    }
</style>