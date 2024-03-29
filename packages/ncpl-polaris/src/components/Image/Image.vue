<template>
  <img :src="source" :srcSet="finalSourceSet" />
</template>
<script setup lang="ts">
import { computed } from "vue";
import type { ImageProps } from "./Image"

defineOptions({
  name: 'NpImage',
})
const props = defineProps<ImageProps>()

const finalSourceSet = computed(() => {
  return props.sourceSet ?
    props.sourceSet.map(({ source: subSource, descriptor }) => `${subSource} ${descriptor}`)
      .join(',') :
    void 0;
})
</script>
