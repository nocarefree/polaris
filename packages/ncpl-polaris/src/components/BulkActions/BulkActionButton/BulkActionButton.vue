<template>
  <div :class="styles.BulkActionButton" ref="bulkActionButton">
    <Tooltip v-if="isActivatorForMoreActionsPopover" :content="content" preferred-position="below">
      <Button :external="external" :url="url" :accessibility-label="isActivatorForMoreActionsPopover ? content :
    accessibilityLabel" :disclosure="disclosure && showContentInButton" @click="onAction" :disabled="disabled"
        :size="size">
        <template #icon>
          <Icon :source="MenuHorizontalIcon" tone="base"></Icon>
        </template>
        <template #default v-if="buttonContent">{{ buttonContent }}</template>
      </Button>
    </Tooltip>
    <Button v-else :external="external" :url="url" :accessibility-label="isActivatorForMoreActionsPopover ? content :
    accessibilityLabel" :disclosure="disclosure && showContentInButton" @click="onAction" :disabled="disabled"
      :size="size"><template #default v-if="buttonContent">{{ buttonContent }}</template></Button>
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
import { MenuHorizontalIcon } from "@ncpl/ncpl-icons"
import styles from '../BulkActions.module.scss'

defineOptions({
  name: 'NpBulkActionsButton',
})

const emit = defineEmits(['measurement'])

const props = defineProps<BulkActionButtonProps>()
const bulkActionButton = ref()

const isActivatorForMoreActionsPopover = computed(() => props.disclosure && !props.showContentInButton);

const buttonContent = computed(() => isActivatorForMoreActionsPopover.value ? undefined : props.content);


onMounted(() => {
  if (bulkActionButton.value) {
    emit('measurement', bulkActionButton.value.getBoundingClientRect().width)
  }
})
</script>
