<template>
  <Box position="relative" :padding-block-start="{ xs: '4', md: polarisSummerEditions2023 ? '6' : '5' }"
    :padding-block-end="{ xs: '4', md: polarisSummerEditions2023 ? '6' : '5' }"
    :padding-inline-start="{ xs: '4', sm: '0' }" :padding-inline-end="{ xs: '4', sm: '0' }"
    :visually-hidden="titleHidden">
    <component :is="contentRender"></component>
  </Box>
</template>
<script setup lang="ts">
import { h, computed, useSlots } from 'vue'
import type { PageHeaderProps, PageHeaderPrimaryAction as PrimaryAction } from './Header'
import Title from "./Title"
import Box from '@ncpl-polaris/components/Box'
import { buttonFrom } from '@ncpl-polaris/components/Button/utils'
import HorizontalStack from '@ncpl-polaris/components/HorizontalStack'
import ActionMenu from '@ncpl-polaris/components/ActionMenu'
import Tooltip from '@ncpl-polaris/components/Tooltip'
import Text from '@ncpl-polaris/components/Text'
import Breadcrumbs from '@ncpl-polaris/components/Breadcrumbs'
import Pagination from '@ncpl-polaris/components/Pagination'
import styles from './Header.module.scss'
import { classNames } from "@ncpl-polaris/utils"
import { useFeatures, useI18n, useMediaQuery } from '@ncpl-polaris/components/context'

const SHORT_TITLE = 20;
const REALLY_SHORT_TITLE = 8;
const LONG_TITLE = 34;

defineOptions({
  name: 'NpPageHeader',
})
const emit = defineEmits(['actionRollup']);
const props = withDefaults(defineProps<PageHeaderProps>(), {
  titleHidden: false,
  secondaryActions: () => [],
  actionGroups: () => [],
  compactTitle: false,
})
const slots = useSlots();
const { polarisSummerEditions2023 } = useFeatures();
const mediaQuery = useMediaQuery();
const i18n = useI18n();



const contentRender = computed(() => {
  const { secondaryActions, title, actionGroups, primaryAction, subtitle, compactTitle, backAction, pagination } = props;
  const isNavigationCollapsed = mediaQuery.isNavigationCollapsed;

  let actionMenuMarkup: any = null;
  if (Array.isArray(secondaryActions) && secondaryActions.length > 0) {
    actionMenuMarkup = () => h(ActionMenu, {
      actions: secondaryActions,
      groups: actionGroups,
      rollup: isNavigationCollapsed,
      rollupActionsLabel: title ? i18n.value.translate('Polaris.Page.Header.rollupActionsLabel', { title }) : undefined,
      onActionRollup: (e: any) => emit('actionRollup', e),
    })
  } else if (slots.secondaryActions) {
    actionMenuMarkup = slots.secondaryActions
  }


  let additionalMetadataMarkup = slots.additionalMetadata ?
    () => h('div', { class: styles.AdditionalMetaData }, [
      h(Text, {
        color: "subdued",
        as: "span",
        variant: polarisSummerEditions2023 ? 'bodySm' : undefined,
      }, { default: slots.additionalMetadata })
    ]) : null

  let additionalNavigationMarkup = slots.additionalNavigation ? () =>
    h(HorizontalStack, { gap: "4", align: "end" }, [
      h(Box, { printHidden: true }, { default: slots.additionalNavigation })
    ]) : null;

  let pageTitleMarkup = () =>
    h('div', { className: styles.TitleWrapper }, [
      h(Title, {
        title: title,
        subtitle: subtitle,
        compactTitle: compactTitle
      }, { titleMetadata: slots.titleMetadata })
    ]);

  let primaryActionMarkup = primaryAction ? getPrimaryActionMarkup : null;

  let breadcrumbMarkup = backAction ? () =>
    h('div', { class: styles.BreadcrumbWrapper }, [
      h(Box, { maxWidth: "100%", paddingInlineEnd: polarisSummerEditions2023 ? '1' : '4', printHidden: true },
        { default: () => h(Breadcrumbs, { backAction: backAction }) }
      )]
    ) : null;

  let paginationMarkup =
    pagination && !isNavigationCollapsed ? () =>
      h('div', { class: styles.PaginationWrapper }, [
        h(Box, { printHidden: true }, { default: () => h(Pagination, { ...pagination }) })
      ]) : null;
  //    Header Layout
  // |----------------------------------------------------|
  // | slot1 | slot2 |                    | slot3 | slot4 |
  // |----------------------------------------------------|
  // | slot5 |                                    | slot6 |
  // |----------------------------------------------------|
  //
  const layouts = {
    mobileCompact: {
      slots: {
        slot1: null,
        slot2: pageTitleMarkup,
        slot3: actionMenuMarkup,
        slot4: primaryActionMarkup,
        slot5: additionalMetadataMarkup,
        slot6: additionalNavigationMarkup,
      },
      condition:
        isNavigationCollapsed &&
        breadcrumbMarkup == null &&
        title != null &&
        title.length <= REALLY_SHORT_TITLE,
    },
    mobileDefault: {
      slots: {
        slot1: breadcrumbMarkup,
        slot2: pageTitleMarkup,
        slot3: actionMenuMarkup,
        slot4: primaryActionMarkup,
        slot5: additionalMetadataMarkup,
        slot6: additionalNavigationMarkup,
      },
      condition: isNavigationCollapsed,
    },
    desktopCompact: {
      slots: {
        slot1: breadcrumbMarkup,
        slot2: pageTitleMarkup,
        slot3: actionMenuMarkup,
        slot4: primaryActionMarkup,
        slot5: additionalMetadataMarkup,
        slot6: additionalNavigationMarkup,
      },
      condition:
        !isNavigationCollapsed &&
        paginationMarkup == null &&
        actionMenuMarkup == null &&
        title != null &&
        title.length <= SHORT_TITLE,
    },
    desktopDefault: {
      slots: {
        slot1: breadcrumbMarkup,
        slot2: pageTitleMarkup,
        slot3: () => [actionMenuMarkup?.(), primaryActionMarkup?.()],
        slot4: paginationMarkup,
        slot5: additionalMetadataMarkup,
        slot6: additionalNavigationMarkup,
      },
      condition: !isNavigationCollapsed,
    },
  };

  const layout = Object.values(layouts).find((layout) => layout.condition) || layouts.desktopDefault;
  const { slot1, slot2, slot3, slot4, slot5, slot6 } = layout.slots;

  const isSingleRow = primaryAction && pagination &&
    ((Array.isArray(secondaryActions) && !secondaryActions.length) ||
      slots.secondaryActions) &&
    !actionGroups.length;

  const headerClassNames = classNames(
    isSingleRow && styles.isSingleRow,
    (breadcrumbMarkup || paginationMarkup || additionalNavigationMarkup) && styles.hasNavigation,
    actionMenuMarkup && styles.hasActionMenu,
    isNavigationCollapsed && styles.mobileView,
    !props.backAction && styles.noBreadcrumbs,
    props.title && props.title.length < LONG_TITLE && styles.mediumTitle,
    props.title && props.title.length > LONG_TITLE && styles.longTitle,
  )

  let children: any = [];
  if ([slot1, slot2, slot3, slot4].some(notNull)) {

    let rightNode = [];
    if ([slot3, slot4].some(notNull)) {

      if (slot3 && slot4) {
        rightNode.push(h('div', { class: styles.Actions }, [slot3(), slot4()]));
      } else {
        slot3 && rightNode.push(slot3()), slot4 && rightNode.push(slot4())
      }
    }

    children.push(
      h('div', { class: styles.Row }, [slot1?.(), slot2?.(), rightNode.length > 0 ? h('div', { class: styles.RightAlign }, rightNode) : null])
    );

    if ([slot5, slot6].some(notNull)) {
      children.push(
        h('div', { class: styles.Row }, [
          h(HorizontalStack, { gap: "4" }, { default: slot5 }),
          slot6 ? h('div', { class: styles.RightAlign }, [slot6()]) : undefined
        ])
      );
    }


  }

  return () => h('div', { class: headerClassNames }, children);
})

const getPrimaryActionMarkup = () => {
  const { primaryAction } = props;
  let actionMarkup = null;
  if (primaryAction) {
    actionMarkup = () => {
      const { primary: isPrimary, helpText } = primaryAction;
      const primary = isPrimary === undefined ? true : isPrimary;
      const button = buttonFrom(shouldShowIconOnly(Boolean(mediaQuery.isNavigationCollapsed), primaryAction), {
        primary,
      },);
      return helpText ? h(Tooltip, { content: helpText }, { default: () => button }) : button
    }
  } else if (slots.primaryAction) {
    actionMarkup = slots.primaryAction
  }

  return h('div', { class: styles.PrimaryActionWrapper }, [h(Box, { printHidden: true }, { default: actionMarkup })])
}

function shouldShowIconOnly(
  isMobile: boolean,
  action: PrimaryAction,
): PrimaryAction {
  let { content, accessibilityLabel, icon } = action;
  if (icon == null) return { ...action, icon: undefined };

  if (isMobile) {
    accessibilityLabel = accessibilityLabel || content;
    content = undefined;
  } else {
    icon = undefined;
  }

  return {
    ...action,
    content,
    accessibilityLabel,
    icon,
  };
}

function notNull(value: any) {
  return value != null;
}

</script>
