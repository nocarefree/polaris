<template>
  <li v-if="url" :class="classNames(styles.ListItem, Boolean(actions && actions.length) && styles['ListItem-hasAction'])"
    @mouseenter="$emit('mouseenter', label)">
    <div :class="styles.ItemWrapper">
      <div :class="classNames(
        styles.ItemInnerWrapper,
        (_selected && childIsActive && styles['ItemInnerWrapper-open']) || (_selected && !childIsActive && styles['ItemInnerWrapper-selected']),
        displayActionsOnHover &&
        styles['ItemInnerWrapper-display-actions-on-hover'],
        disabled && styles.ItemInnerDisabled
      )">
        <ConditionalWrapper :condition="Boolean(displayActionsOnHover && actions?.length && hasBadge)">
          <template #wrapper="{ children }">
            <span :class="styles.ItemWithFloatingActions">
              <component :is="children"></component>
            </span>
          </template>

          <ConditionalWrapper :condition="isTruncated">
            <template #wrapper="{ children }">
              <Tooltip :hover-delay="TOOLTIP_HOVER_DELAY" :content="label" preferred-position="above">
                <component :is="children"></component>
              </Tooltip>
            </template>
            <UnstyledLink :url="url" :class="classNames(
              styles.Item,
              disabled && styles['Item-disabled'],
              (_selected || childIsActive) && styles['Item-selected'],
              showExpanded && styles.subNavigationActive,
              childIsActive && styles['Item-child-active'],
              showVerticalLine && styles['Item-line'],
              matches && styles['Item-line-pointer'],
              showVerticalHoverPointer && styles['Item-hover-pointer'],
            )" :external="external" :tabindex="tabIndex" :aria-disabled="disabled" :aria-label="accessibilityLabel"
              @click="onClick"
              v-bind="normalizeAriaAttributes(secondaryNavigationId, subNavigationItems.length > 0, showExpanded)">
              <div v-if="iconSource" :class="classNames(styles.Icon, shouldResizeIcon && styles['Icon-resized'])">
                <Icon :source="iconSource" />
              </div>
              <span :class="classNames(styles.Text, truncateText && styles['Text-truncated'])" ref="navTextRef">
                {{ label }}
                <span v-if="hasNewChild" :class="styles.Indicator">
                  <Indicator pulse />
                </span>
              </span>
              <div v-if="hasBadge && !Boolean(actions?.length)" :class="styles.Badge">
                <Badge v-if="$props.new" tone="new">{{ i18n.translate('Polaris.Badge.TONE_LABELS.new') }}</Badge>
                <Badge v-else-if="typeof badge == 'string'" tone="new">{{ badge }}</Badge>
                <component v-else :is="badge" />
              </div>
            </UnstyledLink>
          </ConditionalWrapper>
          <span v-if="actions?.length" ::class="styles.SecondaryActions">
            <template v-for="{ url, accessibilityLabel, tooltip, icon, onClick } in actions">
              <ConditionalWrapper :condition="Boolean(tooltip)">
                <template #wrapper="{ children }">
                  <Tooltip v-bind="tooltip">
                    <component :is="children"></component>
                  </Tooltip>
                </template>
                <UnstyledLink v-if="url" external :url="url" :class="styles.SecondaryAction" :tab-index="tabIndex"
                  :aria-disabled="disabled" :aria-label="accessibilityLabel" @click="onClick">
                  <Icon :source="icon" />
                </UnstyledLink>
                <UnstyledButton v-else :class="styles.SecondaryAction" :tabindex="tabIndex" :disabled="disabled"
                  :accessibility-label="accessibilityLabel" @click="onClick">
                  <Icon :source="icon" />
                </UnstyledButton>
              </ConditionalWrapper>
            </template>
          </span>
        </ConditionalWrapper>
        <div v-if="hasBadge && Boolean(actions?.length)" :class="styles.Badge">
          <Badge v-if="$props.new" tone="new">{{ i18n.translate('Polaris.Badge.TONE_LABELS.new') }}</Badge>
          <Badge v-else-if="typeof badge == 'string'" tone="new">{{ badge }}</Badge>
          <component v-else :is="badge" />
        </div>
      </div>
    </div>
    <SecondaryNavigation v-if="subNavigationItems.length > 0" :item-component="Item" :icon="icon"
      :longest-match="matchingSubNavigationItems.sort(({ url: firstUrl }, { url: secondUrl }) => secondUrl.length - firstUrl.length)[0]"
      :sub-navigation-items="subNavigationItems" :show-expanded="showExpanded" :truncate-text="truncateText"
      :secondary-navigation-id="secondaryNavigationId" />
  </li>
  <li v-else :class="styles.ListItem">
    <div :class="styles.ItemWrapper">
      <div :class="classNames(
        styles.ItemInnerWrapper,
        disabled && styles.ItemInnerDisabled,
        selected && styles['ItemInnerWrapper-selected'],
      )">
        <button type="button"
          :class="classNames(styles.Item, disabled && styles['Item-disabled'], selected && styles['Item-selected'],)"
          :disabled="disabled" :aria-disabled="disabled" :aria-label="accessibilityLabel" @click="onClick">
          <div v-if="iconSource" :class="classNames(styles.Icon, shouldResizeIcon && styles['Icon-resized'])">
            <Icon :source="iconSource" />
          </div>
          <span :class="classNames(styles.Text, truncateText && styles['Text-truncated'])" ref="navTextRef">
            {{ label }}
            <span v-if="hasNewChild" :class="styles.Indicator">
              <Indicator pulse />
            </span>
          </span>
          <div v-if="hasBadge" :class="styles.Badge">
            <Badge v-if="$props.new" tone="new">{{ i18n.translate('Polaris.Badge.TONE_LABELS.new') }}</Badge>
            <Badge v-else-if="typeof badge == 'string'" tone="new">{{ badge }}</Badge>
            <component v-else :is="badge" />
          </div>
        </button>
      </div>
    </div>
  </li>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ItemProps } from '../types'
import Item from "../Item";
import Icon from "../../Icon"
import Indicator from "../../Indicator"
import Badge from "../../Badge"
import UnstyledLink from "../../UnstyledLink"
import UnstyledButton from "../../UnstyledButton"
import Tooltip from "../../Tooltip"
import ConditionalWrapper from "../../ConditionalWrapper"
import SecondaryNavigation from "./SecondaryNavigation"
import styles from '../Navigation.module.scss'
import { MatchState } from "../types"
import type { ItemURLDetails } from "../types"
import { useNavigation, useMediaQuery, useI18n, useId } from '../../context'
import { classNames } from '@ncpl-polaris/utils';



//const MAX_SECONDARY_ACTIONS = 2;
const TOOLTIP_HOVER_DELAY = 1000;

defineOptions({
  name: 'NpNavigationItem',
})
const emit = defineEmits(['toggleExpandedState', 'click', 'navigationDismiss', 'mouseenter'])
const props = withDefaults(defineProps<ItemProps>(), {
  subNavigationItems: () => []
})

const mediaQuery = useMediaQuery();
const secondaryNavigationId = useId();
const i18n = useI18n();
const navigation = useNavigation();
const actions = computed(() => props.secondaryActions || (props.secondaryAction && [props.secondaryAction]));
const isTruncated = ref(false);

const tabIndex = computed(() => {
  return props.disabled ? -1 : 0
})

const hasNewChild = computed(() => {
  const { subNavigationItems } = props;
  return subNavigationItems.filter((subNavigationItem: any) => subNavigationItem.new)
    .length > 0
})

const hasBadge = computed(() => props.new || props.badge);

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

const _selected = computed(() => {
  return !Boolean(props.selected)
    ? matchState.value === MatchState.MatchForced ||
    matchState.value === MatchState.MatchUrl ||
    matchState.value === MatchState.MatchPaths
    : props.selected
});

const showExpanded = computed(() => _selected.value || props.expanded || childIsActive.value);
const iconSource = computed(() => props.selected || childIsActive.value ? props.matchedItemIcon ?? props.icon : props.icon);


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
