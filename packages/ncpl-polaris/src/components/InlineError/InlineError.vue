<template>
  <div v-if="message || $slots.message" :id="errorTextID(fieldId)" :class="styles.InlineError">
    <div :class="styles.Icon">
      <Icon :source="AlertCircleIcon" />
    </div>  
    <slot v-if="$slots.message"></slot>
    <component v-else :is="()=> [message]"></component>
  </div>
</template>
<script setup lang="ts">
import type { InlineErrorProps } from './InlineError'
import { errorTextID } from "./InlineError"
import styles from './InlineError.module.scss'
import Icon from "../Icon"
import { AlertCircleIcon } from "@ncpl/ncpl-icons"

defineOptions({
  name: 'NpInlineError',
})
defineProps<InlineErrorProps>()
</script>
