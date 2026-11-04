import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { LazyStore } from '@tauri-apps/plugin-store';

export const useProfileStore = defineStore('profile', () => 
{
    const store = new LazyStore('settings.json');
    const profile = ref({})
    const index = ref(0)

    let profile_loaded = false
    const restore_profile = async () =>
    {
        const saved_profile = await store.get('profile')
        if (saved_profile && typeof saved_profile === 'object')
        {
            profile.value = saved_profile
        }
        profile_loaded = true
    }

    restore_profile()

    watch(profile, async (value) =>
    {
        if (!profile_loaded) return
        await store.set('profile', value)
        await store.save()
    }, { deep: true })

    const load_profiles = async () =>
    {
        const profiles = await store.get('profiles')
        return Array.isArray(profiles) ? profiles : []
    }

    const save_profile = async (index, profile) =>
    {
        const profiles = await load_profiles()
        profiles[index] = profile
        await save_profiles(profiles)
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
        profile,
        index,
        save_profile
    }
})