<template>
  <ExampleWrapper height="220">
    <EmptyStateDefault></EmptyStateDefault>
  </ExampleWrapper>
  <ComponentApiList :apis="apis" />
</template>
<script setup lang="ts">

import ExampleWrapper from "../components/ExampleWrapper.vue";
import EmptyStateDefault from "./EmptyState/EmptyStateDefault.vue";

import ComponentApiList from "../components/ComponentApiList.vue";
import { ComponentApiType } from "../types"


const apis = [{
  label: 'Props',
  types: [
    { name: "heading", type: "string", description: "The empty state heading" },
    { name: "image", type: "string", description: "The path to the image to display.The image should have ~40px of white space above when empty state is used within a card, modal, or navigation component" },
    { name: "largeImage", type: "string", description: "The path to the image to display on large screens" },
    { name: "imageContained", type: "boolean", description: "Whether or not to limit the image to the size of its container on large screens" },
    { name: "fullWidth", type: "boolean", description: "Whether or not the content should span the full width of its container " },
    {
      name: "action", type: "ComplexAction", description: "Primary action for empty state", expands: [
        { name: "id", type: "string", description: "A unique identifier for the action." },
        { name: "content", type: "string", description: "Content the action displays." },
        { name: "accessibilityLabel", type: "string", description: "Visually hidden text for screen readers." },
        { name: "url", type: "string", description: "A destination to link to, rendered in the action." },
        { name: "external", type: "boolean", description: "Forces url to open in a new tab." },
        { name: "target", type: "'_blank' | '_self' | '_parent' | '_top'", description: "Where to display the url." },
        { name: "onAction", type: "() => void", description: "Callback when an action takes place." },
        { name: "onMouseEnter", type: "() => void", description: "Callback when mouse enter." },
        { name: "onTouchStart", type: "() => void", description: "Callback when element is touched." },
        { name: "disabled", type: "boolean", description: "Whether or not the action is disabled." },
        { name: "destructive", type: "boolean", description: "Destructive action." },
        { name: "icon", type: "any", description: "Source of the icon." },
        { name: "outline", type: "boolean", description: "Should action be displayed as an outlined button." },
        { name: "loading", type: "boolean", description: "Should a spinner be displayed." },
        { name: "plain", type: "boolean", description: "Should action be displayed as a plain link." },
      ]
    },
    {
      name: "secondaryAction", type: "ComplexAction", description: "Secondary action for empty state", expands: [
        { name: "id", type: "string", description: "A unique identifier for the action." },
        { name: "content", type: "string", description: "Content the action displays." },
        { name: "accessibilityLabel", type: "string", description: "Visually hidden text for screen readers." },
        { name: "url", type: "string", description: "A destination to link to, rendered in the action." },
        { name: "external", type: "boolean", description: "Forces url to open in a new tab." },
        { name: "target", type: "'_blank' | '_self' | '_parent' | '_top'", description: "Where to display the url." },
        { name: "onAction", type: "() => void", description: "Callback when an action takes place." },
        { name: "onMouseEnter", type: "() => void", description: "Callback when mouse enter." },
        { name: "onTouchStart", type: "() => void", description: "Callback when element is touched." },
        { name: "disabled", type: "boolean", description: "Whether or not the action is disabled." },
        { name: "destructive", type: "boolean", description: "Destructive action." },
        { name: "icon", type: "any", description: "Source of the icon." },
        { name: "outline", type: "boolean", description: "Should action be displayed as an outlined button." },
        { name: "loading", type: "boolean", description: "Should a spinner be displayed." },
        { name: "plain", type: "boolean", description: "Should action be displayed as a plain link." },
      ]
    },
  ],
}] as ComponentApiType[];

</script>