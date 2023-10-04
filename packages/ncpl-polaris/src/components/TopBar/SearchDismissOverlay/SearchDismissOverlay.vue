<template>
  <ScrollLock v-if="visible" />
  <div ref="node" :class="classNames(styles.SearchDismissOverlay, visible && styles.visible)" @click="handleDismiss" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { SearchDismissOverlayProps } from './SearchDismissOverlay'
import ScrollLock from "@ncpl-polaris/components/ScrollLock";
import styles from './SearchDismissOverlay.module.scss'
import { classNames } from "@ncpl-polaris/utils"

defineOptions({
  name: 'NpSearchDismissOverlay',
})
defineProps<SearchDismissOverlayProps>()

const emit = defineEmits(['dismiss'])
const node = ref()

const handleDismiss = ({ target }: Event) => {
  if (node.value == target) {
    emit('dismiss');
  }
}
</script>
