<script setup lang="ts">
import router from '../router';

</script>

<template>
    <div class="profile-container">
        <onyks-strip-menu type="v" class="profile-menu">

            <onyks-avatar shape="square" type="emoji" src="🫠"></onyks-avatar>

            <router-link to="/profile">
                <onyks-strip-menu-option icon="F425" :marked="$route.path === '/profile/manager'" @click="window_title = 'Web Manager'"></onyks-strip-menu-option>
            </router-link>

            <router-link to="/profile/repository">
                <onyks-strip-menu-option icon="F10D" :marked="$route.path.endsWith('/profile/repository')" @click="window_title = 'Repository'"></onyks-strip-menu-option>
            </router-link>

            <router-link to="/profile/settings">
                <onyks-strip-menu-option icon="F788" :marked="$route.path.endsWith('/profile/settings')" @click="window_title = 'Settings'"></onyks-strip-menu-option>
            </router-link>
        </onyks-strip-menu>
        
        <div class="profile-content">
            <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
    </div>
</template>

<style>
    .profile-container
    {
        display: flex;
        height: 100%;
        width: 100%;
        flex-direction: row;
    }

    .profile-menu
    {
        margin: var(--spacing-lg) 0 var(--spacing-lg) var(--spacing-lg);
        height: calc(100% - var(--spacing-lg) * 2);
        box-sizing: border-box;
    }

    .profile-content
    {
        flex: 1;
        padding: var(--spacing-lg);
        overflow-y: auto;
    }

    .fade-enter-active, .fade-leave-active 
    {
        transition: opacity 0.2s ease;
    }

    .fade-enter-from,.fade-leave-to 
    {
        opacity: 0;
    }
</style>