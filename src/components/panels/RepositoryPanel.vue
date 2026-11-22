<script setup lang="ts">
    import LeftPanel from './LeftPanel.vue';
    import { OnyksToastContainer } from 'onyks-web-ui';
    import { repository } from '../../utils/repository.js';
    import { useProfileStore } from '../../stores/profile.js';
    import { openPath } from '@tauri-apps/plugin-opener';
    import { reactive } from 'vue';
    import { services } from '@bloodstone/utils/api';
    import { invoke } from '@tauri-apps/api/core';
    
    const profile_store = useProfileStore()

    const btns = reactive({
        repository:
        {
            push: false,
            pull: false,
            reset: false,
            revert: false
        }
    })

    const handle_click = async (key) =>
    {
        switch(key)
        {
            case 'push':
                btns.repository.push = true
                console.log(await repository.push(profile_store.profile.path + '\\' + profile_store.profile.repository.name, profile_store.profile.username, profile_store.profile.password))
                btns.repository.push = false
                break;

            case 'pull':
                btns.repository.pull = true
                console.log(await repository.pull(profile_store.profile.path + '\\' + profile_store.profile.repository.name, profile_store.profile.username, profile_store.profile.password, profile_store.profile.repository.address))
                btns.repository.pull = false
                break;

            case 'reset':
                btns.repository.reset = true
                console.log(await repository.reset(profile_store.profile.path + '\\' + profile_store.profile.repository.name))
                btns.repository.reset = false
                break;

            case 'revert':
                btns.repository.revert = true
                console.log(await repository.revert(profile_store.profile.path + '\\' + profile_store.profile.repository.name))
                btns.repository.revert = false
                break;

            case 'explorer':
                await openPath(profile_store.profile.path + '\\' + profile_store.profile.repository.name)
                break;

            case 'update':
                console.log(await invoke('dblib_generate_dsn', {
                    path: profile_store.profile.path,
                    fileName: profile_store.profile.name,
                    server: profile_store.profile.database.address ?? '',
                    port: Number(profile_store.profile.database.port),
                    database: profile_store.profile.name,
                    username: profile_store.profile.username,
                    password: profile_store.profile.password,
                    sslmode: 'require'
                }))

                const connectionString = await invoke<string>('dblib_connectionstring', {
                    dsnPath: profile_store.profile.path + '\\' + profile_store.profile.name + '.dsn'
                })

                console.log(connectionString)

                let content = await invoke<string>('dblib_init', {
                    schemaName: '',
                    connectionString,
                    lastFocusedTable: ''
                })

                let tables = await services.tables.list()
                const allTables = [...tables.data.items]

                while (allTables.length < tables.data.total)
                {
                    const nextTables = await services.tables.list({
                        page: tables.data.page + 1,
                        limit: tables.data.limit
                    })

                    if (!nextTables.data.items.length)
                        break

                    allTables.push(...nextTables.data.items)
                    tables = nextTables
                }

                let suppliers = await services.suppliers.list()
                const allSuppliers = [...suppliers.data.items]

                while (allSuppliers.length < suppliers.data.total)
                {
                    const nextSuppliers = await services.suppliers.list({
                        page: suppliers.data.page + 1,
                        limit: suppliers.data.limit
                    })

                    if (!nextSuppliers.data.items.length)
                        break

                    allSuppliers.push(...nextSuppliers.data.items)
                    suppliers = nextSuppliers
                }

                console.log(suppliers)

                const fields = [
                    { key: 'uuid',                  fieldType: 0, label: 'UUID' },
                    { key: 'library_reference',     fieldType: 1, label: '[Library Ref]' },
                    { key: 'library_path',          fieldType: 1, label: '[Library Path]' },
                    { key: 'footprint_reference_1', fieldType: 1, label: '[Footprint Ref]' },
                    { key: 'footprint_path_1',      fieldType: 1, label: '[Footprint Path]' },
                    { key: 'footprint_reference_2', fieldType: 1, label: '[Footprint Ref 2]' },
                    { key: 'footprint_path_2',      fieldType: 1, label: '[Footprint Path 2]' },
                    { key: 'footprint_reference_3', fieldType: 1, label: '[Footprint Ref 3]' },
                    { key: 'footprint_path_3',      fieldType: 1, label: '[Footprint Path 3]' },
                    { key: 'part_name',             fieldType: 1, label: 'Part Number' },
                    { key: 'manufacturer',          fieldType: 1, label: 'Manufacturer' },
                    { key: 'description',           fieldType: 1, label: 'Description' },
                    { key: 'value',                 fieldType: 1, label: 'Value' },
                    { key: 'availability',          fieldType: 1, label: 'Availability' },
                    { key: 'tags',                  fieldType: 1, label: 'Tags' },
                ]

                for(let i=0; i<allSuppliers.length; i++)
                {
                    fields.push({key: 'supplier_' + allSuppliers[i].id, 
                    label: `Supplier (${allSuppliers[i].name})`, fieldType: 1})
                }
                
                content += await invoke<string>('dblib_generate_tables', {
                    tableNames: allTables.map(table => table.name)
                })

                let fieldIndex = 1
                for (const table of allTables)
                {
                    content += await invoke<string>('dblib_generate_fields', {
                        index: fieldIndex,
                        tableName: table.name,
                        fields: fields.map(field => ({
                            key: field.key,
                            fieldType: field.fieldType,
                            label: field.label
                        }))
                    })
                    fieldIndex += fields.length
                }

                // SAVE
                console.log(await invoke('dblib_save', {
                    path: profile_store.profile.path,
                    fileName: profile_store.profile.name,
                    content
                }))

                break;
        }
    }
</script>

<template>
    <LeftPanel title="Repository" class="panel">
        <!-- <onyks-alert class="alert">Last update: 22.22.2026, 12:22:2321</onyks-alert> -->
        <onyks-container type="grid" cols="2" gap="m" class="btns-container">
            <onyks-button  class="btn" background="green" @click="handle_click('push')" :disabled="btns.repository.push">Push</onyks-button>
            <onyks-button  class="btn" background="blue" @click="handle_click('pull')" :disabled="btns.repository.pull">Pull</onyks-button>
            <onyks-button  class="btn" background="red" @click="handle_click('reset')" :disabled="btns.repository.reset">Reset</onyks-button>
            <onyks-button  class="btn" background="yellow" @click="handle_click('revert')" :disabled="btns.repository.revert">Revert</onyks-button>
            <onyks-button  class="btn" background="gray" @click="handle_click('explorer')">Explorer</onyks-button>
        </onyks-container>
        <onyks-header size="xl">Database</onyks-header>
        <!-- <onyks-alert class="alert">Last update: 22.22.2026, 12:22:2321</onyks-alert> -->
        <onyks-container type="grid" cols="2" gap="m" class="btns-container">
            <onyks-button @click="handle_click('update')">Update</onyks-button>
        </onyks-container>
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