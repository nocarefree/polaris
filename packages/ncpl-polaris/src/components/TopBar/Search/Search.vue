<template>
  <SearchDismissOverlay v-if="visible" @dismiss="$emit('dismiss')" :visible="overlayVisible"></SearchDismissOverlay>
  <div :class="classNames(styles.Search, visible && styles.visible)">
    <div :class="styles.SearchContent">
      <div :class="styles.Results">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { SearchProps } from './Search';
import SearchDismissOverlay from "../SearchDismissOverlay";
import styles from './Search.module.scss';
import { classNames } from "../../../utils";

defineOptions({
  name: 'NpSearch',
})
withDefaults(defineProps<SearchProps>(), {
  overlayVisible: false
})
defineEmits(['dismiss'])
</script>
