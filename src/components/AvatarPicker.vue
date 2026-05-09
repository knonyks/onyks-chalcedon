<script setup>
    import { ref } from 'vue';

    const random_avatar = () => 
    {
        const emoji_range = 0x1F600;
        return String.fromCodePoint(emoji_range + Math.floor(Math.random() * 80));
    }

    const avatar = ref(random_avatar())
</script>

<template>
    <div id="avatar_picker">
        <onyks-avatar :src="avatar" type="emoji" size="xl" shape="square"></onyks-avatar>
        <onyks-button id="random_btn" background="purple" @click="avatar = random_avatar()">Random</onyks-button>
        <onyks-button id="choose_btn" background="blue">Choose</onyks-button>
    </div>
    <onyks-dialog ref="emoji_dialog" modal title="A">
        <onyks-button slot="footer" background="green" @click="handle_close">Choose</onyks-button>
        <onyks-button slot="footer" background="red" onclick="quit_dialog.opened = false">No</onyks-button>
    </onyks-dialog>
</template>

<style>
    #avatar_picker
    {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: var(--spacing-lg);
    }

    #random_btn
    {
        width: 150px;
    }

    #choose_btn
    {
        width: 150px;
    }
</style>