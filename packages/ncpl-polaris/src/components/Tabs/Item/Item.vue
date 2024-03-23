<template>
  <li>
    <UnstyledLink v-if="url" v-bind="sharedProps" :url="url">
      <slot></slot>
    </UnstyledLink>
    <button v-else v-bind="sharedProps" type="button">
      <slot></slot>
    </button>
  </li>
</template>
<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import type { TabsItemProps } from './Item'
import styles from '../Tabs.module.scss'
import { classNames } from '@ncpl-polaris/utils';
import UnstyledLink from "../../UnstyledLink"

defineOptions({
  name: 'NpTabsItem',
})
const props = defineProps<TabsItemProps>()
const emit = defineEmits(['click'])
const focusedNode = ref();

const sharedProps = computed(() => {
  return {
    id: props.id,
    ref: (e: any) => focusedNode.value = e,
    onClick: (e: Event) => emit('click', e),
    class: classNames(styles.Item),
    'aria-selected': false,
    'aria-label': props.accessibilityLabel,
  }
})

watchEffect(() => {
  if (props.focused && focusedNode.value) {
    focusedNode.value.focus();
  }
}, { flush: 'post' })
</script>
