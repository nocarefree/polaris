<template>
  <MyTransition :timeout="0">
    <template #default="{ state: status }">
      <div v-if="selectMode" :class="classNames(styles.SelectAllActions, styles[`SelectAllActions-${status}`],)">
        <CheckableButton :accessibility-label="accessibilityLabel"
          :label="hasTextAndAction ? paginatedSelectAllText : label" :disabled="disabled" :selected="selected"
          :aria-live="hasTextAndAction ? 'polite' : undefined" @toggleAll="$emit('toggleAll')" />
        <div v-if="paginatedSelectAllAction" :class="styles.PaginatedSelectAll">
          <UnstyledButton paginated-select-all-action :class="styles.AllAction" @click="paginatedSelectAllAction.onAction"
            size="slim" :disabled="disabled">
            {{ paginatedSelectAllAction.content }}
          </UnstyledButton>
        </div>
      </div>

    </template>
  </MyTransition>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { SelectAllActionsProps } from './SelectAllActions'
import styles from './SelectAllActions.module.scss'
import { classNames } from "@ncpl-polaris/utils"
import CheckableButton from "../CheckableButton"
import UnstyledButton from "../UnstyledButton"
import MyTransition from "../Transition"

defineOptions({
  name: 'NpSelectAllActions',
})
defineEmits(['toggleAll']);

const props = defineProps<SelectAllActionsProps>()
const hasTextAndAction = computed(() => props.paginatedSelectAllText && props.paginatedSelectAllAction)
</script>
