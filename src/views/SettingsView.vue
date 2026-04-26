<script setup>
import { onMounted } from 'vue';
import PageContentElement from '../components/PageContentElement.vue';

const ui_toast = (message, type = 'info') => 
{
    const new_toast = document.createElement('onyks-toast');
    new_toast.textContent = message;
    new_toast.type = type;
    document.body.appendChild(new_toast);
};

onMounted(() => 
{
    ui_toast('Settings saved successfully!', 'success')
})

</script>

<template>
    <PageContentElement>
        <h1>Settings</h1>

        <div class="row">
            <onyks-button>Export</onyks-button>
            <onyks-button background="blue">Import</onyks-button>
        </div>

        <!-- <onyks-textarea resize="none" placeholder="Enter the code of settings..."></onyks-textarea> -->

        <h2>Access data</h2>

        <onyks-alert type="warning">You are solely responsible for any damage caused by an unsafe SVN server and an unsafe web manager. Please be careful.</onyks-alert>

        <div class="row">
            <div class="col">
                <h4>Login</h4>
                <onyks-textfield></onyks-textfield>
            </div>
            <div class="col">
                <h4>Password</h4>
                <onyks-textfield></onyks-textfield>
            </div>
        </div>

        <h3>Repostory (SVN)</h3>

        <div class="row">
            <div class="col">
                <h4>Address</h4>
                <onyks-textfield></onyks-textfield>
            </div>
            <div class="col">
                <h4>Port</h4>
                <onyks-textfield></onyks-textfield>
            </div>
        </div>


        <h3>Web Manager</h3>

        <div class="row">
            <div class="col">
                <h4>Address</h4>
                <onyks-textfield></onyks-textfield>
            </div>
            <div class="col">
                <h4>Port</h4>
                <onyks-textfield></onyks-textfield>
            </div>
        </div>

        <onyks-button background="green">Save</onyks-button>
        
 

    </PageContentElement>
</template>

<style lang="css" scoped>
    onyks-textarea
    {
        height: 200px;
    }

    .btns
    {
        display: flex;
        flex-direction: row;
        gap: var(--spacing-md);
    }

    onyks-button
    {
        width: 120px;
    }

    .row
    {
        display: flex;
        flex-direction: row;
        gap: var(--spacing-md);
    }

    .col
    {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
    }
</style>