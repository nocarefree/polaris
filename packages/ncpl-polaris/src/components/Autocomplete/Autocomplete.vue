<template>
  <Combobox :allow-multiple="allowMultiple" @scrolledToBottom="$emit('loadMoreResults')"
    :preferred-position="preferredPosition" :will-load-more-options="willLoadMoreResults">
    <template #activator>
      <slot name="textField"></slot>
    </template>

    <Listbox v-if="actionBefore || hasOptionsMarkup || loading || hasEmptyStateMarkup" :auto-selection="autoSelection"
      @select="updateSelection">
      <MappedAction v-if="actionBefore" v-bind="actionBefore" />

      <template v-if="isOptionSection">
        <div v-if="noOptionsAvailable" :class="styles.SectionWrapper">
          <ListboxSection v-for="({ options, title }) in (conditionalOptions as SectionDescriptor[])" :divider="false">
            <template #title>
              <ListboxHeader>{{ title }}</ListboxHeader>
            </template>
            <template v-if="options.length > 0">
              <MappedOption v-for="option in options" :key="option.id || option.value" v-bind="option"
                :selected="selected.includes(option.value)" :singleSelection="!allowMultiple" />
            </template>
          </ListboxSection>
        </div>
      </template>
      <ConditionalWrapper v-else :condition="Boolean(listTitle)">
        <template #wrapper="{ children }">
          <ListboxSection :divider="false">
            <template #title>
              <ListboxHeader>{{ listTitle }}</ListboxHeader>
            </template>
            <component :is="children"></component>
          </ListboxSection>
        </template>
        <template v-if="conditionalOptions.length">
          <MappedOption v-for="option in (conditionalOptions as OptionDescriptor[])" v-bind="option"
            :selected="selected.includes(option.value)" :single-selection="!allowMultiple" />
        </template>
      </ConditionalWrapper>

      <ListboxLoading v-if="loading" :accessibility-label="i18n.translate('Polaris.Autocomplete.spinnerAccessibilityLabel'
    ,)" />
      <div v-if="hasEmptyStateMarkup" role="status">
        <slot name="emptyState"></slot>
      </div>
    </Listbox>
  </Combobox>
</template>
<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { AutocompleteProps } from './Autocomplete';
import styles from './Autocomplete.module.scss';
import Combobox from "../Combobox";
import ConditionalWrapper from "../ConditionalWrapper";
import Listbox, { AutoSelection } from "../Listbox";
import ListboxSection from "../Listbox/Section";
import ListboxLoading from "../Listbox/Loading";
import ListboxHeader from "../Listbox/Header";
import MappedAction from "./MappedAction"
import MappedOption from "./MappedOption"
import { isSection } from '../Option/utils';
import type { SectionDescriptor, OptionDescriptor } from "../types"
import { useI18n } from "../context"

defineOptions({
  name: 'NpAutocomplete',
})
const props = defineProps<AutocompleteProps>()
const emit = defineEmits(['loadMoreResults', 'update:selected'])

const slots = useSlots();
const i18n = useI18n();

const conditionalOptions = computed(() => props.loading && !props.willLoadMoreResults ? [] : props.options);
const isOptionSection = computed(() => isSection(conditionalOptions.value));
const noOptionsAvailable = computed(() => !isOptionSection.value || (conditionalOptions.value as SectionDescriptor[]).every(
  (value: SectionDescriptor) => value.options.length === 0
));
const hasOptionsMarkup = computed(() => {
  return !noOptionsAvailable.value || conditionalOptions.value.length > 0;
});
const hasEmptyStateMarkup = computed(() => {
  return slots.emptyState && props.options.length < 1 && !props.loading;
});
const autoSelection = computed(() => props.actionBefore ? AutoSelection.First : undefined);


const updateSelection = (newSelection: string) => {
  const { actionBefore, allowMultiple, selected } = props;
  if (actionBefore && newSelection === actionBefore.content) {
    actionBefore.onAction && actionBefore.onAction();
    return;
  }

  if (allowMultiple) {
    if (selected.includes(newSelection)) {
      emit('update:selected', selected.filter((option) => option !== newSelection))
    } else {
      emit('update:selected', [...selected, newSelection])
    }
  } else {
    emit('update:selected', [newSelection])
  }
};

</script>
