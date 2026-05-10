import { invoke } from '@tauri-apps/api/core';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { load } from '@tauri-apps/plugin-store';
import { UUID } from "uuidjs";

const is_tauri = '__TAURI_INTERNALS__' in window;

let settings = null;

if (is_tauri)
{
    settings = await load('settings.json', { autoSave: false });
    if(settings.get('profiles') === undefined)
    {
        settings.set('profiles', []);
    }
    if(settings.get('general') === undefined)
    {
        settings.set('general', {});
    }
    // await settings.set('profiles', []);
}
else
{
    settings = {
        profiles: []
    };
}

export class Profile
{
    constructor()
    {
        this.id = UUID.genV4().hexString;

        this.avatar = null; // "😀"
        this.name = null; // "John Doe"
        this.login = null; // "johndoe"
        //password is/will be in stronghold

        this.repository_path = null; // "C:/Users/JohnDoe/..."
        this.repository_url  = null;  // "http://example.com"
        this.auto_update = null; // true or false
        this.auto_update_interval = null; // in seconds
        this.auto_update_alert = null; // true or false

        this.web_manager_url = null; // "http://example.com"

        this.last_use = null; // "2024-06-01T12:00:00Z"
    }
}

export const profile_create = async (profile) =>
{
    const currentProfiles = (await settings.get('profiles')) || []; 
    await settings.set('profiles', [...currentProfiles, profile]);
    await settings.save();
}

export const profile_delete = async (id) =>
{
    await settings.set('profiles', (await settings.get('profiles')).filter(p => p && p.id !== id));
    await settings.save();
}

export const profile_edit = async (id, updatedProfile) =>
{
    const currentProfiles = (await settings.get('profiles')) || [];

    const newProfiles = currentProfiles.map(p => 
        p && p.id === id ? { ...p, ...updatedProfile } : p
    );
    await settings.set('profiles', newProfiles);
    await settings.save();
}

export const profile_list = () =>
{
    return settings.get('profiles');
}

export const profile_get_settings = async (id) =>
{
    return (await settings.get('profiles')).find(p => p && p.id === id);
}

export const profile_import = (code) => 
{
    try 
    {
        const utf8Encoded = atob(code);
        const jsonString = decodeURIComponent(utf8Encoded);
        const importedSettings = JSON.parse(jsonString);
        if (typeof importedSettings !== 'object' || importedSettings === null) 
        {
            throw new Error("!E!");
        }
        return importedSettings;

    } 
    catch (error) 
    {
        console.error("!E!", error);
        return null; 
    }
}

export const profile_export = (profile, password) =>
{
    try 
    {
        let settings = profile
        settings.password = password
        const jsonString = JSON.stringify(settings);
        const utf8Encoded = encodeURIComponent(jsonString);
        const base64Code = btoa(utf8Encoded);
        return base64Code;
    } 
    catch (error) 
    {
        console.error("!E!", error);
        return null;
    }
}