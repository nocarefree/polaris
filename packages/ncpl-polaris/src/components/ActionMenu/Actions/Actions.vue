<template>
  <div :class="styles.ActionsLayout" ref="actionsLayoutRef">
    <ButtonGroup gap="tight">
      <template v-for="action in showableActions">
        <SecondaryAction v-if="action" v-bind="action" @getOffsetWidth="handleActionsOffsetWidth">
          {{ action.content }}
        </SecondaryAction>
      </template>

      <template v-for="{ title, ...rest } in showableGroups">
        <MenuGroup :title="title" :active="activeMenuGroup === title" v-bind="rest" @open="onOpen(title)"
          @close="activeMenuGroup = null" @getOffsetWidth="handleActionsOffsetWidth" />
      </template>
    </ButtonGroup>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { ActionMenuActionsProps } from './Actions'
import ButtonGroup from '@ncpl-polaris/components/ButtonGroup';
import SecondaryAction from '../SecondaryAction';
import MenuGroup from '../MenuGroup';

import styles from './Actions.module.scss'
import { useI18n } from '../../context';
import { useEventListener } from '@vueuse/core';
import { debounce } from "@ncpl-polaris/utils/debounce"

import type {
  MenuActionDescriptor,
  MenuGroupDescriptor,
} from '../../types';

const ACTION_SPACING = 8;

defineOptions({
  name: 'NpActionMenuActions',
})
const props = withDefaults(defineProps<ActionMenuActionsProps>(), { actions: () => [], groups: () => [] });

const i18n = useI18n();

const defaultRollupGroup: MenuGroupDescriptor = {
  title: i18n.value.translate('Polaris.ActionMenu.Actions.moreActions'),
  actions: [],
};

const showableActions = ref<MenuActionDescriptor[]>([...props.actions])
const showableGroups = ref<MenuGroupDescriptor[]>(props.groups.length > 0 ? [...props.groups] : [defaultRollupGroup])
const activeMenuGroup = ref<string | null | undefined>();
const actionsLayoutRef = ref<HTMLElement>();
let actionWidthsRef: number[] = [];


watch(() => [props.actions, props.groups], () => {
  resetRender();
})

const actionsCount = computed(() => {
  return props.actions.length + (props.groups.length || 1);
})

const resetRender = () => {
  showableActions.value = [...props.actions];
  showableGroups.value = props.groups.length > 0 ? [...props.groups] : [defaultRollupGroup];
  actionWidthsRef = [];
  updateRender();
}


const updateRender = () => {
  let _length2 = actionWidthsRef.length;
  if (actionsLayoutRef.value && actionsCount.value <= _length2) {

    let index = 0, lastGroup: any, lastIndex = actionsCount.value - 1, lastWidth = actionWidthsRef[lastIndex], rolledUpActions: MenuActionDescriptor[] = [], rolledUpGroups: MenuGroupDescriptor[] = [];
    let currentAvailableWidth = actionsLayoutRef.value.offsetWidth;

    showableActions.value = [];
    props.actions.forEach((action) => {

      const canFitAction = (index === lastIndex) ? (actionWidthsRef[index] < lastWidth) : (actionWidthsRef[index] + ACTION_SPACING + lastWidth <= currentAvailableWidth);

      if (canFitAction) {
        currentAvailableWidth -= actionWidthsRef[index] + ACTION_SPACING * 2;
        showableActions.value.push(action);
      } else {
        currentAvailableWidth = 0;
        rolledUpActions.push(action);
      }
      index++;
    });

    showableGroups.value = [];
    props.groups.forEach((action) => {
      const canFitAction = (index === lastIndex) ? (actionWidthsRef[index] < lastWidth) : (actionWidthsRef[index] + ACTION_SPACING + lastWidth <= currentAvailableWidth);

      if (index === lastIndex) {
        return lastGroup = { ...action };
      };
      if (canFitAction) {
        currentAvailableWidth -= actionWidthsRef[index] + ACTION_SPACING * 2;
        showableGroups.value.push(action);
      } else {
        currentAvailableWidth = 0;
        // Find last group if it exists and always render it as a rolled up action below
        rolledUpGroups.push(action);
      }
      index++;
    });

    if (rolledUpActions.length > 0 && props.groups.length == 0) {
      lastGroup = { ...defaultRollupGroup };
    }

    if (lastGroup) {
      lastGroup.actions = [...rolledUpActions, ...lastGroup.actions];
      lastGroup.sections = [...rolledUpGroups]

      showableGroups.value.push(lastGroup);
    }
  }
}

const handleActionsOffsetWidth = (value: number) => {
  actionWidthsRef.push(value)
  updateRender();
}


const handleResize = debounce(() => {
  if (actionsLayoutRef.value) {
    updateRender();
  }
}, 50, { leading: false, trailing: true })


const onOpen = (title: string) => {
  activeMenuGroup.value = activeMenuGroup.value == title ? null : title
}


useEventListener(window, 'resize', handleResize)
</script>
