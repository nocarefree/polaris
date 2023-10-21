<template>
  <div />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { LegacyCardProps } from './LegacyCard'
import styles from './LegacyCard.module.scss'

defineOptions({
  name: 'NpLegacyCard',
})
defineProps<LegacyCardProps>()
</script>
