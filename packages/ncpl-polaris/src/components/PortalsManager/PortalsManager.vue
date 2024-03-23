<template>
  <slot></slot>
  <div id="PolarisPortalsContainer" ref="container"></div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { portalsManagerContext } from '../context';

defineOptions({
  name: 'NpPortalsManager',
})

const container = ref();

portalsManagerContext.provide({ container });

</script>
