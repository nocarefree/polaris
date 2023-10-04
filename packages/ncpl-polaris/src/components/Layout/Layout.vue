<template>
  <div :class="styles.Layout">
    <Section v-if="sectioned">
      <slot></slot>
    </Section>
    <slot v-else></slot>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { LayoutProps } from './Layout'
import styles from './Layout.module.scss'
import Section from "./Section"

defineOptions({
  name: 'NpLayout',
})
defineProps<LayoutProps>()

</script>
