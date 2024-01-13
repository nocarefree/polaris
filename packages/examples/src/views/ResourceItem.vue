<template>
  <ExampleWrapper title="Default" height="220">
    <ResourceItemDefault></ResourceItemDefault>
  </ExampleWrapper>

  <ExampleWrapper title="With shortcut actions" height="220">
    <ResourceItemActions></ResourceItemActions>
  </ExampleWrapper>

  <ExampleWrapper title="Vertical content" height="220">
    <ResourceItemVertical></ResourceItemVertical>
  </ExampleWrapper>
  <ComponentApiList :apis="apis" />
</template>
<script setup lang="ts">
import { NpText } from "@ncpl/ncpl-polaris";
import ComponentApiList from "../components/ComponentApiList.vue";
import { ComponentApiType } from "../types"

import ExampleWrapper from "../components/ExampleWrapper.vue";
import ResourceItemDefault from "./ResourceItem/ResourceItemDefault.vue";
import ResourceItemVertical from "./ResourceItem/ResourceItemVertical.vue";
import ResourceItemActions from "./ResourceItem/ResourceItemActions.vue";

const apis = [{
  label: 'Props',
  types: [
    { name: "accessibilityLabel", type: "string", description: "Visually hidden text for screen readers used for item link." },
    { name: "name", type: "string", description: "Individual item name used by various text labels." },
    { name: "ariaControls", type: "string", description: "Id of the element the item onClick controls." },
    { name: "ariaExpanded", type: "boolean", description: "Tells screen reader the controlled element is expanded." },
    { name: "id", type: "string", required: true, description: "Unique identifier for the item." },
    { name: "media", type: "Component", description: "Content for the media area at the left of the item, usually an Avatar or Thumbnail." },
    { name: "persistActions", type: "boolean", description: "Makes the shortcut actions always visible." },
    { name: "shortcutActions", type: "DisableableAction[]", description: "1 or 2 shortcut actions; must be available on the page linked to by url." },
    { name: "sortOrder", type: "number", description: "The order the item is rendered." },
    { name: "url", type: "string", description: "URL for the resource’s details page (required unless onClick is provided)." },
    { name: "external", type: "boolean", description: "Allows url to open in a new tab." },
    { name: "verticalAlignment", type: "'leading' | 'trailing' | 'center' | 'fill' | 'baseline'", description: "Adjust vertical alignment of elements." },
    { name: "dataHref", type: "string", description: "Prefetched url attribute to bind to the main element being returned." },
  ]
}, {
  label: 'Slots',
  types: [
    { name: "prefix", description: "Text to display before value." },
    { name: "suffix", description: "Text to display after value." },
    { name: "verticalContent", description: "Content to vertically display above the input value." },
    { name: "helpText", description: "Additional hint text to display." },
    { name: "label", description: "Label for the input." },
    { name: "connectedRight", description: "An element connected to the right of the input." },
    { name: "connectedLeft", description: "An element connected to the left of the input." },
  ]
}, {
  label: 'Event',
  types: [
    { name: 'update:model-value', fun: '(value: string) =>void' },
    { name: 'focus', fun: '(event: Event) =>void' },
    { name: 'blur', fun: '(event: Event) =>void' },
    { name: 'compositionstart', fun: '(event: Event) =>void' },
    { name: 'compositionupdate', fun: '(event: Event) =>void' },
    { name: 'compositionend', fun: '(event: Event) =>void' },
    { name: 'input', fun: '(event: Event) =>void' },
    { name: 'change', fun: '(event: Event) =>void' },
    { name: 'clear', fun: '() =>void' },
  ]
}] as ComponentApiType[];

</script>