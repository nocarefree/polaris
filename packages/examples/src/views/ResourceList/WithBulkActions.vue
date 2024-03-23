<template>
  <NpCard padding="0">
    <NpResourceList :resource-name="resourceName" :items="items" v-model:selected="selected"
      :promoted-bulk-actions="promotedBulkActions" :bulk-actions="bulkActions">
      <template #default="{ item: { id, url, name, location } }">
        <NpResourceItem vertical-alignment="center" :id="id" :url="url" :accessibility-label="`View details for ${name}`"
          :name="name">
          <template #media>
            <NpAvatar customer size="md" :name="name" />
          </template>
          <NpText as="h3" variant="bodyMd" font-weight="bold">
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
import { NpCard, NpResourceList, NpResourceItem, NpText, NpAvatar } from "@ncpl/ncpl-polaris";


const resourceName = {
  singular: 'customer',
  plural: 'customers',
};

const items = [
  {
    id: '111',
    url: '#',
    name: 'Mae Jemison',
    location: 'Decatur, USA',
  },
  {
    id: '211',
    url: '#',
    name: 'Ellen Ochoa',
    location: 'Los Angeles, USA',
  },
  {
    id: '311',
    url: '#',
    name: 'Joe Smith',
    location: 'Arizona, USA',
  },
  {
    id: '411',
    url: '#',
    name: 'Haden Jerado',
    location: 'Decatur, USA',
  },
  {
    id: '511',
    url: '#',
    name: 'Tom Thommas',
    location: 'Florida, USA',
  },
  {
    id: '611',
    url: '#',
    name: 'Emily Amrak',
    location: 'Texas, USA',
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

const selected = ref([]);

</script>