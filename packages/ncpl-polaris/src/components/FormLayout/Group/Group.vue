<template>
  <div role="group" :class="className" :aria-labelledby="`${id}Title`" :aria-describedby="`${id}HelpText`">
    <div v-if="$slots.title" :id="`${id}Title`" :class="styles.Title">
      <slot name="title"></slot>
    </div>
    <div :class="styles.Items">
      <template v-for="node in nodes">
        <Item v-if="node">
          <component :is="node"></component>
        </Item>
      </template>
    </div>
    <Box v-if="$slots.helpText" :id="`${id}HelpText`" padding-block-start="2" padding-inline-start="polarisSummerEditions2023
      ? '2' : '5' " padding-block-end="0" padding-inline-end="polarisSummerEditions2023 ? '2' : '5' "
      color="text-subdued">
      <slot name="helpText"></slot>
    </Box>
  </div>
</template>
<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { FormLayoutGroupProps } from './Group'
import Item from '../Item';
import styles from '../FormLayout.module.scss'
import { classNames, elementChildren } from '../../../utils';
import { useId } from '../../context';

defineOptions({
  name: 'NpFormLayoutGroup',
})
const props = defineProps<FormLayoutGroupProps>()

const id = useId();


const className = computed(() => {
  return classNames(props.condensed ? styles.condensed : styles.grouped);
})

const slots = useSlots();

const nodes = computed(() => {
  return elementChildren(slots);
})
</script>
