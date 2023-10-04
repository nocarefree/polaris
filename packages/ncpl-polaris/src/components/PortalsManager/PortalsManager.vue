<template>
  <slot></slot>
  <div id="PolarisPortalsContainer" ref="node"></div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { portalsManagerContext } from '../context';

defineOptions({
  name: 'NpPortalsManager',
})

const node = ref();

portalsManagerContext.provide(node);

</script>
