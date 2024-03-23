<template></template>
<script setup lang="ts">
import { onMounted, onUnmounted } from "vue"
import { scrollLockManagerContext } from '../context';

const scrollLockManager = scrollLockManagerContext.inject();
onMounted(() => {
  scrollLockManager?.registerScrollLock();
})
onUnmounted(() => {
  scrollLockManager?.unregisterScrollLock();
})
</script>
<style lang="scss">
@import './ScrollLock.module.scss';
</style>