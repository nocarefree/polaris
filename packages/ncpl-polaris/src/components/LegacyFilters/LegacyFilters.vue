<template>
  <div />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { LegacyFiltersProps } from './LegacyFilters'
import styles from './LegacyFilters.module.scss'

defineOptions({
  name: 'NpLegacyFilters',
})
defineProps<LegacyFiltersProps>()
</script>
