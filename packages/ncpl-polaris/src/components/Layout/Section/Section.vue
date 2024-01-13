<template>
  <div :class="classNames(styles.Section, styles[`Section-${variant}`])">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import type { LayoutSectionProps } from './Section'
import styles from '../Layout.module.scss'
import { classNames } from "@ncpl-polaris/utils"

defineOptions({
  name: 'NpLayoutSection',
})
defineProps<LayoutSectionProps>()
</script>
