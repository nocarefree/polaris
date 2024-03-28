<template>
  <div :class="classNames(styles.Panel, hidden && styles['Panel-hidden'])" :id="id" role="tabpanel"
    :aria-labelledby="tabId" :tabindex="-1">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import type { TabsPanelProps } from './Panel'
import styles from '../Tabs.module.scss'
import { classNames } from "../../../utils"

defineOptions({
  name: 'NpTabsPanel',
})
defineProps<TabsPanelProps>()
</script>
