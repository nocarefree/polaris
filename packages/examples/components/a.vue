<template>
  <div>
    <slot></slot>
    <h2>{{ titleB }}</h2>
    <button @click="onClick">切换</button>
  </div>
</template>
<script setup lang="ts">
import { provide, ref, useSlots, onMounted, onUpdated, onUnmounted } from 'vue';
import B from "./b.vue"

const titleB = ref('title');

const slots = useSlots();

onMounted(() => {
  console.log(slots.default?.()[0].children + ':' + 'mounted');
});

onUnmounted(() => {
  console.log(slots.default?.()[0].children + ':' + 'unmounted');
});

onUpdated(() => {
  console.log(slots.default?.()[0].children + ':' + 'updated');
});


const onClick = () => {
  titleB.value = new Date().toString();
}
</script>
