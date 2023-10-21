<template>
  <div :class="styles.InlineGrid" :style="sanitizeCustomProperties(style)">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { InlineGridProps } from './InlineGrid'
import styles from './InlineGrid.module.scss'
import { sanitizeCustomProperties } from "@ncpl-polaris/utils/css"

defineOptions({
  name: 'NpInlineGrid',
})
defineProps<InlineGridProps>()

const style = computed(() => ({
  ...getResponsiveValue(
    'inline-grid',
    'grid-template-columns',
    formatInlineGrid(props.columns),
  ),
  ...getResponsiveProps('inline-grid', 'gap', 'space', props.gap),
  '--pc-inline-grid-align-items': props.alignItems,
}));


function formatInlineGrid(columns?: Columns): ResponsiveValue {
  if (
    typeof columns === 'object' &&
    columns !== null &&
    !Array.isArray(columns)
  ) {
    return Object.fromEntries(
      Object.entries(columns).map(([breakpointAlias, breakpointInlineGrid]) => [
        breakpointAlias,
        getColumnValue(breakpointInlineGrid),
      ]),
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
