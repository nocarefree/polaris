<template>
  <div
    :class="classNames(styles.TableWrapper, state.condensed && styles.condensed, increasedTableDensity && styles.IncreasedTableDensity, stickyHeader && styles.StickyHeaderEnabled,)"
    ref="dataTable">
    <div v-if="stickyHeader && isMounted" :class="styles.StickyHeaderWrapper" role="presentation">
      <Sticky :bounding-element="dataTable"
        @stickyChange="(isSticky) => { changeHeadingFocus(); stickyHeaderActive = isSticky; }">
        <template #default="{ isSticky }">
          <div :class="classNames(
            styles.StickyHeaderInner,
            isSticky && styles['StickyHeaderInner-isSticky'],
          )">
            <div>
              <Navigation v-if="!hideScrollIndicator" :column-visibility-data="state.columnVisibilityData"
                :is-scrolled-farthest-left="state.isScrolledFarthestLeft"
                :is-scrolled-farthest-right="state.isScrolledFarthestRight" @navigateTableLeft="navigateTable('left')"
                @navigateTableRight="navigateTable('right')" :fixed-first-columns="_fixedFirstColumns"
                :set-ref="(e: any) => stickyNav = e" />
            </div>
            <table :class="classNames(styles.StickyHeaderTable, !state.isScrolledFarthestLeft && styles.separate)"
              ref="stickyTable">
              <thead>
                <tr :class="styles.StickyTableHeadingsRow">
                  <template v-for="(heading, index) in headings">
                    <Heading :heading="heading" :heading-index="index"
                      :in-fixed-nth-column="Boolean(index <= _fixedFirstColumns - 1 && _fixedFirstColumns)"
                      :cell-props="getCellProps({ heading, headingIndex: index, inStickyHeader: true })"
                      :set-cell-ref="setCellRef" :left="0" :fixed-first-columns="_fixedFirstColumns" in-sticky-header />
                  </template>
                </tr>
              </thead>
            </table>
          </div>
        </template>
      </Sticky>
    </div>
    <Navigation v-if="!hideScrollIndicator" :column-visibility-data="state.columnVisibilityData"
      :is-scrolled-farthest-left="state.isScrolledFarthestLeft"
      :is-scrolled-farthest-right="state.isScrolledFarthestRight" @navigateTableLeft="navigateTable('left')"
      @navigateTableRight="navigateTable('right')" :fixed-first-columns="_fixedFirstColumns"
      :set-ref="(e: any) => headerNav = e" />
    <div :class="classNames(
      styles.DataTable,
      state.condensed && styles.condensed,
      totals && styles.ShowTotals,
      showTotalsInFooter && styles.ShowTotalsInFooter,
      hasZebraStripingOnData && styles.ZebraStripingOnData,
      hasZebraStripingOnData && (rows.length % 2 === 0) && styles.RowCountIsEven,
    )">
      <div :class="styles.ScrollContainer" ref="scrollContainer">
        <EventListener event="resize" :handler="handleResize" />
        <EventListener capture passive event="scroll" :handler="scrollListener" />

        <table v-if="state.condensed && _fixedFirstColumns !== 0"
          :class="classNames(styles.FixedFirstColumn, !state.isScrolledFarthestLeft && styles.separate)"
          :style="{ width: `${state.columnVisibilityData[_fixedFirstColumns - 1]?.rightEdge}px`, }">
          <thead>
            <tr :style="{ height: `${headerRowHeights[0]}px` }">
              <Heading v-for="(heading, index) in nthHeadings" :heading="heading" :heading-index="index"
                :in-fixed-nth-column="Boolean(index <= _fixedFirstColumns - 1 && _fixedFirstColumns)"
                :cell-props="getCellProps({ heading, headingIndex: index, inStickyHeader: false })"
                :set-cell-ref="setCellRef" :left="0" :fixed-first-columns="_fixedFirstColumns" in-sticky-header />
            </tr>

            <tr v-if="totals && !showTotalsInFooter" :style="{ height: `${headerRowHeights[1]}px` }">
              <Cell v-for="(total, index) in nthTotals" total :total-in-footer="showTotalsInFooter"
                :nth-column="index <= _fixedFirstColumns - 1" :first-column="index === 0" :key="`totals-cell-${index}`"
                :content-type="cellContentType" :truncate="truncate" :vertical-align="verticalAlign">
                {{ cellContent({ total, index }) }}
              </Cell>
            </tr>

          </thead>
          <tbody>
            <tr v-for="(row, index) in nthColumns" :key="`row-${index}`"
              :class="classNames(styles.TableRow, hoverable && styles.hoverable)" @mouseenter="e => handleHover(index)"
              @mouseleave="e => handleHover()">

              <Cell v-for="(content, cellIndex) in row" :key="`cell-${cellIndex}-row-${index}`"
                :content-type="columnContentTypes[cellIndex]" :nth-column="cellIndex <= _fixedFirstColumns - 1"
                :first-column="cellIndex === 0" :truncate="truncate" :vertical-align="verticalAlign"
                :col-span="getColSpan(row.length, headings.length, columnContentTypes.length, cellIndex,)"
                :hovered="index === state.rowHovered"
                :style="bodyRowHeights ? { height: `${bodyRowHeights[index]}px` } : {}"
                :in-fixed-nth-column="state.condensed && true">
                <template v-if="(typeof content == 'string')">{{ content }}</template>
                <component :is="content"></component>
              </Cell>
            </tr>
          </tbody>
          <tfoot v-if="totals && showTotalsInFooter">
            <tr>
              <Cell v-for="(total, index) in nthTotals" total :total-in-footer="showTotalsInFooter"
                :nth-column="index <= _fixedFirstColumns - 1" :first-column="index === 0" :key="`totals-cell-${index}`"
                :content-type="cellContentType" :truncate="truncate" :vertical-align="verticalAlign">
                {{ cellContent({ total, index }) }}
              </Cell>
            </tr>
          </tfoot>
        </table>
        <table :class="styles.Table" ref="table">
          <thead>
            <tr>
              <template v-for="(heading, index) in headings">
                <Heading :heading="heading" :heading-index="index"
                  :in-fixed-nth-column="Boolean(index <= _fixedFirstColumns - 1 && _fixedFirstColumns)"
                  :cell-props="getCellProps({ heading, headingIndex: index, inStickyHeader: false })"
                  :set-cell-ref="setCellRef" :left="0" :fixed-first-columns="_fixedFirstColumns" in-sticky-header />
              </template>
            </tr>
            <tr v-if="!showTotalsInFooter">
              <Cell v-for="(total, index) in nthTotals" total :total-in-footer="showTotalsInFooter"
                :nth-column="index <= _fixedFirstColumns - 1" :first-column="index === 0" :key="`totals-cell-${index}`"
                :content-type="cellContentType" :truncate="truncate" :vertical-align="verticalAlign">
                {{ cellContent({ total, index }) }}
              </Cell>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in nthColumns" :key="`row-${index}`"
              :class="classNames(styles.TableRow, hoverable && styles.hoverable)" @mouseenter="e => handleHover(index)"
              @mouseleave="e => handleHover()">

              <Cell v-for="(content, cellIndex) in row" :key="`cell-${cellIndex}-row-${index}`"
                :content-type="columnContentTypes[cellIndex]" :nth-column="cellIndex <= _fixedFirstColumns - 1"
                :first-column="cellIndex === 0" :truncate="truncate" :vertical-align="verticalAlign"
                :col-span="getColSpan(row.length, headings.length, columnContentTypes.length, cellIndex,)"
                :hovered="index === state.rowHovered"
                :style="bodyRowHeights ? { height: `${bodyRowHeights[index]}px` } : {}"
                :in-fixed-nth-column="state.condensed && false">
                <template v-if="(typeof content == 'string')">{{ content }}</template>
                <component :is="content"></component>
              </Cell>
            </tr>
          </tbody>
          <tfoot v-if="showTotalsInFooter">
            <Cell v-for="(total, index) in nthTotals" total :total-in-footer="showTotalsInFooter"
              :nth-column="index <= _fixedFirstColumns - 1" :first-column="index === 0" :key="`totals-cell-${index}`"
              :content-type="cellContentType" :truncate="truncate" :vertical-align="verticalAlign">
              {{ cellContent({ total, index }) }}
            </Cell>
          </tfoot>
        </table>
      </div>
      <div :class="styles.Footer">
        <slot name="footerContent"></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed, type Component, onMounted, onBeforeUnmount, onUpdated } from 'vue';
import type { DataTableProps, DataTableState } from './types';
import EventListener from "../EventListener";
import Sticky from "../Sticky";
import Navigation from "./Navigation/Navigation.vue";
import Heading from "./Heading/Heading.vue";
import Cell from "./Cell";
import styles from './DataTable.module.scss';
import { useMounted } from '@vueuse/core';
import { classNames } from "@ncpl-polaris/utils";
import { useI18n } from '../context';
import { headerCell } from "../shared"
import { measureColumn, getPrevAndCurrentColumns } from './utils';
import { debounce } from "@ncpl-polaris/utils/debounce"

defineOptions({
  name: 'NpDataTable',
})

const getRowClientHeights = (rows: NodeList | undefined) => {
  const heights: number[] = [];
  if (!rows) {
    return heights;
  }
  rows.forEach((row) => {
    heights.push((row as HTMLTableRowElement).clientHeight);
  });
  return heights;
};

const props = defineProps<DataTableProps>()
const emit = defineEmits(['sort'])
const isMounted = useMounted()

const state = reactive<DataTableState>({
  condensed: false,
  columnVisibilityData: [],
  isScrolledFarthestLeft: true,
  isScrolledFarthestRight: false,
  rowHovered: undefined,
})

const i18n = useI18n();
const dataTable = ref<HTMLDivElement>();
const scrollContainer = ref<HTMLDivElement>();
const table = ref<HTMLTableElement>();
const stickyTable = ref<HTMLTableElement>();
const stickyNav = ref<HTMLDivElement>();
const headerNav = ref<HTMLDivElement>();
const tableHeadings: HTMLTableCellElement[] = [];
const tableHeadingWidths: number[] = [];
const stickyHeadings: HTMLDivElement[] = [];
let stickyHeaderActive = false;
let scrollStopTimer: ReturnType<typeof setTimeout> | null = null;
const tableHeaderRows = computed(() => table.value?.children[0].childNodes);
const tableBodyRows = computed(() => table.value?.children[1].childNodes);
const headerRowHeights = computed(() => getRowClientHeights(tableHeaderRows.value));
const bodyRowHeights = computed(() => getRowClientHeights(tableBodyRows.value));
const nthHeadings = computed(() => props.headings.slice(0, _fixedFirstColumns.value));
const nthTotals = computed(() => props.totals?.slice(0, _fixedFirstColumns.value));
const nthColumns = computed(() => props.rows.map((row) => row.slice(0, _fixedFirstColumns.value)));


const _fixedFirstColumns = computed(() => {
  const { hasFixedFirstColumn, fixedFirstColumns = 0, headings } = props;
  const numberOfFixedFirstColumns =
    hasFixedFirstColumn && !fixedFirstColumns ? 1 : fixedFirstColumns;

  if (numberOfFixedFirstColumns >= headings.length) {
    return 0;
  }

  return numberOfFixedFirstColumns;
})

const totalsRowHeading = computed(() => {
  const { totals, totalsName } = props;

  const totalsLabel = totalsName
    ? totalsName
    : {
      singular: i18n.value.translate('Polaris.DataTable.totalRowHeading'),
      plural: i18n.value.translate('Polaris.DataTable.totalsRowHeading'),
    };

  return totals && totals.filter((total) => total !== '').length > 1
    ? totalsLabel.plural
    : totalsLabel.singular;
});


const handleResize = debounce(() => {
  let condensed = false;

  if (table.value && scrollContainer.value) {
    // safari sometimes incorrectly sets the scrollwidth too large by 1px
    condensed = table.value.scrollWidth > scrollContainer.value.clientWidth + 1;
  }

  state.condensed = condensed;
  calculateColumnVisibilityData;
});

const calculateColumnVisibilityData = () => {
  const fixedFirstColumns = _fixedFirstColumns.value;
  const { stickyHeader } = props;

  if ((stickyHeader || state.condensed) && table.value && scrollContainer.value && dataTable.value) {
    const headerCells = table.value.querySelectorAll<HTMLTableCellElement>(
      headerCell.selector,
    );

    const rightMostHeader = headerCells[fixedFirstColumns - 1];
    const nthColumnWidth = fixedFirstColumns
      ? rightMostHeader.offsetLeft + rightMostHeader.offsetWidth
      : 0;

    if (headerCells.length > 0) {
      const firstVisibleColumnIndex = headerCells.length - 1;
      const tableLeftVisibleEdge =
        scrollContainer.value.scrollLeft + nthColumnWidth;

      const tableRightVisibleEdge =
        scrollContainer.value.scrollLeft + dataTable.value.offsetWidth;

      const tableData = {
        firstVisibleColumnIndex,
        tableLeftVisibleEdge,
        tableRightVisibleEdge,
      };

      const columnVisibilityData = [...headerCells].map(
        measureColumn(tableData),
      );

      const lastColumn =
        columnVisibilityData[columnVisibilityData.length - 1];

      const isScrolledFarthestLeft = fixedFirstColumns
        ? tableLeftVisibleEdge === nthColumnWidth
        : tableLeftVisibleEdge === 0;

      return {
        columnVisibilityData,
        ...getPrevAndCurrentColumns(tableData, columnVisibilityData),
        isScrolledFarthestLeft,
        isScrolledFarthestRight:
          lastColumn.rightEdge <= tableRightVisibleEdge,
      };
    }
  }

  return state.columnVisibilityData = [],
    state.previousColumn = undefined,
    state.currentColumn = undefined;
};
const scrollListener = () => {
  if (scrollStopTimer) {
    clearTimeout(scrollStopTimer);
  }

  scrollStopTimer = setTimeout(calculateColumnVisibilityData, 100);

  state.isScrolledFarthestLeft = scrollContainer.value?.scrollLeft === 0;

  if (props.stickyHeader && stickyHeaderActive) {
    stickyHeaderScrolling();
  }
}

const stickyHeaderScrolling = () => {
  if (stickyTable.value == null || scrollContainer.value == null) {
    return;
  }
  stickyTable.value.scrollLeft = scrollContainer.value.scrollLeft;
};
const setCellRef = ({
  ref,
  index,
  inStickyHeader,
}: {
  ref: HTMLTableCellElement | null;
  index: number;
  inStickyHeader: boolean;
}) => {
  if (ref == null) {
    return;
  }

  if (inStickyHeader) {
    stickyHeadings[index] = ref;
    const button = ref.querySelector('button');
    if (button == null) {
      return;
    }
    button.addEventListener('focus', handleHeaderButtonFocus);
  } else {
    tableHeadings[index] = ref;
    tableHeadingWidths[index] = ref.clientWidth;
  }
}
const handleHeaderButtonFocus = (event: Event) => {
  if (
    scrollContainer.value == null ||
    event.target == null ||
    state.columnVisibilityData.length === 0
  ) {
    return;
  }

  const target = event.target as HTMLElement;
  const currentCell = target.parentNode as HTMLTableCellElement;

  const tableScrollLeft = scrollContainer.value.scrollLeft;
  const tableViewableWidth = scrollContainer.value.offsetWidth;
  const tableRightEdge = tableScrollLeft + tableViewableWidth;
  const nthColumnWidth = state.columnVisibilityData.length > 0 ? state.columnVisibilityData[_fixedFirstColumns.value]?.rightEdge : 0;
  const currentColumnLeftEdge = currentCell.offsetLeft;
  const currentColumnRightEdge =
    currentCell.offsetLeft + currentCell.offsetWidth;

  if (tableScrollLeft > currentColumnLeftEdge - nthColumnWidth) {
    scrollContainer.value.scrollLeft = currentColumnLeftEdge - nthColumnWidth;
  }

  if (currentColumnRightEdge > tableRightEdge) {
    scrollContainer.value.scrollLeft = currentColumnRightEdge - tableViewableWidth;
  }
};
const handleHover = (index?: number) => { state.rowHovered = index }
const getColSpan = (rowLength: number,
  headingsLength: number,
  contentTypesLength: number,
  cellIndex: number) => {
  if (_fixedFirstColumns.value) {
    return 1;
  }
  const rowLen = rowLength ? rowLength : 1;
  const colLen = headingsLength ? headingsLength : contentTypesLength;
  const colSpan = Math.floor(colLen / rowLen);
  const remainder = colLen % rowLen;
  return cellIndex === 0 ? colSpan + remainder : colSpan;
}

const getCellProps = ({
  heading,
  headingIndex,
  inStickyHeader,
}: {
  heading: string | Component;
  headingIndex: number;
  inStickyHeader: boolean;
}) => {
  const {
    sortable,
    truncate = false,
    columnContentTypes,
    defaultSortDirection,
    initialSortColumnIndex = 0,
    verticalAlign,
    firstColumnMinWidth,
  } = props;

  const {
    sortDirection = defaultSortDirection,
    sortedColumnIndex = initialSortColumnIndex,
    isScrolledFarthestLeft,
  } = state;

  let sortableHeadingProps;
  if (sortable) {
    const isSortable = sortable[headingIndex];
    const isSorted = isSortable && sortedColumnIndex === headingIndex;
    const direction = isSorted ? sortDirection : 'none';

    sortableHeadingProps = {
      defaultSortDirection,
      sorted: isSorted,
      sortable: isSortable,
      sortDirection: direction,
      onSort: defaultOnSort(headingIndex),
      fixedNthColumn: _fixedFirstColumns.value,
      inFixedNthColumn: _fixedFirstColumns.value,
    };
  }

  const stickyCellWidth = inStickyHeader ? tableHeadingWidths[headingIndex] : undefined;

  const fixedCellVisible = !isScrolledFarthestLeft;
  return {
    header: true,
    stickyHeadingCell: inStickyHeader,
    content: heading,
    contentType: columnContentTypes[headingIndex],
    nthColumn: headingIndex < _fixedFirstColumns.value,
    fixedFirstColumns: _fixedFirstColumns.value,
    truncate,
    headingIndex,
    ...sortableHeadingProps,
    verticalAlign,
    handleFocus: handleFocus,
    stickyCellWidth,
    fixedCellVisible,
    firstColumnMinWidth,
  };
}

const cellContent = ({ total, index }: any) => {
  return index === 0 ? totalsRowHeading.value : ((total !== '' && index > 0) ? total : '')
}

const cellContentType = ({ total, index }: any) => {
  return (total !== '' && index > 0) ? props.columnContentTypes[index] : '';
}

const handleFocus = (event: FocusEvent) => {
  if (scrollContainer.value == null || event.target == null) {
    return;
  }
  const currentCell = (event.target as Element).parentNode as HTMLTableCellElement;
  const nthColumnWidth = props
    ? state.columnVisibilityData[_fixedFirstColumns.value]?.rightEdge
    : 0;
  const currentColumnLeftEdge = currentCell.offsetLeft;
  const desiredScrollLeft = currentColumnLeftEdge - nthColumnWidth;

  if (scrollContainer.value.scrollLeft > desiredScrollLeft) {
    scrollContainer.value.scrollLeft = desiredScrollLeft;
  }

}

const defaultOnSort = (headingIndex: number) => {
  const {
    defaultSortDirection = 'ascending',
    initialSortColumnIndex,
  } = props;

  const {
    sortDirection = defaultSortDirection,
    sortedColumnIndex = initialSortColumnIndex,
  } = state;

  let newSortDirection = defaultSortDirection;
  if (sortedColumnIndex === headingIndex) {
    newSortDirection = sortDirection === 'ascending' ? 'descending' : 'ascending';
  }

  return () => {
    state.sortDirection = newSortDirection;
    state.sortedColumnIndex = headingIndex;
    emit('sort', headingIndex, newSortDirection);
  }
}

const changeHeadingFocus = () => {

  const stickyFocusedItemIndex = stickyHeadings.findIndex(
    (item) => item === document.activeElement?.parentElement,
  );

  const tableFocusedItemIndex = tableHeadings.findIndex(
    (item) => item === document.activeElement?.parentElement,
  );

  const arrowsInStickyNav = stickyNav.value?.querySelectorAll('button');
  const arrowsInHeaderNav = headerNav.value?.querySelectorAll('button');

  let stickyFocusedNavIndex = -1;

  arrowsInStickyNav?.forEach((item: HTMLButtonElement, index: number) => {
    if (item === document.activeElement) {
      stickyFocusedNavIndex = index;
    }
  });

  let headerFocusedNavIndex = -1;

  arrowsInHeaderNav?.forEach((item: HTMLButtonElement, index: number) => {
    if (item === document.activeElement) {
      headerFocusedNavIndex = index;
    }
  });

  if (
    stickyFocusedItemIndex < 0 &&
    tableFocusedItemIndex < 0 &&
    stickyFocusedNavIndex < 0 &&
    headerFocusedNavIndex < 0
  ) {
    return null;
  }

  let button;

  if (stickyFocusedItemIndex >= 0) {
    button = tableHeadings[stickyFocusedItemIndex].querySelector('button');
  } else if (tableFocusedItemIndex >= 0) {
    button = stickyHeadings[tableFocusedItemIndex].querySelector('button');
  }

  if (stickyFocusedNavIndex >= 0) {
    button = arrowsInHeaderNav?.[stickyFocusedNavIndex];
  } else if (headerFocusedNavIndex >= 0) {
    button = arrowsInStickyNav?.[headerFocusedNavIndex];
  }

  if (button == null) {
    return null;
  }

  button.style.visibility = 'visible';
  button.focus();
  button.style.removeProperty('visibility');
};

const navigateTable = (direction: string) => {
  const { currentColumn, previousColumn } = state;
  const nthColumnWidth = state.columnVisibilityData[_fixedFirstColumns.value - 1]?.rightEdge;
  if (!currentColumn || !previousColumn) {
    return;
  }

  let prevWidths = 0;
  for (let index = 0; index < currentColumn.index; index++) {
    prevWidths += state.columnVisibilityData[index].width;
  }

  const handleScroll = () => {
    let newScrollLeft = 0;
    if (_fixedFirstColumns.value) {
      newScrollLeft =
        direction === 'right'
          ? prevWidths - nthColumnWidth + currentColumn.width
          : prevWidths - previousColumn.width - nthColumnWidth;
    } else {
      newScrollLeft =
        direction === 'right'
          ? currentColumn.rightEdge
          : previousColumn.leftEdge;
    }

    if (scrollContainer.value) {
      scrollContainer.value.scrollLeft = newScrollLeft;

      requestAnimationFrame(() => calculateColumnVisibilityData);
    }
  };
  return handleScroll;
};

onMounted(() => {
  if (process.env.NODE_ENV === 'development') {
    setTimeout(() => {
      handleResize();
    }, 10);
  } else {
    handleResize();
  }
});

onUpdated(() => {
  handleResize();
});

onBeforeUnmount(() => {
  handleResize.cancel();
});
</script>
