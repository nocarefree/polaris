<template>
  <div :class="styles.IndexFiltersWrapper" :style="{ height: indexFilteringHeight }">
    <div ref="intersectionRef" />
    <div :class="classNames(
      styles.IndexFilters,
      isSticky && styles.IndexFiltersSticky,
      isSticky && isFlushWhenSticky && styles.IndexFiltersStickyFlush,
    )" ref="measurerRef">
      <MyTransition :timeout="TRANSITION_DURATION">
        <template #default="{ state }">
          <div v-if="mode !== IndexFiltersMode.Filtering">
            <Container>
              <InlineStack align="start" block-align="center" :gap="{ xs: '0', md: '200' }">
                <div :class="classNames(
                  styles.TabsWrapper,
                  mdDown && styles.SmallScreenTabsWrapper,
                  isLoading && styles.TabsWrapperLoading,
                )">
                  <div :class="styles.TabsInner" :style="{
                    ...defaultStyle,
                    ...transitionStyles[state],
                  }">
                    <Tabs :tabs="tabs" :selected="selected" @update:selected="e => $emit('update:selected', e)"
                      :disabled="Boolean(mode !== IndexFiltersMode.Default || disabled)"
                      :can-create-new-view="canCreateNewView"
                      @createNewView="(e: string, done: () => {}) => $emit('createNewView', e, done)" />
                  </div>
                  <div v-if="isLoading && mdDown" :class="styles.TabsLoading">
                    <Spinner size="small" />
                  </div>
                </div>
                <div :class="styles.ActionWrap">
                  <Spinner v-if="isLoading && !mdDown" size="small" />
                  <template v-if="mode === IndexFiltersMode.Default">
                    <SearchFilterButton v-if="!(hideFilters && hideQueryField)" @click="beginEdit"
                      :label="searchFilterAriaLabel" :tooltip-content="searchFilterTooltip" :disabled="disabled"
                      :hide-filters="hideFilters" :hide-query-field="hideQueryField" :style="{
                        ...defaultStyle,
                        ...transitionStyles[state],
                      }" />
                    <SortButton v-if="sortOptions?.length" :choices="sortOptions" :selected="sortSelected!"
                      @change="handleChangeSortButton" @changeKey="e => $emit('sortKeyChange', e)"
                      @changeDirection="e => $emit('sortDirectionChange', e)" :disabled="disabled" />
                  </template>
                  <UpdateButtons v-if="mode == IndexFiltersMode.EditingColumns" :primary-action="enhancedPrimaryAction"
                    :cancel-action="enhancedCancelAction" :view-names="viewNames" :disabled="disabled" />
                </div>
              </InlineStack>
            </Container>
          </div>
        </template>
      </MyTransition>
      <MyTransition :timeout="TRANSITION_DURATION">
        <template #default="{ state }">
          <div v-if="mode === IndexFiltersMode.Filtering" ref="filteringRef">
            <Filters :model-value="modelValue" :placeholder="placeholder"
              @update:modelValue="value => $emit('update:modelValue', value)"
              @queryClear="value => $emit('queryClear', value)" @queryFocus="handleQueryFocus"
              @queryBlur="handleQueryBlur" @addFilterClick="e => $emit('addFilterClick', e)" :filters="filters"
              :applied-filters="appliedFilters" @clearAll="$emit('clearAll')" :disable-filters="disabled"
              :hide-filters="hideFilters" :hide-query-field="hideQueryField"
              :disable-query-field="disabled || disableQueryField" :loading="loading || isActionLoading"
              :focused="filtersFocused" :mounted-state="mdDown ? undefined : state" borderless-query-field
              @closeOnChildOverlayClick="closeOnChildOverlayClick">
              <InlineStack gap="200" align="start" block-align="center">
                <div :style="{ ...defaultStyle, ...transitionStyles[state] }">
                  <UpdateButtons :primary-action="enhancedPrimaryAction" :cancel-action="enhancedCancelAction"
                    :view-names="viewNames" :disabled="disabled" />
                </div>
                <SortButton v-if="sortOptions?.length" :choices="sortOptions" :selected="sortSelected!"
                  @change="handleChangeSortButton" @changeKey="e => $emit('sortKeyChange', e)"
                  @changeDirection="e => $emit('sortDirectionChange', e)" :disabled="disabled" />
              </InlineStack>
            </Filters>
          </div>
        </template>
      </MyTransition>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { type IndexFiltersProps, IndexFiltersMode } from './IndexFilters';
import { classNames } from "@ncpl-polaris/utils";
import { useIsSticky } from "./useIsSticky";
import Container from "./Container/Container.vue";
import SortButton from "./SortButton";
import UpdateButtons from "./UpdateButtons";
import InlineStack from "../InlineStack";
import Filters from "../Filters";
import Spinner from "../Spinner";
import SearchFilterButton from "./SearchFilterButton";
import Tabs from "../Tabs";
import MyTransition from "../Transition";
import { useI18n, useBreakpoints } from "../context";
import styles from './IndexFilters.module.scss';
import { useEventListener } from "@vueuse/core"

const DEFAULT_IGNORED_TAGS = ['INPUT', 'SELECT', 'TEXTAREA'];

type ExecutedCallback = (name: string, done: () => void) => void;

defineOptions({
  name: 'NpIndexFilters',
})
const props = defineProps<IndexFiltersProps>()
const emit = defineEmits([
  'update:mode',
  'update:selected',
  'update:modelValue',
  'update:sortSelected',
  'sortKeyChange',
  'sortDirectionChange',
  'editStart',
  'createNewView',
  'queryFocus',
  'queryClear',
  'clearAll',
  'addFilterClick'
])

const TRANSITION_DURATION = 150;
const defaultStyle = {
  transition: `opacity ${TRANSITION_DURATION}ms var(--p-motion-ease)`,
  opacity: 0,
};
const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
  unmounted: { opacity: 0 },
};


const { intersectionRef, measurerRef, indexFilteringHeight, isSticky } = useIsSticky(props.mode, Boolean(props.disableStickyMode), props.isFlushWhenSticky);
const i18n = useI18n();
const { mdDown } = useBreakpoints();
const filteringRef = ref();
const isActionLoading = computed(() => props.primaryAction?.loading || props.cancelAction?.loading);
const isLoading = computed(() => props.loading || isActionLoading.value);
const searchFilterTooltip = computed(() => props.filteringAccessibilityTooltip || i18n.value.translate(props.disableKeyboardShortcuts ? 'Polaris.IndexFilters.searchFilterTooltip' : 'Polaris.IndexFilters.searchFilterTooltipWithShortcut'));
const searchFilterAriaLabel = computed(() => props.filteringAccessibilityLabel || i18n.value.translate('Polaris.IndexFilters.searchFilterAccessibilityLabel'));
const viewNames = computed(() => props.tabs.map(({ content }) => content));
const filtersFocused = ref(props.mode === IndexFiltersMode.Filtering);


const beginEdit = () => {
  emit('update:mode', IndexFiltersMode.Filtering);
  emit('editStart');
}

const handleChangeSortButton = (value: string[]) => {
  emit('update:sortSelected', value)
}

const useExecutedCallback = (action?: ExecutedCallback) => (name: string) => {
  action?.(name, () => {
    emit('update:mode', IndexFiltersMode.Default);
    //afterEffect?.();
  });
}

const onExecutedCancelAction = () => {
  props.cancelAction.onAction?.();
  emit('update:mode', IndexFiltersMode.Default);
}

const enhancedPrimaryAction = () => {
  return props.primaryAction
    ? {
      ...props.primaryAction,
      onAction: useExecutedCallback(props.primaryAction.onAction),
    }
    : undefined;
}

const enhancedCancelAction = () => {
  return {
    ...props.cancelAction,
    onAction: onExecutedCancelAction,
  };
}

const handleQueryFocus = () => {
  filtersFocused.value = true;
  emit('queryFocus');
}

const handleQueryBlur = () => {
  filtersFocused.value = false;
}

const onPressF = () => {
  if (props.mode !== IndexFiltersMode.Default) {
    return;
  }
  beginEdit();
}

useEventListener(window, 'keydown', (event) => {
  if (props.disableKeyboardShortcuts) return;

  const { key } = event;
  const tag = document?.activeElement?.tagName;
  if (props.mode !== IndexFiltersMode.Default && event.key === 'Escape') {
    onExecutedCancelAction();
  }

  if (key === 'f' && props.mode === IndexFiltersMode.Default) {
    if (tag && DEFAULT_IGNORED_TAGS.includes(tag)) {
      return;
    }
    onPressF();
    event.preventDefault();
  }
});
</script>
