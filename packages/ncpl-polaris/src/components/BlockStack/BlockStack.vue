<template>
  <component :is="as"
    :class="classNames(styles.BlockStack, (as === 'ul' || as === 'ol') && styles.listReset, as === 'fieldset' && styles.fieldsetReset)"
    :style="sanitizeCustomProperties(style)">
    <slot></slot>
  </component>
</template>
<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'
import type { BlockStackProps } from './BlockStack'
import styles from './BlockStack.module.scss'
import { getResponsiveProps, sanitizeCustomProperties } from "@ncpl-polaris/utils/css"
import { classNames } from "@ncpl-polaris/utils"

defineOptions({
  name: 'NpBlockStack',
})
const props = withDefaults(defineProps<BlockStackProps>(), {
  as: 'div'
})


const style = computed(() => {
  const { align, inlineAlign, reverseOrder, gap } = props;
  return {
    '--pc-block-stack-align': align ? `${align}` : null,
    '--pc-block-stack-inline-align': inlineAlign ? `${inlineAlign}` : null,
    '--pc-block-stack-order': reverseOrder ? 'column-reverse' : 'column',
    ...getResponsiveProps('block-stack', 'gap', 'space', gap),
  } as CSSProperties
});
</script>
