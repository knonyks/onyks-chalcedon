<script setup lang="ts">
    import LeftPanel from './LeftPanel.vue';
    import {useProfileStore} from '../../stores/profile.js'
    import { invoke } from '@tauri-apps/api/core';

    const profile_store = useProfileStore()

    const handle_click = async () =>
    {
        let obj = 
        {
            file_name: 'mareczek',
            path: profile_store.profile.path,
            connection_string: '',
            tables:
            [
                'hanka_w_kartonach',
                'tabela',
                'wiktor_w_broken_pranks'
            ],
            columns:
            [
                {
                    label: "Part Name",
                    key: "part_name"
                },
                {

                }
            ]
        }
        obj.connection_string = `Provider=MSDASQL.1;Persist Security Info=False;Extended Properties="DRIVER={DuckDB Driver};Database=${obj.path}\\${obj.file_name}.duckdb;FILEDSN=${obj.path}\\${obj.file_name}.dsn;"`;

        console.log(obj)
        await invoke('dblib_generate_dsn', {path: obj.path, fileName: obj.file_name})
        await invoke('db_connection_string', {value: obj.connection_string})
        for(let i = 0; i < obj.tables.length; i++)
        {
            await invoke('db_add_table', {table: obj.tables[i]})
        }

        for(let i = 0; i < obj.tables.length; i++)
        {
            for(let i = 0; i < obj.columns.length; i++)
            {
                await invoke('db_field_map', {
                    table: obj.tables[i],
                    label: obj.columns[i].label,
                    key: obj.columns[i].key
                })
            }
        }
    }
</script>

<template>
    <LeftPanel title="Database">
        <onyks-button class="btn" background="green" @click="handle_click">Update</onyks-button>
    </LeftPanel>
</template>

<style scoped>
    .btn
    {
        width: 150px;
    }
</style>