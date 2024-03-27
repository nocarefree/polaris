<template>
  <div />
</template>
<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  chartType: 'singleMetric' | 'line' | 'dataTable' | 'bar' | 'simpleHorizontalBar' | 'stackedArea' | 'sparkline' | 'donut' | 'compactHorizontalBar' | 'compactHorizontalBar' | 'simpleNormalized' | 'cohorts' | 'simpleList' | 'table'
}>();

const n = () => {

}
</script>
