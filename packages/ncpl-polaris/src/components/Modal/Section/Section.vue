<template>
  <div :class="classNames(
    styles.Section,
    titleHidden && styles.titleHidden,
  )">
    <Box as="section" :padding="flush ? '0' : polarisSummerEditions2023 ? '4' : '5'"
      :padding-inline-end="titleHidden ? '0' : undefined"
      :background="subdued ? (polarisSummerEditions2023 ? 'bg-secondary-experimental' : 'bg-subdued') : undefined">
      <slot></slot>
    </Box>
  </div>
</template>
<script setup lang="ts">
import type { ModalSectionProps } from './Section'
import styles from './Section.module.scss'
import Box from '@ncpl-polaris/components/Box';
import { classNames } from '@ncpl-polaris/utils';
import { useFeatures } from '../../context';

defineOptions({
  name: 'NpModalSection',
})
defineProps<ModalSectionProps>()

const { polarisSummerEditions2023 } = useFeatures();
</script>
