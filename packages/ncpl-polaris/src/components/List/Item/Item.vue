<template>
  <li :class="styles.Item">
    <slot></slot>
  </li>
</template>
<script setup lang="ts">
import styles from '../List.module.scss'

defineOptions({
  name: 'NpListItem',
})
</script>
