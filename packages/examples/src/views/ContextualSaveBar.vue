<template>
  <ComponentApiList :apis="apis" />
</template>
<script setup lang="ts">

import ExampleWrapper from "../components/ExampleWrapper.vue";

import ComponentApiList from "../components/ComponentApiList.vue";
import { ComponentApiType } from "../types"


const apis = [{
  label: 'Props',
  types: [
    { name: "alignContentFlush", type: "boolean", description: "Extend the contents section to be flush with the left edge" },
    { name: "message", type: "string", description: "Accepts a string of content that will be rendered to the left of the actions" },
    {
      name: "saveAction",
      type: "ContextualSaveBarAction",
      description: "Save or commit contextual save bar action with text defaulting to 'Save'",
      expands: [
        {
          name: 'ContextualSaveBarAction',
          types: [
            { name: 'url', type: 'string', description: 'A destination to link to.' },
            { name: 'content', type: 'string', description: 'Content the action displays.' },
            { name: 'loading', type: 'boolean', description: 'Should a spinner be displayed.' },
            { name: 'disabled', type: 'boolean', description: 'Should the action be disabled.' },
            { name: 'onAction', type: '() => void', description: 'Callback when an action takes place.' },
          ],
        }
      ]
    },
    {
      name: "discardAction",
      type: "ContextualSaveBarDiscardActionProps & ContextualSaveBarAction;",
      description: "Discard or cancel contextual save bar action with text defaulting to 'Discard'",
      expands: [
        {
          name: 'ContextualSaveBarDiscardActionProps',
          types: [
            { name: 'discardConfirmationModal', type: 'boolean', description: 'Whether to show a modal confirming the discard action.' },
          ],
        },
        {
          name: 'ContextualSaveBarAction',
          types: [
            { name: 'url', type: 'string', description: 'A destination to link to.' },
            { name: 'content', type: 'string', description: 'Content the action displays.' },
            { name: 'loading', type: 'boolean', description: 'Should a spinner be displayed.' },
            { name: 'disabled', type: 'boolean', description: 'Should the action be disabled.' },
            { name: 'onAction', type: '() => void', description: 'Callback when an action takes place.' },
          ],
        }
      ]
    },
    { name: "fullWidth", type: "boolean", description: "Remove the normal max-width on the contextual save bar" },
    { name: "contextControl", type: "Component", description: "Accepts a component that is used to help users switch between different contexts" },
    { name: "secondaryMenu", type: "Component", description: "Accepts a node that is rendered to the left of the discard and save actions" },

  ],
}] as ComponentApiType[];

</script>