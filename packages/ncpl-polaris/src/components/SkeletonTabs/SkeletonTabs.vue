<template>
  <div :class="styles.Tabs">
    <div v-for="key in count"
      :class="classNames(styles.Tab, (key - 1) % 2 === 0 ? styles['Tab-short'] : styles['Tab-long'])">
      <SkeletonBodyText :lines="1" />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { SkeletonTabsProps } from './SkeletonTabs'
import styles from './SkeletonTabs.module.scss'
import { classNames } from "@ncpl-polaris/utils"
import SkeletonBodyText from "../SkeletonBodyText"

defineOptions({
  name: 'NpSkeletonTabs',
})
withDefaults(defineProps<SkeletonTabsProps>(), { count: 2 })
</script>
