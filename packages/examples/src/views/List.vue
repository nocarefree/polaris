<template>
  <NpText variant="headingMd" as="h2">
    List
  </NpText>
  <ComponentApiList :apis="listApis" />
  <NpText variant="headingMd" as="h2">
    ListItem
  </NpText>
  <ComponentApiList :apis="listItemApis" />
</template>
<script setup lang="ts">
import ComponentApiList from "../components/ComponentApiList.vue";
import { ComponentApiType } from "../types"
import { NpText } from "@ncpl/ncpl-polaris";

const listApis = [
  {
    label: 'Props',
    types: [
      {
        name: 'gap',
        type: "'extraTight' | 'loose'",
        description: 'Determines the space between list items.',
        defaultValue: 'loose',
      },
      {
        name: 'type',
        type: "'bullet' | 'number'",
        description: 'Type of list to display.',
        defaultValue: 'bullet',
      },
    ]
  },
] as ComponentApiType[];

const listItemApis = [
] as ComponentApiType[];
</script>