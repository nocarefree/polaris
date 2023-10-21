<template>
  <code :class="styles.Code"><slot></slot></code>
</template>
<script setup lang="ts">
import styles from './InlineCode.module.scss'

defineOptions({
  name: 'NpInlineCode',
})
</script>
