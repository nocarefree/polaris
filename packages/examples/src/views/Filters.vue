<template>
  <ExampleWrapper height="500">
    <FiltersDefault></FiltersDefault>
  </ExampleWrapper>
  <ComponentApiList :apis="apis" />
</template>
<script setup lang="ts">
import ComponentApiList from "../components/ComponentApiList.vue";
import { ComponentApiType } from "../types"

import ExampleWrapper from "../components/ExampleWrapper.vue";
import FiltersDefault from "./Filters/FiltersDefault.vue";

const apis = [
  {
    label: 'Props',
    types: [
      {
        name: 'sortSelected',
        type: 'string[]',
        description: 'The currently selected sort choice. Required if using sorting.'
      },
      {
        name: 'mode',
        required: true,
        type: 'IndexFiltersMode',
        expands: [{
          name: 'IndexFiltersMode',
          kind: 'enum',
          types: [
            { name: 'Default', required: true, type: 'DEFAULT' },
            { name: 'Filtering', required: true, type: 'FILTERING' },
            { name: 'EditingColumns', required: true, type: 'EDITING_COLUMNS' },
          ]
        }],
        description: 'The current mode of the IndexFilters component. Used to determine which view to show.',
      },
      {
        name: 'sortOptions',
        type: 'SortButtonChoice[]',
        expands: [{
          name: 'SortButtonChoice',
          types: [
            { name: 'label', required: true, type: 'string' },
            { name: 'disabled', type: 'boolean' },
            { name: 'value', type: "'asc' | 'desc'" },
            { name: 'directionLabel', type: 'string' }
          ]
        }],
        description: 'The available sorting choices. If not present, the sort button will not show.'
      },
      {
        name: 'primaryAction',
        type: 'IndexFiltersPrimaryAction[]',
        description: 'The primary action to display.'
      },
      {
        name: 'cancelAction',
        type: 'IndexFiltersCancelAction',
        description: 'The cancel action to display.',
      },

    ]
  },
  {
    label: 'Events',
    types: [
      { name: 'update:mode' },
      { name: 'update:selected' },
      { name: 'update:queryValue' },
      { name: 'update:sortSelected' }
    ]
  },
  {
    label: 'Slots',
    types: [
      {
        name: 'primaryAction',
      },
    ]
  }
] as ComponentApiType[];
</script>