<script setup>
    import { onMounted, reactive } from 'vue';
    import RepositoryPanel from '../components/panels/RepositoryPanel.vue';
    import DatabasePanel from '../components/panels/DatabasePanel.vue';
    import { useRouter } from 'vue-router';
    import { usePanels } from '../components/composables/usePanels.js';
    import { useProfileStore } from '../stores/profile.js';
    import ProfilePanel from '../components/panels/ProfilePanel.vue';
    import { useLoaderStore } from '@bloodstone/stores/loader';

    const loaderStore = useLoaderStore()
    const panels = reactive(usePanels(3))
    const router = useRouter()
    const profile_store = useProfileStore()

    import { ref } from 'vue'

    const scroll_container = ref(null)

    const resetScroll = () => 
    {
        if (scroll_container.value) 
        {
            scroll_container.value.scrollTop = 0
        }
    }
</script>

<template>
    <onyks-container class="container" type="group">
        <onyks-container padding="m" class="menu-container">
            <onyks-panel class="menu" padding="s">
                <onyks-container gap="s" align="center">
                    <onyks-avatar class="avatar" size="m":src="profile_store.profile.avatar" @click="panels.toggle(0)"></onyks-avatar>
                    <onyks-tile size="m" icon="F2CD" @click="router.push('/profile/manager/dashboard')"></onyks-tile>
                    <onyks-tile size="m" icon="F224" @click="router.push('/profile/manager/management')"></onyks-tile>
                    <onyks-tile size="m" icon="F2D6" @click="router.push('/profile/manager/repository')"></onyks-tile>
                    <!-- <onyks-tile size="m" icon="F788" @click="router.push('/profile/manager/settings')"></onyks-tile> -->
                    <!-- <onyks-tile size="m" icon="F678" @click="router.push('/profile/manager/admin')"></onyks-tile> -->
                    <hr style="width: 100%;">
                    <onyks-tile @click="panels.toggle(2)" size="m" icon="F10D"></onyks-tile>
                    <onyks-tile @click="router.push('/profile/settings')" size="m" icon="F3E3"></onyks-tile>
                </onyks-container>
            </onyks-panel>
        </onyks-container>
        <onyks-container class="content" ref="scroll_container">
            <ProfilePanel v-model:open="panels.items[0]"></ProfilePanel>
            <DatabasePanel v-model:open="panels.items[1]"></DatabasePanel>
            <RepositoryPanel v-model:open="panels.items[2]"></RepositoryPanel>
            
            <onyks-container class="subcontent">
                <router-view v-slot="{ Component, route }">
                    <Transition name="fade" mode="out-in" appear @after-leave="resetScroll">
                        <component :is="Component" :key="route.fullPath" />
                    </Transition>
                    <onyks-container style="height: 200px;"></onyks-container>
                </router-view>
            </onyks-container>
            
        </onyks-container>
        <onyks-loader scroll-container=".subcontent" :isLoading.prop="loaderStore.isLoading" reset-scroll></onyks-loader>
    </onyks-container>
</template>

<style lang="css" scoped>
    .container
    {
        height: 100vh;
        width: 100vw;
        min-height: 0;
        box-sizing: border-box;
        display: flex;
        overflow: hidden;
    }

    .menu-container
    {
        height: 100%;
        box-sizing: border-box;
        z-index: 2000;
    }

    .avatar
    {
        width: auto; 
        aspect-ratio: 1/1; 
        height: auto;
    }

    .menu 
    {
        overflow-y: scroll;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    .menu::-webkit-scrollbar 
    {
        display: none;
    }

    .menu
    {
        height: 100%;
    }

    .content
    {
        display: block;
        flex: 1 1 0%;
        height: 100%;
        min-height: 0;
        min-width: 0;
        overflow-y: auto;
        position: relative;
    }

    .subcontent
    {
        margin: 0 auto 0 auto;
    }

    onyks-loader
    {
        position: relative;
        z-index: 20;
    }
</style>