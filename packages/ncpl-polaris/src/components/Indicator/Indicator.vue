<template>
  <div :class="classNames(
    styles.Indicator,
    pulse && styles.pulseIndicator,
  )" />
</template>
<script setup lang="ts">
import type { IndicatorProps } from './Indicator'
import styles from './Indicator.module.scss'
import { classNames } from "../../utils"

defineOptions({
  name: 'NpIndicator',
})
defineProps<IndicatorProps>()
</script>
