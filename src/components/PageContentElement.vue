<template>
    <div class="page">
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
        /* height: 100%; */
        /* padding: 0 0 0 var(--spacing-md); */
    }
</style>