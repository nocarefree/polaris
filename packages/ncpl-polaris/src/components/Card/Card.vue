<template>
  <ShadowBevel box-shadow="100" :border-radius="borderRadius" z-index="32">
    <Box :background="background" :padding="padding" overflow-x="hidden" overflow-y="hidden" min-height="100%">
      <slot></slot>
    </Box>
  </ShadowBevel>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { CardProps } from './Card'
import styles from './Card.module.scss'
import ShadowBevel from "../ShadowBevel"
import { withinContentContext, useBreakpoints } from "../context"

defineOptions({
  name: 'NpCard',
})
defineProps<CardProps>()

const breakpoints = useBreakpoints();

const borderRadius = computed(() => {
  let hasBorderRadius = !roundedAbove;

  if (roundedAbove && breakpoints[`${roundedAbove}Up`]) {
    hasBorderRadius = true;
  }
  return hasBorderRadius ? '300' : '0'
})

withinContentContext.inject(true)
</script>
