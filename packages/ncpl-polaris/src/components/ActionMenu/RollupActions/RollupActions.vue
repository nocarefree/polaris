<template>
  <Popover v-if="!(items.length === 0 && sections.length === 0)" :active="rollupOpen" preferred-alignment="right"
    @close="toggleRollupOpen" hide-on-print>
    <template #activator>
      <div :class="styles.RollupActivator">
        <Button outline :icon="MenuHorizontalIcon" :accessibility-label="accessibilityLabel ||
    i18n.translate('Polaris.ActionMenu.RollupActions.rollupButton')" @click="toggleRollupOpen" />
      </div>
    </template>
    <ActionList :items="items" :sections="sections" @actionAnyItem="toggleRollupOpen" />
  </Popover>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { RollupActionsProps } from './RollupActions'
import styles from './RollupActions.module.scss'
import Popover from "@ncpl-polaris/components/Popover"
import Button from "@ncpl-polaris/components/Button"
import ActionList from "@ncpl-polaris/components/ActionList"
import { useI18n } from '../../context';
import { MenuHorizontalIcon } from "@ncpl/ncpl-icons"


withDefaults(defineProps<RollupActionsProps>(), { items: () => [], sections: () => [] })

const rollupOpen = ref(false);
const i18n = useI18n();

const toggleRollupOpen = () => {
  rollupOpen.value = !rollupOpen.value;
}
</script>
