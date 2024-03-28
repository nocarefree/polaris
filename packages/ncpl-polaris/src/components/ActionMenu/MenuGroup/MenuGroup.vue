<template>
  <Popover :active="active" preferred-alignment="left" @close="handleClose" hide-on-print>
    <template #activator>
      <SecondaryAction disclosure :disabled="disabled" :icon="icon" :accessibility-label="accessibilityLabel"
        @action="handleClick" @getOffsetWidth="e => $emit('getOffsetWidth', e)">
        {{ title }}
      </SecondaryAction>
    </template>
    <ActionList :items="actions" :sections="sections" @actionAnyItem="handleClose" />
    <div v-if="$slots.details" :class="styles.Details">
      <slot name="details"></slot>
    </div>
  </Popover>
</template>
<script setup lang="ts">
import type { MenuGroupProps } from './MenuGroup'
import styles from './MenuGroup.module.scss'
import Popover from "../../Popover"
import SecondaryAction from "../SecondaryAction"
import ActionList from "../../ActionList"

defineOptions({
  name: 'NpActionMenuMenuGroup',
})
withDefaults(defineProps<MenuGroupProps>(), { active: false })
const emit = defineEmits(['open', 'close', 'getOffsetWidth'])


const handleClick = () => {
  emit('open')
}
const handleClose = () => {
  emit('close')
}
</script>
