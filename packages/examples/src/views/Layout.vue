<template>
  <ExampleWrapper height="420">
    <LayoutDefault></LayoutDefault>
  </ExampleWrapper>
  <NpText as="h2">Layout</NpText>
  <ComponentApiList :apis="apis" />

  <NpText as="h2" style="margin-top:10px">LayoutSection</NpText>
  <ComponentApiList :apis="sectionApis" />
</template>
<script setup lang="ts">
import { NpText } from "@ncpl/ncpl-polaris";
import ComponentApiList from "../components/ComponentApiList.vue";
import { ComponentApiType } from "../types"

import ExampleWrapper from "../components/ExampleWrapper.vue";
import LayoutDefault from "./Layout/LayoutDefault.vue";


const apis = [{
  label: 'Props',
  types: [
    { name: "sectioned", type: "boolean", description: "Automatically adds sections to layout." },
  ]
}] as ComponentApiType[];

const sectionApis = [{
  label: 'Props',
  types: [
    { name: "variant", type: "'oneHalf' | 'oneThird' | 'fullWidth'" },
  ]
}] as ComponentApiType[];

</script>