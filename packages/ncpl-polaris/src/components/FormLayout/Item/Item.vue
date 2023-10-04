<template>
  <div :class="styles.Item">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import styles from '../FormLayout.module.scss'
</script>
