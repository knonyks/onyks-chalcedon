<script setup>
    import { ref } from 'vue';
    import { defineEmits } from 'vue';
    const props = defineProps(['avatar', 'name', 'lastUse', 'id'])
    const emit = defineEmits(['marked'])
    const marked=ref(false)

</script>

<template>
    <onyks-list-element size="l" :marked="marked" @click="() => {marked = !marked; emit('marked', [props.id, marked])}">
        <div class="row">
            <onyks-avatar shape="square" type="emoji" :src="props.avatar" size="xl"></onyks-avatar>
            <div class="col">
                <h3 class="name">{{ props.name }}</h3>
                <div class="last-time-use">{{ props.lastUse}}</div>
            </div>
        </div>
    </onyks-list-element>
</template>

<style scoped>
    .row 
    {
        display: flex;
        align-items: center;
        gap: var(--spacing-lg);
    }

    .col 
    {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
    }

    .name 
    {
        font-weight: bold;
    }

    .last-time-use
    {
        font-size: var(--size-md);
    }
</style>