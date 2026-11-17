<script setup lang="ts">
    import LeftPanel from './LeftPanel.vue';

</script>

<template>
    <LeftPanel title="Repository" class="panel">
        <onyks-alert class="alert">Last update: 22.22.2026, 12:22:2321</onyks-alert>
        <onyks-alert type="warning" class="alert">
            <onyks-container gap="s" style="width: 100%;">
                <onyks-text>Updating...</onyks-text>
                <onyks-loading-bar animated striped current-state="50"></onyks-loading-bar>
            </onyks-container>
        </onyks-alert>
        <onyks-container type="grid" cols="2" gap="m" class="btns-container">
            <onyks-button animated class="btn" background="green" @click="">Push</onyks-button>
            <onyks-button animated class="btn" background="blue" @click="">Pull</onyks-button>
            <onyks-button animated class="btn" background="red" @click="">Reset</onyks-button>
            <onyks-button animated class="btn" background="yellow" @click="">Revert</onyks-button>
            <onyks-button animated class="btn" background="gray" @click="">Explorer</onyks-button>
        </onyks-container>
        <onyks-header size="xl">Database</onyks-header>
        <onyks-button>Update</onyks-button>
    </LeftPanel>
</template>

<style scoped>
    .btns-container
    {
        box-sizing: border-box;
        width: 100%;
    }

    .alert
    {
        width: 350px;
    }

    .btn
    {
        width: 100%;
    }
</style>