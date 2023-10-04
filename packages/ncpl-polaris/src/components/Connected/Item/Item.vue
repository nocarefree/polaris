<template>
  <div ref="node" :class="classNames(
    styles.Item,
    focused && styles['Item-focused'],
    position === 'primary' ? styles['Item-primary'] : styles['Item-connection'],
  )">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { ConnectedItemProps } from './Item'
import styles from '../Connected.module.scss'
import { useFocus, classNames } from "@ncpl-polaris/utils"


defineProps<ConnectedItemProps>()

const node = ref();
const { focused } = useFocus(node);
</script>
