<template>
  <slot v-if="condition"></slot>
</template>
<script setup lang="ts">
defineProps<{ condition?: boolean; }>();
</script>
