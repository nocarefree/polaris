<template>
  <div :class="styles.BulkActions" :style="width ? { width } : undefined">
    <InlineStack gap="400" block-align="center">
      <div :class="styles.BulkActionsSelectAllWrapper">
        <CheckableButton :accessibility-label="accessibilityLabel"
          :label="paginatedSelectAllText && paginatedSelectAllAction ? paginatedSelectAllText : label"
          :selected="selected" @toggleAll="e => $emit('toggleAll', e)" :disabled="disabled"
          :aria-live="paginatedSelectAllText && paginatedSelectAllAction ? 'polite' : undefined" />
        <div v-if="paginatedSelectAllAction" :class="styles.PaginatedSelectAll">
          <UnstyledButton :class="styles.AllAction" @click="paginatedSelectAllAction.onAction" size="slim"
            :disabled="disabled">
            {{ paginatedSelectAllAction.content }}
          </UnstyledButton>
        </div>
      </div>
      <div v-if="selectMode" :class="styles.BulkActionsPromotedActionsWrapper">
        <InlineStack gap="100" block-align="center">
          <div :class="styles.BulkActionsOuterLayout">
            <BulkActionsMeasurer :promoted-actions="promotedActions" :disabled="disabled" :button-size="buttonSize"
              @measurement="handleMeasurement" />
            <div :class="classNames(styles.BulkActionsLayout, !hasMeasured && styles['BulkActionsLayout--measuring'])">
              <template v-if="promotedActions">
                <template v-for="action in visiblePromotedActions">
                  <BulkActionMenu v-if="instanceOfMenuGroupDescriptor(action)" v-bind="action"
                    :is-new-badge-in-badge-actions="isNewBadgeInBadgeActions(actionSections)" :size="buttonSize" />
                  <BulkActionButton v-else :disabled="disabled" v-bind="action" :size="buttonSize" />
                </template>
              </template>
            </div>
          </div>
          <Popover v-if="allHiddenActions.length > 0" :active="popoverActive" preferred-alignment="right"
            @close="togglePopover">
            <ActionList
              :sections="hiddenPromotedSection.items.length > 0 ? [hiddenPromotedSection, ...allHiddenActions] : allHiddenActions"
              @actionAnyItem="togglePopover" />
            <template #activator>
              <BulkActionButton disclosure :show-content-in-button="!visiblePromotedActions?.length"
                @action="togglePopover" :content="activatorLabel" :disabled="disabled"
                :indicator="isNewBadgeInBadgeActions(actionSections)" :size="buttonSize" />
            </template>
          </Popover>
        </InlineStack>
      </div>
    </InlineStack>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { BulkActionsProps, BulkAction } from './BulkActions';
import styles from './BulkActions.module.scss';
import InlineStack from "../InlineStack";
import UnstyledButton from "../UnstyledButton";
import CheckableButton from "../CheckableButton";
import Popover from "../Popover";
import ActionList from "../ActionList";
import BulkActionMenu from "./BulkActionMenu";
import BulkActionButton from "./BulkActionButton";
import BulkActionsMeasurer from "./BulkActionsMeasurer";
import type { BulkActionsMeasurements } from './BulkActionsMeasurer';
import { classNames } from '../../utils';
import { useI18n } from '../context'
import { getVisibleAndHiddenActions, instanceOfMenuGroupDescriptor, instanceOfBulkActionListSection, getActionSections, isNewBadgeInBadgeActions } from "./utils";
import type {
  MenuGroupDescriptor,
  ActionListSection
} from '../types';

defineOptions({
  name: 'NpBulkActions',
})



type BulkActionListSection = ActionListSection;


const props = defineProps<BulkActionsProps>()
const i18n = useI18n();


const popoverActive = ref(false);
const hasMeasured = ref<boolean>(false)
const actionsWidths = ref<number[]>([]);
const containerWidth = ref<number>(Infinity);
const disclosureWidth = ref<number>(0);

const visiblePromotedActions = ref<BulkActionsProps['promotedActions']>([]);
const hiddenPromotedActions = ref<BulkActionsProps['promotedActions']>([]);
const hiddenPromotedSection = computed(() => {
  const mergedHiddenPromotedActions = hiddenPromotedActions.value?.reduce(
    (memo, action) => {
      if (!action) return memo;
      if (instanceOfMenuGroupDescriptor(action)) {
        return memo.concat(action.actions);
      }
      return memo.concat(action);
    },
    [] as (BulkAction | MenuGroupDescriptor)[],
  );

  return {
    items: mergedHiddenPromotedActions || [],
  } as BulkActionListSection
})

const actionSections = computed(() => getActionSections(props.actions));
const allHiddenActions = computed(() => {
  const { actions } = props;

  if (actionSections.value) {
    return actionSections.value;
  }
  if (!actions) {
    return [];
  }
  let isAFlatArray = true;
  return actions
    .filter((action) => action)
    .reduce(
      (
        memo: BulkActionListSection[],
        action: BulkAction | BulkActionListSection,
      ): BulkActionListSection[] => {
        if (instanceOfBulkActionListSection(action)) {
          isAFlatArray = false;
          return memo.concat(action);
        }
        if (isAFlatArray) {
          if (memo.length === 0) {
            return [{ items: [action] }];
          }
          const lastItem = memo[memo.length - 1];
          memo.splice(memo.length - 1, 1, {
            items: [...lastItem.items, action],
          });
          return memo;
        }

        isAFlatArray = true;

        return memo.concat({ items: [action] });
      },
      [],
    );
});

const activatorLabel = computed(() =>
  !props.promotedActions || (props.promotedActions && visiblePromotedActions.value?.length === 0)
    ? i18n.value.translate('Polaris.ResourceList.BulkActions.actionsActivatorLabel')
    : i18n.value.translate(
      'Polaris.ResourceList.BulkActions.moreActionsActivatorLabel',
    ));


const handleMeasurement = (measurements: BulkActionsMeasurements) => {

  if (!props.promotedActions || props.promotedActions.length === 0) {
    return;
  }

  const _ = getVisibleAndHiddenActions(
    props.promotedActions,
    measurements.disclosureWidth,
    measurements.hiddenActionsWidths,
    measurements.containerWidth,
  );

  visiblePromotedActions.value = _.visiblePromotedActions;
  hiddenPromotedActions.value = _.hiddenPromotedActions;
  hasMeasured.value = true;
  actionsWidths.value = measurements.hiddenActionsWidths;
  containerWidth.value = measurements.containerWidth;
  disclosureWidth.value = measurements.disclosureWidth;
};

const togglePopover = () => {
  popoverActive.value = !popoverActive.value
};


watch(
  () => [containerWidth.value, disclosureWidth.value, props.promotedActions, actionsWidths.value],
  () => {
    if (
      containerWidth.value === 0 ||
      !props.promotedActions ||
      props.promotedActions.length === 0
    ) {
      return;
    }
    const _ =
      getVisibleAndHiddenActions(
        props.promotedActions,
        disclosureWidth.value,
        actionsWidths.value,
        containerWidth.value,
      );

    visiblePromotedActions.value = _.visiblePromotedActions;
    hiddenPromotedActions.value = _.hiddenPromotedActions;
    hasMeasured.value = containerWidth.value !== Infinity;

  }, { immediate: true, flush: 'post' });

</script>
