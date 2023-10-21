<template>
  <ul :class="styles.List" @keydown="handleKeyDown" @keyup="$emit('keyPress')">
    <Item v-for="({ id, content, ...tabProps }, index) in disclosureTabs" :key="id" v-bind="tabProps" :id="id"
      :focused="index === focusIndex" @click="$emit('click', id)">
      {{ content }}
    </Item>
  </ul>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { TabsListProps } from './List'
import styles from '../Tabs.module.scss'

defineOptions({
  name: 'NpTabsList',
})
defineProps<TabsListProps>()

defineEmits(['click', 'keyPress'])


function handleKeyDown(event: KeyboardEvent) {
  const { key } = event;

  if (key === 'ArrowLeft' || key === 'ArrowRight') {
    event.preventDefault();
    event.stopPropagation();
  }
}
</script>
