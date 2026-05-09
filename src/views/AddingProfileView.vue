<script setup>
    import { ref } from 'vue';
import AvatarPicker from '../components/AvatarPicker.vue';
</script>

<template>
    <div id="container">
        <div id="form">
            <h1 id="title">Creating a profile</h1>
            <onyks-button id="import_btn" background="yellow">Fast Import</onyks-button>
            <AvatarPicker></AvatarPicker>

            <div class="row">
                <div class="col">
                    <h2>Username</h2>
                    <onyks-textfield label="Username" placeholder="e.g. admin"></onyks-textfield>
                </div>
                <div class="col">
                    <h2>Password</h2>
                    <onyks-textfield label="Password" type="password" placeholder="e.g. password"></onyks-textfield>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <h2>SVN URL</h2>
                    <onyks-textfield label="SVN URL" placeholder="e.g. https://svn.example.com"></onyks-textfield>
                </div>
                <div class="col">
                    <h2>Web Manager URL </h2>
                    <onyks-textfield label="Web Manager URL" placeholder="e.g. https://webmanager.example.com"></onyks-textfield>
                </div>
            </div>
            <div class="row">
                <onyks-button background="red" id="import_btn">Return</onyks-button>
                <onyks-button background="green" id="creating_btn">Create</onyks-button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    #container
    {
        width: 100%;
        height: 100%;
        overflow-y: auto;
    }

    #form
    {
        padding: var(--spacing-lg);
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
        max-width: 800px;
        margin: 0 auto 0 auto;
    }

    #title
    {
        padding: var(--spacing-lg) 0 var(--spacing-lg) 0;
    }


    #import_btn
    {
        width: 150px;
    }

    .row
    {
        display: flex;
        flex-direction: row;
        gap: var(--spacing-lg);
        width: 100%;
    }

    .col
    {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
        width: 50%;
        /* background-color: blue; */
    }

    onyks-textfield
    {
        width: 100%;
    }

    #creating_btn
    {
        width: 150px;
        align-self: flex-end;
    }
</style>