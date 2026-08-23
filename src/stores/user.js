import { defineStore } from 'pinia'
import { ref } from 'vue'
import { LazyStore } from '@tauri-apps/plugin-store';


export const useUserStore = defineStore('user', () => 
{
    const store = new LazyStore('settings.json');

    const loadSettings = async () =>
    {
        login.value = await store.get('login') ?? ''
        password.value = await store.get('password') ?? ''
        webManagerAddress.value = await store.get('webManagerAddress') ?? ''
        repository.value = await store.get('repository') ?? repository.value
        database.value = await store.get('database') ?? database.value
    }

    const saveSettings = async () =>
    {
        await store.set('login', login.value)
        await store.set('password', password.value)
        await store.set('webManagerAddress', webManagerAddress.value)
        await store.set('repository', repository.value)
        await store.set('database', database.value)
        await store.save()
    }

    const init = async () =>
    {
        isReady.value = false
        await loadSettings()
        isReady.value = true
    }
    
    const isReady = ref(false)
    const login = ref('')
    const password = ref('')
    const webManagerAddress = ref('')

    const repository = ref(
    {
        address: '',
        autoupdate: false,
        autoupdateInterval: 0,
        lastLocalCheckUpdate: 0,
        path: ''
    })

    const database = ref({
        address: '',
        autoupdate: false,
        autoupdateInterval: 0,
        lastLocalCheckUpdate: 0
    })
    
    return {
        login,
        password,
        repository,
        database,
        webManagerAddress,
        init,
        loadSettings,
        saveSettings,
        isReady
    }
})