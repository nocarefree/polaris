<template>
  <div :class="styles.IndexTable">
    <div :class="classNames(
      styles.IndexTableWrapper,
      hideScrollContainer && styles['IndexTableWrapper-scrollBarHidden'],
      Boolean(bulkActionsMarkup) &&
      selectMode &&
      styles.IndexTableWrapperWithBulkActions,
    )" ref="tableMeasurerRef">
      <component v-if="!shouldShowBulkActions && !condensed" :is="loadingMarkup"></component>
      <template v-if="itemCount > 0">
        <StickyHeader v-if="stickyWrapper" :stickyWrapper="stickyWrapper">
          <template name="loading">
            <component :is="loadingMarkup"></component>
          </template>
          <template v-if="$slots.sort" name="sort">
            <slot name="sort"></slot>
          </template>
        </StickyHeader>
        <ul v-if="condensed" :data-selectmode="Boolean(selectMode)"
          :class="classNames(styles.CondensedList, hasZebraStriping && styles.ZebraStriping)" ref="stickyWrapper">
          <slot></slot>
        </ul>
        <ScrollContainer v-else ref="scrollableContainerElement" @scroll="handleScrollContainerScroll">
          <table ref="stickyWrapper" :class="classNames(
            styles.Table,
            hasMoreLeftColumns && styles['Table-scrolling'],
            selectMode && styles.disableTextSelection,
            selectMode && shouldShowBulkActions && styles.selectMode,
            !selectable && styles['Table-unselectable'],
            canFitStickyColumn && styles['Table-sticky'],
            isSortable && styles['Table-sortable'],
            canFitStickyColumn && lastColumnSticky && styles['Table-sticky-last'],
            canFitStickyColumn &&
            lastColumnSticky &&
            canScrollRight &&
            styles['Table-sticky-scrolling'],
            hasZebraStriping && styles.ZebraStriping,
          )">
            <thead>
              <tr :class="styles.HeadingRow">
                <th v-if="selectable" :className="checkboxClassName" :key="`${heading}-${index}`"
                  data-index-table-heading>
                  <div :className="styles.ColumnHeaderCheckboxWrapper">
                    <Checkbox :label="i18n.translate('Polaris.IndexTable.selectAllLabel', {
                      resourceNamePlural:
                        resourceName.plural,
                    })" label-hidden @change={
   handleSelectPage } :checked="bulkSelectState" />
                  </div>
                </th>
                <th v-for="(heading, index) in headings" :className="headingContentClassName"
                  :key="getHeadingKey(heading)" data-index-table-heading :style="stickyPositioningStyle">
                  <HeaderContent v-bind="heading" :index="index"></HeaderContent>
                </th>
              </tr>
            </thead>
            <tbody ref="tableBodyRef">
              <slot></slot>
            </tbody>
          </table>
        </ScrollContainer>
      </template>
      <div v-else :class="styles.EmptySearchResultWrapper">
        <EmptySearchResult v-if="$slots.emptyState" :title="i18n.translate('Polaris.IndexTable.emptySearchTitle', {
            resourceNamePlural: computedResourceName.plural,
          })" :description="i18n.translate('Polaris.IndexTable.emptySearchDescription')" withIllustration />
        <slot v-else name="emptyState"></slot>
      </div>
    </div>
    <div ref="bulkActionsIntersectionRef" />
  </div>
  <div v-if="itemCount > 0 && isMounted" :class="classNames(
      styles.ScrollBarContainer,
      condensed && styles.scrollBarContainerCondensed,
      hideScrollContainer && styles.scrollBarContainerHidden,
    )" ref="scrollContainerElement">
    <div @scroll="handleScrollBarScroll" :class="styles.ScrollBar" ref="scrollBarElement">
      <div :class="classNames(tableElement && tableInitialized && styles.ScrollBarContent,)" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, h, nextTick, watch, cloneVNode } from 'vue'
import type { IndexTableProps } from './IndexTable'
import { SELECT_ALL_ITEMS, SelectionType } from './IndexTable'
import EmptySearchResult from "../EmptySearchResult"
import styles from './IndexTable.module.scss'
import { useI18n } from "../context"
import CSSTransition from "../CSSTransition"
import Sticky from "../Sticky"
import ScrollContainer from "./ScrollContainer"
import StickyHeader from "./StickyHeader/StickyHeader.vue"
import SelectAllActions from "../SelectAllActions"
import Spinner from "../Spinner"
import { classNames } from "@ncpl-polaris/utils"
import BulkActions from "../BulkActions"
import { tokens, toPx, motion } from '@shopify/polaris-tokens';
import { useIsBulkActionsSticky } from '../BulkActions/use-is-bulk-actions-sticky'
import { indexTableContext } from '../context'
import HeaderContent from "../HeaderContent"

defineOptions({
  name: 'NpIndexTable',
})

const SCROLL_BAR_PADDING = 4;
const SCROLL_BAR_DEBOUNCE_PERIOD = 300;
const loadingTransitionClassNames = {
  enter: styles['LoadingContainer-enter'],
  enterActive: styles['LoadingContainer-enter-active'],
  exit: styles['LoadingContainer-exit'],
  exitActive: styles['LoadingContainer-exit-active'],
};
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
const loadingElement = ref<HTMLElement>();
const stickyWrapper = ref<HTMLElement>();
const tableHeadingRects = ref<[]>();
const scrollableContainerElement = ref<HTMLElement>();
const scrollContainerElement = ref<HTMLElement>();
const scrollBarElement = ref<HTMLElement>();
const tableElement = ref<HTMLElement>();
const tableBodyRef = ref<HTMLElement>();
const scrollingContainer = ref(false);
const tableInitialized = ref(false);
const hasMoreLeftColumns = ref(false);
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

const paginatedSelectAllText = computed(() => {
  if (!selectable || !props.hasMoreItems) {
    return;
  }

  if (props.selectedItemsCount === SELECT_ALL_ITEMS) {
    return i18n.value.translate('Polaris.IndexProvider.allItemsSelected', {
      itemsLength: props.itemCount,
      resourceNamePlural: computedResourceName.value.plural.toLocaleLowerCase(),
    });
  }
})

const selectedItemsCountLabel = computed(() => props.selectedItemsCount === SELECT_ALL_ITEMS ? `${props.itemCount}+` : props.selectedItemsCount)

const bulkActionsLabel = computed(() =>
  i18n.value.translate('Polaris.IndexProvider.selected', {
    selectedItemsCount: selectedItemsCountLabel.value,
  })
)

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
        resourceNamePlural: computedResourceName.value.plural,
      },
    );
  } else {
    return i18n.value.translate(
      'Polaris.IndexProvider.a11yCheckboxSelectAllMultiple',
      {
        itemsLength: itemCount,
        resourceNamePlural: computedResourceName.value.plural,
      },
    );
  }
})

const hasBulkActions = computed(() => Boolean(
  (props.promotedBulkActions && props.promotedBulkActions.length > 0) ||
  (props.bulkActions && props.bulkActions.length > 0),
));

const paginatedSelectAllAction = computed(() => {
  if (!selectable.value || !hasBulkActions || !props.hasMoreItems) {
    return;
  }

  const customActionText =
    props.paginatedSelectAllActionText ??
    i18n.value.translate('Polaris.IndexTable.selectAllItems', {
      itemsLength: props.itemCount,
      resourceNamePlural: computedResourceName.value.plural.toLocaleLowerCase(),
    });

  const actionText =
    props.selectedItemsCount === SELECT_ALL_ITEMS
      ? i18n.value.translate('Polaris.IndexTable.undo')
      : customActionText;

  return {
    content: actionText,
    onAction: () => {
      emit('selectionChange', props.selectedItemsCount === SELECT_ALL_ITEMS
        ? SelectionType.Page
        : SelectionType.All,
        true,)
    },
  };
}
);

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


const _loadingVNode = computed(() => {
  return h(CSSTransition, {}, {
    default: () => [
      h('div', {
        class: styles.LoadingPanel, ref: loadingElement
      }, [
        h('div', { class: styles.LoadingPanelRow }, [
          h(Spinner, { size: "small" }),
          h('span', { class: styles.LoadingPanelText }, [
            i18n.value.translate('Polaris.IndexTable.resourceLoadingAccessibilityLabel', { resourceNamePlural: computedResourceName.value.plural.toLocaleLowerCase() })
          ])
        ])
      ])
    ]
  });
});

const loadingMarkup = computed(() => {
  return () => cloneVNode(_loadingVNode.value, {
    in: props.loading,
    classNames: loadingTransitionClassNames,
    timeout: parseInt(motion['motion-duration-100'], 10),
    nodeRef: loadingElement.value,
    appear: true,
    unmountOnExit: true,
  })
});

const headingsMarkup = computed(() => {

})


const bulkActionsMarkup = computed(() => {
  return shouldShowBulkActions.value && !props.condensed ? h('div', {
    class: classNames(
      styles.BulkActionsWrapper,
      isBulkActionsSticky && styles.BulkActionsWrapperSticky,
    ),
    style: {
      insetBlockStart: isBulkActionsSticky
        ? undefined
        : bulkActionsAbsoluteOffset,
      width: bulkActionsMaxWidth,
      insetInlineStart: isBulkActionsSticky
        ? bulkActionsOffsetLeft
        : undefined,
    }
  }, [
    h(BulkActions, {
      selectMode: selectMode.value,
      promotedActions: promotedActions.value,
      actions: actions.value,
      onSelectModeToggle: () => props.condensed ? emit('selectionChange', SelectionType.All, false) : undefined,
      isSticky: isBulkActionsSticky.value,
      width: bulkActionsMaxWidth.value,
    })
  ]) : null
})

const handleTogglePage = () => {
  emit('selectionChange', SelectionType.Page, Boolean(!bulkSelectState.value || bulkSelectState.value === 'indeterminate'))
}



const handleScrollContainerScroll = (canScrollLeft: boolean, canScrollRight: boolean) => {
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

  setCanScrollRight(canScrollRight);
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

}


const indexTableProvide = computed(() => {
  return {
    ...props,
    resourceName: computedResourceName.value,
    selectMode: selectMode.value,
    shouldShowBulkActions: shouldShowBulkActions.value,
    bulkActionsAccessibilityLabel: bulkActionsAccessibilityLabel.value,
    bulkSelectState: bulkSelectState.value,
  }
})
indexTableContext.provide(indexTableProvide);

watch(() => props.itemCount, computeTableDimensions, { flush: 'post' });

onMounted(() => {
  isMounted.value = true;
  nextTick(() => {
    resizeTableScrollBar();
  })
})

</script>
