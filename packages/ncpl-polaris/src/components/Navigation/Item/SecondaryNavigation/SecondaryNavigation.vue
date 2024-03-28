<template>
  <div :class="classNames(styles.SecondaryNavigation, showExpanded && styles.SecondaryNavigationOpen, !icon &&
    styles['SecondaryNavigation-noIcon'])">
    <Collapsible :id="id" :open="showExpanded" :transition="false">
      <ul :class="styles.List">
        <component v-for="(item, index) in subNavigationItems" :is="itemComponent" v-bind="item"
          :show-vertical-line="Boolean(index < matchedItemPosition)" :show-vertical-hover-pointer="index === hoveredIndex"
          @mouseenter="() => item.disabled ? undefined : hoveredIndex = index"
          @mouseleave="() => item.disabled ? undefined : hoveredIndex = null" :matches="isEqual(item, longestMatch)"
          @click="() => { navigation.onDismiss?.(), item.onClick?.() }" :truncate-text="truncateText"></component>
      </ul>
    </Collapsible>
  </div>
</template>
<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import type { SecondaryNavigationProps } from './SecondaryNavigation'
import Collapsible from '../../../Collapsible'
import styles from '../../Navigation.module.scss'
import { useId, useNavigation } from '../../../context'
import { classNames } from '../../../../utils'
import { isEqual } from "lodash";

defineOptions({
  name: 'NpSecondaryNavigation',
})
const props = defineProps<SecondaryNavigationProps>()
const navigation = useNavigation();
const hoveredIndex = shallowRef<number | null>();
const _id = useId();
const id = computed(() => {
  return props.secondaryNavigationId || _id.value
})

const matchedItemPosition = computed(() => props.subNavigationItems.findIndex((item) =>
  isEqual(item, props.longestMatch),
));
</script>
