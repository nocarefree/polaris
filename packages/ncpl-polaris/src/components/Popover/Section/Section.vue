<template>
  <div :class="styles.Section">
    <Box padding-inline-start="300" padding-inline-end="300" padding-block-start="200" padding-block-end="150">
      <slot></slot>
    </Box>
  </div>
</template>

<script setup lang="ts">
import styles from '../Popover.module.scss';
import Box from "@ncpl-polaris/components/Box/Box.vue";


</script>