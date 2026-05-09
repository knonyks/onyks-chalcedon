import { Store } from '@tauri-apps/plugin-store';
import { Stronghold, Location } from '@tauri-apps/plugin-stronghold';


const store = new Store('settings.json');


async function settings_get_stronghold_client() 
{
    const path = '.onyks-chalcedon.stronghold';
    const password = 'password'; 
    const stronghold = await Stronghold.load(path, password);
    return await stronghold.getStore('settings_secrets', []);
}

export async function settings_get_profiles() 
{
    const data = await store.get('profiles');
    return data || [];
}

export async function settings_get_profile(id) 
{
    const profiles = await settings_get_profiles();
    const profile = profiles.find(p => p.id === id);
    if (!profile) throw new Error('Profile doesn\'t exist.');
    return profile;
}

export async function settings_get_profile_password(id) 
{
    const sh_client = await settings_get_stronghold_client();
    const password_bytes = await sh_client.get(id);
    if (!password_bytes) return null;
    return new TextDecoder().decode(new Uint8Array(password_bytes));
}


export async function settings_create_profile(profile_data, password) 
{
    const profiles = await settings_get_profiles();
    
    const new_id = profile_data.id || crypto.randomUUID();
    const new_profile = {
        ...profile_data,
        id: new_id,
        last_use: new Date().toISOString()
    };

    if (password) 
        {
        const sh_client = await settings_get_stronghold_client();
        const encoded_password = new TextEncoder().encode(password);
        await sh_client.insert(new_id, Array.from(encoded_password));
        await sh_client.save();
    }

    profiles.push(new_profile);
    await store.set('profiles', profiles);
    await store.save();

    return new_profile;
}


export async function settings_update_profile(id, updated_data, new_password = null) 
{
    const profiles = await settings_get_profiles();
    const index = profiles.findIndex(p => p.id === id);
    
    if (index === -1) throw new Error('Profile doesn\'t exist.');

    profiles[index] = {
        ...profiles[index],
        ...updated_data,
        id: id
    };

    await store.set('profiles', profiles);
    await store.save();

    if (new_password !== null) 
    {
        const sh_client = await settings_get_stronghold_client();
        if (new_password === "") 
        {
            await sh_client.remove(id);
        } else {
            const encoded_password = new TextEncoder().encode(new_password);
            await sh_client.insert(id, Array.from(encoded_password));
        }
        await sh_client.save();
    }
    return profiles[index];
}


export async function settings_delete_profile(id) 
{
    const profiles = await settings_get_profiles();
    const new_profiles = profiles.filter(p => p.id !== id);

    await store.set('profiles', new_profiles);
    await store.save();

    const sh_client = await settings_get_stronghold_client();
    try 
    {
        await sh_client.remove(id);
        await sh_client.save();
    } 
    catch (e) 
    {
        console.warn('Not found or Stronghold error:', e);
    }
}