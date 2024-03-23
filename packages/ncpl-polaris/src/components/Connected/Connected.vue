<template>
  <div :class="styles.Connected">
    <Item v-if="$slots.left" position="left">
      <slot name="left"></slot>
    </Item>

    <Item position="primary">
      <slot></slot>
    </Item>
    <Item v-if="$slots.right" position="left">
      <slot name="right"></slot>
    </Item>
  </div>
</template>
<script setup lang="ts">
import Item from './Item'
import styles from './Connected.module.scss'

defineOptions({
  name: 'NpConnected',
})
</script>
