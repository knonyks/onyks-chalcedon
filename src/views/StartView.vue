<script setup lang="js">
    import ProfileListElement from '../components/ProfileListElement.vue';
    import { ref } from 'vue';
    import { getCurrentWindow } from '@tauri-apps/api/window';
    import { useRouter } from 'vue-router'
    import { Profile, profile_create, profile_list, profile_delete, profile_edit, profile_get_settings, stronghold_get_record, settings_init, stronghold_init } from '../settings';
    import { DateTime } from "luxon";

    const is_tauri = '__TAURI_INTERNALS__' in window;
    const router = useRouter()
    const aboutDialog = ref(null);
    const settingsDialog = ref(null);
    await settings_init()
    await stronghold_init()
    const profiles = ref(await profile_list())
    import { inject } from 'vue';
    const global_settings = inject('global_settings');
    const openProfile = async (e) => 
    {
        
        
        console.log(await profile_get_settings(marked_ids.value.values().next().value))
        global_settings.current_user = await profile_get_settings(marked_ids.value.values().next().value)
        global_settings.current_user.password = await stronghold_get_record(marked_ids.value.values().next().value)
        router.push('/profile/manager')
    }

    const addProfile = () => 
    {
        console.log('add profile')
        router.push('/add-profile')
    }

    const editProfile = () => 
    {
        console.log('edit profile')
    }

    const marked_counter = ref(0)
    const marked_ids = ref(new Set())

    const removeProfile = async () => 
    {

    try {
        for (const element of marked_ids.value) {
            await profile_delete(element);
        }


        marked_ids.value.clear(); 
        marked_counter.value = 0;

        profiles.value = await profile_list();
        
    } catch (error) {
        console.error(error);
    }
    }



    const mark_profile = (e) =>
    {
        if(e[1])
        {
            marked_counter.value = marked_counter.value + 1;
            marked_ids.value.add(e[0])

        }
        else
        {
            marked_counter.value = marked_counter.value - 1;
            marked_ids.value.delete(e[0])
        }
        console.log(marked_ids.value)
    }


    // console.log(await profile_list())
    // let x = new Profile()
    // x.avatar = "🤗"
    // x.name = "Misiek"
    // x.last_use = "2024-06-01T12:00:00Z"
    // await profile_create(x)
    // console.log(await profile_list())
</script>

<template>
    <div class="container">
        <div class="subcontainer">
            <div class="top-bar">
                <onyks-logo></onyks-logo>
                <div class="top-bar-description">
                    <h1>Chalcedon</h1>
                    <h3>An app for managing PCB repository, database and elements schematics and footprints</h3>
                </div>
            </div>
            <div class="panel">
                <onyks-list>
                    <ProfileListElement @marked="mark_profile" v-for="profile in profiles" :name="profile.name" 
                    :avatar="profile.avatar" :lastUse="'Last use: ' + DateTime.fromISO(profile.last_use, { zone: 'utc' }).setZone('Europe/Warsaw').toFormat('dd.MM.yyyy HH:mm')" :id="profile.id"/>
                </onyks-list>
                <div class="btns">
                    <onyks-button background="green" @click="openProfile" :disabled="!(marked_counter == 1)">Open</onyks-button>
                    <onyks-button background="blue" @click="addProfile">Add</onyks-button>
                    <onyks-button background="purple" @click="editProfile" :disabled="!(marked_counter == 1)">Edit</onyks-button>
                    <onyks-button background="red" @click="removeProfile" :disabled="!(marked_counter >= 1)">Remove</onyks-button>
                    <onyks-button background="yellow" @click="aboutDialog.opened = true">About</onyks-button>
                    <onyks-button background="orange" @click="settingsDialog.opened = true">Settings</onyks-button>
                </div>
            </div>
        </div>

        <onyks-dialog ref="aboutDialog" modal title="About" corner-close no-title>
            <onyks-dialog-content>
                <h1>ONYKS Chalcedon</h1>
                <h3>A app for managing PCB repository, database and elements schematics and footprints</h3>
                <p>Authors: Karol Ambroziński, Jakub Jastrzębski</p>
                <p>License: Soon</p>
                <p>This software uses Tauri, Vue, <a href="https://github.com/knonyks/onyks-web-ui" target="_blank">ONYKS WebUI</a> and other open-source libraries.</p>
            </onyks-dialog-content>
        </onyks-dialog>

        <onyks-dialog ref="settingsDialog" modal title="Settings" corner-close no-title>
            <p>Soon.</p>
        </onyks-dialog>

    </div>
</template>

<style scoped>
    .container
    {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: var(--spacing-lg);
        box-sizing: border-box;
        height: 100%;
        /* background-color: lightgreen; */
    }

    .subcontainer
    {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-lg);
        /* background-color: red; */
        max-width: 800px;
        max-height: 600px;
        width: 100%;
        height: 100%;
    }

    .top-bar
    {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: var(--spacing-lg);
        /* background-color: lightblue; */
        width: 100%;
    }

    .top-bar h1
    {
        width: 100%;
        font-size: 3rem;
        /* background-color: blueviolet; */
    }

    .top-bar-description
    {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
        /* background-color: lightcoral; */
        width: 100%;
    }

    .top-bar-description h3
    {
        font-size: 1.25rem;
        text-align: justify;
        /* background-color: lightseagreen; */
    }


    onyks-logo
    {
        align-self: self-start;
        width: 300px;
    }

    .panel
    {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: var(--spacing-lg);
        /* background-color: greenyellow; */
        box-sizing: border-box;
        flex: 1; 
        min-height: 0;
        width: 100%;
    }

    onyks-list
    {
        width: 100%;
        height: 100%;
    }

    .btns
    {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
        /* background-color: blue; */
        gap: var(--spacing-lg);
        width: 275px;
        align-self: self-start;
    }

    onyks-button
    {
        width: 100%;
    }

    a
    {
        color: inherit;
    }

    onyks-dialog-content
    {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
    }
</style>