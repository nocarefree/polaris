<template>
  <kbd :class="classNames(styles.KeyboardKey, size && styles[size])">{{ key }}</kbd>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { KeyboardKeyProps } from './KeyboardKey'
import styles from './KeyboardKey.module.scss'
import { classNames } from "@ncpl-polaris/utils"

defineOptions({
  name: 'NpKeyboardKey',
})
const props = defineProps<KeyboardKeyProps>();

const key = computed(() => {
  const { size, content = '' } = props;
  return !size && content.length > 1
    ? content.toLowerCase()
    : content.toUpperCase();
})
</script>
