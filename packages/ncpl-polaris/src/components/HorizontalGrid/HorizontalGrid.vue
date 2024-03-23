<template>
  <div :class="styles.HorizontalGrid" :style="style">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { sanitizeCustomProperties, getResponsiveValue, getResponsiveProps, type ResponsiveValue } from "@ncpl-polaris/utils/css";
import type { HorizontalGridProps, Columns, ColumnsType } from "./HorizontalGrid";
import styles from "./HorizontalGrid.module.scss";

defineOptions({
  name: "NpHorizontalGrid",
});
const props = defineProps<HorizontalGridProps>();

const style = computed(() => {
  const { columns, gap, alignItems } = props;
  return sanitizeCustomProperties({
    ...getResponsiveValue(
      'horizontal-grid',
      'grid-template-columns',
      formatHorizontalGrid(columns),
    ),
    ...getResponsiveProps('horizontal-grid', 'gap', 'space', gap),
    '--pc-horizontal-grid-align-items': alignItems,
  })
})

function formatHorizontalGrid(columns?: Columns): ResponsiveValue {
  if (
    typeof columns === 'object' &&
    columns !== null &&
    !Array.isArray(columns)
  ) {
    return Object.fromEntries(
      Object.entries(columns).map(
        ([breakpointAlias, breakpointHorizontalGrid]) => [
          breakpointAlias,
          getColumnValue(breakpointHorizontalGrid),
        ],
      ),
    );
  }

  return getColumnValue(columns);
}

function getColumnValue(columns?: ColumnsType) {
  if (!columns) return undefined;

  if (typeof columns === 'number' || !isNaN(Number(columns))) {
    return `repeat(${Number(columns)}, minmax(0, 1fr))`;
  }

  if (typeof columns === 'string') return columns;

  return columns
    .map((column) => {
      switch (column) {
        case 'oneThird':
          return 'minmax(0, 1fr)';
        case 'oneHalf':
          return 'minmax(0, 1fr)';
        case 'twoThirds':
          return 'minmax(0, 2fr)';
      }
    })
    .join(' ');
}

</script>
