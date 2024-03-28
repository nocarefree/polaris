<template>
  <div :class="classNames(styles.Filters, hideQueryField && styles.hideQueryField)">
    <div v-if="!hideQueryField" :class="classNames(styles.Container, styles.ContainerUplift)">
      <Box :padding="hideFilterBar ? '300' : '200'">
        <InlineStack align="start" block-align="center" :gap="{ xs: '400', md: '300', }">
          <div :class="styles.SearchField"
            :style="mountedState ? { ...defaultStyle, ...transitionStyles[mountedState], } : undefined">
            <SearchField :model-value="queryValue" @update:modelValue="e => $emit('update:queryValue', e)"
              @focus="e => $emit('queryFocus', e)" @blur="e => $emit('queryBlur', e)" @clear="e => $emit('queryClear', e)"
              :placeholder="queryPlaceholder" :focused="focused" :disabled="disabled || disableQueryField"
              :borderless-query-field="borderlessQueryField" :loading="loading" />
          </div>
          <slot></slot>
        </InlineStack>
      </Box>
    </div>
    <FiltersBar v-if="!hideFilterBar" :filters="filters" :applied-filters="appliedFilters" @clearAll="$emit('clearAll')"
      :disabled="disabled" :hide-query-field="hideQueryField" :disable-filters="disableFilters"
      @addFilterClick="$emit('addFilterClick')" :close-on-child-overlay-click="closeOnChildOverlayClick"
      :mounted-state-styles="mountedState && !hideQueryField ? { ...defaultFilterStyles, ...transitionFilterStyles[mountedState] } : undefined">
      <slot></slot>
      <template #filter="slotsProps">
        <slot name="filter" v-bind="slotsProps"></slot>
      </template>
    </FiltersBar>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { FiltersProps } from './Filters';

import InlineStack from "../InlineStack"
import Box from "../Box";
import SearchField from "./SearchField";
import FiltersBar from "./FiltersBar";

import { classNames } from '../../utils';
import styles from './Filters.module.scss';

defineOptions({
  name: 'NpFilters',
})

const emit = defineEmits(['addFilterClick', 'queryChange', 'queryClear', 'queryBlur', 'queryFocus', 'clearAll', 'update:queryValue'])
const props = defineProps<FiltersProps>();

const TRANSITION_DURATION = 'var(--p-motion-duration-150)';
const TRANSITION_MARGIN = '-36px';
const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
  unmounted: { opacity: 0 },
};


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


const hideFilterBar = computed(() => props.hideFilters || props.filters.length === 0);


</script>
