import { defineStore } from 'pinia'
import { ref } from 'vue'
import { LazyStore } from '@tauri-apps/plugin-store';


export const useProfileStore = defineStore('profile', () => 
{
    const store = new LazyStore('settings.json');

    const profile = ref({})

    const load_profiles = async () =>
    {
        const profiles = await store.get('profiles')
        return Array.isArray(profiles) ? profiles : []
    }

    const save_profiles = async (profiles) =>
    {
        await store.set('profiles', profiles)
        await store.save()
    }

    const remove_profile = async (index) =>
    {
        const profiles = await load_profiles()
        profiles.splice(index, 1)
        await save_profiles(profiles)
    }

    const add_profile = async (profile) =>
    {
        const profiles = await load_profiles()
        profiles.push(profile)
        await save_profiles(profiles)
        return profiles.length - 1
    }

    const load_profile = async (index) =>
    {
        const profiles = await load_profiles()
        return profiles[index] ?? null
    }

    return {
        load_profiles,
        save_profiles,
        remove_profile,
        add_profile,
        load_profile,
        profile
    }
})