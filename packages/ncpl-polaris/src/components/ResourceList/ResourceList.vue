<template>
  <div :class="resourceListWrapperClasses" ref="tableMeasurerRef">
    <div v-if="$slots.filterControl" :class="classNames(!flushFilters && styles.FiltersWrapper)">
      <slot name="filterControl"></slot>
    </div>
    <div
      v-if="!($slots.emptyState && !itemsExist && !loading) && (showHeader !== false) && (showHeader || (isSelectable || (sortOptions && sortOptions.length > 0) || $slots.alternateTool)) && listRef"
      :class="styles.HeaderOuterWrapper">
      <Sticky>
        <template #default="{ isSticky }">
          <div :class="classNames(
            styles.HeaderWrapper,
            sortOptions && sortOptions.length > 0 && !$slots.alternateTool && styles['HeaderWrapper-hasSort'],
            $slots.alternateTool && styles['HeaderWrapper-hasAlternateTool'],
            isSelectable && styles['HeaderWrapper-hasSelect'],
            loading && styles['HeaderWrapper-disabled'],
            isSelectable && selectMode && styles['HeaderWrapper-inSelectMode'],
            isSticky && styles['HeaderWrapper-isSticky'],
          )">
            <div v-if="loading" :class="styles['HeaderWrapper-overlay']" />
            <div :class="styles.HeaderContentWrapper">
              <div :class="styles.HeaderTitleWrapper">{{ headerTitle }}</div>
              <div v-if="isSelectable" :class="styles.CheckableButtonWrapper">
                <CheckableButton :accessibility-label="selectAllActionsAccessibilityLabel" :label="headerTitle"
                  @toggleAll="handleToggleAll" :disabled="loading" ref="checkableButtonRef" />
              </div>
              <div v-if="$slots.alternateTool && !(sortOptions && sortOptions.length > 0)"
                :class="styles.AlternateToolWrapper">
                <slot name="alternateTool"></slot>
              </div>
              <div :class="styles.SortWrapper">
                <Select v-if="sortOptions && sortOptions.length > 0 && !$slots.alternateTool"
                  :label="i18n.translate('Polaris.ResourceList.sortingLabel')" :label-inline="!smallScreen"
                  :label-hidden="smallScreen" :options="sortOptions"
                  @change="(selected: string, id: string) => $emit('sortChange', selected, id)" :value="sortValue"
                  :disabled="selectMode" />
              </div>
              <div :class="styles.SelectButtonWrapper">
                <Button v-if="isSelectable" :disabled="selectMode" :icon="EnableSelectionMinor" @click="() =>
                  handleSelectMode(true)">
                  {{ i18n.translate('Polaris.ResourceList.selectButtonText') }}
                </Button>
              </div>
            </div>
            <div v-if="isSelectable" :class="styles.SelectAllActionsWrapper">
              <SelectAllActions :label="selectAllActionsLabel" :accessibility-label="selectAllActionsAccessibilityLabel"
                :selected="selectAllSelectState" @toggleAll="handleToggleAll" :select-mode="selectMode"
                :paginated-select-all-action="paginatedSelectAllAction"
                :paginated-select-all-text="paginatedSelectAllText" :disabled="loading" ref="checkableButtonRef" />
            </div>
          </div>
        </template>
      </Sticky>
    </div>
    <div v-if="isSelectable && (bulkActions || promotedBulkActions)"
      :class="classNames(styles.BulkActionsWrapper, isBulkActionsSticky && styles.BulkActionsWrapperSticky,)" :style="{
        top: isBulkActionsSticky ? undefined : `${bulkActionsAbsoluteOffset}px`, width: bulkActionsMaxWidth ? `${bulkActionsMaxWidth}px` : undefined, left:
          isBulkActionsSticky ? `${bulkActionsOffsetLeft}px` : undefined,
      }">
      <BulkActions :select-mode="selectMode" @selectModeToggle="handleSelectMode" :promoted-actions="promotedBulkActions"
        :actions="bulkActions" :disabled="loading" :is-sticky="isBulkActionsSticky" :width="bulkActionsMaxWidth" />
    </div>
    <ul :class="classNames(
      styles.ResourceList,
      loading && styles.disabledPointerEvents,
      selectMode && styles.disableTextSelection,
    )" ref="listRef" aria-live="polite" :aria-busy="loading">
      <template v-if="loading">
        <li :class="styles.SpinnerContainer" :style="spinnerStyle">
          <Spinner :size="items.length < 2 ? 'small' : 'large'" accessibility-label="Items are loading" />
        </li>
        <li :class="styles.LoadingOverlay" />
      </template>
      <template v-for="(item, index) in items">
        <slot :id="(idForItem || defaultIdForItem)(item, index)" :item="item" :index="index"></slot>
      </template>
    </ul>
    <template v-if="!$slots.emptyState && $slots.filterControl && !itemsExist && !loading">
      <slot v-if="$slots.emptySearchState" name="emptySearchState"></slot>
      <div v-else :class="styles.EmptySearchResultWrapper">
        <EmptySearchResult v-bind="emptySearchResultText" with-illustration />
      </div>
    </template>
    <slot v-if="$slots.emptyState && !itemsExist && !loading" name="emptyState"></slot>
    <div v-if="loading && !itemsExist" :class="classNames(styles.ItemWrapper, loading && styles['ItemWrapper-isLoading'])"
      :tabIndex="-1">
      <template v-if="loading">
        <li :class="styles.SpinnerContainer" :style="spinnerStyle">
          <Spinner :size="items.length < 2 ? 'small' : 'large'" accessibility-label="Items are loading" />
        </li>
        <li :class="styles.LoadingOverlay" />
      </template>
    </div>
  </div>
  <div ref="bulkActionsIntersectionRef" />
</template>
<script setup lang="ts">
import { ref, computed, watch, provide, reactive, toRef } from 'vue'
import type { ResourceListProps, TItemType } from './types'
import { resourceListContextKey } from './context'
import { SELECT_ALL_ITEMS } from './types'
import styles from './ResourceList.module.scss'
import { classNames } from "@ncpl-polaris/utils"
import { themeDefault, toPx } from '@shopify/polaris-tokens';
import { useI18n } from '../context';
import { EnableSelectionMinor } from "@ncpl/ncpl-icons";
import BulkActions, { useIsBulkActionsSticky } from "../BulkActions";
import Sticky from "../Sticky";
import CheckableButton from "../CheckableButton";
import Select from "../Select";
import Button from "../Button";
import SelectAllActions from "../SelectAllActions";
import EmptySearchResult from "../EmptySearchResult";
import Spinner from "../Spinner";

defineOptions({
  name: 'NpResourceItem',
})
const emit = defineEmits(['selectionChange', 'sortChange']);


function getAllItemsOnPage(
  items: TItemType[],
  idForItem: (item: TItemType, index: number) => string,
) {
  return items.map((item: TItemType, index: number) => {
    return idForItem(item, index);
  });
}

const isBreakpointsXS = () => {
  return typeof window === 'undefined'
    ? false
    : window.innerWidth <
    parseFloat(toPx(themeDefault.breakpoints['breakpoints-sm']) ?? '');
};
const defaultIdForItem = (
  item: TItemType,
  index: number,
) => {
  return Object.prototype.hasOwnProperty.call(item, 'id')
    ? item.id
    : index.toString();
}


const props = withDefaults(defineProps<ResourceListProps>(), { selectedItems: () => [], showHeader: true })
const i18n = useI18n();

const selectMode = ref(Boolean(props.selectedItems && props.selectedItems.length > 0));

const {
  bulkActionsIntersectionRef,
  tableMeasurerRef,
  isBulkActionsSticky,
  bulkActionsAbsoluteOffset,
  bulkActionsMaxWidth,
  bulkActionsOffsetLeft,
  computeTableDimensions,
} = useIsBulkActionsSticky(selectMode);

const smallScreen = ref(isBreakpointsXS());
const checkableButtonRef = ref<HTMLElement>();
const isSelectable = computed(() =>
  Boolean(
    (props.promotedBulkActions && props.promotedBulkActions.length > 0) ||
    (props.bulkActions && props.bulkActions.length > 0) ||
    props.selectable,
  ) && !smallScreen.value);
const loadingPosition = ref(0);
const lastSelected = ref()
const listRef = ref();
const itemsExist = computed(() => props.items.length > 0);
const hasBulkActionsMarkup = computed(() => isSelectable.value && selectMode.value && (props.bulkActions || props.promotedBulkActions));
const resourceListWrapperClasses = computed(() => classNames(
  styles.ResourceListWrapper,
  Boolean(hasBulkActionsMarkup.value) &&
  selectMode.value &&
  props.bulkActions &&
  styles.ResourceListWrapperWithBulkActions,
));

const defaultResourceName = ref({
  singular: i18n.value.translate('Polaris.ResourceList.defaultItemSingular'),
  plural: i18n.value.translate('Polaris.ResourceList.defaultItemPlural'),
});
const resourceName = computed(() => props.resourceName || defaultResourceName.value);

const headerTitle = computed(() => {
  const { loading, items, totalItemsCount, headerContent } = props;
  const itemsCount = items.length;
  const resource =
    !loading &&
      ((!totalItemsCount && itemsCount === 1) || totalItemsCount === 1)
      ? resourceName.value.singular
      : resourceName.value.plural;

  if (loading) {
    return i18n.value.translate('Polaris.ResourceList.loading', { resource });
  } else if (totalItemsCount) {
    return i18n.value.translate('Polaris.ResourceList.showingTotalCount', {
      itemsCount,
      totalItemsCount,
      resource,
    });
  } else if (headerContent) {
    return headerContent;
  } else {
    return i18n.value.translate('Polaris.ResourceList.showing', {
      itemsCount,
      resource,
    });
  }
});

const selectAllActionsAccessibilityLabel = computed(() => {
  const { selectedItems, items, } = props;
  const selectedItemsCount = selectedItems.length;
  const totalItemsCount = items.length;
  const allSelected = selectedItemsCount === totalItemsCount;

  if (totalItemsCount === 1 && allSelected) {
    return i18n.value.translate(
      'Polaris.ResourceList.a11yCheckboxDeselectAllSingle',
      {
        resourceNameSingular: resourceName.value.singular,
      },
    );
  } else if (totalItemsCount === 1) {
    return i18n.value.translate(
      'Polaris.ResourceList.a11yCheckboxSelectAllSingle',
      {
        resourceNameSingular: resourceName.value.singular,
      },
    );
  } else if (allSelected) {
    return i18n.value.translate(
      'Polaris.ResourceList.a11yCheckboxDeselectAllMultiple',
      {
        itemsLength: items.length,
        resourceNamePlural: resourceName.value.plural,
      },
    );
  } else {
    return i18n.value.translate(
      'Polaris.ResourceList.a11yCheckboxSelectAllMultiple',
      {
        itemsLength: items.length,
        resourceNamePlural: resourceName.value.plural,
      },
    );
  }
});

const selectAllActionsLabel = computed(() => {
  const selectedItemsCount =
    props.selectedItems === SELECT_ALL_ITEMS
      ? `${props.items.length}+`
      : props.selectedItems.length;

  return i18n.value.translate('Polaris.ResourceList.selected', {
    selectedItemsCount,
  });
});

const selectAllSelectState = computed((): boolean | 'indeterminate' => {
  const { selectedItems, items } = props;
  let selectState: boolean | 'indeterminate' = 'indeterminate';
  if (
    !selectedItems ||
    (Array.isArray(selectedItems) && selectedItems.length === 0)
  ) {
    selectState = false;
  } else if (
    selectedItems === SELECT_ALL_ITEMS ||
    (Array.isArray(selectedItems) && selectedItems.length === items.length)
  ) {
    selectState = true;
  }
  return selectState;
});

const paginatedSelectAllAction = computed(() => {
  const { hasMoreItems, selectedItems, isFiltered, items } = props;
  if (!isSelectable.value || !hasMoreItems) {
    return;
  }

  const actionText =
    selectedItems === SELECT_ALL_ITEMS
      ? i18n.value.translate('Polaris.Common.undo')
      : i18n.value.translate(
        isFiltered
          ? 'Polaris.ResourceList.selectAllFilteredItems'
          : 'Polaris.ResourceList.selectAllItems',
        {
          itemsLength: items.length,
          resourceNamePlural: resourceName.value.plural,
        },
      );

  return {
    content: actionText,
    onAction: handleSelectAllItemsInStore,
  };
});

const paginatedSelectAllText = computed(() => {
  const { hasMoreItems, selectedItems, isFiltered, items } = props;
  if (!isSelectable.value || !hasMoreItems) {
    return;
  }

  if (selectedItems === SELECT_ALL_ITEMS) {
    return i18n.value.translate(
      isFiltered
        ? 'Polaris.ResourceList.allFilteredItemsSelected'
        : 'Polaris.ResourceList.allItemsSelected',
      {
        itemsLength: items.length,
        resourceNamePlural: resourceName.value.plural,
      },
    );
  }
});

const emptySearchResultText = computed(() => ({
  title: i18n.value.translate('Polaris.ResourceList.emptySearchResultTitle', {
    resourceNamePlural: resourceName.value.plural,
  }),
  description: i18n.value.translate(
    'Polaris.ResourceList.emptySearchResultDescription',
  ),
}));

const spinnerStyle = computed(() => {
  const defaultTopPadding = 8;
  const topPadding = loadingPosition.value > 0 ? loadingPosition.value : defaultTopPadding;
  return { paddingTop: `${topPadding}px` };
})


const handleSelectAllItemsInStore = () => {
  const { selectedItems, items, idForItem = defaultIdForItem } = props;
  const newlySelectedItems =
    selectedItems === SELECT_ALL_ITEMS
      ? getAllItemsOnPage(items, idForItem)
      : SELECT_ALL_ITEMS;

  emit('selectionChange', newlySelectedItems);

};

const handleSelectMode = (value: boolean) => {
  selectMode.value = value;
  if (!selectMode.value) {
    emit('selectionChange', []);
  }
};


const handleToggleAll = () => {
  const { selectedItems, items, idForItem = defaultIdForItem } = props;

  let newlySelectedItems: string[];

  if (
    (Array.isArray(selectedItems) && selectedItems.length === items.length) ||
    selectedItems === SELECT_ALL_ITEMS
  ) {
    newlySelectedItems = [];
  } else {
    newlySelectedItems = items.map((item, index) => {
      return idForItem(item, index);
    });
  }

  if (newlySelectedItems.length === 0 && !isBreakpointsXS()) {
    handleSelectMode(false);
  } else if (newlySelectedItems.length > 0) {
    handleSelectMode(true);
  }

  emit('selectionChange', newlySelectedItems);

  // setTimeout ensures execution after the Transition on BulkActions
  setTimeout(() => {
    checkableButtonRef.value?.focus();
  }, 0);
};

const handleMultiSelectionChange = (
  lastSelected: number,
  currentSelected: number,
  resolveItemId: (item: TItemType) => string,
) => {
  const min = Math.min(lastSelected, currentSelected);
  const max = Math.max(lastSelected, currentSelected);
  return props.items.slice(min, max + 1).map(resolveItemId);
};

const handleSelectionChange = (
  selected: boolean,
  id: string,
  sortOrder: number | undefined,
  shiftKey: boolean,
) => {
  const { selectedItems, resolveItemId } = props;
  if (selectedItems == null) {
    return;
  }

  let newlySelectedItems =
    selectedItems === SELECT_ALL_ITEMS
      ? getAllItemsOnPage(props.items, props.idForItem || defaultIdForItem)
      : [...selectedItems];

  if (sortOrder !== undefined) {
    lastSelected.value = sortOrder;
  }

  const lastSelectedFromState = lastSelected.value;

  let selectedIds: string[] = [id];

  if (
    shiftKey &&
    lastSelectedFromState != null &&
    sortOrder !== undefined &&
    resolveItemId
  ) {
    selectedIds = handleMultiSelectionChange(
      lastSelectedFromState,
      sortOrder,
      resolveItemId,
    );
  }
  newlySelectedItems = [...new Set([...newlySelectedItems, ...selectedIds])];

  if (!selected) {
    for (const selectedId of selectedIds) {
      newlySelectedItems.splice(newlySelectedItems.indexOf(selectedId), 1);
    }
  }

  if (newlySelectedItems.length === 0 && !isBreakpointsXS()) {
    handleSelectMode(false);
  } else if (newlySelectedItems.length > 0) {
    handleSelectMode(true);
  }

  emit('selectionChange', newlySelectedItems);
};


watch(() => props.items, () => {
  computeTableDimensions();
})

const hasBulkActions = computed(() => Boolean(props.bulkActions));

provide(resourceListContextKey, reactive({
  selectable: isSelectable.value,
  selectedItems: toRef(props, 'selectedItems'),
  selectMode,
  hasBulkActions,
  resourceName,
  loading: toRef(props, 'loading'),
  onSelectionChange: handleSelectionChange,
}));
</script>
