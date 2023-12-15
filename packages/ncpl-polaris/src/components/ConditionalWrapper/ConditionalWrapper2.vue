<template>
  <component v-if="wrapper" :is="wrapper">
    <slot></slot>
  </component>
  <slot v-else></slot>
</template>
<script setup lang="ts">
defineProps<{ wrapper?: any; }>();
</script>
