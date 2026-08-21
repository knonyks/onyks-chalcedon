<script setup>
    import ProfilePage from '../../components/ProfilePage.vue';
    import ProgressDialog from '../../components/ProgressDialog.vue';
</script>

<template>
    <ProfilePage title="Repository">

        <onyks-alert type="info">Last repository local update: 10:33:20, 22.03.2020</onyks-alert>

        <onyks-container type="group"  padding="" gap="m">
            <onyks-container type="stack" padding="" gap="m" style="flex: 1;">
                <onyks-path></onyks-path>
                <onyks-file-explorer></onyks-file-explorer>
                <onyks-container type="group" padding="" gap="m" class="btns1">
                    <onyks-button background="green">New *.SchLib</onyks-button>
                    <onyks-button background="blue">New *.PcbLib</onyks-button>
                </onyks-container>
            </onyks-container>
            <onyks-container type="stack" padding="" gap="m" style="width: 140px;">
                <onyks-button background="green">Update local</onyks-button>
                <onyks-button background="blue">Update remote</onyks-button>
                <onyks-button background="gray">Reset local</onyks-button>
                <onyks-button background="yellow">Explorer</onyks-button>
                <onyks-button background="red">Delete</onyks-button>
            </onyks-container>
        </onyks-container>
        <ProgressDialog></ProgressDialog>
    </ProfilePage>
</template>

<style scoped>
    .x
    {
        max-width: 1024px;
        width: 100%;
        box-sizing: border-box;
        height: 100%;
        background-color: red;
        margin-left: auto;
        margin-right: auto;
    }
    
    onyks-file-explorer
    {
        width: 100%;
        height: 250px;
    }

    onyks-button
    {
        width: 100%;
    }

    .btns1 > onyks-button
    {
        width: 140px;
    }
</style>