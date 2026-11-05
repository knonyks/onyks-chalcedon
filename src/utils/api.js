import { useAuthStore } from '@bloodstone/stores/auth';
import { set_api } from '@bloodstone/utils/api';
import axios from 'axios';
import { fetch as tauriFetch } from '@tauri-apps/plugin-http'


const AUTH_URLS = ['/auth/login', '/auth/refresh', '/auth/logout']

let api = null

export const set_new_api = (url) =>
{
    api = axios.create(
    {
        baseURL: url + '/api',
        timeout: 5000,
        withCredentials: true,
    });

    console.log(api)

    console.log(url + '/api')

    api.defaults.adapter = 'fetch'
    api.defaults.env = { fetch: tauriFetch }

    api.interceptors.request.use((config) => 
    {
        const token = localStorage.getItem('token')
        if (token) config.headers.Authorization = `Bearer ${token}`
        return config
    })

    api.interceptors.response.use(
    (res) => res,
    async (err) => 
    {
        const original = err.config
        const is_auth_call = AUTH_URLS.some((u) => original?.url?.includes(u))

        if (err.response?.status === 401 && original && !is_auth_call && !original._retry) 
        {
            original._retry = true
            const auth = useAuthStore()
            try 
            {
                await auth.refresh()
                original.headers.Authorization = `Bearer ${auth.token}`
                return api(original)
            } 
            catch 
            {
                auth.clear()
                router.push('/start')
            }
        }
        return Promise.reject(err)
    })

    set_api(api)
}