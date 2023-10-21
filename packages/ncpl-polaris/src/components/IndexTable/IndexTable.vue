<template>
  <div :class="styles.IndexTable">
    <div :class="tableWrapperClassNames" ref="tableMeasurerRef">
      <Loading v-if="!shouldShowBulkActions && !condensed" :loading="loading"
        :resourceNamePlural="resourceNamePlural.toLocaleLowerCase()"></Loading>
      <template v-if="itemCount > 0">
        <StickyHeader v-if="stickyWrapper" :stickyWrapper="stickyWrapper">
          <template name="loading">
            <Loading :resourceNamePlural="resourceNamePlural.toLocaleLowerCase()"></Loading>
          </template>
          <template v-if="$slots.sort" name="sort">
            <slot name="sort"></slot>
          </template>
          <slot name="bulkActions">
            <div v-if="shouldShowBulkActions && !condensed" :class="bulkActionClassNames"
              :style="{ insetBlockStart: isBulkActionsSticky ? undefined : bulkActionsAbsoluteOffset, width: bulkActionsMaxWidth, insetInlineStart: isBulkActionsSticky ? bulkActionsOffsetLeft : undefined }">
              <BulkActions :select-mode="selectMode" :promoted-actions="promotedActions" :actions="actions"
                @selectModeToggle="condensed ? $emit('selectionChange', SelectionType.All, false) : undefined"
                :isSticky="isBulkActionsSticky" :width="bulkActionsMaxWidth" />
            </div>
          </slot>
        </StickyHeader>
        <ul v-if="condensed" :data-selectmode="Boolean(selectMode)"
          :class="classNames(styles.CondensedList, hasZebraStriping && styles.ZebraStriping)" ref="stickyWrapper">
          <slot></slot>
        </ul>
        <ScrollContainer v-else ref="scrollableContainerElement" @scroll="handleScrollContainerScroll">
          <table ref="tableElement" :class="tableClassNames">
            <thead>
              <tr :class="styles.HeadingRow">
                <th
                  :class="classNames(styles.TableHeading, sortable?.some((value) => value === true) && styles['TableHeading-sortable'], styles['TableHeading-first'])"
                  data-index-table-heading>
                  <div :class="styles.ColumnHeaderCheckboxWrapper">
                    <Checkbox
                      :label="i18n.translate('Polaris.IndexTable.selectAllLabel', { resourceNamePlural: resourceNamePlural })"
                      label-hidden @change="handleSelectPage" :checked="bulkSelectState" />
                  </div>
                </th>
                <th v-for="(heading, index) in headings" v-bind="headerThAttributes(heading, index)"
                  data-index-table-heading>
                  <HeaderContent v-bind="heading" :index="index"></HeaderContent>
                </th>
              </tr>
            </thead>
            <tbody :ref="e => setTableBodyRef">
              <slot></slot>
            </tbody>
          </table>
        </ScrollContainer>
      </template>
      <div v-else :class="styles.EmptySearchResultWrapper">
        <EmptySearchResult v-if="!$slots.emptyState" :title="i18n.translate('Polaris.IndexTable.emptySearchTitle', {
          resourceNamePlural: resourceNamePlural,
        })" :description="i18n.translate('Polaris.IndexTable.emptySearchDescription')" with-illustration />
        <slot v-else name="emptyState"></slot>
      </div>
    </div>
    <div ref="bulkActionsIntersectionRef" />
  </div>
  <div v-if="itemCount > 0 && isMounted" :class="scrollBarWrapperClassNames" ref="scrollContainerElement">
    <div @scroll="handleScrollBarScroll" :class="styles.ScrollBar" ref="scrollBarElement">
      <div :class="classNames(tableElement && tableInitialized && styles.ScrollBarContent)" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, nextTick, watch } from 'vue';
import type { IndexTableProps } from './IndexTable';
import { SELECT_ALL_ITEMS, SelectionType } from './IndexTable';
import EmptySearchResult from "../EmptySearchResult";
import styles from './IndexTable.module.scss';
import { useI18n, indexTableContext } from "../context";
import ScrollContainer from "./ScrollContainer"
import Loading from "./Loading"
import StickyHeader from "./StickyHeader"
import HeaderContent from "./HeaderContent";
import Checkbox from "../Checkbox";
import { classNames } from "@ncpl-polaris/utils";
import BulkActions from "../BulkActions";
import { useIsBulkActionsSticky } from '../BulkActions/use-is-bulk-actions-sticky';
import type { IndexTableHeading } from './HeaderContent/HeaderContent';
import { debounce } from "@ncpl-polaris/utils/debounce"
import { useEventListener } from "@vueuse/core"

interface TableHeadingRect {
  offsetWidth: number;
  offsetLeft: number;
}


defineOptions({
  name: 'NpIndexTable',
})

const SCROLL_BAR_PADDING = 4;
const SCROLL_BAR_DEBOUNCE_PERIOD = 300;

const emit = defineEmits(['selectionChange'])
const props = withDefaults(defineProps<IndexTableProps>(), {
  selectedItemsCount: 0,
  selectable: true,
  promotedBulkActions: () => [],
  bulkActions: () => [],
  lastColumnSticky: false,
  defaultSortDirection: 'descending',
})

const i18n = useI18n();
const isMounted = ref(false)
const hideScrollContainer = ref(false);
const stickyWrapper = ref<HTMLElement>();
const tableHeadingRects = ref<TableHeadingRect[]>([]);
const tableHeadings = ref<HTMLElement[]>([]);
const scrollableContainerElement = ref<HTMLElement>();
const scrollContainerElement = ref<HTMLElement>();
const scrollBarElement = ref<HTMLElement>();
const tableElement = ref<HTMLElement>();
const tablePosition = ref({ top: 0, left: 0 });
const scrollingContainer = ref(false);
const tableInitialized = ref(false);
const hasMoreLeftColumns = ref(false);
const scrollingWithBar = ref(false);
const canFitStickyColumn = ref(true);
const canScrollRight = ref(true);
const isSortable = computed(() => props.sortable?.some((value) => value))
const selectMode = computed(() => props.selectedItemsCount === 'All' || props.selectedItemsCount > 0);
const shouldShowActions = computed(() => !props.condensed || props.selectedItemsCount);
const promotedActions = computed(() => shouldShowActions.value ? props.promotedBulkActions : []);
const bulkActionsSelectable = computed(() => Boolean(
  props.promotedBulkActions.length > 0 || props.bulkActions.length > 0,
))
const actions = computed(() => shouldShowActions.value ? props.bulkActions : []);
const shouldShowBulkActions = computed(() => bulkActionsSelectable.value && props.selectedItemsCount);
const computedResourceName = computed(() => {
  return props.resourceName
    ? props.resourceName
    : {
      singular: i18n.value.translate('Polaris.IndexProvider.defaultItemSingular'),
      plural: i18n.value.translate('Polaris.IndexProvider.defaultItemPlural'),
    }
});

const resourceNamePlural = computed(() => computedResourceName.value.plural);

const hasBulkActions = computed(() => Boolean(
  (props.promotedBulkActions && props.promotedBulkActions.length > 0) ||
  (props.bulkActions && props.bulkActions.length > 0),
));

const tableWrapperClassNames = computed(() => classNames(
  styles.IndexTableWrapper,
  hideScrollContainer.value && styles['IndexTableWrapper-scrollBarHidden'],
  shouldShowBulkActions.value && !props.condensed && selectMode.value && styles.IndexTableWrapperWithBulkActions,
))

const tableClassNames = computed(() => classNames(
  styles.Table,
  hasMoreLeftColumns.value && styles['Table-scrolling'],
  selectMode.value && styles.disableTextSelection,
  selectMode.value && shouldShowBulkActions.value && styles.selectMode,
  !props.selectable && styles['Table-unselectable'],
  canFitStickyColumn.value && styles['Table-sticky'],
  isSortable.value && styles['Table-sortable'],
  canFitStickyColumn.value && props.lastColumnSticky && styles['Table-sticky-last'],
  canFitStickyColumn.value && props.lastColumnSticky && canScrollRight.value && styles['Table-sticky-scrolling'],
  props.hasZebraStriping && styles.ZebraStriping
));

const scrollBarWrapperClassNames = computed(() => classNames(
  styles.ScrollBarContainer,
  props.condensed && styles.scrollBarContainerCondensed,
  hideScrollContainer.value && styles.scrollBarContainerHidden,
))

const bulkActionClassNames = computed(() => classNames(
  styles.BulkActionsWrapper,
  isBulkActionsSticky.value && styles.BulkActionsWrapperSticky,
))

const bulkActionsAccessibilityLabel = computed(() => {
  const { itemCount, selectedItemsCount } = props;
  const totalItemsCount = itemCount;
  const allSelected = selectedItemsCount === totalItemsCount;

  if (totalItemsCount === 1 && allSelected) {
    return i18n.value.translate(
      'Polaris.IndexProvider.a11yCheckboxDeselectAllSingle',
      {
        resourceNameSingular: computedResourceName.value.singular,
      },
    );
  } else if (totalItemsCount === 1) {
    return i18n.value.translate(
      'Polaris.IndexProvider.a11yCheckboxSelectAllSingle',
      {
        resourceNameSingular: computedResourceName.value.singular,
      },
    );
  } else if (allSelected) {
    return i18n.value.translate(
      'Polaris.IndexProvider.a11yCheckboxDeselectAllMultiple',
      {
        itemsLength: itemCount,
        resourceNamePlural: resourceNamePlural.value,
      },
    );
  } else {
    return i18n.value.translate(
      'Polaris.IndexProvider.a11yCheckboxSelectAllMultiple',
      {
        itemsLength: itemCount,
        resourceNamePlural: resourceNamePlural.value,
      },
    );
  }
})

const bulkSelectState = computed(() => {
  const { selectedItemsCount, itemCount } = props;
  let bulkSelectState: boolean | 'indeterminate' | undefined = 'indeterminate';
  if (!selectedItemsCount || selectedItemsCount === 0) {
    bulkSelectState = undefined;
  } else if (
    selectedItemsCount === SELECT_ALL_ITEMS ||
    selectedItemsCount === itemCount
  ) {
    bulkSelectState = true;
  }
  return bulkSelectState;
})

const {
  bulkActionsIntersectionRef,
  tableMeasurerRef,
  isBulkActionsSticky,
  bulkActionsAbsoluteOffset,
  bulkActionsMaxWidth,
  bulkActionsOffsetLeft,
  computeTableDimensions,
} = useIsBulkActionsSticky(selectMode);


const headerThAttributes = (heading: IndexTableHeading, index: number) => {
  const { headings, sortable, selectable = true } = props;

  const isSecond = index === 0;
  const isLast = index === headings.length - 1;
  const hasSortable = sortable?.some((value) => value === true);
  const headingAlignment = heading.alignment || 'start';
  const headingContentClassName = classNames(
    styles.TableHeading,
    headingAlignment === 'center' && styles['TableHeading-align-center'],
    headingAlignment === 'end' && styles['TableHeading-align-end'],
    hasSortable && styles['TableHeading-sortable'],
    isSecond && styles['TableHeading-second'],
    isLast && !heading.hidden && styles['TableHeading-last'],
    !selectable && styles['TableHeading-unselectable'],
    heading.flush && styles['TableHeading-flush'],
  );

  const stickyPositioningStyle =
    selectable !== false &&
      isSecond &&
      tableHeadingRects.value &&
      tableHeadingRects.value.length > 0
      ? { left: tableHeadingRects.value[0].offsetWidth }
      : undefined;

  return {
    class: headingContentClassName,
    style: stickyPositioningStyle
  }
}

const handleSelectPage = () => { }

const handleTogglePage = () => {
  emit('selectionChange', SelectionType.Page, Boolean(!bulkSelectState.value || bulkSelectState.value === 'indeterminate'))
}

const setTableBodyRef = () => {
  tableInitialized.value = true;
}


const handleScrollContainerScroll = (canScrollLeft: boolean, _canScrollRight: boolean) => {
  if (!scrollableContainerElement.value || !scrollBarElement.value) {
    return;
  }

  if (!scrollingWithBar.value) {
    scrollingContainer.value = true;
    scrollBarElement.value.scrollLeft =
      scrollableContainerElement.value.scrollLeft;
  }
  scrollingWithBar.value = false;

  if (stickyHeaderElement.value) {
    stickyHeaderElement.value.scrollLeft =
      scrollableContainerElement.value.scrollLeft;
  }

  if (
    (canScrollLeft && !hasMoreLeftColumns) ||
    (!canScrollLeft && hasMoreLeftColumns)
  ) {
    toggleHasMoreLeftColumns();
  }

  canScrollRight.value = _canScrollRight;
}

const handleScrollBarScroll = () => {
  if (!scrollableContainerElement.value || !scrollBarElement.value) {
    return;
  }

  if (!scrollingContainer.value) {
    scrollingWithBar.value = true;
    scrollableContainerElement.value.scrollLeft =
      scrollBarElement.value.scrollLeft;
  }
  scrollingContainer.value = false;
}

const resizeTableScrollBar = () => {
  if (scrollBarElement.value && tableElement.value) {
    scrollBarElement.value.style.setProperty(
      '--pc-index-table-scroll-bar-content-width',
      `${tableElement.value.offsetWidth - SCROLL_BAR_PADDING}px`,
    );

    hideScrollContainer.value = scrollContainerElement.value?.offsetWidth === tableElement.value?.offsetWidth;
  }
}


const handleSelectAllItemsInStore = () => {
  emit('selectionChange', props.selectedItemsCount === SELECT_ALL_ITEMS ? SelectionType.Page : SelectionType.All, true,);
}

function getPaginatedSelectAllAction() {
  const { selectable, hasMoreItems, paginatedSelectAllActionText, itemCount, selectedItemsCount } = props;
  if (!selectable || !hasBulkActions.value || !hasMoreItems) {
    return;
  }

  const customActionText =
    paginatedSelectAllActionText ??
    i18n.value.translate('Polaris.IndexTable.selectAllItems', {
      itemsLength: itemCount,
      resourceNamePlural: computedResourceName.value.plural.toLocaleLowerCase(),
    });

  const actionText =
    selectedItemsCount === SELECT_ALL_ITEMS
      ? i18n.value.translate('Polaris.IndexTable.undo')
      : customActionText;

  return {
    content: actionText,
    onAction: handleSelectAllItemsInStore,
  };
}

const resizeTableHeadings = debounce(() => {
  if (!tableElement.value || !scrollableContainerElement.value) {
    return;
  }

  const boundingRect =
    scrollableContainerElement.value.getBoundingClientRect();
  tablePosition.value = {
    top: boundingRect.top,
    left: boundingRect.left,
  };

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

  // update the min width of the checkbox to be the be the un-padded width of the first heading
  if (
    selectable &&
    firstStickyHeaderElement?.value &&
    !polarisSummerEditions2023
  ) {
    const elementStyle = getComputedStyle(tableHeadings.value[0]);
    const boxWidth = tableHeadings.value[0].offsetWidth;
    firstStickyHeaderElement.value.style.minWidth = `calc(${boxWidth}px - ${elementStyle.paddingLeft} - ${elementStyle.paddingRight} + 2px)`;
  }

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

const debounceResizeTableScrollbar = debounce(resizeTableScrollBar, SCROLL_BAR_DEBOUNCE_PERIOD, { trailing: true, })

const handleCanScrollRight = debounce(() => {
  if (
    !props.lastColumnSticky ||
    !tableElement.value ||
    !scrollableContainerElement.value
  ) {
    return;
  }

  const tableRect = tableElement.value.getBoundingClientRect();
  const scrollableRect =
    scrollableContainerElement.value.getBoundingClientRect();

  canScrollRight.value = (tableRect.width > scrollableRect.width);
})

const handleCanFitStickyColumn = () => {
  if (!scrollableContainerElement.value || !tableHeadings.value.length) {
    return;
  }
  const scrollableRect =
    scrollableContainerElement.value.getBoundingClientRect();
  const checkboxColumnWidth = selectable
    ? tableHeadings.value[0].getBoundingClientRect().width
    : 0;
  const firstStickyColumnWidth =
    tableHeadings.value[selectable ? 1 : 0].getBoundingClientRect().width;
  const lastColumnIsNotTheFirst = selectable
    ? tableHeadings.value.length > 2
    : 1;
  // Don't consider the last column in the calculations if it's not sticky
  const lastStickyColumnWidth =
    props.lastColumnSticky && lastColumnIsNotTheFirst
      ? tableHeadings.value[
        tableHeadings.value.length - 1
      ].getBoundingClientRect().width
      : 0;
  // Secure some space for the remaining columns to be visible
  const restOfContentMinWidth = 100;
  setCanFitStickyColumn(
    scrollableRect.width >
    firstStickyColumnWidth +
    checkboxColumnWidth +
    lastStickyColumnWidth +
    restOfContentMinWidth,
  );
}

const handleResize = () => {
  // hide the scrollbar when resizing
  scrollBarElement.value?.style.setProperty(
    '--pc-index-table-scroll-bar-content-width',
    `0px`,
  );

  resizeTableHeadings();
  debounceResizeTableScrollbar();
  handleCanScrollRight();
  handleCanFitStickyColumn();
}


const indexTableProvide = computed(() => {
  return {
    ...props,
    resourceName: computedResourceName.value,
    selectMode: selectMode.value,
    shouldShowBulkActions: shouldShowBulkActions.value,
    bulkActionsAccessibilityLabel: bulkActionsAccessibilityLabel.value,
    bulkSelectState: bulkSelectState.value,
    paginatedSelectAllText: `All ${props.itemCount}+ ${computedResourceName.value.plural} are selected`,
    paginatedSelectAllAction: getPaginatedSelectAllAction(),
  }
})
indexTableContext.provide(indexTableProvide);

useEventListener(window, 'resize', handleResize)

watch(() => props.itemCount, computeTableDimensions, { flush: 'post' });

onMounted(() => {
  isMounted.value = true;
  nextTick(() => {
    resizeTableScrollBar();
  })
})

</script>
