<template>
  <transition>
    <div :class="wrapperClasses">
      <CheckableButton v-bind="checkableButtonProps" @toggleAll="$emit('toggleAll')" />
      <div v-if="paginatedSelectAllAction" :class="styles.PaginatedSelectAll">
        <UnstyledButton paginated-select-all-action :class="styles.AllAction" @click="paginatedSelectAllAction.onAction"
          size="slim" :disabled="disabled">
          {{ paginatedSelectAllAction.content }}
        </UnstyledButton>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import type { SelectAllActionsProps } from './SelectAllActions'
import styles from './SelectAllActions.module.scss'
import { classNames } from "@ncpl-polaris/utils"
import CheckableButton from "../CheckableButton"
import UnstyledButton from "../UnstyledButton"

defineOptions({
  name: 'NpSelectAllActions',
})
defineEmits(['toggleAll']);
const props = defineProps<SelectAllActionsProps>()

const status = ref();
const wrapperClasses = computed(() => {
  return classNames(
    styles.SelectAllActions,
    styles[`SelectAllActions-${status.value}`],
  )
})
const hasTextAndAction = computed(() => props.paginatedSelectAllText && props.paginatedSelectAllAction)
const checkableButtonProps = computed(() => {
  const {
    accessibilityLabel,
    label,
    selected,
    disabled,
  } = props;
  return {
    accessibilityLabel,
    label: hasTextAndAction.value ? props.paginatedSelectAllText : label,
    selected,
    disabled,
    ariaLive: hasTextAndAction.value ? 'polite' : undefined,
  }
})
</script>
