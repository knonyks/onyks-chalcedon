<script setup>
    const model = defineModel()
</script>

<template>
    <onyks-select class="selector" @change="model.handle_change">
        <onyks-select-option :value="index" v-for="(item, index) in model.items" :key="item.name">
            <onyks-container type="group" gap="m" align="center">
                <onyks-avatar style="width: auto; height: auto;" size="l" :src="item.avatar"></onyks-avatar>
                <onyks-header size="xl">{{ item.name }}</onyks-header>
            </onyks-container>
        </onyks-select-option>
    </onyks-select>
</template> 

<style lang="css" scoped>
    .selector
    {
        display: block;
        width: 100%;
        height: 100%;
        min-height: 0;
        box-sizing: border-box;
        overflow-y: auto;
    }

    onyk-avatar
    {
        width: auto;
        height: auto;
    }
</style>