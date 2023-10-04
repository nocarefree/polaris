<template>
  <li v-if="url" :class="classNames(
    styles.ListItem,
    Boolean(actions && actions.length) && styles['ListItem-hasAction'],
  )" @mouseenter="() => {
  onMouseEnter?.(label);
}" @mouseleave="onMouseLeave">
    <div :class="styles.ItemWrapper">
      <div :class="classNames(styles.ItemInnerWrapper, polarisSummerEditions2023 ? (_selected && childIsActive &&
        styles['ItemInnerWrapper-open']) || (_selected && !childIsActive && styles['ItemInnerWrapper-selected']) : _selected
        && canBeActive && styles['ItemInnerWrapper-selected'], displayActionsOnHover &&
      styles['ItemInnerWrapper-display-actions-on-hover'], disabled && styles.ItemInnerDisabled)">

        <span v-if="displayActionsOnHover &&
          secondaryActionMarkup &&
          wrappedBadgeMarkup" :class="styles.ItemWithFloatingActions">
          <component :is="itemLinkMarkup"></component>
          <component v-if="secondaryActionMarkup && wrappedBadgeMarkup" :is="wrappedBadgeMarkup"></component>
        </span>

        <template v-else>
          <component :is="itemLinkMarkup"></component>
          <component v-if="secondaryActionMarkup" :is="secondaryActionMarkup"></component>
        </template>
        <component :is="outerContentMarkup"></component>
      </div>
    </div>
    <component v-if="secondaryNavigationMarkup" :is="secondaryNavigationMarkup"></component>
  </li>
  <li v-else :class="styles.ListItem">
    <div :class="styles.ItemWrapper">
      <div :class="classNames(styles.ItemInnerWrapper, disabled && styles.ItemInnerDisabled, polarisSummerEditions2023
        ? _selected && styles['ItemInnerWrapper-selected'] : undefined,)">
        <button type="button" :class="classNames(
          styles.Item,
          disabled && styles['Item-disabled'],
          _selected && styles['Item-selected'],
        )" :disabled="disabled" :aria-disabled="disabled" :aria-label="accessibilityLabel" @click="onClick">
          <component v-if="iconMarkup" :is="iconMarkup"></component>
          <component :is="itemLabelMarkup"></component>
          <component v-if="wrappedBadgeMarkup" :is="wrappedBadgeMarkup"></component>
        </button>
      </div>
    </div>
  </li>
</template>
<script setup lang="ts">
import { Fragment, computed, h, ref } from 'vue'
import type { ItemProps } from '../types'
import Item from "../Item";
import Icon from "@ncpl-polaris/components/Icon"
import Indicator from "@ncpl-polaris/components/Indicator"
import Badge from "@ncpl-polaris/components/Badge"
import UnstyledLink from "@ncpl-polaris/components/UnstyledLink"
import UnstyledButton from "@ncpl-polaris/components/UnstyledButton"
import Tooltip from "@ncpl-polaris/components/Tooltip"
import SecondaryNavigation from "./SecondaryNavigation"
import styles from '../Navigation.module.scss'
import { MatchState } from "../types"
import type { SecondaryAction, ItemURLDetails } from "../types"
import { useFeatures, useNavigation, useMediaQuery, useI18n, useId } from '@ncpl-polaris/components/context'
import { classNames } from '@ncpl-polaris/utils';



//const MAX_SECONDARY_ACTIONS = 2;
const TOOLTIP_HOVER_DELAY = 1000;

defineOptions({
  name: 'NpNavigationItem',
})
const emit = defineEmits(['toggleExpandedState', 'click', 'navigationDismiss'])
const props = defineProps<ItemProps>()

const mediaQuery = useMediaQuery();
const { polarisSummerEditions2023 } = useFeatures();
const secondaryNavigationId = useId();
const i18n = useI18n();
const navigation = useNavigation();
const actions = computed(() => props.secondaryActions || (props.secondaryAction && [props.secondaryAction]));
const isTruncated = ref(false);

const tabIndex = computed(() => {
  return props.disabled ? -1 : 0
})

const hasNewChild = computed(() => {
  const { subNavigationItems = [] } = props;
  return subNavigationItems.filter((subNavigationItem: any) => subNavigationItem.new)
    .length > 0
})
const indicatorMarkup = computed(() => hasNewChild.value ? h('span', { class: styles.Indicator }, [h(Indicator, { pulse: true })]) : null)

const itemLabelMarkup = computed(() => {
  return h('span', {
    class: classNames(
      styles.Text,
      props.truncateText && styles['Text-truncated'],
    )
  }, [props.label, indicatorMarkup.value]);
})

const matchState = computed(() => {
  const { url, matches, exactMatch, matchPaths, excludePaths } = props;

  return matchStateForItem(
    { url, matches, exactMatch, matchPaths, excludePaths },
    navigation.location,
  )
});

const matchingSubNavigationItems = computed(() =>
  (props.subNavigationItems || []).filter((item: any) => {
    const subMatchState = matchStateForItem(item, navigation.location);
    return (
      subMatchState === MatchState.MatchForced ||
      subMatchState === MatchState.MatchUrl ||
      subMatchState === MatchState.MatchPaths
    );
  })
);

const childIsActive = computed(() => matchingSubNavigationItems.value.length > 0);

const _selected = computed(() =>
  !Boolean(props.selected)
    ? matchState.value === MatchState.MatchForced ||
    matchState.value === MatchState.MatchUrl ||
    matchState.value === MatchState.MatchPaths
    : props.selected
);

const showExpanded = computed(() => _selected.value || props.expanded || childIsActive.value)

const canBeActive = computed(() => (props.subNavigationItems || []).length === 0 || !childIsActive.value)

const icon = computed(() => {
  return polarisSummerEditions2023 && (_selected.value || childIsActive.value)
    ? props.matchedItemIcon ?? props.icon
    : props.icon;
})

const iconMarkup = computed(() => {
  return icon.value ? h('div', {
    class: classNames(
      styles.Icon,
      props.shouldResizeIcon && styles['Icon-resized'],
    )
  }, [h(Icon, { source: icon.value })]) : null
})

const wrappedBadgeMarkup = computed(() => {

  let badgeMarkup: any = null;
  if (props.new) {
    badgeMarkup = h(Badge, { status: 'new' }, { default: () => i18n.value.translate('Polaris.Badge.STATUS_LABELS.new') });
  } else if (typeof props.badge === 'string') {
    badgeMarkup = h(Badge, { status: 'new' }, { default: () => props.badge });
  } else {
    badgeMarkup = props.badge;
  }

  return badgeMarkup ? h('div', { class: styles.Badge }, [badgeMarkup]) : null;
})

const secondaryActionMarkup = computed(() => {
  return actions.value?.length ? h('span', { class: styles.SecondaryActions }, actions.value.map((action) => {
    return getItemSecondaryAction({ ...action, tabIndex: tabIndex.value, disabled: props.disabled });
  })) : null;
});

const itemContentMarkup = computed(() => {
  return [iconMarkup.value, itemLabelMarkup.value, secondaryActionMarkup.value ? null : wrappedBadgeMarkup.value]
})

const linkMarkup = computed(() => {
  const { url, external, disabled, accessibilityLabel, subNavigationItems = [], showVerticalLine, showVerticalHoverPointer, matches } = props;
  return h(UnstyledLink, {
    url,
    class: classNames(
      styles.Item,
      disabled && styles['Item-disabled'],
      polarisSummerEditions2023
        ? (_selected.value || childIsActive.value) && styles['Item-selected']
        : _selected.value && canBeActive.value && styles['Item-selected'],
      showExpanded.value && styles.subNavigationActive,
      childIsActive.value && styles['Item-child-active'],
      showVerticalLine && polarisSummerEditions2023 && styles['Item-line'],
      matches && polarisSummerEditions2023 && styles['Item-line-pointer'],
      showVerticalHoverPointer &&
      polarisSummerEditions2023 &&
      styles['Item-hover-pointer'],
    ),
    external,
    tabIndex: tabIndex.value,
    ariaDisabled: disabled,
    ariaLabel: accessibilityLabel,
    onClick: onClick,
    ...normalizeAriaAttributes(
      secondaryNavigationId.value,
      subNavigationItems.length > 0,
      showExpanded.value,
    )
  }, { default: () => itemContentMarkup.value });
})

const itemLinkMarkup = computed(() => {
  return isTruncated.value ? h(Tooltip, { hoverDelay: TOOLTIP_HOVER_DELAY, content: props.label, preferredPosition: "above" }, [linkMarkup.value]) : linkMarkup.value
})

const outerContentMarkup = computed(() => {
  return h(Fragment, [secondaryActionMarkup.value ? wrappedBadgeMarkup.value : null]);
})

const secondaryNavigationMarkup = computed(() => {
  const { subNavigationItems = [], truncateText } = props;
  let _Markup = null;
  if (subNavigationItems.length > 0) {
    const longestMatch = matchingSubNavigationItems.value.sort(
      ({ url: firstUrl }, { url: secondUrl }) => secondUrl.length - firstUrl.length,
    )[0];

    _Markup = h(SecondaryNavigation, {
      itemComponent: Item,
      icon: icon.value,
      longestMatch,
      subNavigationItems,
      showExpanded: showExpanded.value,
      truncateText: truncateText,
      secondaryNavigationId: secondaryNavigationId.value
    });
  }
  return _Markup;
})


function onClick(event: MouseEvent) {
  const { subNavigationItems = [] } = props;
  const { currentTarget } = event;

  if ((currentTarget as HTMLElement).getAttribute('href') === navigation.location) {
    event.preventDefault();
  }

  if (
    subNavigationItems &&
    subNavigationItems.length > 0 &&
    mediaQuery.isNavigationCollapsed
  ) {
    event.preventDefault();
    emit('toggleExpandedState')
  } else {
    navigation.onDismiss?.();
  }
  emit('click');

}


interface ItemSecondaryActionProps extends SecondaryAction {
  tabIndex: number;
  disabled?: boolean;
}

function getItemSecondaryAction({
  url,
  icon,
  accessibilityLabel,
  tooltip,
  onClick,
  disabled,
  tabIndex
}: ItemSecondaryActionProps) {
  const _icon = { default: () => [h(Icon, { source: icon })] };
  const markup = url ? h(UnstyledLink, {
    external: props.external,
    url,
    class: styles.SecondaryAction,
    tabIndex,
    ariaDisabled: disabled,
    ariaLabel: accessibilityLabel
  }, _icon) :
    h(UnstyledButton, {
      class: styles.SecondaryAction,
      tabIndex,
      disabled,
      accessibilityLabel: accessibilityLabel,
      onClick: onClick
    }, _icon);
  return tooltip ? h(Tooltip, { ...tooltip }, [markup]) : markup
};

function normalizePathname(pathname: string) {
  const barePathname = pathname.split('?')[0].split('#')[0];
  return barePathname.endsWith('/') ? barePathname : `${barePathname}/`;
}

function safeEqual(location: string, path: string) {
  return normalizePathname(location) === normalizePathname(path);
}

function safeStartsWith(location: string, path: string) {
  return normalizePathname(location).startsWith(normalizePathname(path));
}

function matchStateForItem(
  { url, matches, exactMatch, matchPaths, excludePaths }: ItemURLDetails,
  location: string,
) {

  if (url == null) {
    return MatchState.NoMatch;
  }

  if (matches) {
    return MatchState.MatchForced;
  }

  if (
    matches === false ||
    (excludePaths &&
      excludePaths.some((path) => safeStartsWith(location, path)))
  ) {
    return MatchState.Excluded;
  }

  if (matchPaths && matchPaths.some((path) => safeStartsWith(location, path))) {
    return MatchState.MatchPaths;
  }

  const matchesUrl = exactMatch
    ? safeEqual(location, url)
    : safeStartsWith(location, url);
  return matchesUrl ? MatchState.MatchUrl : MatchState.NoMatch;
}

function normalizeAriaAttributes(
  controlId: string,
  hasSubMenu: boolean,
  expanded: boolean,
) {
  return hasSubMenu
    ? {
      'aria-expanded': expanded,
      'aria-controls': controlId,
    }
    : undefined;
}

</script>
