<template>
  <div :class="classNames(
    styles.TextContainer,
    spacing && styles[variationName('spacing', spacing)],
  )">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import type { TextContainerProps } from './TextContainer'
import styles from './TextContainer.module.scss'
import { classNames, variationName } from '@ncpl-polaris/utils';

defineOptions({
  name: 'NpTextContainer',
})
defineProps<TextContainerProps>()
</script>
