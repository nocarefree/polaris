<template>
  <div :class="classNames(
    styles.Cell,
    columnSpan?.xs && styles[`Cell-${columnSpan.xs}-column-xs`],
    columnSpan?.sm && styles[`Cell-${columnSpan.sm}-column-sm`],
    columnSpan?.md && styles[`Cell-${columnSpan.md}-column-md`],
    columnSpan?.lg && styles[`Cell-${columnSpan.lg}-column-lg`],
    columnSpan?.xl && styles[`Cell-${columnSpan.xl}-column-xl`],
  )" :style="{
  gridArea: area,
  '--pc-column-xs': column?.xs,
  '--pc-column-sm': column?.sm,
  '--pc-column-md': column?.md,
  '--pc-column-lg': column?.lg,
  '--pc-column-xl': column?.xl,
  '--pc-row-xs': row?.xs,
  '--pc-row-sm': row?.sm,
  '--pc-row-md': row?.md,
  '--pc-row-lg': row?.lg,
  '--pc-row-xl': row?.xl,
}">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { GridCellProps } from './Cell'
import styles from './Cell.module.scss'
import { classNames } from "@ncpl-polaris/utils"

defineOptions({
  name: 'NpGridCell',
})
defineProps<GridCellProps>()
</script>
