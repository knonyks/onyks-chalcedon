<script setup>

</script>

<template>
    <div class="row">
        <div class="col inputs">
            <h2>Username</h2>
            <onyks-textfield label="Username" placeholder="e.g. admin"></onyks-textfield>
        </div>
        <div class="col inputs">
            <h2>Password</h2>
            <onyks-textfield label="Password" type="password" placeholder="e.g. admin"></onyks-textfield>
        </div>
    </div>
    <div class="row">
        <div class="col inputs">
            <h2>SVN URL</h2>
            <onyks-textfield label="SVN URL" placeholder="e.g. https://svn.example.com"></onyks-textfield>
        </div>
        <div class="col inputs">
            <h2>Web Manager URL </h2>
            <onyks-textfield label="Web Manager URL" placeholder="e.g. https://webmanager.example.com"></onyks-textfield>
        </div>
    </div>
    <div class="row">
        <h2>SVN & Database Autoupdate</h2>
        <onyks-checkbox></onyks-checkbox>
    </div>
    <div class="col inactive">
        <div class="col inputs">
            <div class="col inputs">
                <div class="row">
                    <h3>Autoupdate Alert</h3>
                    <onyks-checkbox></onyks-checkbox>
                </div>
            </div>
            <div class="row inputs">
                <h3>Interval</h3>
                <onyks-textfield placeholder="eg. 5 fro 5 minutes"></onyks-textfield>
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
        align-items: center;
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

    .inactive
    {
        pointer-events: none;
        opacity: 0.5;
    }
</style>