<script setup>
    import { defineExpose } from 'vue';
    import { ref } from 'vue';

    const name = ref(null)
    const login = ref(null)
    const password = ref(null)
    const svn_url = ref(null)
    const svn_path = ref(null)
    const web_manager_url = ref(null)
    const autoupdate = ref(null)
    const autoupdate_alert = ref(null)
    const autoupdate_interval = ref(null)

    const autoupdate_flag = ref(false)

    const getSettings = () =>
    {
        
    }

    const setSettings = (obj) =>
    {
        console.log(obj)

        if(obj.name != null && obj.name != undefined)
        {
            name.value.value = obj.name
        }
        if(obj.login != null && obj.login != undefined)
        {
            login.value.value = obj.login
        }
        if(obj.password != null && obj.password != undefined)
        {
            password.value.value = obj.password
        }
        if(obj.repository_url != null && obj.repository_url != undefined)
        {
            svn_url.value.value = obj.repository_url
        }
        if(obj.repository_path != null && obj.repository_path != undefined)
        {
            svn_path.value.value = "sss"
        }
        if(obj.web_manager_url != null && obj.web_manager_url != undefined)
        {
            web_manager_url.value.value = obj.web_manager_url
        }
        if(obj.autoupdate != null && obj.autoupdate != undefined)
        {
            autoupdate_flag = obj.autoupdate
        }
        if(obj.autoupdate_alert != null && obj.autoupdate_alert != undefined)
        {
            autoupdate_alert.value.checked = obj.autoupdate_alert
        }
        if(obj.autoupdate_interval != null && obj.autoupdate_interval != undefined)
        {
            autoupdate_interval.value.value = obj.autoupdate_interval
        }
        console.log('ss')
    }

    defineExpose({
        getSettings,
        setSettings
    }); 
</script>

<template>
    <h2>Profile's Name</h2>
    <onyks-textfield ref="name" placeholder="e.g Mosquito"></onyks-textfield>
    <div class="row">
        <div class="col inputs">
            <h2>Login</h2>
            <onyks-textfield label="Username" placeholder="e.g. admin" ref="login"></onyks-textfield>
        </div>
        <div class="col inputs">
            <h2>Password</h2>
            <onyks-textfield label="Password" type="password" placeholder="e.g. admin" ref="password"></onyks-textfield>
        </div>
    </div>
    <div class="row">
        <div class="col inputs">
            <h2>SVN URL</h2>
            <onyks-textfield label="SVN URL" placeholder="e.g. https://svn.example.com" ref="svn_url"></onyks-textfield>
            <h2>SVN Folder Path</h2>
            <div class="row">
                <onyks-textfield label="SVN URL" placeholder="e.g. C:/svn/" ref="svn_path"></onyks-textfield>
                <onyks-button>Select</onyks-button>
            </div>
        </div>
        <div class="col inputs">
            <h2>Web Manager URL </h2>
            <onyks-textfield label="Web Manager URL" placeholder="e.g. https://webmanager.example.com" ref="web_manager_url"></onyks-textfield>
        </div>
    </div>
    <div class="row">
        <h2>SVN & Database Autoupdate</h2>
        <onyks-checkbox ref="autoupdate" @change="(e) => autoupdate_flag = e.detail.checked"></onyks-checkbox>
    </div>
    <div :class="['col', { 'inactive': !autoupdate_flag }, 'svn_window']">
        <div class="col inputs">
            <div class="col inputs">
                <div class="row alignCenter">
                    <h3>Autoupdate Alert</h3>
                    <onyks-checkbox checked="false" ref="autoupdate_alert"></onyks-checkbox>
                </div>
            </div>
            <div class="row inputs alignCenter">
                <h3>Interval</h3>
                <onyks-textfield placeholder="eg. 5 for 5 minutes" ref="autoupdate_interval"></onyks-textfield>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .row
    {
        display: flex;
        flex-direction: row;
        gap: var(--spacing-lg);
    }

    .col
    {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
    }

    .inputs
    {
        width: 100%;
    }

    onyks-textfield
    {
        width: 100%;
    }

    h2
    {
        height: fit-content;
    }

    .svn_window
    {
        transition: opacity 0.2s ease-in-out;
    }

    .inactive
    {
        pointer-events: none;
        opacity: 0.5;
    }

    .alignCenter
    {
        align-items: center;
    }

    onyks-button
    {
        width: 200px;
    }
</style>