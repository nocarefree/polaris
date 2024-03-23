<template>
  <ul :class="className">
    <li v-if="title" :class="styles.SectionHeading">
      <Text as="span" variant="bodySm" font-weight="medium" tone="subdued">
        {{ title }}
      </Text>
      <template v-if="action">
        <Tooltip v-if="action.tooltip" v-bind="action.tooltip">
          <button type="button" :class="styles.Action" :aria-label="action.accessibilityLabel" @click="action.onClick">
            <Icon source="action.icon" />
          </button>
        </Tooltip>
        <button type="button" :class="styles.Action" :aria-label="action.accessibilityLabel" @click="action.onClick">
          <Icon source="action.icon" />
        </button>
      </template>
    </li>

    <Item v-for="(item, index) in items" v-bind.prop="itemProps(item, index)" />

    <li v-if="rollup && iniItems.rollupItems.length > 0" :class="styles.RollupSection">
      <Collapsible :id="additionalItemsId" :open="expanded">
        <ul :class="styles.List">
          <Item v-for="item in iniItems.rollupItems" key="label" v-bind="item" />
        </ul>
      </Collapsible>
      <div :class="styles.ListItem" key="List Item">
        <div :class="styles.ItemWrapper">
          <div :class="styles.ItemInnerWrapper">
            <button type="button" :class="classNames(styles.Item, styles.RollupToggle)" @click="toggleExpanded"
              :aria-label="expanded ? rollup.hide : rollup.view">
              <span :class="styles.Icon">
                <Icon :source="MenuHorizontalIcon" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import type { NavigationSectionProps } from './Section'
import type { ItemProps } from '../types';
import Item from '../Item'
import { classNames } from "@ncpl-polaris/utils";
import Text from "../../Text";
import Icon from "../../Icon";
import Collapsible from "../../Collapsible";
import Tooltip from "../../Tooltip";

import { useId, useMediaQuery } from "../../context";
import { MenuHorizontalIcon } from "@ncpl/ncpl-icons";
import styles from '../Navigation.module.scss'

defineOptions({
  name: 'NpNavigationSection',
})
const props = defineProps<NavigationSectionProps>()

const additionalItemsId = useId();
const expanded = ref(false);
const expandedIndex = ref<number>();
const { isNavigationCollapsed } = useMediaQuery();

const className = computed(() => classNames(
  styles.Section,
  props.separator && styles['Section-withSeparator'],
  props.fill && styles['Section-fill'],
));

const iniItems = computed(() => {
  const { items, rollup } = props;
  if (rollup && items.length > rollup.after) {
    return {
      items: items.slice(0, rollup.after),
      rollupItems: items.slice(rollup.after)
    }
  }
  return {
    items: items,
    rollupItems: [],
  };
})

const itemProps = (item: any, index: number) => {
  const { onClick, label, subNavigationItems, ...rest } = item;

  return {
    subNavigationItems,
    label,
    matches: undefined,
    key: label,
    ...rest,
    expanded: expandedIndex.value === index,
    onToggleExpandedState: () => handleToggleExpandedState(index),
    onClick: () => handleClick(onClick, subNavigationItems != null && subNavigationItems.length > 0),
  } as ItemProps
}

// const additionalItemsId = useId();

let animationFrame: any;
const handleClick = (onClick: ItemProps['onClick'],
  hasSubNavItems: boolean) => {
  if (onClick) {
    onClick();
  }

  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }

  if (!hasSubNavItems || !isNavigationCollapsed) {
    animationFrame = requestAnimationFrame(() => expanded.value = false);
  }
};
const toggleExpanded = () => {
  expanded.value = !expanded.value
}

const handleToggleExpandedState = (index: number) => {
  expandedIndex.value = expandedIndex.value === index ? -1 : index;
}

</script>
