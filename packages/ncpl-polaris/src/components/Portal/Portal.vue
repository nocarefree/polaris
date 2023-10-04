<template>
  <teleport v-if="container" :to="container">
    <div :data-portal-id="portalId">
      <slot></slot>
    </div>
  </teleport>
</template>
<script setup lang="ts">
import { onMounted, toRef } from 'vue';
import { usePortalsManager, useId } from "../context"

const props = defineProps<{ idPrefix?: string }>();
const emit = defineEmits(['portalCreated']);
const container = usePortalsManager();
const portalId = useId(toRef(props, 'idPrefix'));

onMounted(() => {
  emit('portalCreated');
})
</script>