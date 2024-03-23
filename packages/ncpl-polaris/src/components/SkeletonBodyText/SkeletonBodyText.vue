<template>
  <div :class="styles.SkeletonBodyTextContainer">
    <div v-for="line in lines" :key="line" :class="styles.SkeletonBodyText"></div>
  </div>
</template>
<script setup lang="ts">
import type { SkeletonBodyTextProps } from './SkeletonBodyText'
import styles from './SkeletonBodyText.module.scss'

defineOptions({
  name: 'NpSkeletonBodyText',
})
withDefaults(defineProps<SkeletonBodyTextProps>(), {
  lines: 3
})
</script>
