<template>
  <component v-if="Boolean(is) && condition" :is="is">
    <slot></slot>
  </component>
  <slot v-else></slot>
</template>
<script setup lang="ts">
defineProps<{ condition: boolean; is: any; }>();
</script>
