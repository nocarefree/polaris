<template>
  <div :class="classNames(styles.StickyTable, condensed && styles['StickyTable-condensed'])" role="presentation">
    <Sticky :bounding-element="stickyWrapper">
      <template #default="{ isSticky }">
        <div v-if="indexTable.condensed" :class="classNames(
    styles.HeaderWrapper,
    (!indexTable.selectable || indexTable.condensed) && styles.unselectable,
  )">
          <slot name="loading"></slot>
          <slot name="sort"></slot>
        </div>
        <div v-else :class="stickyHeaderClassNames(isSticky)" ref="stickyHeaderWrapperElement">
          <slot name="loading"></slot>
          <div :class="styles.StickyTableColumnHeader">
            <div :class="classNames(styles.TableHeading, indexTable.selectable &&
    styles['TableHeading-first'], firstHeading.flush &&
  styles['TableHeading-flush'])" :style="stickyColumnHeaderStyle" data-index-table-sticky-heading="true">
              <LegacyStack spacing="none" :wrap="false" alignment="center">
                <template v-if="indexTable.selectable">
                  <div :class="styles.FirstStickyHeaderElement" ref="firstStickyHeaderElement">
                    <div :class="styles.ColumnHeaderCheckboxWrapper">
                      <Checkbox
                        :label="i18n.translate('Polaris.IndexTable.selectAllLabel', { resourceNamePlural: indexTable.resourceName?.plural, })"
                        label-hidden @change="handleTogglePage" :checked="indexTable.bulkSelectState" />
                    </div>
                  </div>
                  <div :class="styles['StickyTableHeading-second-scrolling']">
                    <RenderHeadingContent v-bind="firstHeading" :index="0"></RenderHeadingContent>
                  </div>
                </template>
                <div v-else :class="classNames(styles.FirstStickyHeaderElement)" ref="firstStickyHeaderElement">
                  <RenderHeadingContent v-bind="firstHeading" :index="0"></RenderHeadingContent>
                </div>
              </LegacyStack>
            </div>
          </div>
          <div :class="styles.StickyTableHeadings" ref="stickyHeaderElement">
            <div v-for="(heading, index) in indexTable.headings" v-bind="headerAttributes(heading, index)"
              data-index-table-sticky-heading="true">
              <RenderHeadingContent v-bind="heading" :index="index"></RenderHeadingContent>
            </div>
          </div>
        </div>
        <slot :is-sticky="isSticky"></slot>
      </template>
    </Sticky>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import styles from "../IndexTable.module.scss";
import { classNames } from "@ncpl-polaris/utils";
import RenderHeadingContent from "../RenderHeadingContent/RenderHeadingContent.vue";
import Sticky from "../../Sticky";
import LegacyStack from "../../LegacyStack";
import Checkbox from "../../Checkbox";
import { useI18n, useIndexTable } from "../../context";
import type { IndexTableHeading, TableHeadingRect } from "../types"
import { SELECT_ALL_ITEMS, SelectionType } from "../types"
import { getTableHeadingsBySelector } from '../utils';
import { debounce } from "@ncpl-polaris/utils/debounce";
import { themeDefault, toPx } from '@shopify/polaris-tokens';
import { useEventListener } from "@vueuse/core";

const i18n = useI18n();
const indexTable = useIndexTable();
const tableHeadingRects = ref<TableHeadingRect[]>([]);
const firstStickyHeaderElement = ref<HTMLElement>();
const stickyHeaderElement = ref<HTMLElement>();
const stickyHeaderWrapperElement = ref<HTMLElement>();


const props = defineProps<{
  condensed: boolean;
  stickyWrapper: HTMLElement;
  scrollLeft?: number;
}>()

const firstHeading = computed(() => {
  return indexTable.value.headings[0]
})

const stickyHeaderClassNames = (isSticky: boolean) => {
  return classNames(
    styles.StickyTableHeader,
    isSticky && styles['StickyTableHeader-isSticky'],
  );
}

const headerAttributes = (heading: IndexTableHeading, index: number) => {
  const position = index + 1;
  const headingStyle =
    tableHeadingRects.value && tableHeadingRects.value.length > position
      ? { minWidth: tableHeadingRects.value[position].offsetWidth }
      : undefined;
  const headingAlignment = heading.alignment || 'start';
  const stickyHeadingClassName = classNames(
    styles.TableHeading,
    heading.flush && styles['TableHeading-flush'],
    headingAlignment === 'center' && styles['TableHeading-align-center'],
    headingAlignment === 'end' && styles['TableHeading-align-end'],
    index === 0 && styles['StickyTableHeading-second'],
    index === 0 && !indexTable.value.selectable && styles.unselectable,
  );
  return {
    class: stickyHeadingClassName,
    style: headingStyle
  }
}

const stickyColumnHeaderStyle = computed(() =>
  tableHeadingRects.value && tableHeadingRects.value.length > 0
    ? {
      minWidth: `${calculateFirstHeaderOffset()}px`,
    }
    : undefined
);

const calculateFirstHeaderOffset = () => {
  if (!indexTable.value.selectable) {
    return tableHeadingRects.value[0].offsetWidth;
  }

  return indexTable.value.condensed
    ? tableHeadingRects.value[0].offsetWidth
    : tableHeadingRects.value[0].offsetWidth +
    tableHeadingRects.value[1].offsetWidth;
}

const handleTogglePage = () => {
  indexTable.value.selectionChange(SelectionType.Page, Boolean(!indexTable.value.bulkSelectState || indexTable.value.bulkSelectState === 'indeterminate'));
}

watch(() => props.scrollLeft, () => {
  if (stickyHeaderElement.value && props.scrollLeft) {
    stickyHeaderElement.value.scrollLeft = props.scrollLeft
  }
})


const tableHeadings = ref<HTMLElement[]>([]);
const stickyTableHeadings = ref<HTMLElement[]>([]);

const resizeTableHeadings = debounce(() => {
  if (indexTable.value.condensed) {
    return;
  }

  const { selectable } = indexTable.value;


  tableHeadingRects.value = tableHeadings.value.map((heading) => ({
    offsetWidth: heading.offsetWidth || 0,
    offsetLeft: heading.offsetLeft || 0,
  }));

  if (tableHeadings.value.length === 0) {
    return;
  }

  // update left offset for first column
  if (selectable && tableHeadings.value.length > 1)
    tableHeadings.value[1].style.left = `${tableHeadingRects.value[0].offsetWidth}px`;

  // update sticky header min-widths
  stickyTableHeadings.value.forEach((heading, index) => {
    let minWidth = 0;
    if (index === 0 && (!isBreakpointsXS() || !selectable)) {
      minWidth = calculateFirstHeaderOffset();
    } else if (selectable && tableHeadingRects.value.length > index) {
      minWidth = tableHeadingRects.value[index]?.offsetWidth || 0;
    } else if (!selectable && tableHeadingRects.value.length >= index) {
      minWidth = tableHeadingRects.value[index - 1]?.offsetWidth || 0;
    }

    heading.style.minWidth = `${minWidth}px`;
  });
})

watch(() => [indexTable.value.headings, firstStickyHeaderElement.value], () => {
  tableHeadings.value = getTableHeadingsBySelector(props.stickyWrapper, '[data-index-table-heading]',);
  stickyTableHeadings.value = getTableHeadingsBySelector(stickyHeaderWrapperElement.value, '[data-index-table-sticky-heading]',);

  resizeTableHeadings();
}, { flush: 'post', immediate: true })

const isBreakpointsXS = () => {
  return typeof window === 'undefined'
    ? false
    : window.innerWidth <
    parseFloat(toPx(themeDefault.breakpoints['breakpoints-sm']) ?? '');
};

useEventListener(window, 'resize', resizeTableHeadings)
</script>