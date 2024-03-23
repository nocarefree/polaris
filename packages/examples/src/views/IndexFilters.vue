<template>
  <NpText variant="headingMd" as="h2">
    Anatomy
  </NpText>
  <NpCard padding="0">
    <img src="/assets/images/components/index-filters-anatomy@2x.png" style="width:100%;max-width: 800px;" />
  </NpCard>
  <NpText as="p">Index filters are made up of the following:</NpText>
  <NpList type="number">
    <NpListItem>
      <NpLink url="/components/navigation/tabs">Tabs</NpLink>: A list of saved views. Each tab represents a subset of the
      list that has been sorted, filtered, and
      or queried and saved with a unique name. New views can be created directly from the tab list, or by editing the
      filters, query, or sort selection of an existing view and saving it as new.
    </NpListItem>
    <NpListItem>Search and filter, and sort buttons: The search and filter button allows merchants to toggle the index
      table from "View" mode to "Filter" mode. When clicked, the button reveals the search field and the filters that
      allow merchants to edit or create saved views. The sort button activates a popover displaying a list of options
      merchants can choose from to sort the list items. Merchants can also choose whether the list should be sorted in
      ascending or descending order.</NpListItem>
    <NpListItem>Filters: A set of useful ways to narrow down the list based on the common actions merchants may need to
      take on the data. The filters should present merchants with form inputs that help them include or exclude list items
      from the view based on their data.</NpListItem>
    <NpListItem>Action buttons: Primary and secondary actions that a merchant can take on the current view. The primary
      action will always be either "Save" or "Save as" depending on whether the view is mutable, and the secondary action
      will always be "Cancel".</NpListItem>
  </NpList>
  <ComponentApiList :apis="apis" />
</template>
<script setup lang="ts">
import ComponentApiList from "../components/ComponentApiList.vue";
import { ComponentApiType } from "../types"
import { NpText, NpCard, NpList, NpListItem, NpLink } from "@ncpl/ncpl-polaris";

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