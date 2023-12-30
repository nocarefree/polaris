<template>
  <NpCard padding="0">
    <NpResourceList :resource-name="{ singular: 'customer', plural: 'customers' }" flush-filters :items="[
      {
        id: '341',
        url: '#',
        name: 'Mae Jemison',
        location: 'Decatur, USA',
      },
      {
        id: '256',
        url: '#',
        name: 'Ellen Ochoa',
        location: 'Los Angeles, USA',
      },
    ]">
      <template #default="{ item: { id, url, name, location } }">
        <NpResourceItem :id="id" :url="url" :accessibility-label="`View details for ${name}`">
          <template #media>
            <NpAvatar customer size="md" name="name" />
          </template>
          <Text as="h3" variant="bodyMd" fontWeight="bold">
            {{ name }}
          </Text>
          <div>{{ location }}</div>
        </NpResourceItem>
      </template>
      <template #filterControl>
        <NpFilters v-model:query-value="queryValue" :filters="filters">
          <div :style="{ paddingLeft: '8px' }">
            <NpButton variant="tertiary"> Save</NpButton>
          </div>
        </NpFilters>
      </template>
    </NpResourceList>
  </NpCard>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { NpCard, NpResourceList, NpFilters, NpResourceItem, NpAvatar, NpButton } from "@ncpl/ncpl-polaris";


const taggedWith = ref<string>();
const queryValue = ref<string>();

const handleTaggedWithChange = (value: string) => taggedWith.value = value;
const handleQueryValueChange = (value: string) => queryValue.value = value;
const handleTaggedWithRemove = () => taggedWith.value = undefined;
const handleQueryValueRemove = () => queryValue.value = undefined;

const handleClearAll = () => {
  handleTaggedWithRemove();
  handleQueryValueRemove();
};

const filters = [
  {
    key: 'taggedWith',
    label: 'Tagged with',
    shortcut: true,
  },
];


</script>