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
        <NpFilters v-model:query-value="search.queryValue" :filters="filters">
          <template #filter="{ filter }">
            <NpTextField v-if="filter.key == 'taggedWith'" label="Tagged with" v-model="search.filters.taggedWith"
              auto-complete="off" label-hidden />
            <NpChoiceList v-else title="Availability" title-hidden :choices="filterChoices[filter.key]"
              v-model="search.filters[filter.key]" allow-multiple />
          </template>
          <div :style="{ paddingLeft: '8px' }">
            <NpButton variant="tertiary"> Save</NpButton>
          </div>
        </NpFilters>
      </template>
    </NpResourceList>
  </NpCard>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { NpCard, NpResourceList, NpFilters, NpResourceItem, NpAvatar, NpButton, NpChoiceList, NpTextField } from "@ncpl/ncpl-polaris";



const handleClearAll = () => {

};

const search = reactive({
  queryValue: '',
  filters: {
    taggedWith: '',
    availability: [],
    productType: [],
  }
});

const filterChoices = {
  availability: [
    { label: 'Online Store', value: 'Online Store' },
    { label: 'Point of Sale', value: 'Point of Sale' },
    { label: 'Buy Button', value: 'Buy Button' },
  ],
  productType: [
    { label: 'T-Shirt', value: 'T-Shirt' },
    { label: 'Accessory', value: 'Accessory' },
    { label: 'Gift card', value: 'Gift card' },
  ]
}

const filters = [
  {
    key: 'availability',
    label: 'Availability',
  }, {
    key: 'productType',
    label: 'Product type',
  },
  {
    key: 'taggedWith',
    label: 'Tagged with',
    shortcut: true,
  },
];


</script>