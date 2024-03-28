<template>
  <div :class="classNames(
    styles.Section,
    titleHidden && styles.titleHidden,
  )">
    <Box as="section" :padding="flush ? '0' : '400'" :padding-inline-end="titleHidden ? '0' : undefined"
      :background="subdued ? 'bg-surface-tertiary' : undefined">
      <slot></slot>
    </Box>
  </div>
</template>
<script setup lang="ts">
import type { ModalSectionProps } from './Section'
import styles from './Section.module.scss'
import Box from '../../Box';
import { classNames } from '../../../utils';

defineOptions({
  name: 'NpModalSection',
})
withDefaults(defineProps<ModalSectionProps>(), {
  flush: false,
  subdued: false,
  titleHidden: false,
})
</script>
