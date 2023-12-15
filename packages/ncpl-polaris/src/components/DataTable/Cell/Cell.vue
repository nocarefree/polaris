<template>
  <th v-if="stickyHeadingCell" :ref="(e: any) => setRef(e)" v-bind="{ ...headerCell.props, ...colSpanProp }"
    :class="className" :aria-sort="sortDirection" :style="{ ...style, ...minWidthStyles }"
    data-index-table-sticky-heading>
    <button v-if="sortable" :class="headerClassName" @click="onSort" @focus="handleFocus" :tabIndex="focusable ? 0 : -1">
      <span :class="iconClassName">
        <Icon :source="source" :accessibility-label="sortAccessibilityLabel" />
      </span>
      <slot></slot>
    </button>
    <slot v-else></slot>
  </th>
  <template v-else-if="header || firstColumn || nthColumn">
    <th v-if="header" v-bind="{ ...headerCell.props, ...colSpanProp }" :aria-sort="sortDirection"
      :ref="(e: any) => setRef(e)" :class="className" scope="col" :style="{ ...minWidthStyles }">
      <button v-if="sortable" :class="headerClassName" @click="onSort" @focus="handleFocus"
        :tabIndex="focusable ? 0 : -1">
        <span :class="iconClassName">
          <Icon :source="source" :accessibilityLabel="sortAccessibilityLabel" />
        </span>
        <slot></slot>
      </button>
      <slot v-else></slot>
    </th>
    <th v-else v-bind="colSpanProp" :ref="(e: any) => setRef(e)" :class="className" scope="row"
      :style="{ ...minWidthStyles }">
      <template v-if="truncate">
        <Tooltip v-if="hasTruncatedTooltip" :content="textRef.value.innerText">
          <span ref="textRef" :class="className">
            <slot></slot>
          </span>
        </Tooltip>
        <span v-else ref="textRef" :class="className">
          <slot></slot>
        </span>
      </template>
      <slot v-else></slot>
    </th>
  </template>
  <td v-else :class="className" v-bind="colSpanProp">
    <slot></slot>
  </td>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import Icon from "../../Icon";
import Tooltip from "../../Tooltip";
import { useI18n } from "../../context";
import type { CellProps } from "./types"
import { classNames, variationName } from "@ncpl-polaris/utils";
import styles from '../DataTable.module.scss';
import { SortDescendingMajor, SortAscendingMajor } from "@ncpl/ncpl-icons";
import { headerCell } from '../../shared';

const props = withDefaults(defineProps<CellProps>(), {
  verticalAlign: 'top',
  defaultSortDirection: 'ascending',
  setRef: () => { },
  stickyHeadingCell: false,
  hovered: false,
  handleFocus: () => { },
  hasFixedNthColumn: false,
  fixedCellVisible: false,
})
const i18n = useI18n();
const numeric = computed(() => props.contentType === 'numeric');
const textRef = ref();
const hasTruncatedTooltip = ref(false);

const className = computed(() => {
  const {
    nthColumn,
    firstColumn,
    truncate,
    header,
    total,
    totalInFooter,
    sorted,
    sortable,
    inFixedNthColumn,
    verticalAlign = 'top',
    stickyHeadingCell = false,
    hovered = false,
    fixedCellVisible = false,
    lastFixedFirstColumn,
  } = props;
  return classNames(
    styles.Cell,
    styles[`Cell-${variationName('verticalAlign', verticalAlign)}`],
    firstColumn && styles['Cell-firstColumn'],
    truncate && styles['Cell-truncated'],
    header && styles['Cell-header'],
    total && styles['Cell-total'],
    totalInFooter && styles['Cell-total-footer'],
    numeric && styles['Cell-numeric'],
    sortable && styles['Cell-sortable'],
    sorted && styles['Cell-sorted'],
    stickyHeadingCell && styles.StickyHeaderCell,
    hovered && styles['Cell-hovered'],
    lastFixedFirstColumn &&
    inFixedNthColumn &&
    fixedCellVisible &&
    styles['Cell-separate'],
    nthColumn &&
    inFixedNthColumn &&
    stickyHeadingCell &&
    styles.FixedFirstColumn,
  );
});

const headerClassName = computed(() => classNames(props.header && styles.Heading, props.header && props.contentType === 'text' && styles['Heading-left']));
const iconClassName = computed(() => classNames(props.sortable && styles.Icon));
const direction = computed(() => props.sorted && props.sortDirection ? props.sortDirection : props.defaultSortDirection);
const source = computed(() => direction.value === 'descending' ? SortDescendingMajor : SortAscendingMajor);
const oppositeDirection = computed(() => props.sortDirection === 'ascending' ? 'descending' : 'ascending');
const sortAccessibilityLabel = computed(() => i18n.value.translate('Polaris.DataTable.sortAccessibilityLabel', { direction: props.sorted ? oppositeDirection : direction }));
const focusable = computed(() => !(props.stickyHeadingCell && props.hasFixedNthColumn && props.nthColumn && !props.inFixedNthColumn));
const colSpanProp = computed(() => props.colSpan && props.colSpan > 1 ? { colSpan: props.colSpan } : {});
const minWidthStyles = computed(() => props.nthColumn && props.firstColumnMinWidth ? { minWidth: `${props.firstColumnMinWidth}px` } : { minWidth: `${props.stickyCellWidth}px` });


onMounted(() => {
  hasTruncatedTooltip.value = textRef.value?.scrollWidth > textRef.value?.offsetWidth;
});


</script>