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
import ShadowBevel from "../ShadowBevel"
import Box from "../Box"
import { withinContentContext, useBreakpoints } from "../context"

defineOptions({
  name: 'NpCard',
});
const props = withDefaults(defineProps<CardProps>(), {
  background: 'bg-surface',
  padding: () => ({ xs: '400' }),
});

const breakpoints = useBreakpoints();

const borderRadius = computed(() => {
  const { roundedAbove } = props;
  let hasBorderRadius = !roundedAbove;

  if (roundedAbove && breakpoints[`${roundedAbove}Up`]) {
    hasBorderRadius = true;
  }
  return hasBorderRadius ? '300' : '0'
});

withinContentContext.provide(true)
</script>
