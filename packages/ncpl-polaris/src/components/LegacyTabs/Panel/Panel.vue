<template>
  <div :class="classNames(styles.Panel, hidden && styles['Panel-hidden'])" :id="id" role="tabpanel"
    :aria-labelledby="tabId" :tabindex="-1">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import styles from '../LegacyTabs.module.scss'
import { classNames } from "@ncpl-polaris/utils"

defineOptions({
  name: 'NpLegacyTabsPanel',
})
defineProps<{
  hidden?: boolean;
  id: string;
  tabId: string;
}>()
</script>
