<template>
  <ShadowBevel box-shadow="100" :bevel="isSmUp" :border-radius="hasBorderRadius ? defaultBorderRadius : '0'"
    z-index="32">
    <Box :background="background" :padding="padding" overflow-x="clip" overflow-y="clip" min-height="100%">
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
  roundedAbove: 'sm',
});

const breakpoints = useBreakpoints();

const defaultBorderRadius = '300';
const isSmUp = computed(() => Boolean(breakpoints.smUp));
const hasBorderRadius = computed(() => Boolean(breakpoints[`${props.roundedAbove}Up`]));


withinContentContext.provide(true)
</script>
