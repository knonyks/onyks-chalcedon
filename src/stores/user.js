import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => 
{
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
        webManagerAddress
    }
})