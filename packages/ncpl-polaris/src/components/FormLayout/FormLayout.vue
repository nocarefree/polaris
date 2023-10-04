<template>
  <div :class="styles.FormLayout">
    <component :is="nodes"></component>
  </div>
</template>
<script setup lang="ts">
import { computed, useSlots, h } from 'vue'
import type { FormLayoutProps } from './FormLayout'
import styles from './FormLayout.module.scss'
import Item from "./Item"
import Group from "./group"
import { elementChildren } from '../../utils';

defineOptions({
  name: 'NpFormLayout',
})
defineProps<FormLayoutProps>()

const slots = useSlots();

const nodes = computed(() => {
  return () => elementChildren(slots.default?.()).map((node) => {
    if (node.type == Group.type) {
      return node;
    } else {
      return h(Item, null, { default: () => [node] })
    }
  })
})

</script>
