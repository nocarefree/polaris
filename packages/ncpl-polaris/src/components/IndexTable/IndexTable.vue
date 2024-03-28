<template>
  <div :class="styles.IndexTable">
    <div :class="tableWrapperClassNames" ref="tableMeasurerRef">
      <LoadingMarkup v-if="!condensed" :loading="loading"
        :resource-name-plural="resourceNamePlural.toLocaleLowerCase()">
      </LoadingMarkup>
      <template v-if="itemCount > 0">
        <StickyHeaderMarkup v-if="isMounted && stickyWrapper" :condensed="Boolean(condensed)"
          :sticky-wrapper="stickyWrapper!" :scroll-left="scrollLeft"
          :set-sticky-header-wrapper-element="stickyHeaderWrapperElement">
          <template #loading>
            <LoadingMarkup :resource-name-plural="resourceNamePlural.toLocaleLowerCase()"></LoadingMarkup>
          </template>
          <template v-if="$slots.sort" #sort>
            <slot name="sort"></slot>
          </template>
          <template #default="{ isSticky }">
            <div v-if="shouldShowActions && !condensed"
              :class="classNames(styles.BulkActionsWrapper, selectMode && styles.BulkActionsWrapperVisible, condensed && styles['StickyTableHeader-condensed'], isSticky && styles['StickyTableHeader-isSticky'],)">
              <BulkActions :select-mode="selectMode" :promoted-actions="promotedActions" :actions="actions"
                @toggleAll="handleTogglePage" :paginated-select-all-text="indexTableProvide.paginatedSelectAllText"
                :paginated-select-All-action="indexTableProvide.paginatedSelectAllAction" :selected="bulkSelectState"
                :label="i18n.translate('Polaris.IndexTable.selected', { selectedItemsCount: selectedItemsCount })"
                button-size="micro" />
            </div>
          </template>
        </StickyHeaderMarkup>
        <ul v-if="condensed" :data-selectmode="Boolean(selectMode)"
          :class="classNames(styles.CondensedList, hasZebraStriping && styles.ZebraStriping)"
          ref="condensedListElement">
          <slot></slot>
        </ul>
        <ScrollContainer v-else :ref="(e: any) => scrollableContainerElement = e?.$el"
          @scroll="handleScrollContainerScroll">
          <table ref="tableElement" :class="tableClassNames">
            <thead>
              <tr :class="styles.HeadingRow">
                <th v-if="selectable"
                  :class="classNames(styles.TableHeading, sortable?.some((value) => value === true) && styles['TableHeading-sortable'], styles['TableHeading-first'])"
                  data-index-table-heading>
                  <div :class="styles.ColumnHeaderCheckboxWrapper">
                    <Checkbox
                      :label="i18n.translate('Polaris.IndexTable.selectAllLabel', { resourceNamePlural: resourceNamePlural })"
                      label-hidden @change="e => selectionChange(SelectionType.Page, e)" :checked="bulkSelectState" />
                  </div>
                </th>
                <th v-for="(heading, index) in headings" v-bind="headerThAttributes(heading, index)"
                  data-index-table-heading>
                  <RenderHeadingContent v-bind="heading" :index="index"></RenderHeadingContent>
                </th>
              </tr>
            </thead>
            <tbody :ref="e => setTableBodyRef(e)">
              <template v-for="(row, index) in rows">
                <slot :row="row" :index="index"></slot>
              </template>
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

      <div v-if="itemCount > 0" :class="scrollBarWrapperClassNames" ref="scrollContainerElement">
        <div @scroll="handleScrollBarScroll" :class="styles.ScrollBar" ref="scrollBarElement">
          <div :class="classNames(tableElement && tableInitialized && styles.ScrollBarContent)" />
        </div>
      </div>
      <div v-if="pagination" :className="styles.PaginationWrapper">
        <Pagination type="table" :has-next="pagination.hasNext" :has-previous="pagination.hasPrevious"
          @next="pagination.onNext" @previous="pagination.onPrevious" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, shallowRef, watch } from 'vue';
import type { IndexTableProps, IndexTableHeading, Range } from './types';
import { SELECT_ALL_ITEMS, SelectionType } from './types';
import EmptySearchResult from "../EmptySearchResult";
import styles from './IndexTable.module.scss';
import { useI18n, indexTableContext } from "../context";
import ScrollContainer from "./ScrollContainer";
import LoadingMarkup from "./LoadingMarkup/LoadingMarkup.vue";
import RenderHeadingContent from "./RenderHeadingContent/RenderHeadingContent.vue";
import StickyHeaderMarkup from "./StickyHeaderMarkup/StickyHeaderMarkup.vue";
import Checkbox from "../Checkbox";
import { classNames } from "../../utils";
import BulkActions from "../BulkActions";
import { debounce } from "../../utils/debounce";
import { useEventListener } from "@vueuse/core";
import Pagination from "../Pagination";

interface TableHeadingRect {
  offsetWidth: number;
  offsetLeft: number;
}

defineOptions({
  name: 'NpIndexTable',
})

const SCROLL_BAR_PADDING = 4;
const SCROLL_BAR_DEBOUNCE_PERIOD = 300;

const emit = defineEmits(['update:selected'])
const props = withDefaults(defineProps<IndexTableProps>(), {
  selectable: true,
  promotedBulkActions: () => [],
  bulkActions: () => [],
  lastColumnSticky: false,
  defaultSortDirection: 'descending',
  selected: () => [],
  rows: () => [],
})

const selectedItems = computed(() => props.selected === 'All' ? props.rows.map(i => i.id) : [...props.selected]);
const selectedItemsCount = computed(() => selectedItems.value.length);

const i18n = useI18n();
const isMounted = ref(false)
const hideScrollContainer = ref(false);
const stickyWrapper = ref<HTMLElement>();
const condensedListElement = shallowRef<HTMLElement>();
const tableElement = shallowRef<HTMLElement>();
const tableHeadingRects = ref<TableHeadingRect[]>([]);
const tableHeadings = ref<HTMLElement[]>([]);
const scrollableContainerElement = ref<HTMLElement>();
const scrollContainerElement = ref<HTMLElement>();
const scrollBarElement = ref<HTMLElement>();
const stickyHeaderWrapperElement = ref<HTMLElement>();
const scrollingContainer = ref(false);
const tableInitialized = ref(false);
const hasMoreLeftColumns = ref(false);
const scrollingWithBar = ref(false);
const canFitStickyColumn = ref(true);
const canScrollRight = ref(true);
const scrollLeft = ref<number | undefined>();
const itemCount = computed(() => props.rows.length);
const isSortable = computed(() => props.sortable?.some((value) => value))
const selectMode = computed(() => selectedItemsCount.value > 0);
const shouldShowActions = computed(() => !props.condensed || selectedItemsCount.value);
const promotedActions = computed(() => shouldShowActions.value ? props.promotedBulkActions : []);
const bulkActionsSelectable = computed(() => Boolean(
  props.promotedBulkActions.length > 0 || props.bulkActions.length > 0,
))
const actions = computed(() => shouldShowActions.value ? props.bulkActions : []);
const shouldShowBulkActions = computed(() => bulkActionsSelectable.value && selectMode.value);
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
  props.pagination && styles.ScrollBarContainerWithPagination,
  props.condensed && styles.scrollBarContainerCondensed,
  hideScrollContainer.value && styles.scrollBarContainerHidden,
))

const bulkActionsAccessibilityLabel = computed(() => {
  const totalItemsCount = itemCount.value;
  const allSelected = selectedItemsCount.value === totalItemsCount;

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
        itemsLength: itemCount.value,
        resourceNamePlural: resourceNamePlural.value,
      },
    );
  } else {
    return i18n.value.translate(
      'Polaris.IndexProvider.a11yCheckboxSelectAllMultiple',
      {
        itemsLength: itemCount.value,
        resourceNamePlural: resourceNamePlural.value,
      },
    );
  }
})

const bulkSelectState = computed<boolean | 'indeterminate'>(() => {
  let bulkSelectState: boolean | 'indeterminate' = 'indeterminate';
  if (!selectedItemsCount.value || selectedItemsCount.value === 0) {
    bulkSelectState = false;
  } else if (
    props.selected === SELECT_ALL_ITEMS ||
    selectedItemsCount.value === itemCount.value
  ) {
    bulkSelectState = true;
  }
  return bulkSelectState;
})

const headerThAttributes = (heading: IndexTableHeading, index: number) => {
  const { headings, sortable, selectable } = props;

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


const setTableBodyRef = (e: any) => {
  if (e && !tableInitialized.value) {
    tableInitialized.value = true;
  }
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


  scrollLeft.value = scrollableContainerElement.value.scrollLeft;


  if (
    (canScrollLeft && !hasMoreLeftColumns.value) ||
    (!canScrollLeft && hasMoreLeftColumns.value)
  ) {
    hasMoreLeftColumns.value = !hasMoreLeftColumns.value;
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

const handleTogglePage = () => {
  selectionChange(
    SelectionType.Page,
    Boolean(!bulkSelectState.value || bulkSelectState.value === 'indeterminate'),
  );
};

const handleSelectAllItemsInStore = () => {
  selectionChange(props.selected === SELECT_ALL_ITEMS ? SelectionType.Page : SelectionType.All, true);
}

function getPaginatedSelectAllAction() {
  const { selectable, hasMoreItems, paginatedSelectAllActionText } = props;
  if (!selectable || !hasBulkActions.value || !hasMoreItems) {
    return;
  }

  const customActionText =
    paginatedSelectAllActionText ??
    i18n.value.translate('Polaris.IndexTable.selectAllItems', {
      itemsLength: itemCount.value,
      resourceNamePlural: computedResourceName.value.plural.toLocaleLowerCase(),
    });

  const actionText =
    props.selected === SELECT_ALL_ITEMS
      ? i18n.value.translate('Polaris.IndexTable.undo')
      : customActionText;

  return {
    content: actionText,
    onAction: handleSelectAllItemsInStore,
  };
}


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
  const { selectable } = props;
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
  canFitStickyColumn.value = Boolean(
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

  debounceResizeTableScrollbar();
  handleCanScrollRight();
  handleCanFitStickyColumn();
}

let prevChecked: number | undefined;
const selectionChange = (type: SelectionType, checked: boolean, id?: string | Range, index?: number) => {

  let selected: string[] | 'All' = [];

  if (type === SelectionType.Single || (type === SelectionType.Multi && (typeof prevChecked !== 'number' || typeof index !== 'number'))) {
    type = SelectionType.Single;
  }

  switch (type) {
    case SelectionType.Single:
      selected = checked ? [...selectedItems.value, id as string] : selectedItems.value.filter(row => row !== id);
      break;
    case SelectionType.All:
      selected = checked ? SELECT_ALL_ITEMS : [];
      break;
    case SelectionType.Page:
      selected = checked ? props.rows.map(row => row.id) : [];
      break;
    case SelectionType.Multi:
      if (!id) break;
      const ids: string[] = [];

      const min = Math.min(prevChecked as number, index as number);
      const max = Math.max(prevChecked as number, index as number);

      for (let i = min as number; i <= (max as number); i++) {
        const id = props.rows[i].id;

        if (
          (checked && !selectedItems.value.includes(id)) ||
          (!checked && selectedItems.value.includes(id))
        ) {
          ids.push(id);
        }
      }

      selected = checked ? [...selectedItems.value, ...ids] : selectedItems.value.filter((row) => !ids.includes(row));


      break;
    case SelectionType.Range:
      if (!id) break;

      const resourceIds = props.rows.map(row => row.id);

      const selectedIds = resourceIds.slice(
        Number(id[0]),
        Number(id[1]) + 1,
      );

      const isIndeterminate = selectedIds.some((row) => {
        return selectedItems.value.includes(row);
      });

      const isChecked = selectedIds.every((row) => {
        return selectedItems.value.includes(row);
      });

      const isSelectingAllInRange = !isChecked && (checked || isIndeterminate);

      const nextSelectedResources = isSelectingAllInRange
        ? [
          ...new Set([
            ...selectedItems.value,
            ...selectedIds,
          ]).values(),
        ]
        : selectedItems.value.filter((row) => !selectedIds.includes(row),
        );
      selected = nextSelectedResources

      break;
  }

  prevChecked = index;
  emit('update:selected', selected)
}

const indexTableProvide = computed(() => {
  const { selectable, hasMoreItems, selected, rows } = props;
  const itemCount = rows.length;

  const paginatedSelectAllText = selectable && hasMoreItems && selected === SELECT_ALL_ITEMS ? i18n.value.translate('Polaris.IndexProvider.allItemsSelected', {
    itemsLength: itemCount,
    resourceNamePlural: computedResourceName.value.plural.toLocaleLowerCase(),
  }) : undefined;

  return {
    ...props,
    resourceName: computedResourceName.value,
    selectMode: selectMode.value,
    shouldShowBulkActions: shouldShowBulkActions.value,
    bulkActionsAccessibilityLabel: bulkActionsAccessibilityLabel.value,
    bulkSelectState: bulkSelectState.value,
    paginatedSelectAllText,
    itemCount,
    selectedItemsCount: selectedItemsCount.value,
    paginatedSelectAllAction: getPaginatedSelectAllAction(),
    selectionChange: selectionChange
  }
})
indexTableContext.provide(indexTableProvide);

useEventListener(window, 'resize', handleResize)

//watch(() => props.rows, computeTableDimensions, { flush: 'post' });


onMounted(() => {
  handleCanScrollRight();
  isMounted.value = true;
})

watch(() => [props.condensed, tableInitialized.value, isMounted.value], () => {
  resizeTableScrollBar();
  stickyWrapper.value = props.condensed ? condensedListElement.value : tableElement.value;
}, { flush: 'post', immediate: true });


</script>
