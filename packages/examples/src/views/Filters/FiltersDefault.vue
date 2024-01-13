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
          <NpText as="h3" variant="bodyMd" fontWeight="bold">
            {{ name }}
          </NpText>
          <div>{{ location }}</div>
        </NpResourceItem>
      </template>
      <template #filterControl>
        <NpFilters v-model:query-value="search.queryValue" :filters="filters" :applied-filters="appliedFilters"
          @clearAll="handleFiltersClearAll">
          <template #filter="{ filter }">
            <NpTextField v-if="filter.key == 'taggedWith'" label="Tagged with" :model-value="search.filters.taggedWith"
              @update:model-value="onUpdateTagged" auto-complete="off" label-hidden />
            <NpChoiceList v-else title="Availability" title-hidden :choices="filterChoices[filter.key]"
              v-model:selected="search.filters[filter.key]" allow-multiple />
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
import { ref, reactive, watch } from "vue";
import { NpCard, NpResourceList, NpFilters, NpResourceItem, NpAvatar, NpButton, NpChoiceList, NpTextField, NpText } from "@ncpl/ncpl-polaris";


const taggedWith = ref<string>('');

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

const filters = ref([
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
]);

const appliedFilters = ref([]);

const onUpdateTagged = (v) => {
  console.log(v);
  //search.filters.taggedWith = v
}

watch(() => [search.filters.availability, search.filters.productType, search.filters.taggedWith], () => {
  const { availability, productType, taggedWith } = search.filters;
  const _appliedFilters = [];
  if (!isEmpty(availability)) {
    const key = 'availability';
    _appliedFilters.push({
      key,
      label: disambiguateLabel(key, availability),
      onRemove: () => {
        search.filters.availability = [];
      },
    });
  }
  if (!isEmpty(productType)) {
    const key = 'productType';
    _appliedFilters.push({
      key,
      label: disambiguateLabel(key, productType),
      onRemove: () => {
        search.filters.productType = [];
      },
    });
  }
  if (!isEmpty(taggedWith)) {
    const key = 'taggedWith';
    _appliedFilters.push({
      key,
      label: `Tagged with ${taggedWith}`,
      onRemove: () => {
        search.filters.taggedWith = '';
      },
    });
  }
  appliedFilters.value = _appliedFilters;
})

const handleFiltersClearAll = () => {
  search.filters.availability = [];
  search.filters.productType = [];
  search.filters.taggedWith = '';
}


function isEmpty(value: string | string[]): boolean {
  if (Array.isArray(value)) {
    return value.length === 0;
  } else {
    return value === '' || value == null;
  }
}

function disambiguateLabel(key: string, value: string[]): string {
  switch (key) {
    case 'taggedWith':
      return `Tagged with ${value}`;
    case 'availability':
      return value.map((val) => `Available on ${val}`).join(', ');
    case 'productType':
      return value.join(', ');
    default:
      return value.toString();
  }
}
</script>