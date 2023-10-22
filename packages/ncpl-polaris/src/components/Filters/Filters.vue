<template>
  <div :class="classNames(styles.Filters, hideQueryField && styles.hideQueryField)">
    <div v-if="!hideQueryField" :class="classNames(styles.Container, styles.ContainerUplift)">
      <Box v-bind="containerSpacing">
        <InlineStack align="start" block-align="center" :gap="{ xs: '400', md: '300', }">
          <div :class="styles.SearchField" :style="mountedState
            ? {
              ...defaultStyle,
              ...transitionStyles[mountedState],
            }
            : undefined
            ">
            <SearchField :model-value="modelValue" @update:model-value="e => $emit('update:modelValue', e)"
              @focus="e => $emit('queryFocus', e)" @blur="e => $emit('queryBlur', e)" @clear="e => $emit('queryClear', e)"
              :placeholder="placeholder" :focused="focused" :disabled="disabled || disableQueryField"
              :borderless-query-field="borderlessQueryField" />
          </div>
          <div :class="styles.Spinner">
            <Spinner v-if="loading" size="small" />
          </div>
          <slot></slot>
        </InlineStack>
      </Box>
    </div>
    <div v-if="!(hideFilters || filters.length === 0)" :class="classNames(
      styles.FiltersWrapper,
      shouldShowAddButton &&
      hasOneOrMorePinnedFilters &&
      styles.FiltersWrapperWithAddButton,
    )" aria-live="polite"
      :style="mountedState && !hideQueryField ? { ...defaultFilterStyles, ...transitionFilterStyles[mountedState] } : undefined">
      <div :class="classNames(styles.FiltersInner)">
        <div :class="classNames(styles.FiltersStickyArea)">
          <component :is="pinnedFiltersMarkup" />
          <div v-if="shouldShowAddButton"
            :class="classNames(styles.AddFilterActivator, hasOneOrMorePinnedFilters && styles.AddFilterActivatorMultiple)">
            <Popover :active="popoverActive && !disabled" @close="popoverActive = !popoverActive">
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
              <ActionList actionRole="menuitem" :items="unsectionedFilters" :sections="sectionedFilters" />
            </Popover>
          </div>
          <div v-if="appliedFilters?.length || localPinnedFilters.length" :class="classNames(
            styles.ClearAll,
            hasOneOrMorePinnedFilters &&
            shouldShowAddButton &&
            styles.MultiplePinnedFilterClearAll,
          )">
            <Button size="micro" @click="handleClearAllFilters" remove-underline variant="monochromePlain">
              {{ i18n.translate('Polaris.Filters.clearFilters') }}
            </Button>
          </div>
        </div>
      </div>
      <Box v-if="hideQueryField" padding-inline-end="300" padding-block-start="200" padding-block-end="200">
        <InlineStack align="start" block-align="center" :gap="{ xs: '400', md: '300' }">
          <div :class="styles.Spinner">
            <Spinner v-if="loading" size="small" />
          </div>
          <slot></slot>
        </InlineStack>
      </Box>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, h } from 'vue'
import type { FiltersProps, FilterInterface } from './Filters'
import styles from './Filters.module.scss'
import InlineStack from "../InlineStack"
import Box from "../Box"
import Spinner from "../Spinner"
import Button from "../Button"
import type { BoxProps } from '../Box';
import Popover from '../Popover';
import ActionList from '../ActionList';
import UnstyledButton from '../UnstyledButton';
import Text from '../Text';
import SearchField from "./SearchField"
import { classNames } from '@ncpl-polaris/utils'
import { useI18n, useBreakpoints } from '../context'
import FilterPill from "./FilterPill"
import { PlusMinor } from "@ncpl/ncpl-icons"

defineOptions({
  name: 'NpFilters',
})

const emit = defineEmits(['addFilterClick', 'queryChange', 'queryClear', 'queryBlur', 'queryFocus', 'clearAll', 'update:modelValue'])
const props = defineProps<FiltersProps>()
const localPinnedFilters = ref<string[]>([])

const TRANSITION_DURATION = 'var(--p-motion-duration-150)';
const TRANSITION_MARGIN = '-36px';
const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
  unmounted: { opacity: 0 },
};

const i18n = useI18n();
const popoverActive = ref(false);
const { mdDown } = useBreakpoints();
const hasMounted = ref(false);

const defaultStyle = {
  transition: `opacity ${TRANSITION_DURATION} var(--p-motion-ease)`,
  opacity: 0,
};

const defaultFilterStyles = {
  transition: `opacity ${TRANSITION_DURATION} var(--p-motion-ease), margin ${TRANSITION_DURATION} var(--p-motion-ease)`,
  opacity: 0,
  marginTop: TRANSITION_MARGIN,
};

const transitionFilterStyles = {
  entering: {
    opacity: 1,
    marginTop: 0,
  },
  entered: {
    opacity: 1,
    marginTop: 0,
  },
  exiting: {
    opacity: 0,
    marginTop: TRANSITION_MARGIN,
  },
  exited: {
    opacity: 0,
    marginTop: TRANSITION_MARGIN,
  },
  unmounted: {
    opacity: 0,
    marginTop: TRANSITION_MARGIN,
  },
};


const containerSpacing: {
  paddingBlockStart: BoxProps['paddingBlockStart'];
  paddingBlockEnd: BoxProps['paddingBlockEnd'];
  paddingInlineStart: BoxProps['paddingInlineStart'];
  paddingInlineEnd: BoxProps['paddingInlineEnd'];
} = {
  paddingInlineStart: '200',
  paddingInlineEnd: '200',
  paddingBlockStart: '200',
  paddingBlockEnd: '200'
}

const appliedFilterKeys = computed(() => props.appliedFilters?.map(({ key }) => key));

const shouldShowAddButton = computed(() => props.filters.some((filter) => !filter.pinned));

const pinnedFiltersFromPropsAndAppliedFilters = computed(() => props.filters.filter(
  ({ pinned, key }) =>
    (Boolean(pinned) || appliedFilterKeys.value?.includes(key)) &&
    // Filters that are pinned in local state display at the end of our list
    !localPinnedFilters.value.find((filterKey) => filterKey === key),
)
);
const pinnedFiltersFromLocalState = computed(() => localPinnedFilters.value
  .map((key) => props.filters.find((filter) => filter.key === key))
  .reduce<any[]>(
    (acc, filter) => (filter ? [...acc, filter] : acc),
    [],
  )
);

const pinnedFilters = computed(() => [
  ...pinnedFiltersFromPropsAndAppliedFilters.value,
  ...pinnedFiltersFromLocalState.value,
]);

const unpinnedFilters = computed(() => props.filters.filter(
  (filter) => !pinnedFilters.value.some(({ key }) => key === filter.key),
));

const onFilterClick = ({ key, onAction }: FilterInterface) =>
  () => {
    // PopoverOverlay will cause a rerender of the component and nuke the
    // popoverActive state, so we set this as a microtask
    setTimeout(() => {
      localPinnedFilters.value = [
        ...new Set([...localPinnedFilters.value, key]),
      ];
      onAction?.();
      popoverActive.value = true;
    }, 0);
  };

const filterToActionItem = (filter: FilterInterface) => ({
  ...filter,
  content: filter.label,
  onAction: onFilterClick(filter),
});


const unsectionedFilters = computed(() => unpinnedFilters.value.filter((filter) => !filter.section).map(filterToActionItem));


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

const hasOneOrMorePinnedFilters = computed(() => pinnedFilters.value.length >= 1);

const labelVariant = computed(() => mdDown ? 'bodyLg' : 'bodySm');

const pinnedFiltersMarkup = computed(() => {
  return () => pinnedFilters.value.map(
    ({ key: filterKey, ...pinnedFilter }) => {
      const appliedFilter = props.appliedFilters?.find(({ key }) => key === filterKey);
      const handleFilterPillRemove = () => {
        localPinnedFilters.value = localPinnedFilters.value.filter((key) => key !== filterKey);
        appliedFilter?.onRemove(filterKey);
      };

      return h(FilterPill, {
        key: filterKey,
        ...pinnedFilter,
        initialActive: hasMounted.value && !pinnedFilter.pinned && !appliedFilter,
        label: appliedFilter?.label || pinnedFilter.label,
        filterKey: filterKey,
        selected: appliedFilterKeys.value?.includes(filterKey),
        onRemove: handleFilterPillRemove,
        disabled: pinnedFilter.disabled || props.disableFilters,
        closeOnChildOverlayClick: props.closeOnChildOverlayClick,
      });
    }
  );
})

const handleAddFilterClick = () => {
  emit('addFilterClick');
  popoverActive.value = true;
};

const handleClearAllFilters = () => {
  localPinnedFilters.value = [];
  emit('clearAll');
};

onMounted(() => {
  hasMounted.value = true;
});
</script>
