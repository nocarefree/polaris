<template>
  <div :class="classNames(styles.CheckableButton)" @click="$emit('toggleAll')">
    <div :class="styles.Checkbox">
      <Checkbox :label="accessibilityLabel" label-hidden :checked="selected" :disabled="disabled" @change="onToggleAll"
        ref="checkBoxRef" />
    </div>
    <span :class="styles.Label" :aria-live="ariaLive">
      {{ label }}
    </span>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { CheckableButtonProps } from './CheckableButton'
import styles from './CheckableButton.module.scss'
import { classNames } from "@ncpl-polaris/utils"
import Checkbox from "../Checkbox"

defineOptions({
  name: 'NpCheckableButton',
})
defineEmits(['toggleAll'])
defineProps<CheckableButtonProps>()
</script>
