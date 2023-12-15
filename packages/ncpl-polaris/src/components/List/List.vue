<template>
  <component :is="type === 'bullet' ? 'ul' : 'ol'" :class="classNames(
    styles.List,
    gap && styles[variationName('spacing', gap)],
    type && styles[variationName('type', type)],
  )">
    <slot></slot>
  </component>
</template>
<script setup lang="ts">
import type { ListProps } from './List'
import styles from './List.module.scss'
import { classNames, variationName } from "@ncpl-polaris/utils"

defineOptions({
  name: 'NpList',
})
defineProps<ListProps>()
</script>
