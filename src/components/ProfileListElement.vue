<template>
    <onyks-list-element size="m">
        <div class="row">
            <onyks-avatar shape="square" type="emoji" src="🫠" size="xl"></onyks-avatar>
            <div class="col">
                <h3 class="profile-name">Marek Lowca Pieczarek</h3>
                <div class="last-time-used">Last time used: 14:22, 22.04.2026</div>
            </div>
        </div>
    </onyks-list-element>
</template>

<style>
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

    .profile-name 
    {
        font-weight: bold;
    }

    .last-time-used 
    {
        font-size: var(--size-md);
    }

</style>