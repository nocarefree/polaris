<template>
  <div :class="styles.BulkActionButton" ref="bulkActionButton">
    <Tooltip v-if="isActivatorForMoreActionsPopover" :content="content" preferred-position="above">
      <Button :external="external" :url="url" :accessibility-label="isActivatorForMoreActionsPopover ? content :
        accessibilityLabel" :disclosure="disclosure && showContentInButton" :onClick="onAction" :disabled="disabled"
        size="slim" :icon="icon">
        {{ buttonContent }}
      </Button>
    </Tooltip>
    <Button v-else :external="external" :url="url" :accessibility-label="isActivatorForMoreActionsPopover ? content :
      accessibilityLabel" :disclosure="disclosure && showContentInButton" :onClick="onAction" :disabled="disabled"
      size="slim" :icon="icon">
      {{ buttonContent }}
    </Button>
    <Indicator v-if="indicator" />
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { BulkActionButtonProps } from './BulkActionButton'
import Tooltip from "../../Tooltip"
import Indicator from "../../Indicator"
import Icon from "../../Icon"
import Button from "../../Button"
import { HorizontalDotsMinor } from "@ncpl/ncpl-icons"
import styles from '../BulkActions.module.scss'

defineOptions({
  name: 'NpBulkActionsButton',
})

const emit = defineEmits(['measurement'])

const props = defineProps<BulkActionButtonProps>()
const bulkActionButton = ref()

const isActivatorForMoreActionsPopover = computed(() => props.disclosure && !props.showContentInButton);

const buttonContent = computed(() => isActivatorForMoreActionsPopover.value ? undefined : props.content);

const icon = computed(() => {
  return isActivatorForMoreActionsPopover.value ? h(Icon, { source: HorizontalDotsMinor, color: "base" }) : undefined
})

onMounted(() => {
  if (bulkActionButton.value) {
    emit('measurement', bulkActionButton.value.getBoundingClientRect().width)
  }
})
</script>
