import { useAuthStore } from '@bloodstone/stores/auth';
import { set_api } from '@bloodstone/utils/api';
import axios from 'axios';
import { fetch as tauriFetch } from '@tauri-apps/plugin-http'
import router from '../router';

const AUTH_URLS = ['/auth/login', '/auth/refresh', '/auth/logout']

let api = null
let refresh_promise = null

export const set_new_api = (url) =>
{
    api = axios.create(
    {
        baseURL: url.replace(/\/+$/, '') + '/api',
        timeout: 5000,
        withCredentials: true,
    });

    api.defaults.adapter = 'fetch'
    api.defaults.env = { fetch: tauriFetch }

    api.interceptors.request.use((config) => 
    {
        const is_auth_call = AUTH_URLS.some((u) => config.url?.includes(u))
        if (is_auth_call) return config

        const auth = useAuthStore()
        const token = auth.token || localStorage.getItem('token')
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
                if (!refresh_promise)
                {
                    refresh_promise = auth.refresh().finally(() =>
                    {
                        refresh_promise = null
                    })
                }
                await refresh_promise
                const token = auth.token || localStorage.getItem('token')
                if (!token) throw new Error('Authentication refresh returned no token')
                original.headers = original.headers || {}
                original.headers.Authorization = `Bearer ${token}`
                return api(original)
            } 
            catch(e)
            {
                console.log(e)
                auth.clear()
                router.push('/start')
                return Promise.reject(err)
            }
        }
        return Promise.reject(err)
    })

    set_api(api)
}