<template>
  <div :class="styles.MessageIndicatorWrapper">
    <div v-if="active" :class="styles.MessageIndicator" />
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { defineComponent } from 'vue'
import { MessageIndicatorProps } from './MessageIndicator'
import styles from './MessageIndicator.module.scss'

defineOptions({
  name: 'NpMessageIndicator',
})
defineProps<MessageIndicatorProps>()
</script>
