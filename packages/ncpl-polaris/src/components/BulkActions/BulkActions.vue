<template>
  <div ref="containerNode">
    <MyTransition :timeout="100">
      <template #default="{ state: status }">
        <div v-if="selectMode"
          :class="classNames(styles.Group, !isSticky && styles['Group-not-sticky'], !state.measuring && isSticky && styles[`Group-${status}`], state.measuring && styles['Group-measuring'])"
          ref="groupNode" :style="{ width: `${width}px` }">
          <div :class="styles.ButtonGroupWrapper" ref="buttonsNode">
            <div :class="styles.ButtonGroupInner">
              <InlineStack v-if="promotedActions && numberOfPromotedActionsToRender > 0 || hasPopover" gap="300">
                <template v-for="action in promotedActions">
                  <BulkActionMenu v-if="instanceOfMenuGroupDescriptor(action)" v-bind="action"
                    :is-new-badge-in-badge-actions="isNewBadgeInBadgeActions()" />
                  <BulkActionButton v-else :disabled="disabled" v-bind="action" @measurement="handleMeasurement" />
                </template>
                <div v-if="actionSections || rolledInPromotedActions.length > 0 || state.measuring"
                  :class="styles.Popover" ref="moreActionsNode">
                  <Popover :active="state.popoverVisible" preferred-alignment="right" @close="togglePopover">
                    <template #activator>
                      <BulkActionButton disclosure
                        :show-content-in-button="!(promotedActions && numberOfPromotedActionsToRender > 0)"
                        @action="togglePopover" :content="activatorLabel" :disabled="disabled"
                        :indicator="isNewBadgeInBadgeActions()">
                      </BulkActionButton>
                    </template>
                    <ActionList :sections="combinedActions" @actionAnyItem="togglePopover" />
                  </Popover>
                </div>
              </InlineStack>
            </div>
          </div>
        </div>
      </template>
    </MyTransition>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, reactive, watch, onMounted, onUpdated } from 'vue'
import type { BulkActionsProps, BulkAction } from './BulkActions'
import styles from './BulkActions.module.scss'
import InlineStack from "../InlineStack"
import Popover from "../Popover"
import ActionList from "../ActionList"
import MyTransition from "../Transition"
import BulkActionMenu from "./BulkActionMenu"
import BulkActionButton from "./BulkActionButton"
import { classNames } from '@ncpl-polaris/utils'
import { clamp } from "lodash"
import { useI18n } from '../context'
import type {
  MenuGroupDescriptor,
} from '../types';

import type {
  ActionListSection
} from "../ActionList/Section"

defineOptions({
  name: 'NpBulkActions',
})

type BulkActionListSection = ActionListSection;


const MAX_PROMOTED_ACTIONS = 2;

const BUTTONS_NODE_ADDITIONAL_WIDTH = 64;

const props = defineProps<BulkActionsProps>()
const i18n = useI18n();

const state = reactive({
  popoverVisible: false,
  measuring: true,
  containerWidth: 0,
})
const moreActionsNode = ref();
const buttonsNode = ref();
const containerNode = ref();

const actionSections = computed<BulkActionListSection[] | undefined>(() => {
  const { actions } = props;

  if (!actions || actions.length === 0) {
    return;
  }

  if (instanceOfBulkActionListSectionArray(actions)) {
    return actions;
  }

  if (instanceOfBulkActionArray(actions)) {
    return [
      {
        items: actions,
      },
    ];
  }
})

const hasPopover = computed(() => {
  return actionSections.value || rolledInPromotedActions.value.length > 0 || state.measuring
})

const rolledInPromotedActions = computed(() => {
  const { promotedActions } = props;

  if (
    !promotedActions ||
    promotedActions.length === 0 ||
    numberOfPromotedActionsToRender.value >= promotedActions.length
  ) {
    return [];
  }

  const rolledInPromotedActions = promotedActions.map((action) => {
    if (instanceOfMenuGroupDescriptor(action)) {
      return { items: [...action.actions] };
    }
    return { items: [action] };
  });

  return rolledInPromotedActions.slice(numberOfPromotedActionsToRender.value);
})

const activatorLabel = computed(() => {
  return !props.promotedActions ||
    (props.promotedActions && numberOfPromotedActionsToRender.value === 0 && !state.measuring)
    ? i18n.value.translate(
      'Polaris.ResourceList.BulkActions.actionsActivatorLabel',
    )
    : i18n.value.translate(
      'Polaris.ResourceList.BulkActions.moreActionsActivatorLabel',
    );
})

const combinedActions = computed(() => {
  let combinedActions: any[] = [];

  if (actionSections.value && rolledInPromotedActions.value.length > 0) {
    combinedActions = [...rolledInPromotedActions.value, ...actionSections.value];
  } else if (actionSections.value) {
    combinedActions = actionSections.value;
  } else if (rolledInPromotedActions.value.length > 0) {
    combinedActions = [...rolledInPromotedActions.value];
  }
  return combinedActions as ActionListSection[];
})


const togglePopover = () => {
  state.popoverVisible = !state.popoverVisible
}

const bulkActionsWidth = ref(0);
const promotedActionsWidths = ref<number[]>([]);
const addedMoreActionsWidthForMeasuring = ref(0);
const numberOfPromotedActionsToRender = computed(() => {
  const { promotedActions } = props;

  if (!promotedActions) {
    return 0;
  }

  const containerWidthMinusAdditionalWidth = Math.max(
    0,
    state.containerWidth - BUTTONS_NODE_ADDITIONAL_WIDTH,
  );

  if (
    containerWidthMinusAdditionalWidth >= bulkActionsWidth.value ||
    state.measuring
  ) {
    return promotedActions.length;
  }

  let sufficientSpace = false;
  let counter = promotedActions.length - 1;
  let totalWidth = 0;

  while (!sufficientSpace && counter >= 0) {
    totalWidth += promotedActionsWidths.value[counter];
    const widthWithRemovedAction =
      bulkActionsWidth.value -
      totalWidth +
      addedMoreActionsWidthForMeasuring.value;
    if (containerWidthMinusAdditionalWidth >= widthWithRemovedAction) {
      sufficientSpace = true;
    } else {
      counter--;
    }
  }

  return clamp(counter, 0, promotedActions.length);
})

const instanceOfMenuGroupDescriptor = (
  action: MenuGroupDescriptor | BulkAction,
): action is MenuGroupDescriptor => {
  return 'title' in action;
}

const isNewBadgeInBadgeActions = () => {
  const actions = actionSections.value;
  if (!actions) return false;

  for (const action of actions) {
    for (const item of action.items) {
      if (item.badge?.status === 'new') return true;
    }
  }

  return false;
}

const handleMeasurement = (width: number) => {
  if (state.measuring) {
    promotedActionsWidths.value.push(width);
  }
}

function instanceOfBulkActionListSectionArray(
  actions: (BulkAction | BulkActionListSection)[],
): actions is BulkActionListSection[] {
  const validList = actions.filter((action: any) => {
    return action.items;
  });

  return actions.length === validList.length;
}

function instanceOfBulkActionArray(
  actions: (BulkAction | BulkActionListSection)[],
): actions is BulkAction[] {
  const validList = actions.filter((action: any) => {
    return !action.items;
  });

  return actions.length === validList.length;
}

watch(() => props.promotedActions, () => {
  promotedActionsWidths.value = [];
})

onMounted(() => {
  const { actions, promotedActions } = props;

  if (promotedActions && !actions && moreActionsNode.value) {
    addedMoreActionsWidthForMeasuring.value = moreActionsNode.value.getBoundingClientRect().width;
  }

  bulkActionsWidth.value = buttonsNode.value
    ? buttonsNode.value.getBoundingClientRect().width - addedMoreActionsWidthForMeasuring.value : 0;

  if (containerNode.value) {
    state.containerWidth = containerNode.value.getBoundingClientRect().width;
    state.measuring = false;
  }
});

if (process.env.NODE_ENV === 'development') {
  watch(() => props.promotedActions, () => {
    const { promotedActions } = props;
    if (
      promotedActions &&
      promotedActions.length > MAX_PROMOTED_ACTIONS
    ) {
      // eslint-disable-next-line no-console
      console.warn(
        i18n.value.translate('Polaris.ResourceList.BulkActions.warningMessage', {
          maxPromotedActions: MAX_PROMOTED_ACTIONS,
        }),
      );
    }
  })

}


</script>
