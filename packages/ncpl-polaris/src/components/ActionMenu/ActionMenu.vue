<template>
  <div v-if="!(actions.length === 0 && groups.length === 0)" :class="classNames(
    styles.ActionMenu,
    rollup && styles.rollup,
  )">
    <RollupActions v-if="rollup" :accessibility-label="rollupActionsLabel" :items="actions" :sections="rollupSections" />
    <Actions v-else :actions="actions" :groups="groups" @actionRollup="$emit('actionRollup')" />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { ActionMenuProps } from './ActionMenu'
import type { MenuGroupDescriptor, ActionListSection } from "../types";
import styles from './ActionMenu.module.scss'
import RollupActions from "./RollupActions";
import Actions from "./Actions"
import { classNames } from '../../utils';

defineOptions({
  name: 'NpActionMenu',
})

defineEmits(['actionRollup'])
const props = withDefaults(defineProps<ActionMenuProps>(), {
  actions: () => [],
  groups: () => []
})

const rollupSections = computed(() => {
  return props.groups.map((group) => convertGroupToSection(group));
})

function convertGroupToSection({
  title,
  actions,
  disabled,
}: MenuGroupDescriptor): ActionListSection {
  return {
    title,
    items: actions.map((action) => ({
      ...action,
      disabled: disabled || action.disabled,
    })),
  };
}

</script>
