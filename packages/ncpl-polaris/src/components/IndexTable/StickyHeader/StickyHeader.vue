<template>
  <div :class="stickyTableClassNames" role="presentation">
    <Sticky :bounding-element="stickyWrapper">
      <template #default="{ isSticky }">
        <div v-if="indexTable.shouldShowBulkActions && !indexTable.condensed"
          :class="selectAllActionsClassName(isSticky)">
          <SelectAllActions :label="i18n.translate('Polaris.IndexTable.selected', {
            selectedItemsCount: selectedItemsCountLabel as number,
          })" :accessibility-label="indexTable.bulkActionsAccessibilityLabel" :selected="indexTable.bulkSelectState"
            :select-mode="indexTable.selectMode" @toggleAll="$emit('toggleAll')"
            :paginated-select-all-text="indexTable.paginatedSelectAllText"
            :paginated-select-all-action="indexTable.paginatedSelectAllAction" />
          <slot name="loading"></slot>
        </div>
        <div v-else-if="indexTable.condensed" :class="classNames(
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
            styles['TableHeading-flush'])" :style="stickyColumnHeaderStyle" data-index-table-sticky-heading>
              <LegacyStack spacing="none" :wrap="false" alignment="center">
                <template v-if="indexTable.selectable">
                  <div :class="styles['StickyTableHeading-second-scrolling']">
                    <HeaderContent v-bind="firstHeading" :index="0"></HeaderContent>
                  </div>
                  <div :class="styles.FirstStickyHeaderElement" ref="firstStickyHeaderElement">
                    <div :class="styles.ColumnHeaderCheckboxWrapper">
                      <Checkbox
                        :label="i18n.translate('Polaris.IndexTable.selectAllLabel', { resourceNamePlural: indexTable.resourceName?.plural, })"
                        label-hidden @change="$emit('handleSelectPage')" :checked="indexTable.bulkSelectState" />
                    </div>
                  </div>
                </template>
                <div v-else :class="classNames(styles.FirstStickyHeaderElement)" ref="firstStickyHeaderElement">
                  <HeaderContent v-bind="firstHeading" :index="0"></HeaderContent>
                </div>
              </LegacyStack>
            </div>
          </div>
          <div :class="styles.StickyTableHeadings" ref="stickyHeaderElement">
            <div v-for="(heading, index) in indexTable.headings" :ref="e => tableHeadingRects.push(e as HTMLElement)"
              v-bind="headerAttributes(heading, index)" data-index-table-sticky-heading>
              <HeaderContent v-bind="heading" :index="index"></HeaderContent>
            </div>
          </div>
        </div>
      </template>
    </Sticky>
    <slot name="bulkActions"></slot>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import styles from "../IndexTable.module.scss";
import { classNames } from "@ncpl-polaris/utils";
import SelectAllActions from "../../SelectAllActions";
import HeaderContent from "../HeaderContent/HeaderContent.vue";
import Sticky from "../../Sticky";
import LegacyStack from "../../LegacyStack";
import Checkbox from "../../Checkbox";
import { useI18n, useIndexTable } from "../../context";
import type { IndexTableHeading } from "../HeaderContent/HeaderContent"
import { SELECT_ALL_ITEMS } from "../IndexTable"


const i18n = useI18n();
const indexTable = useIndexTable();
const tableHeadingRects = ref<HTMLElement[]>([]);

defineProps<{
  stickyWrapper: HTMLElement;
}>()

const firstHeading = computed(() => {
  return indexTable.value.headings[0]
})

const selectedItemsCountLabel = computed(() => indexTable.value.selectedItemsCount === SELECT_ALL_ITEMS ? `${indexTable.value.itemCount}+` : indexTable.value.selectedItemsCount)

const stickyTableClassNames = computed(() => classNames(
  styles.StickyTable,
  indexTable.value.condensed && styles['StickyTable-condensed'],
));

const selectAllActionsClassName = (isSticky: boolean) => {
  console.log(isSticky)
  return classNames(
    styles.SelectAllActionsWrapper,
    indexTable.value.condensed && styles['StickyTableHeader-condensed'],
    isSticky && styles['StickyTableHeader-isSticky'],
  );
}

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
      minWidth: calculateFirstHeaderOffset(),
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
</script>