<template>
  <div :class="styles.FooterHelp">
    <div :class="styles.Text">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { FooterHelpProps } from './FooterHelp'
import styles from './FooterHelp.module.scss'

defineOptions({
  name: 'NpFooterHelp',
})
defineProps<FooterHelpProps>()
</script>
