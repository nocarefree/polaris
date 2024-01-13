<template>
    <ExampleWrapper height="220">
      <BannerDefault></BannerDefault>
    </ExampleWrapper>
    <ComponentApiList :apis="apis" />
  </template>
  <script setup lang="ts">
  
  import ExampleWrapper from "../components/ExampleWrapper.vue";
  import BannerDefault from "./Banner/BannerDefault.vue";
  
  import ComponentApiList from "../components/ComponentApiList.vue";
  import { ComponentApiType } from "../types"
  
  
  const apis = [{
    label: 'Props',
    types: [],
  }] as ComponentApiType[];
  
  </script>