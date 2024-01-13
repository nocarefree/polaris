<template>
  <ExampleWrapper title="With bulk actions" height="500">
    <WithBulkActions></WithBulkActions>
  </ExampleWrapper>

  <ComponentApiList :apis="apis" />
</template>
<script setup lang="ts">
import ComponentApiList from "../components/ComponentApiList.vue";
import { ComponentApiType } from "../types"

import ExampleWrapper from "../components/ExampleWrapper.vue";
import WithBulkActions from "./ResourceList/WithBulkActions.vue";

const apis = [{
  label: 'Props',
  types: [
    { name: "items", type: "TItemType[]", description: "Item data; each item is passed to renderItem" },
    { name: "flushFilters", type: "boolean", description: "Whether to remove all padding around the filter controls. Should be true if using Filters, and false if using LegacyFilters. " },
    { name: "resourceName", type: "{singular: string, plural: string;}", description: "Name of the resource, such as customers or products" },
    { name: "promotedBulkActions", type: "BulkActionsProps['promotedActions']", description: "Up to 2 bulk actions that will be given more prominence" },
    { name: "bulkActions", type: "BulkActionsProps['actions']", description: "Actions available on the currently selected items" },
    { name: "selected", type: "ResourceListSelectedItems", description: "Collection of IDs for the currently selected items" },
    { name: "isFiltered", type: "boolean", description: "Whether or not the list has filter(s) applied" },
    { name: "selectable", type: "boolean", description: "Renders a Select All button at the top of the list and checkboxes in front of each list item. For use when bulkActions aren't provided." },
    { name: "hasMoreItems", type: "boolean", description: "Whether or not there are more items than currently set on the items prop. Determines whether or not to set the paginatedSelectAllAction and paginatedSelectAllText props on the BulkActions component." },
    { name: "loading", type: "boolean", description: "Overlays item list with a spinner while a background action is being performed" },
    { name: "showHeader", type: "boolean", description: "Boolean to show or hide the header" },
    { name: "totalItemsCount", type: "number", description: "Total number of resources" },
    { name: "sortValue", type: "string", description: "Current value of the sort control" },
    { name: "sortOptions", type: "SelectOption[]", description: "Collection of sort options to choose from" },
    { name: "headerContent", type: "string", description: "Custom header text displayed above the list instead of the resource count." },
    { name: "idForItem", type: "(item: TItemType, index: number): string", description: "Function to customize the unique ID for each item" },
    { name: "resolveItemId", type: "(item: TItemType): string", description: "Function to resolve the ids of items" },
  ]
}, {
  label: 'Slots',
  types: [
    { name: "default", description: "Text to display before value." },
    { name: "filterControl", description: "Text to display before value." },
    { name: "alternateTool", description: "Text to display before value." },
    { name: "emptyState", description: "Text to display after value." },
    { name: "emptySearchState", description: "Content to vertically display above the input value." },
  ]
}] as ComponentApiType[];

</script>