<script setup lang="ts">
    import LeftPanel from './LeftPanel.vue';
    import { OnyksToastContainer } from 'onyks-web-ui';
    import { repository } from '../../utils/repository.js';
    import { useProfileStore } from '../../stores/profile.js';
    import { openPath } from '@tauri-apps/plugin-opener';
    import { reactive } from 'vue';
    import { services } from '@bloodstone/utils/api';
    import { invoke } from '@tauri-apps/api/core';
import { sleep } from '../../utils/tools.js';
    
    const profile_store = useProfileStore()

    const btns = reactive({
        repository:
        {
            push: false,
            pull: false,
            reset: false,
            revert: false
        },
        database:
        {
            update: false
        }
    })

    const status = reactive({
        repository:
        {
            text: 'Repository is ready to use',
            state: false,
            index: 0,
            max: 100
        },
        database:
        {
            text: '',
            index: 0,
            max: 100
        }
    })

    const handle_click = async (key) =>
    {
        switch(key)
        {
            case 'push':
                if(status.repository.state)
                    return
                btns.repository.push = true
                status.repository.state = true
                status.repository.text = "Pushing changes..."
                status.repository.index = 30
                await sleep(1000)
                let result = await repository.push(profile_store.profile.path + '\\' + profile_store.profile.repository.name, profile_store.profile.username, profile_store.profile.password)
                if(result)
                {
                    status.repository.text = "Repository is ready to use"
                }
                else
                {
                    status.repository.text = "Error..."
                }
                status.repository.index = 100
                await sleep(1000)
                status.repository.index = 0
                btns.repository.push = false
                status.repository.state = false
                break;

            case 'pull':
                if(status.repository.state)
                    return
                btns.repository.pull = true
                status.repository.state = true
                status.repository.text = "Pulling changes..."
                status.repository.index = 30
                await sleep(1000)
                const pullResult = await repository.pull(profile_store.profile.path + '\\' + profile_store.profile.repository.name, profile_store.profile.username, profile_store.profile.password, profile_store.profile.repository.address)
                status.repository.text = pullResult ? "Repository is ready to use" : "Error..."
                status.repository.index = 100
                await sleep(1000)
                status.repository.index = 0
                btns.repository.pull = false
                status.repository.state = false
                break;

            case 'reset':
                if(status.repository.state)
                    return
                btns.repository.reset = true
                status.repository.state = true
                status.repository.text = "Resetting repository..."
                status.repository.index = 30
                await sleep(1000)
                const resetResult = await repository.reset(profile_store.profile.path + '\\' + profile_store.profile.repository.name)
                status.repository.text = resetResult ? "Repository is ready to use" : "Error..."
                status.repository.index = 100
                await sleep(1000)
                status.repository.index = 0
                btns.repository.reset = false
                status.repository.state = false
                break;

            case 'revert':
                if(status.repository.state)
                    return
                btns.repository.revert = true
                status.repository.state = true
                status.repository.text = "Reverting changes..."
                status.repository.index = 30
                await sleep(1000)
                const revertResult = await repository.revert(profile_store.profile.path + '\\' + profile_store.profile.repository.name)
                status.repository.text = revertResult ? "Repository is ready to use" : "Error..."
                status.repository.index = 100
                await sleep(1000)
                status.repository.index = 0
                btns.repository.revert = false
                status.repository.state = false
                break;

            case 'explorer':
                await openPath(profile_store.profile.path + '\\' + profile_store.profile.repository.name)
                break;

            case 'update':
                if (btns.database.update)
                    return
                btns.database.update = true
                status.database.text = 'Generating DSN...'
                status.database.index = 10
                try
                {
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

                await sleep(1000)
                status.database.text = 'Generating connection string...'
                status.database.index = 20

                const connectionString = await invoke<string>('dblib_connectionstring', {
                    dsnPath: profile_store.profile.path + '\\' + profile_store.profile.name + '.dsn'
                })

                console.log(connectionString)
                await sleep(1000)
                status.database.text = 'Initializing *.DbLib file...'
                status.database.index = 30
                let content = await invoke<string>('dblib_init', {
                    schemaName: '',
                    connectionString,
                    lastFocusedTable: ''
                })

                await sleep(1000)
                status.database.text = 'Downloading list of tables...'
                status.database.index = 40

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

                await sleep(1000)
                status.database.text = 'Downloading list of suppliers...'
                status.database.index = 50

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

                await sleep(1000)
                status.database.text = 'Configuring the *.DbLib file...'
                status.database.index = 60

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
                status.database.index = 70

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
                status.database.index = 85

                await sleep(1000)
                status.database.text = 'Saving configuration...'
                status.database.index = 90

                // SAVE
                console.log(await invoke('dblib_save', {
                    path: profile_store.profile.path,
                    fileName: profile_store.profile.name,
                    content
                }))

                status.database.text = 'Database is ready to use'
                status.database.index = 100
                }
                catch (error)
                {
                    console.error('Database update failed:', error)
                    status.database.text = 'Database update failed'
                    status.database.index = 100
                }
                finally
                {
                    await sleep(1000)
                    status.database.index = 0
                    btns.database.update = false
                }

                break;
        }
    }
</script>

<template>
    <LeftPanel title="Repository" class="panel">
        <onyks-alert class="alert" type="warning">
            <onyks-container type="stack" gap="m" class="btns-container">
                <onyks-text>{{ status.repository.text }}</onyks-text>
                <onyks-loading-bar animated striped :current-state="status.repository.index" :max="status.repository.max"></onyks-loading-bar>
            </onyks-container>
        </onyks-alert>
        <onyks-container type="grid" cols="2" gap="m" class="btns-container">
            <onyks-button  class="btn" background="green" @click="handle_click('push')" :disabled="btns.repository.push">Push</onyks-button>
            <onyks-button  class="btn" background="blue" @click="handle_click('pull')" :disabled="btns.repository.pull">Pull</onyks-button>
            <onyks-button  class="btn" background="red" @click="handle_click('reset')" :disabled="btns.repository.reset">Reset</onyks-button>
            <onyks-button  class="btn" background="yellow" @click="handle_click('revert')" :disabled="btns.repository.revert">Revert</onyks-button>
            <onyks-button  class="btn" background="gray" @click="handle_click('explorer')">Explorer</onyks-button>
        </onyks-container>
        <onyks-header size="xl">Database</onyks-header>
        <onyks-alert class="alert" type="warning">
            <onyks-container type="stack" gap="m" class="alert-content">
                <onyks-text>{{ status.database.text || 'Database is ready to use' }}</onyks-text>
                <onyks-loading-bar animated striped :current-state="status.database.index" :max="status.database.max"></onyks-loading-bar>
            </onyks-container>
        </onyks-alert>
        <onyks-container type="grid" cols="2" gap="m" class="btns-container">
            <onyks-button :disabled="btns.database.update" @click="handle_click('update')">Update</onyks-button>
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

    .alert-content
    {
        width: 100%;
    }
</style>