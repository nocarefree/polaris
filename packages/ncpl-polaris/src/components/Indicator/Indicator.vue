<template>
  <div />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { IndicatorProps } from './Indicator'
import styles from './Indicator.module.scss'

defineOptions({
  name: 'NpIndicator',
})
defineProps<IndicatorProps>()
</script>
