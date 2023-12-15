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
    <Box v-if="$slots.helpText" :id="`${id}HelpText`" padding-block-start="200" padding-inline-start="200"
      padding-block-end="0" paddingInlineEnd="200" color="text-secondary">
      <slot name="helpText"></slot>
    </Box>
  </div>
</template>
<script setup lang="ts">
import { computed, useSlots } from 'vue'
import Item from '../Item';
import Box from '../../Box';
import styles from '../FormLayout.module.scss'
import { classNames, elementChildren } from '../../../utils';
import { useId } from '../../context';

defineOptions({
  name: 'NpFormLayoutGroup',
})
const props = defineProps<{
  condensed?: boolean;
  title?: string;
}>()

const id = useId();


const className = computed(() => {
  return classNames(props.condensed ? styles.condensed : styles.grouped);
})

const slots = useSlots();

const nodes = computed(() => {
  return elementChildren(slots);
})
</script>
