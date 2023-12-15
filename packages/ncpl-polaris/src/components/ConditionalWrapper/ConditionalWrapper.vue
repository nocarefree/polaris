<template>
  <slot v-if="condition" name="wrapper" :children="$slots.default" />
  <slot v-else />
</template>
<script setup lang="ts">
import { watch, onUpdated, useSlots } from "vue";
defineProps<{ condition?: boolean; }>();
</script>
