<template></template>
<script setup lang="ts">
import { useSlots, onUnmounted, watchEffect } from 'vue'
import type { ContextualSaveBarProps } from '../Frame/ContextualSaveBar/ContextualSaveBar'
import { useFrame } from "../context";

defineOptions({
  name: 'NpContextualSaveBar',
})
const props = defineProps<ContextualSaveBarProps>()

const { setContextualSaveBar, removeContextualSaveBar } = useFrame();
const slots = useSlots();


watchEffect(() => {
  setContextualSaveBar({
    ...props,
    contextControl: slots.contextControl,
    secondaryMenu: slots.secondaryMenu
  })

}, { flush: 'post' })

onUnmounted(() => {
  removeContextualSaveBar()
});




</script>
