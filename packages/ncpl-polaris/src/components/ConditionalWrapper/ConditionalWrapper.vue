<template>
  <slot v-if="condition" name="wrapper" :children="$slots.default" />
  <slot v-else />
</template>
<script setup lang="ts">
defineProps<{ condition?: boolean; }>();
</script>
