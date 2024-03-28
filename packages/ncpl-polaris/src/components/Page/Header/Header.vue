<template>
  <Box position="relative" :padding-block-start="{ xs: '400', md: '600' }" :padding-block-end="{ xs: '400', md: '600' }"
    :padding-inline-start="{ xs: '400', sm: '0' }" :padding-inline-end="{ xs: '400', sm: '0' }"
    :visually-hidden="titleHidden">
    <div :class="headerClassNames">
      <component :is="()=>contentRender"></component>
    </div>
  </Box>
</template>
<script setup lang="ts">
import { h, computed, useSlots } from 'vue'
import type { PageHeaderProps, PageHeaderPrimaryAction as PrimaryAction } from './Header'
import Title from "./Title"
import Box from '../../Box'
import { buttonFrom } from '../../Button/utils'
import InlineStack from '../../InlineStack'
import ActionMenu from '../../ActionMenu'
import Tooltip from '../../Tooltip'
import Text from '../../Text'
import Breadcrumbs from '../../Breadcrumbs'
import Pagination from '../../Pagination'
import styles from './Header.module.scss'
import { classNames } from "../../../utils"
import { useI18n, useMediaQuery } from '../../context'

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
const mediaQuery = useMediaQuery();
const i18n = useI18n();

const isSingleRow = computed(() => {
  return props.primaryAction && props.pagination &&
    ((Array.isArray(props.secondaryActions) && !props.secondaryActions.length) ||
      slots.secondaryActions) &&
    !props.actionGroups.length;
})

const breadcrumbMarkup = computed(() => props.backAction ? () =>
  h('div', { class: styles.BreadcrumbWrapper }, [
    h(Box, { maxWidth: "100%", paddingInlineEnd: '100', printHidden: true },
      { default: () => h(Breadcrumbs, { backAction: props.backAction! }) }
    )]
  ) : null
);

const paginationMarkup = computed(() =>
  props.pagination && !mediaQuery.isNavigationCollapsed ? () =>
    h('div', { class: styles.PaginationWrapper }, [
      h(Box, { printHidden: true }, { default: () => h(Pagination, { ...props.pagination }) })
    ]) : null
)

const additionalNavigationMarkup = computed(() => slots.additionalNavigation ? () =>
  h(InlineStack, { gap: "400", align: "end" }, [
    h(Box, { printHidden: true }, { default: slots.additionalNavigation })
  ]) : null
)

const actionMenuMarkup = computed(() => {
  if (Array.isArray(props.secondaryActions) && props.secondaryActions.length > 0) {
    const secondaryActions = props.secondaryActions
    return () => h(ActionMenu, {
      actions: secondaryActions,
      groups: props.actionGroups,
      rollup: mediaQuery.isNavigationCollapsed,
      rollupActionsLabel: props.title ? i18n.value.translate('Polaris.Page.Header.rollupActionsLabel', { title: props.title }) : undefined,
      onActionRollup: (e: any) => emit('actionRollup', e),
    });
  } else if (slots.secondaryActions) {
    return slots.secondaryActions
  }
  return null
})

const additionalMetadataMarkup = computed(() => slots.additionalMetadata ? () =>
  h('div', { class: styles.AdditionalMetaData }, [
    h(Text, {
      color: "subdued",
      as: "span",
      variant: 'bodySm',
    }, { default: slots.additionalMetadata })
  ]) : null
);

const pageTitleMarkup = computed(() =>
  () => h('div', { className: styles.TitleWrapper }, [
    h(Title, {
      title: props.title,
      subtitle: props.subtitle,
      compactTitle: props.compactTitle
    }, { titleMetadata: slots.titleMetadata })
  ])
)

const primaryActionMarkup = computed(() => {
  return props.primaryAction || slots.primaryAction ? getPrimaryActionMarkup : null
})

const headerClassNames = computed(() => classNames(
  isSingleRow.value && styles.isSingleRow,
  (breadcrumbMarkup.value || paginationMarkup.value || additionalNavigationMarkup.value) && styles.hasNavigation,
  actionMenuMarkup && styles.hasActionMenu,
  mediaQuery.isNavigationCollapsed && styles.mobileView,
  !props.backAction && styles.noBreadcrumbs,
  props.title && props.title.length < LONG_TITLE && styles.mediumTitle,
  props.title && props.title.length > LONG_TITLE && styles.longTitle,
));



const contentRender = computed(() => {
  const { title } = props;
  const isNavigationCollapsed = mediaQuery.isNavigationCollapsed;


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
        slot2: pageTitleMarkup.value,
        slot3: actionMenuMarkup.value,
        slot4: primaryActionMarkup.value,
        slot5: additionalMetadataMarkup.value,
        slot6: additionalNavigationMarkup.value,
      },
      condition:
        isNavigationCollapsed &&
        breadcrumbMarkup.value == null &&
        title != null &&
        title.length <= REALLY_SHORT_TITLE,
    },
    mobileDefault: {
      slots: {
        slot1: breadcrumbMarkup.value,
        slot2: pageTitleMarkup.value,
        slot3: actionMenuMarkup.value,
        slot4: primaryActionMarkup.value,
        slot5: additionalMetadataMarkup.value,
        slot6: additionalNavigationMarkup.value,
      },
      condition: isNavigationCollapsed,
    },
    desktopCompact: {
      slots: {
        slot1: breadcrumbMarkup.value,
        slot2: pageTitleMarkup.value,
        slot3: actionMenuMarkup.value,
        slot4: primaryActionMarkup.value,
        slot5: additionalMetadataMarkup.value,
        slot6: additionalNavigationMarkup.value,
      },
      condition:
        !isNavigationCollapsed &&
        paginationMarkup.value == null &&
        actionMenuMarkup.value == null &&
        title != null &&
        title.length <= SHORT_TITLE,
    },
    desktopDefault: {
      slots: {
        slot1: breadcrumbMarkup.value,
        slot2: pageTitleMarkup.value,
        slot3: () => [actionMenuMarkup.value?.(), primaryActionMarkup.value?.()],
        slot4: paginationMarkup.value,
        slot5: additionalMetadataMarkup.value,
        slot6: additionalNavigationMarkup.value,
      },
      condition: !isNavigationCollapsed,
    },
  };

  const layout = Object.values(layouts).find((layout) => layout.condition) || layouts.desktopDefault;
  const { slot1, slot2, slot3, slot4, slot5, slot6 } = layout.slots;


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
          h(InlineStack, { gap: "400" }, { default: slot5 }),
          slot6 ? h('div', { class: styles.RightAlign }, [slot6()]) : undefined
        ])
      );
    }
  }

  return children;
})

const getPrimaryActionMarkup = () => {
  const { primaryAction } = props;
  let actionMarkup = null;
  if (primaryAction) {
    actionMarkup = () => {
      const { primary: isPrimary, helpText } = primaryAction;
      const primary = isPrimary === undefined ? true : isPrimary;
      const button = buttonFrom(shouldShowIconOnly(Boolean(mediaQuery.isNavigationCollapsed), primaryAction), { variant: primary ? 'primary' : undefined });
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
