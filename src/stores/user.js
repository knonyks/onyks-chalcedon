import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => 
{
    const login = ref('1')
    const password = ref('2')
    const webManagerAddress = ref('https://google.com')

    const repository = ref(
    {
        address: '3',
        autoupdate: false,
        autoupdateInterval: 0,
        lastLocalCheckUpdate: 0,
        path: 'xx'
    })

    const database = ref({
        address: '4',
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