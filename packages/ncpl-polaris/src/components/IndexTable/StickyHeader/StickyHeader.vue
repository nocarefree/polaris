<template>
  <div :class="stickyTableClassNames" role="presentation">
    <Sticky :boundingElement="stickyWrapper">
      <template #default="{ isSticky }">
        <div v-if="indexTable.shouldShowBulkActions && !indexTable.condensed"
          :class="selectAllActionsClassName(isSticky)">
          <SelectAllActions :label="i18n.translate('Polaris.IndexTable.selected', {
            selectedItemsCount: selectedItemsCountLabel as number,
          })" :accessibilityLabel="indexTable.bulkActionsAccessibilityLabel" :selected="indexTable.bulkSelectState"
            :selectMode="indexTable.selectMode" @toggleAll="$emit('toggleAll')"
            :paginatedSelectAllText="paginatedSelectAllText" :paginatedSelectAllAction="paginatedSelectAllAction" />
          <slot name="loading"></slot>
        </div>
        <div v-else-if="condensed" :class="classNames(
          styles.HeaderWrapper,
          (!selectable || condensed) && styles.unselectable,
        )">
          <slot name="loading"></slot>
          <slot name="sort"></slot>
        </div>
        <div v-else :class="stickyHeaderClassNames(isSticky)" ref="stickyHeaderWrapperElement">
          <slot name="loading"></slot>
          <div :class="styles.StickyTableColumnHeader">
            <div :class="classNames(styles.TableHeading, polarisSummerEditions2023 && indexTable.selectable &&
              styles['TableHeading-first'], polarisSummerEditions2023 && firstHeading.flush &&
            styles['TableHeading-flush'],)" style="stickyColumnHeaderStyle" data-index-table-sticky-heading>
              <LegacyStack spacing="none" :wrap="false" alignment="center">
                <template v-if="indexTable.selectable">
                  <div :class="styles['StickyTableHeading-second-scrolling']">
                    <HeaderContent v-bind="firstHeading" :index="0"></HeaderContent>
                  </div>
                  <div :class="styles.FirstStickyHeaderElement" ref="firstStickyHeaderElement">
                    <div :class="styles.ColumnHeaderCheckboxWrapper">
                      <Checkbox :label="i18n.translate('Polaris.IndexTable.selectAllLabel', { resourceNamePlural: indexTable.resourceName?.plural, })" label-hidden @change="$emit('handleSelectPage')" :checked="indexTable.bulkSelectState" />
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
            <div v-for="(heading, index) in indexTable.headings" :class="stickyHeadingClassName" :style="headingStyle"
              data-index-table-sticky-heading>
              <HeaderContent v-bind="heading" :index="index"></HeaderContent>
            </div>
          </div>
        </div>
      </template>
    </Sticky>
    <div v-if="indexTable.shouldShowBulkActions && !indexTable.condensed" :class="bulkActionClassNames" :style="{
      insetBlockStart: isBulkActionsSticky ? undefined :
        bulkActionsAbsoluteOffset, width: bulkActionsMaxWidth, insetInlineStart: isBulkActionsSticky ? bulkActionsOffsetLeft
          : undefined
    }">
      <BulkActions :selectMode="selectMode" :promotedActions="promotedActions" :actions="actions"
        :onSelectModeToggle="condensed ? handleSelectModeToggle : undefined" :isSticky="isBulkActionsSticky"
        :width="bulkActionsMaxWidth" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import styles from "../IndexTable.module.scss";
import { classNames } from "@ncpl-polaris/utils";
import SelectAllActions from "../../SelectAllActions";
import HeaderContent from "../HeaderContent/HeaderContent.vue";
import Sticky from "../../Sticky";
import { useI18n, useIndexTable, useFeatures } from "../../context";
import type { IndexTableHeading } from "../HeadingContent/HeaderContent"
import { SELECT_ALL_ITEMS } from "../IndexTable"


const i18n = useI18n();
const indexTable = useIndexTable();

defineProps<{
  stickyWrapper: HTMLElement;
}>()

const firstHeading = computed(() => {
  return indexTable.value.headings[0]
})

const { polarisSummerEditions2023 } = useFeatures();

const selectedItemsCountLabel = computed(() => indexTable.value.selectedItemsCount === SELECT_ALL_ITEMS ? `${indexTable.value.itemCount}+` : indexTable.value.selectedItemsCount)

const stickyTableClassNames = computed(() => classNames(
  styles.StickyTable,
  indexTable.value.condensed && styles['StickyTable-condensed'],
));

const selectAllActionsClassName = (isSticky: boolean) => {
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


</script>