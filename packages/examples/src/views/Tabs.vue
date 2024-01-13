<template>
  <ComponentApiList :apis="apis" />
</template>
<script setup lang="ts">
import ComponentApiList from "../components/ComponentApiList.vue";

const apis = [
  {
    label: 'Props',
    types: [
      {
        name: 'selected',
        type: 'number',
        required: true,
        description: 'The index of the currently selected Tab.'
      },
      {
        name: 'tabs',
        required: true,
        type: 'TabProps[]',
        expands: [{
          name: 'TabProps',
          types: [
            { name: 'id', type: 'string', required: true, description: 'The unique identifier for the Tab.' },
            { name: 'content', type: 'string', required: true, description: 'The name of the Tab.' },
            { name: 'panelId', type: 'string', description: 'A unique identifier for the panel.' },
            { name: 'accessibilityLabel', type: 'string', description: 'The accessible label for the Tab, if the name alone does not give enough context' },
            { name: 'badge', type: 'string', description: 'A badge to render next to the view name.' },
            { name: 'icon', type: 'Component', description: 'An icon to render in place of a view name. Please pass the full Icon component.' },
            { name: 'url', type: 'string', description: 'Optional URL if the Tab points to a location.' },
            { name: 'isLocked', type: 'string', description: 'If true, will remove the ability to edit/rename/delete the view.' },
            { name: 'disabled', type: 'boolean', description: 'Whether the Tab is disabled.' },
            {
              name: 'actions',
              type: 'TabActionDescriptor[]',
              expands: [{
                name: 'TabActionDescriptor',
                types: [
                  { name: 'type', type: "'rename' | 'edit'  | 'edit-columns'  | 'duplicate' | 'delete'", required: true, },
                  { name: 'onAction', type: "(name: string) => void" },
                  { name: 'onPrimaryAction', type: "(name: string) => Promise<boolean> | void" }
                ]
              }], description: 'A list of actions which map to actions that a merchant can take with this.'
            },
          ]
        }],
        description: 'The items that map to each Tab.',
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
]
</script>