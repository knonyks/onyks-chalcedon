import { LazyStore } from '@tauri-apps/plugin-store'

const store = new LazyStore('settings.json')


async function save(val) 
{
    for (const key of Object.keys(val)) 
    {
        await store.set(key, val[key])
    }

    await store.save() 
}


async function load() 
{
    const settings = await store.get('settings')
    return settings
}