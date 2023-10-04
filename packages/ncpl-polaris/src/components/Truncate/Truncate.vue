<template>
  <span :class="styles.Truncate">
    <slot></slot>
  </span>
</template>
<script setup lang="ts">
import styles from './Truncate.module.scss'
</script>
