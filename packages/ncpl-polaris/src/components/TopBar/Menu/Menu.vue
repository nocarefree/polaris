<template>
  <Popover :active="open" @update:active="e => $emit('update:open', e)" @close="$emit('close')" fixed full-height
    preferred-alignment="right">
    <template #activator>
      <div :class="styles.ActivatorWrapper">
        <button type="button" :class="classNames(
          styles.Activator,
          userMenu &&
          polarisSummerEditions2023 &&
          styles['Activator-userMenu'],
        )" @click="() => { $emit('open'), $emit('update:open', true) }" :aria-label="accessibilityLabel">
          <slot name="activatorContent"></slot>
        </button>
      </div>
    </template>
    <div :class="styles.MenuItems">
      <Box :width="customWidth">
        <ActionList action-role="menuitem" @actionAnyItem="() => { $emit('close'), $emit('update:open', false) }"
          :sections="actions" />
        <Message v-if="message" :title="message.title" :description="message.description" :action="{
          onClick: message.action.onClick,
          content: message.action.content,
        }" :link="{ to: message.link.to, content: message.link.content }" :badge="message.badge ? {
  content: message.badge.content,
  status: message.badge.status,
} : undefined" />
      </Box>
    </div>
  </Popover>
</template>
<script setup lang="ts">
import { MenuProps } from './Menu'
import Popover from "@ncpl-polaris/components/Popover"
import Box from "@ncpl-polaris/components/Box"
import ActionList from "@ncpl-polaris/components/ActionList"
import Message from "./Message"
import { classNames } from "@ncpl-polaris/utils"
import styles from './Menu.module.scss'

import { useFeatures } from '../../context'

defineOptions({
  name: 'NpMenu',
})
defineProps<MenuProps>();

defineEmits(['open', 'close', 'update:open'])

const { polarisSummerEditions2023 } = useFeatures();
</script>
