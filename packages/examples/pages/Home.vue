<template>
    <NpPageActions :primary-action="{ content: 'Save' }" :secondary-actions="[{ content: 'Delete', destructive: true }]" />

    <NpCard padding="0">
        <NpResourceList :resource-name="resourceName" :items="items" :selected-items="selectedItems"
            @selectionChange="setSelectedItems" :promoted-bulk-actions="promotedBulkActions" :bulk-actions="bulkActions">
            <template #default="{ item: { url, name, location }, id }">
                <NpResourceItem :id="id" :url="url" :accessibility-label="`View details for ${name}`">
                    <template #media>
                        <NpAvatar customer size="md" :name="name" />
                    </template>
                    <NpText variant="bodyMd" font-weight="bold" as="h3">
                        {{ name }}
                    </NpText>
                    <div>{{ location }}</div>
                </NpResourceItem>
            </template>
        </NpResourceList>
    </NpCard>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { NpPageActions, NpColorPicker, NpCard, NpText, NpAvatar, NpResourceList, NpResourceItem } from "@ncpl/ncpl-polaris"
import { SearchMinor, NoteMinor } from "@ncpl/ncpl-icons";



const selectedOptions = ref<string[]>(['rustic', 'antique'])

const selected = ref([]);
const selectedDates = ref({
    start: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
    end: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
});

const selectedItems = ref([]);

const resourceName = {
    singular: 'customer',
    plural: 'customers',
};

const items = [
    {
        id: '103',
        url: '#',
        name: 'Mae Jemison',
        location: 'Decatur, USA',
    },
    {
        id: '203',
        url: '#',
        name: 'Ellen Ochoa',
        location: 'Los Angeles, USA',
    },
];

const promotedBulkActions = [
    {
        content: 'Edit customers',
        onAction: () => console.log('Todo: implement bulk edit'),
    },
];

const bulkActions = [
    {
        content: 'Add tags',
        onAction: () => console.log('Todo: implement bulk add tags'),
    },
    {
        content: 'Remove tags',
        onAction: () => console.log('Todo: implement bulk remove tags'),
    },
    {
        content: 'Delete customers',
        onAction: () => console.log('Todo: implement bulk delete'),
    },
];

const setSelectedItems = (e) => { selectedItems.value = e }

</script>