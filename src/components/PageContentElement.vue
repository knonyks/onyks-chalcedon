<script setup lang="js">
    const props = defineProps(['title'])
</script>


<template>
    <div class="page">
        <h1 class="title">{{ props.title }}</h1>
        <slot></slot>
    </div>
</template>

<style lang="css" scoped>
    .page
    {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
        max-width: 1024px;
        margin: 0 auto 0 auto;
        height: auto;

    }

    .title
    {
        padding: var(--spacing-xl) 0 var(--spacing-xl) 0;
    }
</style>