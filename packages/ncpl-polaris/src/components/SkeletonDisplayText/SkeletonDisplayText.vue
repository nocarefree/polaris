<template>
  <div :class="classNames(
    styles.DisplayText,
    size && styles[variationName('size', size)],
  )"></div>
</template>
<script setup lang="ts">
import type { SkeletonDisplayTextProps } from './SkeletonDisplayText'
import styles from './SkeletonDisplayText.module.scss'
import { classNames, variationName } from "../../utils"

defineOptions({
  name: 'NpSkeletonDisplayText',
})
withDefaults(defineProps<SkeletonDisplayTextProps>(), {
  size: 'medium'
})
</script>
