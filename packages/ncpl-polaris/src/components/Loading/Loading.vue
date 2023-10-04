<template></template>
<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useFrame } from "../context";

defineOptions({
  name: 'NpLoading',
})


const { startLoading, stopLoading } = useFrame();

onMounted(() => {
  startLoading();
});

onBeforeUnmount(() => {
  stopLoading();
});
</script>
