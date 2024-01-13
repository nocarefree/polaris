<template>
  <teleport v-if="container" :to="container">
    <div :data-portal-id="portalId">
      <slot></slot>
    </div>
  </teleport>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { usePortalsManager, useId } from "../context"

defineOptions({
  name: 'NpPortal'
})
const props = defineProps<{ idPrefix?: string }>();
const emit = defineEmits(['portalCreated']);
const { container } = usePortalsManager();
const portalId = useId(undefined, props.idPrefix);

onMounted(() => {
  emit('portalCreated');
})
</script>