<template>
  <div :class="styles.InlineStack" :style="style">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { InlineStackProps } from './InlineStack'
import styles from './InlineStack.module.scss'
import { getResponsiveProps } from '@ncpl-polaris/utils/css';

defineOptions({
  name: 'NpInlineStack',
})
const props = withDefaults(defineProps<InlineStackProps>(), {
  wrap: true,
});

const style = computed(() => ({
  '--pc-inline-stack-align': props.align,
  '--pc-inline-stack-block-align': props.blockAlign,
  '--pc-inline-stack-wrap': props.wrap ? 'wrap' : 'nowrap',
  ...getResponsiveProps('inline-stack', 'gap', 'space', props.gap),
}))
</script>
