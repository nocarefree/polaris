<template>
  <hr :class="styles.Divider" :style="{
    borderBlockStart: `var(--p-border-width-${borderWidth}) solid ${borderColorValue}`,
  }" />
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { DividerProps } from './Divider'
import styles from './Divider.module.scss'

defineOptions({
  name: 'NpDivider',
})
const props = withDefaults(defineProps<DividerProps>(), {
  borderColor: 'border-secondary',
  borderWidth: '025',
})
const borderColorValue = computed(() => props.borderColor === 'transparent'
  ? props.borderColor
  : `var(--p-color-${props.borderColor})`)
</script>
