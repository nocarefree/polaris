<template>
  <ExampleWrapper title="Default" height="220">
    <IndexTableDefault></IndexTableDefault>
  </ExampleWrapper>
  <ExampleWrapper title="Default" height="320">
    <IndexTableBulkActions></IndexTableBulkActions>
  </ExampleWrapper>

  <ComponentApiList :apis="apis" />
</template>
<script setup lang="ts">
import ComponentApiList from "../components/ComponentApiList.vue";
import { ComponentApiType } from "../types"

import ExampleWrapper from "../components/ExampleWrapper.vue";
import IndexTableDefault from "./IndexTable/IndexTableDefault.vue";
import IndexTableBulkActions from "./IndexTable/IndexTableBulkActions.vue";

const apis = [{
  label: 'Props',
  types: [
    { name: "resourceName", type: "{ singular: string; plural: string; }" },
    {
      name: "headings", type: "NonEmptyArray<IndexTableHeading>", required: true, expands: [
        {
          name: 'IndexTableHeading',
          types: [
            { name: 'title', type: 'string', required: true },
            { name: 'alignment', type: '"start" | "center" | "end"', description: ' Adjust horizontal alignment of header content.', defaultValue: 'start' },
            { name: 'flush', type: 'boolean' },
            { name: 'new', type: 'boolean' },
            { name: 'hidden', type: 'boolean' },
            { name: 'tooltipContent', type: 'string' },
            { name: 'tooltipWidth', type: '"default" | "wide"' },
            { name: 'tooltipPersistsOnClick', type: 'boolean' },
            { name: 'defaultSortDirection', type: '"ascending" | "descending"' },
          ]
        }
      ]
    },
    { name: 'promotedBulkActions', type: "BulkActionsProps['promotedActions']" },
    { name: 'bulkActions', type: "BulkActionsProps['actions']" },
    { name: 'paginatedSelectAllActionText', type: 'string' },
    { name: 'lastColumnSticky', type: 'boolean' },
    { name: 'selectable', type: 'boolean' },
    { name: 'sortable', type: 'boolean[]', description: "List of booleans, which maps to whether sorting is enabled or not for each column. Defaults to false for all columns." },

    { name: 'defaultSortDirection', type: 'IndexTableSortDirection', description: "The direction to sort the table rows on first click or keypress of a sortable column heading. Defaults to descending.", defaultValue: 'descending' },
    { name: 'sortDirection', type: 'IndexTableSortDirection', description: "The current sorting direction." },
    { name: 'sortColumnIndex', type: 'number', description: 'The index of the heading that the table rows are sorted by.' },
    { name: 'sortToggleLabels', type: 'IndexTableSortToggleLabels', description: "Optional dictionary of sort toggle labels for each sortable column, with ascending and descending label, with the key as the index of the column" },
    { name: 'hasZebraStriping', type: 'boolean', description: "Add zebra striping to table rows" },
    { name: 'itemCount', type: 'number' },
    { name: 'selected', type: 'string[] | "All"' },
    { name: 'rows', type: '{id:string, [string]:any }' },
  ]
}, {
  label: 'Slots',
  types: [
    { name: "default", description: "Text to display before value." },
  ]
}, {
  label: 'Event',
  types: [
    { name: 'update:selected', fun: '(id: string) =>void' },
  ]
}] as ComponentApiType[];

</script>