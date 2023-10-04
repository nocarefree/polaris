<template>
  <div :class="classNames(
    styles.Section,
    secondary && styles['Section-secondary'],
    fullWidth && styles['Section-fullWidth'],
    oneHalf && styles['Section-oneHalf'],
    oneThird && styles['Section-oneThird'],
  )">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { LayoutSectionProps } from './Section'
import styles from '../Layout.module.scss'
import { classNames } from "@ncpl-polaris/utils"

defineOptions({
  name: 'NpLayoutSection',
})
defineProps<LayoutSectionProps>()
</script>
