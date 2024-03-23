<template>
  <div :class="styles.Container">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import styles from './Container.module.scss'

defineOptions({
  name: 'NpIndexFiltersContainer',
})
</script>
