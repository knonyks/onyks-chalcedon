<script setup>
    import { onMounted, reactive } from 'vue';
    import RepositoryPanel from '../components/panels/RepositoryPanel.vue';
    import DatabasePanel from '../components/panels/DatabasePanel.vue';
    import { useRouter } from 'vue-router';
    import { usePanels } from '../components/composables/usePanels.js';
    import { useProfileStore } from '../stores/profile.js';
    import ProfilePanel from '../components/panels/ProfilePanel.vue';
    import { useAuthStore } from '@bloodstone/stores/auth';
    import { set_api } from '@bloodstone/utils/api';
    import axios from 'axios';
    import { fetch as tauriFetch } from '@tauri-apps/plugin-http'

    // const auth_store = useAuthStore()

    // let api = axios.create(
    // {
    //     baseURL: 'http://localhost:8113/api/',
    //     timeout: 5000,
    //     withCredentials: true,
    // });

    // api.defaults.adapter = 'fetch'
    // api.defaults.env = { fetch: tauriFetch }

    // api.interceptors.request.use((config) => 
    // {
    //     const token = localStorage.getItem('token')
    //     if (token) config.headers.Authorization = `Bearer ${token}`
    //     return config
    // })

    // api.interceptors.response.use(
    //     (res) => res,
    //     async (err) => 
    //     {
    //         const original = err.config
    //         const is_auth_call = AUTH_URLS.some((u) => original?.url?.includes(u))

    //         if (err.response?.status === 401 && !is_auth_call && !original._retry) 
    //         {
    //             original._retry = true
    //             const auth = useAuthStore()
    //             try 
    //             {
    //                 await auth.refresh()
    //                 original.headers.Authorization = `Bearer ${auth.token}`
    //                 return api(original)
    //             } 
    //             catch 
    //             {
    //                 auth.clear()
    //                 router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } })
    //             }
    //     }
    //     return Promise.reject(err)
    //     }
    // )

    // set_api(api)

    const panels = reactive(usePanels(3))
    const router = useRouter()
    const profile_store = useProfileStore()

    onMounted(async () => 
    {
        // await auth_store.login('admin', 'admin')
    })
</script>

<template>
    <onyks-container class="container" type="group">
        <onyks-container padding="m" class="menu-container">
            <onyks-strip-menu type="v" class="menu">
                <onyks-avatar :src="profile_store.profile.avatar" @click="panels.toggle(0)"></onyks-avatar>

                <onyks-strip-menu-option size="m" icon="F2CD" @click="router.push('/profile/manager/dashboard')"></onyks-strip-menu-option>
                <onyks-strip-menu-option size="m" icon="F224" @click="router.push('/profile/manager/management')"></onyks-strip-menu-option>
                <onyks-strip-menu-option size="m" icon="F2D6" @click="router.push('/profile/manager/repository')"></onyks-strip-menu-option>
                <onyks-strip-menu-option size="m" icon="F788" @click="router.push('/profile/manager/settings')"></onyks-strip-menu-option>
                <onyks-strip-menu-option size="m" icon="F678" @click="router.push('/profile/manager/admin')"></onyks-strip-menu-option>

                <!-- <onyks-strip-menu-option size="m" icon="F56B"></onyks-strip-menu-option>
                <onyks-strip-menu-option size="m" icon="F44C"></onyks-strip-menu-option>
                <onyks-strip-menu-option size="m" icon="F10D"></onyks-strip-menu-option> -->

                <onyks-strip-menu-option @click="panels.toggle(1)" size="m" icon="F8C4"></onyks-strip-menu-option>
                <onyks-strip-menu-option @click="panels.toggle(2)" size="m" icon="F10D"></onyks-strip-menu-option>
                <onyks-strip-menu-option @click="router.push('/profile/settings')" size="m" icon="F3E3"></onyks-strip-menu-option>
            </onyks-strip-menu>
        </onyks-container>
        <onyks-container class="content">
            <ProfilePanel v-model:open="panels.items[0]"></ProfilePanel>
            <DatabasePanel v-model:open="panels.items[1]"></DatabasePanel>
            <RepositoryPanel v-model:open="panels.items[2]"></RepositoryPanel>
            
            <onyks-container class="subcontent">
                <router-view v-slot="{ Component, route }">
                    <Transition name="fade" mode="out-in" appear>
                        <component :is="Component" :key="route.fullPath" />
                    </Transition>
                </router-view>
            </onyks-container>
        </onyks-container>
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
    }

    .subcontent
    {
        margin: 0 auto 0 auto;
        max-width: 1024px;
    }
</style>