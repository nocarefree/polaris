<template>
  <MetricLayout>
    <template #title>
      <Title :title="title" :popover="popover"></Title>
    </template>
  </MetricLayout>
</template>
<script setup lang="ts">
import Title from "./components/Title";
import MetricLayout from "../MetricLayout";

defineProps<{
  title: string;
  wrapper?: "card";
  popover?: {
    formula?: string;
    definition?: string;
  }
}>();
</script>
