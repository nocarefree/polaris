<template>
  <div :class="classNames(
    styles.SkeletonThumbnail,
    size && styles[variationName('size', size)],
  )" />
</template>
<script setup lang="ts">
import type { SkeletonThumbnailProps } from './SkeletonThumbnail'
import styles from './SkeletonThumbnail.module.scss'
import { classNames, variationName } from "@ncpl-polaris/utils"

defineOptions({
  name: 'NpSkeletonThumbnail',
})
withDefaults(defineProps<SkeletonThumbnailProps>(),{size:'medium'})
</script>
