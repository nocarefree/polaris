<template>
  <div>
    <h2>{{ titleB }}</h2>
    <button @click="onClick">切换</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const titleB = ref('title');


const onClick = () => {
  titleB.value = new Date().toString();
}
</script>
