<template>
  <div v-if="active">
    <slot></slot>
  </div>
  <template v-else>
    <slot></slot>
  </template>
</template>
<script setup lang="ts">
defineProps<{
  active: boolean
}>()
</script>
