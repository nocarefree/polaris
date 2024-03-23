<template>
  <div @keydown="handleKeyDown" @keyup="event => $emit('keyPress', event)">
    <Box as="ul" padding="200">
      <Item v-for="({ id, content, ...tabProps }, index) in disclosureTabs" :key="id" v-bind="tabProps" :id="id"
        :focused="index === focusIndex" @click="$emit('click', id)">
        {{ content }}
      </Item>
    </Box>
  </div>
</template>
<script setup lang="ts">
import Box from "../../Box"
import Item from "../Item/Item.vue"
import type { TabDescriptor } from '../types';

defineProps<{
  focusIndex: number;
  disclosureTabs: TabDescriptor[];
}>()

function handleKeyDown(event: KeyboardEvent) {
  const { key } = event;

  if (key === 'ArrowLeft' || key === 'ArrowRight') {
    event.preventDefault();
    event.stopPropagation();
  }
}
</script>
