<template>
  <div
    :class="classNames(styles.FiltersWrapper, shouldShowAddButton && hasOneOrMorePinnedFilters && styles.FiltersWrapperWithAddButton)"
    aria-live="polite" :style="mountedStateStyles">
    <div :class="classNames(styles.FiltersInner)">
      <div :class="classNames(styles.FiltersStickyArea)">
        <FilterPill v-for="(filter, index) in pinnedFilters" v-bind="getFilterPillProps(filter)">
          <slot name="filter" :index="index" :filter="filter"></slot>
        </FilterPill>
        <div v-if="shouldShowAddButton"
          :class="classNames(styles.AddFilterActivator, hasOneOrMorePinnedFilters && styles.AddFilterActivatorMultiple,)">
          <Popover :active="popoverActive && !disabled" @close="togglePopoverActive">
            <template #activator>
              <div>
                <UnstyledButton type="button" :class="styles.AddFilter" @click="handleAddFilterClick"
                  :aria-label="i18n.translate('Polaris.Filters.addFilter')"
                  :disabled="disabled || (unsectionedFilters.length === 0 && sectionedFilters.length === 0) || disableFilters">
                  <Text :variant="labelVariant" as="span">
                    {{ i18n.translate('Polaris.Filters.addFilter') + " " }}
                  </Text>
                  <PlusMinor />
                </UnstyledButton>
              </div>
            </template>
            <ActionList action-role="menuitem" :items="unsectionedFilters" :sections="sectionedFilters" />
          </Popover>
        </div>
        <div v-if="appliedFilters?.length || localPinnedFilters.length"
          :class="classNames(styles.ClearAll, hasOneOrMorePinnedFilters && shouldShowAddButton && styles.MultiplePinnedFilterClearAll)">
          <Button size="micro" @click="handleClearAllFilters" remove-underline variant="monochromePlain">
            {{ i18n.translate('Polaris.Filters.clearFilters') }}
          </Button>
        </div>
      </div>
    </div>
    <Box v-if="hideQueryField" padding-inline-end="300" padding-block-start="200" padding-block-end="200">
      <InlineStack align="start" block-align="center" :gap="{ xs: '400', md: '300' }">
        <slot></slot>
      </InlineStack>
    </Box>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { FilterInterface, AppliedFilterInterface } from '../Filters';
import InlineStack from "../../InlineStack";
import Box from "../../Box";
import Button from "../../Button";
import Popover from '../../Popover';
import ActionList from '../../ActionList';
import UnstyledButton from '../../UnstyledButton';
import Text from '../../Text';
import FilterPill from "../FilterPill";

import { classNames } from '@ncpl-polaris/utils';
import { useI18n, useBreakpoints } from '../../context';
import { PlusMinor } from "@ncpl/ncpl-icons";
import styles from '../Filters.module.scss';


const props = defineProps<{
  /** Currently entered text in the query field */
  queryValue?: string;
  /** Placeholder text for the query field. */
  queryPlaceholder?: string;
  /** Whether the query field is focused. */
  focused?: boolean;
  /** Available filters added to the filter bar. Shortcut filters are pinned to the front of the bar. */
  filters: FilterInterface[];
  /** Applied filters which are rendered as filter pills. The remove callback is called with the respective key. */
  appliedFilters?: AppliedFilterInterface[];
  /** Disable all filters. */
  disabled?: boolean;
  /** Hide the query field. */
  hideQueryField?: boolean;
  /** Disable the filters */
  disableFilters?: boolean;
  mountedState?: "entering" | "entered" | "exiting" | "exited" | "unmounted";
  /** Whether the filter should close when clicking inside another Popover. */
  closeOnChildOverlayClick?: boolean;
  mountedStateStyles?: any;
}>();

const emit = defineEmits(['addFilterClick', 'queryChange', 'queryClear', 'queryBlur', 'queryFocus', 'clearAll', 'update:queryValue'])

const togglePopoverActive = () => {
  popoverActive.value = !popoverActive.value;
}
const i18n = useI18n();
const localPinnedFilters = ref<string[]>([])
const popoverActive = ref(false);
const hasMounted = ref(false);
const { mdDown } = useBreakpoints();

const shouldShowAddButton = computed(() => props.filters.some((filter) => !filter.pinned));
const pinnedFilters = computed(() => localPinnedFilters.value
  .map((key) => props.filters.find((filter) => filter.key === key))
  .reduce<FilterInterface[]>(
    (acc, filter) => (filter ? [...acc, filter] : acc),
    [],
  )
);
const labelVariant = computed(() => mdDown ? 'bodyLg' : 'bodySm');
const hasOneOrMorePinnedFilters = computed(() => pinnedFilters.value.length >= 1);
const unpinnedFilters = computed(() => props.filters.filter(
  (filter) => !pinnedFilters.value.some(({ key }) => key === filter.key),
));
const unsectionedFilters = computed(() => unpinnedFilters.value.filter((filter) => !filter.section).map(filterToActionItem));
const onFilterClick = ({ key, onAction }: FilterInterface) =>
  () => {
    // PopoverOverlay will cause a rerender of the component and nuke the
    // popoverActive state, so we set this as a microtask
    setTimeout(() => {
      localPinnedFilters.value = [
        ...new Set([...localPinnedFilters.value, key]),
      ];
      onAction?.();
      togglePopoverActive();
    }, 0);
  };

const filterToActionItem = (filter: FilterInterface) => ({
  ...filter,
  content: filter.label,
  onAction: onFilterClick(filter),
});

const sectionedFilters = computed(() => unpinnedFilters.value
  .filter((filter) => filter.section)
  .reduce(
    (acc, filter) => {
      const filterActionItem = filterToActionItem(filter);
      const sectionIndex = acc.findIndex(
        (section) => section.title === filter.section,
      );

      if (sectionIndex === -1) {
        acc.push({
          title: filter.section!,
          items: [filterActionItem],
        });
      } else {
        acc[sectionIndex].items.push(filterActionItem);
      }

      return acc;
    },
    [] as {
      title: string;
      items: any[];
    }[],
  ));



const getFilterPillProps = ({ key: filterKey, ...pinnedFilter }: FilterInterface) => {
  const appliedFilter = props.appliedFilters?.find(({ key }) => key === filterKey);
  const handleFilterPillRemove = () => {
    localPinnedFilters.value = localPinnedFilters.value.filter((key) => key !== filterKey);
    appliedFilter?.onRemove(filterKey);
  };

  return {
    ...pinnedFilter,
    onRemove: handleFilterPillRemove,
    initialActive: hasMounted.value && !pinnedFilter.pinned && !appliedFilter,
    label: appliedFilter?.label || pinnedFilter.label,
    filterKey: filterKey,
    selected: Boolean(appliedFilter),
    disabled: pinnedFilter.disabled || props.disableFilters,
    closeOnChildOverlayClick: props.closeOnChildOverlayClick,
  };
}

const handleAddFilterClick = () => {
  emit('addFilterClick');
  togglePopoverActive();
};

const handleClearAllFilters = () => {
  localPinnedFilters.value = [];
  emit('clearAll');
};



onMounted(() => {
  hasMounted.value = true;
});


</script>