<template>
  <div :class="styles.Bleed" :style="customStyle">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { BleedProps } from './Bleed'
import styles from './Bleed.module.scss'

import type { SpaceScale } from '@shopify/polaris-tokens';
import { getResponsiveProps, sanitizeCustomProperties } from '@ncpl-polaris/utils/css';
import type { ResponsiveProp } from '@ncpl-polaris/utils/css';


type Spacing = ResponsiveProp<SpaceScale>;

defineOptions({
  name: 'NpBleed',
})
const props = defineProps<BleedProps>()

const getNegativeMargins = (direction: string) => {
  const xAxis = ['marginInlineStart', 'marginInlineEnd'];
  const yAxis = ['marginBlockStart', 'marginBlockEnd'];

  const {
    marginInline,
    marginBlock,
    marginBlockStart,
    marginBlockEnd,
    marginInlineStart,
    marginInlineEnd,
  } = props


  const directionValues: { [key: string]: Spacing | undefined } = {
    marginBlockStart,
    marginBlockEnd,
    marginInlineStart,
    marginInlineEnd,
    marginInline,
    marginBlock,
  };

  if (directionValues[direction]) {
    return directionValues[direction];
  } else if (xAxis.includes(direction) && marginInline) {
    return directionValues.marginInline;
  } else if (yAxis.includes(direction) && marginBlock) {
    return directionValues.marginBlock;
  }
};

const customStyle = computed(() => {

  const negativeMarginBlockStart = getNegativeMargins('marginBlockStart');
  const negativeMarginBlockEnd = getNegativeMargins('marginBlockEnd');
  const negativeMarginInlineStart = getNegativeMargins('marginInlineStart');
  const negativeMarginInlineEnd = getNegativeMargins('marginInlineEnd');

  const style = {
    ...getResponsiveProps(
      'bleed',
      'margin-block-start',
      'space',
      negativeMarginBlockStart,
    ),
    ...getResponsiveProps(
      'bleed',
      'margin-block-end',
      'space',
      negativeMarginBlockEnd,
    ),
    ...getResponsiveProps(
      'bleed',
      'margin-inline-start',
      'space',
      negativeMarginInlineStart,
    ),
    ...getResponsiveProps(
      'bleed',
      'margin-inline-end',
      'space',
      negativeMarginInlineEnd,
    )
  };

  return sanitizeCustomProperties(style);
});
</script>
