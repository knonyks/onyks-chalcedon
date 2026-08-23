<script setup>
    import { onMounted } from 'vue';
    import { useUserStore } from './stores/user';
    

    const store = useUserStore()
    store.init()

    onMounted(() =>
    {
        // document.addEventListener('contextmenu', (e) => 
        // {
        //     e.preventDefault();
        // });
    })
</script>

<template>
    <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
            <Suspense>
                <div class="route-content">
                    <component :is="Component" />
                </div>
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