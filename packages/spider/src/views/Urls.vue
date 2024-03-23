<template>
    <NpIndexTable :rows="resource.data" :resource-name="resource.name" :headings="resource.headings" selectable
        v-model:selected="selectedResources">
        <template #default="{ index, row }">
            <NpIndexTableRow>
                <NpIndexTableCell>#{{ row.id }}</NpIndexTableCell>
                <NpIndexTableCell>{{ row.url }}</NpIndexTableCell>
            </NpIndexTableRow>
        </template>
    </NpIndexTable>
</template>
<script setup lang="ts">
import { ref } from "vue";
import request from "../request"
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { NpIndexTable, NpIndexTableRow, NpIndexTableCell } from "@ncpl/ncpl-polaris";


const resource = ref<{
    name: { singular: string; plural: string };
    headings: { title: string }[];
    data: any[];
}>({
    name: {
        singular: '链接',
        plural: '链接',
    },
    headings: [
        { title: 'ID' },
        { title: '链接' },
    ],
    data: [],
})

const selectedResources = ref([]);
</script>