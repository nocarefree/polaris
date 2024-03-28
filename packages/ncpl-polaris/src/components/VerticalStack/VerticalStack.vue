<template>
  <component :is="elementNode" :class="className" :style="style"></component>
</template>
<script setup lang="ts">
import { computed, useSlots, h } from 'vue'
import type { VerticalStackProps } from './VerticalStack'
import { classNames, getResponsiveProps } from "../../utils";
import styles from './VerticalStack.module.scss'

defineOptions({
  name: 'NpVerticalStack',
})
const props = defineProps<VerticalStackProps>();

const slots = useSlots();

const element = computed(() => {
  return props.as || 'div';
})

const elementNode = computed(() => {
  return () => h(element.value, {}, slots);
})

const className = computed(() => {
  return classNames(
    styles.VerticalStack,
    (element.value === 'ul' || element.value === 'ol') && styles.listReset,
    element.value === 'fieldset' && styles.fieldsetReset,
  );
})

const style = computed(() => {
  const { align, inlineAlign, reverseOrder = false, gap } = props;
  return {
    '--pc-vertical-stack-align': align ? `${align}` : null,
    '--pc-vertical-stack-inline-align': inlineAlign ? `${inlineAlign}` : null,
    '--pc-vertical-stack-order': reverseOrder ? 'column-reverse' : 'column',
    ...getResponsiveProps('vertical-stack', 'gap', 'space', gap),
  }
})

</script>
