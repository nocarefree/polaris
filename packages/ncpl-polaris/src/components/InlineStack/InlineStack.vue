<template>
  <component :is="as" :class="styles.InlineStack" :style="style">
    <slot></slot>
  </component>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { InlineStackProps } from './InlineStack'
import styles from './InlineStack.module.scss'
import { getResponsiveProps, getResponsiveValue } from '../../utils/css';

defineOptions({
  name: 'NpInlineStack',
})
const props = withDefaults(defineProps<InlineStackProps>(), {
  wrap: true,
  as: 'div',
  direction : 'row',
});

const style = computed(() => ({
  '--pc-inline-stack-align': props.align,
    '--pc-inline-stack-block-align': props.blockAlign,
    '--pc-inline-stack-wrap': props.wrap ? 'wrap' : 'nowrap',
    ...getResponsiveProps('inline-stack', 'gap', 'space', props.gap),
    ...getResponsiveValue('inline-stack', 'flex-direction', props.direction),
}))
</script>
