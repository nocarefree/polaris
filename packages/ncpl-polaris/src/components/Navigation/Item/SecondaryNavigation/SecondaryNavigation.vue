<template>
  <div :class="classNames(styles.SecondaryNavigation, showExpanded && styles.SecondaryNavigationOpen, !icon &&
    styles['SecondaryNavigation-noIcon'])">
    <Collapsible :id="id" :open="showExpanded" :transition="false">
      <ul :class="styles.List">
        <component :is="nodes"></component>
      </ul>
    </Collapsible>
  </div>
</template>
<script setup lang="ts">
import { computed, Fragment, h, ref } from 'vue'
import type { SecondaryNavigationProps } from './SecondaryNavigation'
import Collapsible from '@ncpl-polaris/components/Collapsible'
import styles from '../../Navigation.module.scss'
import { useId, useNavigation, useFeatures } from '@ncpl-polaris/components/context'
import { classNames } from '@ncpl-polaris/utils'
import { isEqual } from "lodash";

defineOptions({
  name: 'NpSecondaryNavigation',
})
const props = defineProps<SecondaryNavigationProps>()
const navigation = useNavigation();
const { polarisSummerEditions2023 } = useFeatures();
const hoveredItem = ref<any>();

const _id = useId();
const id = computed(() => {
  return props.secondaryNavigationId || _id.value
})

const nodes = computed(() => {

  const { subNavigationItems = [], longestMatch, truncateText } = props;
  const matchedItemPosition = subNavigationItems.findIndex((item) =>
    isEqual(item, longestMatch),
  );
  const hoveredItemPosition = subNavigationItems.findIndex((item) =>
    isEqual(item, hoveredItem),
  );
  return h(Fragment, props.subNavigationItems.map((item, index) => {
    const { label, ...rest } = item;
    const onClick = () => {
      navigation.onDismiss?.();
      item.onClick?.();
    };

    const shouldShowVerticalLine = polarisSummerEditions2023
      ? index < matchedItemPosition
      : false;

    return h(props.itemComponent, {
      key: label, ...rest, label, showVerticalLine: shouldShowVerticalLine, showVerticalHoverPointer:
        polarisSummerEditions2023 && index === hoveredItemPosition,
      onMouseenter: item.disabled ? undefined : () => hoveredItem.value = item,
      onMouseleave: item.disabled ? undefined : () => hoveredItem.value = null,
      matches: isEqual(item, longestMatch),
      onClick: onClick,
      truncateText: truncateText
    });
  }));
})


</script>
