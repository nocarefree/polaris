<template>
  <component v-if="is && is != 'default' && $slots[props.is]" :is="$slots[props.is]" :children="$slots.default">
  </component>
  <slot v-else></slot>
</template>
<script setup lang="ts">
import { useSlots, computed, onMounted } from "vue"
defineOptions({
  name: 'NpWrapper'
})
const props = defineProps<{
  is?: string;
}>()
</script>
